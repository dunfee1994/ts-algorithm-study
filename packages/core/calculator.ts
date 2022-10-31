import { isInteger } from './utils'

/**
 * @description 获取数值 num 的小数位长度
 * 
 * @param {number} num 数值
 * 
 * @returns {number} 数值 num 的小数位长度
 */
function getDecimalLength(num: number): number {
    if (isNaN(num) || isInteger(num)) return 0
    return num.toString().split('.')[1].length
}

/**
 * @description 将数值 num 转为换整数
 * 
 * @param {number} num 数值
 * @returns {number} 转换后的整数
 */
function transformToInteger(num: number): number {
    if (isInteger(num)) return num
    return +num.toString().replace('.', '')
}

/**
 * @description 求出 a + b 的计算结果
 * 
 * @param {number} a 数值 a
 * @param {number} b 数值 b
 * @returns {number} a + b 的计算结果
 */
export function add(a: number = 0, b: number = 0): number {
    if (isNaN(a = +a) || isNaN(b = +b)) return NaN

    // 获取 a 的小数位长度
    let c = getDecimalLength(a)
    // 获取 b 的小数位长度
    let d = getDecimalLength(b)

    // 先求 e，把 a、b 同时乘以 e 转换成整数相加，再除以 e 还原
    let e = Math.pow(10, Math.max(c, d))
    return (mul(a, e) + mul(b, e)) / e
}

/**
 * @description 求出 a - b 的计算结果
 * 
 * @param {number} a 数值 a
 * @param {number} b 数值 b
 * @returns {number} a - b 的计算结果
 */
export function sub(a: number = 0, b: number = 0): number {
    return add(a, -b)
}

/**
 * @description 求出 a * b 的计算结果
 * 
 * @param {number} a 数值 a
 * @param {number} b 数值 b
 * @returns {number} a * b 的计算结果
 */
export function mul(a: number = 0, b: number = 0): number {
    if (isNaN(a = +a) || isNaN(b = +b)) return NaN

    let c = 0

    // c 累加 a 的小数位长度
    c += getDecimalLength(a)
    // c 累加 b 的小数位长度
    c += getDecimalLength(b)

    // 将 a 转为整数数值
    let d = transformToInteger(a)
    // 将 b 转为整数数值
    let e = transformToInteger(b)

    return d * e / Math.pow(10, c)
}

/**
 * @description 求出 a / b 的计算结果
 * 
 * @param {number} a 数值 a
 * @param {number} b 数值 b
 * @returns {number} a / b 的计算结果
 */
export function div(a: number = 0, b: number = 1): number {
    if (isNaN(a = +a) || isNaN(b = +b)) return NaN
    if (b === 0) return a === 0 ? NaN : Infinity

    // 将 a 转为整数数值
    let c = transformToInteger(a)
    // 将 b 转为整数数值
    let d = transformToInteger(b)

    // 获取 a 的小数位长度
    let e = getDecimalLength(a)
    // 获取 b 的小数位长度
    let f = getDecimalLength(b)

    return mul(c / d, Math.pow(10, f - e))
}
