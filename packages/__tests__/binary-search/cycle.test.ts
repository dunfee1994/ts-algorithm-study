import binarySearchCycle from '../../core/binary-search/cycle'

describe('二分法查找（循环）', () => {
    it('正常情况', () => {
        expect(binarySearchCycle([], 3)).toBe(-1)

        expect(binarySearchCycle([1], 5)).toBe(-1)

        expect(binarySearchCycle([1, 2, 3, 4], 3)).toBe(2)
    })

    it('非正常情况', () => {
        expect(binarySearchCycle()).toBe(-1)

        expect(binarySearchCycle(undefined, 3)).toBe(-1)
        
        expect(binarySearchCycle([1, 2, 3, 4])).toBe(-1)
    })
})
