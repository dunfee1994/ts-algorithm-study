import longestWPI from '../core/longest-wpi'

describe('longestWPI 表现良好时间段的最长持续天数', () => {
    it('七天工作小时均低于 8', () => {
        const hours = [0, 1, 2, 3, 4, 5, 6]
        expect(longestWPI(hours)).toBe(0)
    })

    it('七天工作小时均等于 8', () => {
        const hours = [8, 8, 8, 8, 8, 8, 8]
        expect(longestWPI(hours)).toBe(0)
    })

    it('七天有一天工作小时大于 8', () => {
        const hours = [8, 8, 9, 8, 8, 0, 0]
        expect(longestWPI(hours)).toBe(1)
    })

    it('七天有两天工作小时大于 8', () => {
        const hours = [8, 8, 9, 8, 9, 0, 0]
        expect(longestWPI(hours)).toBe(3)
    })

    it('七天有四天工作小时大于 8', () => {
        const hours = [9, 8, 9, 9, 9, 0, 0]
        expect(longestWPI(hours)).toBe(7)
    })

    it('七天工作小时均大于 8', () => {
        const hours = [9, 9, 9, 9, 9, 9, 9]
        expect(longestWPI(hours)).toBe(7)
    })
})
