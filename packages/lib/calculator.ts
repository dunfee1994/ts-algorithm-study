// 加法
export function add(a: number = 0, b: number = 0): number {
    if (isNaN(a = +a) || isNaN(b = +b)) {
        return NaN
    }

    let c: number = 0
    let d: number = 0

    // 获取 a 的小数位长度
    try {
        c = a.toString().split('.')[1].length
    } catch (exception) {
        c = 0
    }

    // 获取 b 的小数位长度
    try {
        d = b.toString().split('.')[1].length
    } catch (exception) {
        d = 0
    }

    // 先求 e，把 a、b 同时乘以 e 转换成整数相加，再除以 e 还原
    let e: number = Math.pow(10, Math.max(c, d))
    return (mul(a, e) + mul(b, e)) / e
}

// 减法
export function sub(a: number = 0, b: number = 0): number {
    return add(a, -b)
}

// 乘法
export function mul(a: number = 0, b: number = 0): number {
    if (isNaN(a = +a) || isNaN(b = +b)) {
        return NaN
    }

    let c: number = 0

    let d: string = a.toString()
    let e: string = b.toString()

    // c 累加 a 的小数位长度
    try {
        c += d.split('.')[1].length
    } catch (exception) {
        // exception
    }

    // c 累加 b 的小数位长度
    try {
        c += e.split('.')[1].length
    } catch (exception) {
        // exception
    }

    d = d.replace('.', '')
    e = e.replace('.', '')

    return +d * +e / Math.pow(10, c)
}

// 除法
export function div(a: number = 0, b: number = 1): number {
    if (isNaN(a = +a) || isNaN(b = +b)) {
        return NaN
    }

    if (b === 0) {
        return a === 0 ? NaN : Infinity
    }

    let c: string = a.toString()
    let d: string = b.toString()

    let e: number = 0
    let f: number = 0

    try {
        e = c.split('.')[1].length
    } catch (exception) {
        // exception
    }

    try {
        f = d.split('.')[1].length
    } catch (exception) {
        // exception
    }

    c = c.replace('.', '')
    d = d.replace('.', '')

    return mul(+c / +d, Math.pow(10, f - e))
}
