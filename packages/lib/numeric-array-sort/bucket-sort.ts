function getMaxNumberDigit(list: number[]): number {
    let maxNumber = 0

    for (let i = list.length - 1; i >= 0; i--) {
        if (maxNumber < list[i]) {
            maxNumber = list[i]
        }
    }

    return maxNumber.toString().length
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

    return function _bucketSort(list: number[], digit: number): number[] {
        const bucket: Array<number[]> = []

        for (let i = list.length - 1; i >= 0; i--) {
            const item = list[i]
            const itemStr = item.toString()
            
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

            appendIntoTail(res, _bucketSort(bucketItem, digit - 1))
        }

        return res
    }(list, getMaxNumberDigit(list))
}
