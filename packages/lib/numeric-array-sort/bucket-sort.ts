function getIntegerDigit(num: number): number {
    const numStr = num.toString()

    if (Number.isInteger(num)) {
        return numStr.length
    }

    return numStr.split('.')[0].length
}

function getDecimalDigit(num: number): number {
    if (Number.isInteger(num)) return 0

    return num.toString().split('.')[1].length
}

function getMaxIntegerDigit(list: number[]): number {
    let maxDigit = 0

    for (let i = list.length - 1; i >= 0; i--) {
        const curDigit = getIntegerDigit(list[i])
        if (maxDigit < curDigit) {
            maxDigit = curDigit
        }
    }

    return maxDigit
}

function getMaxDecimalDigit(list: number[]): number {
    let maxDigit = 0

    for (let i = list.length - 1; i >= 0; i--) {
        const curDigit = getDecimalDigit(list[i])
        if (maxDigit < curDigit) {
            maxDigit = curDigit
        }
    }

    return maxDigit
}

function appendIntoTail(list: number[], appendList: number[]) {
    const appendCount = appendList.length

    let i = 0
    let endIndex = list.length

    while (i < appendCount) {
        list[endIndex++] = appendList[i++]
    }
}

export default function bucketSort(list: number[]): number[] {
    if (new Set(list).size <= 1) return list

    const maxIntegerDigit = getMaxIntegerDigit(list)
    const maxDecimalDigit = getMaxDecimalDigit(list)

    return function _bucketSort(list: number[], digit: number, decimalDigit: number): number[] {
        const bucket: Array<number[]> = []

        for (let i = list.length - 1; i >= 0; i--) {
            const item = list[i]
            const itemStr = item.toFixed(decimalDigit)

            let bucketKey = +itemStr[itemStr.length - digit]
            bucketKey = isNaN(bucketKey) ? 0 : bucketKey

            if (!Array.isArray(bucket[bucketKey])) {
                bucket[bucketKey] = [item]
                continue
            }

            bucket[bucketKey].push(item)
        }

        const res: number[] = []

        for (let key = 0; key <= 9; key++) {
            const bucketItem = bucket[key] || []

            if (bucketItem.length === 0) {
                continue
            }

            if (new Set(bucketItem).size === 1) {
                appendIntoTail(res, bucketItem)
                continue
            }

            appendIntoTail(res, _bucketSort(bucketItem, digit - 1, decimalDigit))
        }

        return res
    }(list, maxIntegerDigit + maxDecimalDigit + +(maxDecimalDigit > 0), maxDecimalDigit)
}
