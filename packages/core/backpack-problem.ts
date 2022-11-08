type BackpackProblemFn = (weights: number[], values: number[], backpackSize: number) => number

/**
 * 求出一个背包里可以装入商品的最大价值（一维）
 * 提示：每样商品只有一件，即同样商品只可装入一次
 *
 * @param {number[]} weights 各样商品的重量
 * @param {number[]} values 各样商品的价值
 * @param {number} backpackSize 背包可装入商品的最大重量
 *
 * @returns {number} 背包里可以装入商品的最大价值
 */
export const getBackpackMaxValueOne: BackpackProblemFn = (weights, values, backpackSize): number => {
    const dp = Array(backpackSize + 1).fill(0)

    const goodsCount = weights.length
    for (let i = 0; i < goodsCount; i++) {
        const curWeight = weights[i]

        for (let j = backpackSize; j >= curWeight; j--) {
            dp[j] = Math.max(dp[j], dp[j - weights[i]] + values[i])
        }
    }

    return dp[backpackSize]
}

/**
 * 求出一个背包里可以装入商品的最大价值（二维）
 * 提示：每样商品只有一件，即同样商品只可装入一次
 *
 * @param {number[]} weights 各样商品的重量
 * @param {number[]} values 各样商品的价值
 * @param {number} backpackSize 背包可装入商品的最大重量
 *
 * @returns {number} 背包里可以装入商品的最大价值
 */
export const getBackpackMaxValueTwo: BackpackProblemFn = (weights, values, backpackSize): number => {
    const goodsCount = weights.length

    const dp = Array(goodsCount).fill(null).map(
        () => Array(backpackSize + 1).fill(0)
    )

    for (let j = 1; j <= backpackSize; j++) {
        dp[0][j] = values[0]
    }

    for (let i = 1; i < goodsCount; i++) {
        for (let j = 0; j <= backpackSize; j++) {
            const tmp = dp[i - 1][j]

            if (j < weights[i]) {
                dp[i][j] = tmp
            } else {
                dp[i][j] = Math.max(tmp, dp[i - 1][j - weights[i]] + values[i])
            }
        }
    }

    return dp[goodsCount - 1][backpackSize]
}

/**
 * 求出一个背包里可以装入商品的最大价值
 * 提示：每样商品有无数件，即同样商品可以装入多件
 *
 * @param {number[]} weights 各样商品的重量
 * @param {number[]} values 各样商品的价值
 * @param {number} backpackSize 背包可装入商品的最大重量
 *
 * @returns {number} 背包里可以装入商品的最大价值
 */
export const getBackpackMaxValueThree: BackpackProblemFn = (weights, values, backpackSize): number => {
    const dp = Array(backpackSize + 1).fill(0)

    const goodsCount = weights.length
    for (let i = 0; i < goodsCount; i++) {
        for (let j = weights[i]; j <= backpackSize; j++) {
            dp[j] = Math.max(dp[j], dp[j - weights[i]] + values[i])
        }
    }

    return dp[backpackSize]
}
