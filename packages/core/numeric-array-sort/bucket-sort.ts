function getIntegerDigit(num: number): number {
    const len = num.toFixed(0).length
    return num >= 0 ? len : len - 1
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

    let endIndex = list.length
    for (let i = 0; i < appendCount; i++) {
        list[endIndex++] = appendList[i]
    }
}

function getBucketName(num: number, digit: number, decimalDigit: number): string {
    let numStr = num.toFixed(decimalDigit)
    numStr = num >= 0 ? numStr : numStr.substring(1)

    const numChar = numStr[numStr.length - digit]
    return num >= 0 || isNaN(+numChar) ? numChar : '-' + numChar
}

export default function bucketSort(list: number[]): number[] {
    if (new Set(list).size <= 1) return list

    const maxIntegerDigit = getMaxIntegerDigit(list)
    const maxDecimalDigit = getMaxDecimalDigit(list)
    const bucketNames = Array(19).fill(null).map((_i, index) => index - 9 + '')

    return function _bucketSort(list: number[], digit: number, decimalDigit: number): number[] {
        const buckets: Array<number[]> = []

        for (let i = list.length - 1; i >= 0; i--) {
            const num = list[i]
            const bucketName = getBucketName(num, digit, decimalDigit)

            let bucketKey = bucketNames.indexOf(bucketName)
            bucketKey = bucketKey > -1 ? bucketKey : 9

            if (!Array.isArray(buckets[bucketKey])) {
                buckets[bucketKey] = [num]
                continue
            }

            buckets[bucketKey].push(num)
        }

        const res: number[] = []

        for (let key = 0; key <= 19; key++) {
            const bucketItem = buckets[key] || []

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
