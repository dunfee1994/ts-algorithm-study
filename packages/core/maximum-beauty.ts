/**
 * 给你一个二维整数数组 items，
 * 其中 items[i] = [pricei, beautyi] 分别表示每一个物品的价格和美丽值。
 *
 * 同时给你一个下标从 0 开始的整数数组 queries。
 * 对于每个查询 queries[j]，你想求出价格小于等于 queries[j] 的物品中，最大的美丽值是多少。
 *
 * @param {number[][]} items 物品集
 *
 * @param {number[]} queries 查询集
 *
 * @returns {number[]} 一个长度与 queries 相同的数组 answer，其中 answer[j] 是第 j 个查询的答案
 */
export function maximumBeautyOne(items: number[][], queries: number[]): number[] {
    items = items.sort(([, a], [, b]) => a - b)

    return queries.map(query => {
        for (let i = items.length - 1; i >= 0; i--) {
            if (items[i][0] <= query) {
                return items[i][1]
            }
        }

        return 0
    })
}

export function maximumBeautyTwo(items: number[][], queries: number[]): number[] {
    function help(items: number[][], query: number): number {
        let l = 0
        if (items[l][0] > query) {
            return 0
        }

        let r = items.length - 1
        if (items[r][0] <= query) {
            return items[r][1]
        }

        while (l < r) {
            const mid = l + (r - l >> 1)
            if (items[mid][0] > query) {
                r = mid
            } else {
                l = mid + 1
            }
        }
        return items[l - 1][1]
    }

    return function(items: number[][], queries: number[]): number[] {
        items = items.sort(([a], [b]) => a - b)

        for (let i = 1, len = items.length; i < len; i++) {
            items[i][1] = Math.max(items[i - 1][1], items[i][1])
        }

        return queries.map(query => help(items, query))
    }(items, queries)
}
