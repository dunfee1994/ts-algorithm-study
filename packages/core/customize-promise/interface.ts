import { CustomizePromiseStatusEnum } from './enum'

export type ResolveFn<T> = (value: T | PromiseLike<T>) => void
export type RejectFn = (reason?: any) => void

export type OnFulfilledBaseFn<T, TResult = T> = (value: T) => TResult | PromiseLike<TResult>
export type OnRejectionBaseFn<TResult = never> = (reason: any) => TResult | PromiseLike<TResult>

export type OnFulfilledFn<T, TResult = T> = OnFulfilledBaseFn<T, TResult> | PromiseLike<TResult>
export type OnRejectionFn<TResult = never> = OnRejectionBaseFn<TResult> | PromiseLike<TResult>

export interface ThenCallback<T = any, TResult1 = T, TResult2 = T> {
    resolve: ResolveFn<TResult1 | TResult2>,
    reject: RejectFn,
    onFulfilled?: OnFulfilledFn<T, TResult1>,
    onRejection?: OnRejectionFn<TResult2>
}

export interface CustomizePromiseFulfilledResult<T> {
    status: CustomizePromiseStatusEnum.FULFILLED,
    value: T
}

export interface CustomizePromiseRejectedReuslt {
    status: CustomizePromiseStatusEnum.REJECTED,
    reason: any
}

export type CustomizePromiseSettledResult<T> = CustomizePromiseFulfilledResult<T> | CustomizePromiseRejectedReuslt
