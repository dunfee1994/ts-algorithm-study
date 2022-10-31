interface FilterFn {
    (item: any, index: number, array: Array<any>): boolean
}

/**
 * @description Get the first item that pass the test by second argument function
 *
 * @param {Array<any>} list
 * @param {FilterFn} fn
 *
 * @return {any}
 */
export default function find(list: Array<any>, fn: FilterFn): any {
    return list.filter(fn)[0]
}
