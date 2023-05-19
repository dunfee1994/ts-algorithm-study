import { isDef, isFunction, isObjectLike as isObject } from '../utils'

/**
 * Whether in the node environment
 */
const isNode = isDef(global) && isDef(global.process)

/**
 * Determine if an obj is a PromiseLike.
 * @returns True if obj is a PromiseLike, otherwise false.
 */
export function isPromiseLike<T>(obj: any): obj is PromiseLike<T> {
    return (isObject(obj) || isFunction(obj)) && isFunction(obj.then)
}

/**
 * Append a task to the microtask queue.
 * @param taskFn a task.
 */
export function appendTaskIntoMicroTaskQueue(taskFn: () => void) {
    if (isFunction(queueMicrotask)) {
        queueMicrotask(taskFn)

        return
    }

    if (!isNode && isDef(MutationObserver)) {
        let divEl = document.createElement('div')
        let ob = new MutationObserver(() => {
            taskFn()

            ob.disconnect()
            ob = null
            divEl = null
        })

        ob.observe(divEl, { attributes: true })
        divEl.setAttribute('data-micro-task-attr', 'true')

        return
    }

    if (isFunction(setImmediate)) {
        let timer = setImmediate(() => {
            taskFn()

            clearImmediate(timer)
            timer = null
        })

        return
    }

    let timer = setTimeout(() => {
        taskFn()

        clearTimeout(timer)
        timer = null
    }, 0)
}
