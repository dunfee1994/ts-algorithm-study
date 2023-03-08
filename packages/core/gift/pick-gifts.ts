/**
 * 给你一个整数数组 gifts，表示各堆礼物的数量。
 *
 * 每一秒，你需要执行以下操作：
 * · 选择礼物数量最多的那一堆；
 * · 如果不止一堆都符合礼物数量最多，从中选择任一堆即可；
 * · 选中的那一堆留下平方根数量的礼物（向下取整），取走其他的礼物。
 *
 * @param {number[]} 整数数组 gifts
 *
 * @param {number} k 秒
 *
 * @returns {number} 返回在 k 秒后剩下的礼物数量
 */
export default function pickGifts(gifts: number[], k: number): number {
    gifts.sort((a, b) => a - b)

    for (; k > 0; k--) {
        const num = Math.sqrt(gifts.pop()) >> 0

        let i = gifts.length

        for (; i > 0 && gifts[i - 1] > num; i--) {
            gifts[i] = gifts[i - 1]
        }

        gifts[i] = num
    }

    return gifts.reduce((pre, cur) => pre + cur)
}
