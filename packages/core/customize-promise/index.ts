import {
    RejectFn,
    ResolveFn,
    ThenCallback,
    OnFulfilledFn,
    OnRejectionFn,
    OnFulfilledBaseFn,
    OnRejectionBaseFn,
    CustomizePromiseSettledResult,
    CustomizePromiseRejectedReuslt,
    CustomizePromiseFulfilledResult
} from './interface'

import { CustomizePromiseStatusEnum } from './enum'

import { isFunction } from '../utils'
import { isPromiseLike, appendTaskIntoMicroTaskQueue } from './_utils'

class CustomizePromise<T> {
    /**
     * A reference to the prototype.
     */
    readonly prototype: CustomizePromise<any>


    /**
     * The value when the CustomizePromise is resolved.
     */
    #value: T

    /**
     * The reason when the CustomizePromise is rejected.
     */
    #reason: any

    /**
     * The status of the CustomizePromise.
     */
    #status: CustomizePromiseStatusEnum = CustomizePromiseStatusEnum.PENDING

    /**
     * The `then` callback queue for the resolution and/or rejection of the CustomizePromise.
     */
    #thenCallbackQueue: ThenCallback<T, any, any>[] = []

    /**
     * Creates a new CustomizePromise.
     * @param executor A callback used to initialize the customizePromise. This callback is passed two arguments:
     * a resolve callback used to resolve the customizePromise with a value or the result of another customizePromise,
     * and a reject callback used to reject the customizePromise with a provided reason or error.
     */
    constructor(executor: (resolve: ResolveFn<T>, reject: RejectFn) => void) {
        const resolve: ResolveFn<T> = value => {
            if (this.#status === CustomizePromiseStatusEnum.PENDING) {
                if (isPromiseLike(value)) {
                    value.then(resolve, reject)

                    return
                }

                this.#status = CustomizePromiseStatusEnum.FULFILLED
                this.#value = value

                this.#publish()
            }
        }

        const reject: RejectFn = reason => {
            if (this.#status === CustomizePromiseStatusEnum.PENDING) {
                this.#status = CustomizePromiseStatusEnum.REJECTED
                this.#reason = reason

                this.#publish()
            }
        }

        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }


    /**
     * Attaches callbacks for the resolution and/or rejection of the CustomizePromise.
     * @param onFulfilled The callback to execute when the CustomizePromise is resolved.
     * @param onRejection The callback to execute when the CustomizePromise is rejected.
     * @returns A CustomizePromise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onFulfilled?: OnFulfilledFn<T, TResult1>, onRejection?: OnRejectionFn<TResult2>): CustomizePromise<TResult1 | TResult2> {
        return new CustomizePromise<TResult1 | TResult2>((resolve, reject) => {
            this.#thenCallbackQueue.push({ onFulfilled, onRejection, resolve, reject })

            this.#publish()
        })
    }


    /**
     * Attaches a callback for only the rejection of the CustomizePromise.
     * @param onRejection The callback to execute when the CustomizePromise is rejected.
     * @returns A CustomizePromise for the completion of the callback.
     */
    catch<TResult = never>(onRejection?: OnRejectionFn<TResult>): CustomizePromise<T | TResult> {
        return this.then<T, TResult>(undefined, onRejection)
    }


    /**
     * Attaches a callback that is invoked when the CustomizePromise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onFinally The callback to execute when the CustomizePromise is settled (fulfilled or rejected).
     * @returns A CustomizePromise for the completion of the callback.
     */
    finally(onFinally?: () => void): CustomizePromise<T> {
        if (!isFunction(onFinally)) return this

        return this.then(
            value => CustomizePromise.resolve(onFinally()).then(() => value),
            reason => CustomizePromise.resolve(onFinally()).then(() => {
                throw reason
            })
        )
    }


    /**
     * Creates a new resolved customizePromise.
     * @returns A resolved customizePromise.
     */
    static resolve(): CustomizePromise<void>
    /**
     * Creates a new resolved customizePromise for the provided value.
     * @param value The provided value.
     * @returns A customizePromise whose internal state matches the provided value.
     */
    static resolve<T>(value: T): CustomizePromise<Awaited<T>>
    /**
     * Creates a new resolved customizePromise for the provided value.
     * @param value The provided value.
     * @returns A customizePromise whose internal state matches the provided value.
     */
    static resolve<T>(value: T | PromiseLike<T>): CustomizePromise<Awaited<T>>
    static resolve(value?: any | PromiseLike<any>): CustomizePromise<Awaited<any>> {
        if (value && value instanceof CustomizePromise) return value
        return new CustomizePromise<Awaited<any>>((resolve: (value: Awaited<any>) => void) => resolve(value as Awaited<any>))
    }


    /**
     * Creates a new rejected customizePromise for the provided reason.
     * @param reason The reason the customizePromise was rejected.
     * @returns A new rejected CustomizePromise.
     */
    static reject<T = never>(reason?: any): CustomizePromise<T> {
        return new CustomizePromise<T>((resolve, reject) => reject(reason))
    }


    /**
     * Creates a CustomizePromise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any CustomizePromise is rejected.
     * @param values An array of Promises.
     * @returns A new CustomizePromise.
     */
    static all<T extends readonly unknown[] | []>(values: T): CustomizePromise<{ -readonly [K in keyof T]: Awaited<T[K]> }>
    /**
     * Creates a CustomizePromise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An iterable of Promises.
     * @returns A new CustomizePromise.
     */
    static all<T>(values: Iterable<T | PromiseLike<T>>): CustomizePromise<Awaited<T>[]>
    static all(values: any[] | Iterable<any | PromiseLike<any>>): CustomizePromise<Awaited<any>[]> {
        return new CustomizePromise<Awaited<any>[]>((resolve, reject) => {
            let remaining = 0

            const results: unknown[] = []

            const setResult = (idx: number, value: unknown) => {
                results[idx] = value
            }

            const resolveResults = () => {
                resolve(results as Awaited<any>[])
            }

            const resolver = (idx: number) => {
                remaining++

                return (value: unknown) => {
                    setResult(idx, value)

                    if (--remaining === 0) resolveResults()
                }
            }

            Array.from(values).forEach((value, idx) => {
                if (!isPromiseLike((value))) {
                    setResult(idx, value)

                    return
                }

                try {
                    value.then(resolver(idx), reject)
                } catch (error) {
                    reject(error)
                }
            })

            if (remaining === 0) resolveResults()
        })
    }


    /**
     * Creates a CustomizePromise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new CustomizePromise.
     */
    static race<T extends readonly unknown[] | []>(values: T): CustomizePromise<Awaited<T[number]>>
    /**
     * Creates a CustomizePromise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An iterable of Promises.
     * @returns A new CustomizePromise.
     */
    static race<T>(values: Iterable<T | PromiseLike<T>>): CustomizePromise<Awaited<T>>
    static race(values: any[] | Iterable<any | PromiseLike<any>>): CustomizePromise<Awaited<any>> {
        return new CustomizePromise<Awaited<any>>((resolve, reject) => {
            const resolveValue = (value: unknown) => {
                resolve(value as Awaited<any>)
            }

            Array.from(values).forEach(value => {
                if (!isPromiseLike(value)) {
                    resolveValue(value)

                    return
                }

                try {
                    value.then(resolveValue, reject)
                } catch (error) {
                    reject(error)
                }
            })
        })
    }


    /**
     * Creates a CustomizePromise that is resolved with an array of results when all
     * of the provided Promises resolve or reject.
     * @param values An array of Promises.
     * @returns A new CustomizePromise.
     */
    static allSettled<T extends readonly unknown[] | []>(values: T): CustomizePromise<{ -readonly [K in keyof T]: CustomizePromiseSettledResult<Awaited<T[K]>> }>
    /**
     * Creates a CustomizePromise that is resolved with an array of results when all
     * of the provided Promises resolve or reject.
     * @param values An array of Promises.
     * @returns A new CustomizePromise.
     */
    static allSettled<T>(values: Iterable<T | PromiseLike<T>>): CustomizePromise<CustomizePromiseSettledResult<Awaited<T>>[]>
    static allSettled(values: any[] | Iterable<any | PromiseLike<any>>): CustomizePromise<Awaited<CustomizePromiseSettledResult<any>[]>> {
        return new CustomizePromise<Awaited<CustomizePromiseSettledResult<any>[]>>(resolve => {
            const results: PromiseSettledResult<any>[] = []

            const settleStrategy = {
                [CustomizePromiseStatusEnum.FULFILLED]: (value: unknown, idx: number) => {
                    results[idx] = {
                        status: CustomizePromiseStatusEnum.FULFILLED,
                        value
                    } as CustomizePromiseFulfilledResult<any>
                },

                [CustomizePromiseStatusEnum.REJECTED]: (reason: any, idx: number) => {
                    results[idx] = {
                        status: CustomizePromiseStatusEnum.REJECTED,
                        reason
                    } as CustomizePromiseRejectedReuslt
                }
            }

            const resolveResults = () => {
                resolve(results as Awaited<CustomizePromiseSettledResult<any>[]>)
            }

            let remaining = 0
            const createSettleHanlder = (status: CustomizePromiseStatusEnum.FULFILLED | CustomizePromiseStatusEnum.REJECTED) => {
                return (idx: number) => {
                    remaining++

                    return (valueOrReason: unknown) => {
                        settleStrategy[status](valueOrReason, idx)

                        if ((remaining -= 2) === 0) resolveResults()
                    }
                }
            }

            const resolver = createSettleHanlder(CustomizePromiseStatusEnum.FULFILLED)
            const rejecter = createSettleHanlder(CustomizePromiseStatusEnum.REJECTED)

            Array.from(values).forEach((value, idx) => {
                if (!isPromiseLike(value)) {
                    settleStrategy[CustomizePromiseStatusEnum.FULFILLED](value, idx)

                    return
                }

                try {
                    value.then(resolver(idx), rejecter(idx))
                } catch (error) {
                    remaining -= 2
                    settleStrategy[CustomizePromiseStatusEnum.REJECTED](error, idx)
                }
            })

            if (remaining === 0) resolveResults()
        })
    }


    #publish() {
        if (this.#status !== CustomizePromiseStatusEnum.PENDING) {
            this.#thenCallbackQueue.forEach(this.#invokeThenCallback.bind(this))
            this.#thenCallbackQueue = []
        }
    }

    #invokeThenCallback(thenCallback: ThenCallback<T, any, any>) {
        const fulfilled = this.#status === CustomizePromiseStatusEnum.FULFILLED
        const callback = fulfilled ? thenCallback.onFulfilled : thenCallback.onRejection

        const resolve = thenCallback.resolve
        const reject = thenCallback.reject

        appendTaskIntoMicroTaskQueue(() => {
            try {
                if (isFunction(callback)) {
                    const ans = (callback as OnFulfilledBaseFn<T, any> | OnRejectionBaseFn<any>)(fulfilled ? this.#value : this.#reason)
                    isPromiseLike(ans) ? ans.then(resolve, reject) : resolve(ans)

                    return
                }

                const handleSettle = () => {
                    fulfilled ? resolve(this.#value) : reject(this.#reason)
                }

                if (isPromiseLike(callback)) {
                    callback.then(handleSettle, handleSettle)

                    return
                }

                handleSettle()
            } catch (error) {
                reject(error)
            }
        })
    }
}

export default CustomizePromise
