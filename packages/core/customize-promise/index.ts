import {
    RejectFn,
    ResolveFn,
    ThenCallback,
    OnFulfilledFn,
    OnRejectionFn,
    OnFulfilledBaseFn,
    OnRejectionBaseFn,
    AllCustomiszePromiseT,
    AllSettledCustomiszePromiseT,
    CustomizePromiseRejectedReuslt,
    CustomizePromiseFulfilledResult
} from './interface'

import { CustomiszePromiseStatusEnum } from './enum'

import { isFunction } from '../utils'
import { isPromiseLike, appendTaskIntoMicroTaskQueue } from './_utils'

class CustomiszePromise<T> {
    /**
     * A reference to the prototype.
     */
    readonly prototype: CustomiszePromise<any>


    /**
     * The value when the CustomiszePromise is resolved.
     */
    #value: T

    /**
     * The reason when the CustomiszePromise is rejected.
     */
    #reason: any

    /**
     * The status of the CustomiszePromise.
     */
    #status: CustomiszePromiseStatusEnum = CustomiszePromiseStatusEnum.PENDING

    /**
     * The `then` callback queue for the resolution and/or rejection of the CustomiszePromise.
     */
    #thenCallbackQueue: ThenCallback<T, any, any>[] = []

    /**
     * Creates a new CustomiszePromise.
     * @param executor A callback used to initialize the customiszePromise. This callback is passed two arguments:
     * a resolve callback used to resolve the customiszePromise with a value or the result of another customiszePromise,
     * and a reject callback used to reject the customiszePromise with a provided reason or error.
     */
    constructor(executor: (resolve: ResolveFn<T>, reject: RejectFn) => void) {
        const resolve: ResolveFn<T> = value => {
            if (this.#status === CustomiszePromiseStatusEnum.PENDING) {
                if (isPromiseLike(value)) {
                    value.then(resolve, reject)

                    return
                }

                this.#status = CustomiszePromiseStatusEnum.FULFILLED
                this.#value = value

                this.#publish()
            }
        }

        const reject: RejectFn = reason => {
            if (this.#status === CustomiszePromiseStatusEnum.PENDING) {
                this.#status = CustomiszePromiseStatusEnum.REJECTED
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
     * Attaches callbacks for the resolution and/or rejection of the CustomiszePromise.
     * @param onFulfilled The callback to execute when the CustomiszePromise is resolved.
     * @param onRejection The callback to execute when the CustomiszePromise is rejected.
     * @returns A CustomiszePromise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onFulfilled?: OnFulfilledFn<T, TResult1>, onRejection?: OnRejectionFn<TResult2>): CustomiszePromise<TResult1 | TResult2> {
        return new CustomiszePromise<TResult1 | TResult2>((resolve, reject) => {
            this.#thenCallbackQueue.push({
                onFulfilled,
                onRejection,
                resolve,
                reject
            })

            this.#publish()
        })
    }


    /**
     * Attaches a callback for only the rejection of the CustomiszePromise.
     * @param onRejection The callback to execute when the CustomiszePromise is rejected.
     * @returns A CustomiszePromise for the completion of the callback.
     */
    catch<TResult = never>(onRejection?: OnRejectionFn<TResult>): CustomiszePromise<T | TResult> {
        return this.then<T, TResult>(undefined, onRejection)
    }


    /**
     * Attaches a callback that is invoked when the CustomiszePromise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onFinally The callback to execute when the CustomiszePromise is settled (fulfilled or rejected).
     * @returns A CustomiszePromise for the completion of the callback.
     */
    finally(onFinally?: () => void): CustomiszePromise<T> {
        if (!isFunction(onFinally)) return this

        return this.then(
            value => CustomiszePromise.resolve(onFinally()).then(() => value),
            reason => CustomiszePromise.resolve(onFinally()).then(() => {
                throw reason
            })
        )
    }


    /**
     * Creates a new resolved customiszePromise.
     * @returns A resolved customiszePromise.
     */
    static resolve(): CustomiszePromise<void>
    /**
     * Creates a new resolved customiszePromise for the provided value.
     * @param value The provided value.
     * @returns A customiszePromise whose internal state matches the provided value.
     */
    static resolve<T>(value: T): CustomiszePromise<Awaited<T>>
    /**
     * Creates a new resolved customiszePromise for the provided value.
     * @param value The provided value.
     * @returns A customiszePromise whose internal state matches the provided value.
     */
    static resolve<T>(value: T | PromiseLike<T>): CustomiszePromise<Awaited<T>>
    static resolve<T>(value?: T | PromiseLike<T>): CustomiszePromise<Awaited<T>> {
        if (value && value instanceof CustomiszePromise) return value
        return new CustomiszePromise<Awaited<T>>((resolve: (value: Awaited<T>) => void) => resolve(value as Awaited<T>))
    }


    /**
     * Creates a new rejected customiszePromise for the provided reason.
     * @param reason The reason the customiszePromise was rejected.
     * @returns A new rejected CustomiszePromise.
     */
    static reject<T = never>(reason?: any): CustomiszePromise<T> {
        return new CustomiszePromise((rsolve, reject) => reject(reason))
    }


    /**
     * Creates a CustomiszePromise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any CustomiszePromise is rejected.
     * @param values An array of Promises.
     * @returns A new CustomiszePromise.
     */
    static all<T extends readonly unknown[] | []>(values: T): CustomiszePromise<AllCustomiszePromiseT<T>> {
        return new CustomiszePromise<AllCustomiszePromiseT<T>>((resolve, reject) => {
            let remaining = 0

            const results: Awaited<T[keyof T]>[] = []
            const resolver = (idx: number) => {
                remaining++

                return (value: unknown) => {
                    results[idx] = value as Awaited<T[keyof T]>

                    if (--remaining === 0) {
                        resolve(results as AllCustomiszePromiseT<T>)
                    }
                }
            }

            values.forEach((value, idx) => {
                if (!isPromiseLike((value))) {
                    results[idx] = value as Awaited<T[keyof T]>

                    return
                }

                try {
                    value.then(resolver(idx), reject)
                } catch (error) {
                    reject(error)
                }
            })

            if (remaining === 0) {
                resolve(results as AllCustomiszePromiseT<T>)
            }
        })
    }


    /**
     * Creates a CustomiszePromise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new CustomiszePromise.
     */
    static race<T extends readonly unknown[] | []>(values: T): CustomiszePromise<Awaited<T[number]>> {
        return new CustomiszePromise((resolve, reject) => {
            values.forEach(value => {
                if (!isPromiseLike(value)) {
                    resolve(value as Awaited<T[number]>)

                    return
                }

                try {
                    value.then(v => resolve(v as Awaited<T[number]>), reject)
                } catch (error) {
                    reject(error)
                }
            })
        })
    }


    /**
     * Creates a CustomiszePromise that is resolved with an array of results when all
     * of the provided Promises resolve or reject.
     * @param values An array of Promises.
     * @returns A new CustomiszePromise.
     */
    static allSettled<T extends readonly unknown[] | []>(values: T): CustomiszePromise<AllSettledCustomiszePromiseT<T>> {
        return new CustomiszePromise<AllSettledCustomiszePromiseT<T>>(resolve => {
            const results: PromiseSettledResult<Awaited<T[keyof T]>>[] = []

            const settleStrategy = {
                [CustomiszePromiseStatusEnum.FULFILLED]: (value: unknown, idx: number) => {
                    results[idx] = {
                        status: CustomiszePromiseStatusEnum.FULFILLED,
                        value
                    } as CustomizePromiseFulfilledResult<Awaited<T[keyof T]>>
                },
                [CustomiszePromiseStatusEnum.REJECTED]: (reason: any, idx: number) => {
                    results[idx] = {
                        status: CustomiszePromiseStatusEnum.REJECTED,
                        reason
                    } as CustomizePromiseRejectedReuslt
                }
            }

            let remaining = 0
            const createSettleHanlder = (status: CustomiszePromiseStatusEnum.FULFILLED | CustomiszePromiseStatusEnum.REJECTED) => {
                return (idx: number) => {
                    return (valueOrReason: unknown) => {
                        settleStrategy[status](valueOrReason, idx)

                        if ((remaining -= 2) === 0) {
                            resolve(results as AllSettledCustomiszePromiseT<T>)
                        }
                    }
                }
            }

            const resolver = createSettleHanlder(CustomiszePromiseStatusEnum.FULFILLED)
            const rejecter = createSettleHanlder(CustomiszePromiseStatusEnum.REJECTED)

            values.forEach((value, idx) => {
                if (!isPromiseLike(value)) {
                    settleStrategy[CustomiszePromiseStatusEnum.FULFILLED](value, idx)

                    return
                }

                try {
                    value.then(resolver(idx), rejecter(idx))
                } catch (error) {
                    settleStrategy[CustomiszePromiseStatusEnum.REJECTED](error, idx)
                }
            })

            if (remaining === 0) {
                resolve(results as AllSettledCustomiszePromiseT<T>)
            }
        })
    }


    #publish() {
        if (this.#status !== CustomiszePromiseStatusEnum.PENDING) {
            this.#thenCallbackQueue.forEach(this.#invokeThenCallback.bind(this))
            this.#thenCallbackQueue = []
        }
    }

    #invokeThenCallback(thenCallback: ThenCallback<T, any, any>) {
        const fulfilled = this.#status === CustomiszePromiseStatusEnum.FULFILLED
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

export default CustomiszePromise
