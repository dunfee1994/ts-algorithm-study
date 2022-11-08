// 商品
export interface Goods {
    /**
     * 商品的重量
     * @type number
     */
    weight: number,

    /**
     * 商品的价值
     * @type number
     */
    value: number,

    /**
     * 商品的数量
     *
     * 提示：无需考虑商品的数量时，可忽略此属性
     *
     * @type number
     */
    count?: number
}

/**
 * 求出一个背包里可以装入商品的最大价值（一维）
 * 提示：每样商品只有一件，即同样商品只可装入一次
 *
 * @param {Goods[]} goodsList 商品集合
 * @param {number} backpackSize 背包可装入商品的最大重量
 *
 * @returns {number} 背包里可以装入商品的最大价值
 */
export function getBackpackMaxValueOne(goodsList: Goods[], backpackSize: number): number {
    const dp = Array(backpackSize + 1).fill(0)

    const goodsCount = goodsList.length
    for (let i = 0; i < goodsCount; i++) {
        const { weight, value } = goodsList[i]

        for (let j = backpackSize; j >= weight; j--) {
            dp[j] = Math.max(dp[j], dp[j - weight] + value)
        }
    }

    return dp[backpackSize]
}

/**
 * 求出一个背包里可以装入商品的最大价值（二维）
 * 提示：每样商品只有一件，即同样商品只可装入一次
 *
 * @param {Goods[]} goodsList 商品集合
 * @param {number} backpackSize 背包可装入商品的最大重量
 *
 * @returns {number} 背包里可以装入商品的最大价值
 */
export function getBackpackMaxValueTwo(goodsList: Goods[], backpackSize: number): number {
    const goodsCount = goodsList.length

    if (goodsList.length === 0) return 0

    const dp = Array(goodsCount).fill(null).map(
        () => Array(backpackSize + 1).fill(0)
    )

    const [{ weight: firstWeight, value: firstValue }] = goodsList
    for (let j = firstWeight; j <= backpackSize; j++) {
        dp[0][j] = firstValue
    }

    for (let i = 1; i < goodsCount; i++) {
        const { weight, value } = goodsList[i]

        for (let j = 0; j <= backpackSize; j++) {
            const tmp = dp[i - 1][j]

            if (j < weight) {
                dp[i][j] = tmp
            } else {
                dp[i][j] = Math.max(tmp, dp[i - 1][j - weight] + value)
            }
        }
    }

    return dp[goodsCount - 1][backpackSize]
}

/**
 * 求出一个背包里可以装入商品的最大价值
 * 提示：每样商品有无数件，即同样商品可以装入多件
 *
 * @param {Goods[]} goodsList 商品集合
 * @param {number} backpackSize 背包可装入商品的最大重量
 *
 * @returns {number} 背包里可以装入商品的最大价值
 */
export function getBackpackMaxValueThree(goodsList: Goods[], backpackSize: number): number {
    const dp = Array(backpackSize + 1).fill(0)

    const goodsCount = goodsList.length
    for (let i = 0; i < goodsCount; i++) {
        const { weight, value } = goodsList[i]

        for (let j = weight; j <= backpackSize; j++) {
            dp[j] = Math.max(dp[j], dp[j - weight] + value)
        }
    }

    return dp[backpackSize]
}
