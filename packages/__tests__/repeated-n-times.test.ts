import repeatedNTimes from '../lib/repeated-n-times'

describe('在长度 2N 的数组中找出重复 N 次的元素', () => {
    it('数组长度为 0', () => {
        expect(repeatedNTimes([])).toBe(-1)
    })

    it('数组长度为 2', () => {
        expect(repeatedNTimes([6, 6])).toBe(6)

        expect(repeatedNTimes([1, 2])).toBe(-1)
    })

    it('数组长度为 4', () => {
        expect(repeatedNTimes([6, 6, 2, 3])).toBe(6)
        expect(repeatedNTimes([2, 6, 6, 3])).toBe(6)
        expect(repeatedNTimes([2, 3, 6, 6])).toBe(6)

        expect(repeatedNTimes([6, 2, 6, 3])).toBe(6)
        expect(repeatedNTimes([2, 6, 3, 6])).toBe(6)
        expect(repeatedNTimes([6, 2, 3, 6])).toBe(6)

        expect(repeatedNTimes([1, 2, 3, 4])).toBe(-1)
    })
})
