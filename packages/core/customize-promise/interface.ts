import { CustomiszePromiseStatusEnum } from './enum'

export type ResolveFn<T> = (value: T | PromiseLike<T>) => void
export type RejectFn = (reason?: any) => void

export type OnFulfilledBaseFn<T, TResult = T> = (value: T) => TResult | PromiseLike<TResult>
export type OnRejectionBaseFn<TResult = never> = (reason: any) => TResult | PromiseLike<TResult>

export type OnFulfilledFn<T, TResult = T> = OnFulfilledBaseFn<T, TResult> | PromiseLike<TResult>
export type OnRejectionFn<TResult = never> = OnRejectionBaseFn<TResult> | PromiseLike<TResult>

export type AllCustomiszePromiseT<P> = { -readonly [K in keyof P]: Awaited<P[K]> }

export interface ThenCallback<T = any, TResult1 = T, TResult2 = T> {
    resolve: ResolveFn<TResult1 | TResult2>,
    reject: RejectFn,
    onFulfilled?: OnFulfilledFn<T, TResult1>,
    onRejection?: OnRejectionFn<TResult2>
}

export interface CustomizePromiseFulfilledResult<T> {
    status: CustomiszePromiseStatusEnum.FULFILLED,
    value: T
}

export interface CustomizePromiseRejectedReuslt {
    status: CustomiszePromiseStatusEnum.REJECTED,
    reason: any
}

export type CustomizePromiseSettledResult<T> = CustomizePromiseFulfilledResult<T> | CustomizePromiseRejectedReuslt

export type AllSettledCustomiszePromiseT<P> = { -readonly [K in keyof P]: CustomizePromiseSettledResult<Awaited<P[K]>> }
