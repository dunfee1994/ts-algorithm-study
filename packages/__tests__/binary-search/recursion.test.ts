import binarySearchRecursion from '../../core/binary-search/recursion'

describe('二分法查找（递归）', () => {
    it('正常情况', () => {
        expect(binarySearchRecursion([], 3)).toBe(-1)

        expect(binarySearchRecursion([1], 5)).toBe(-1)

        expect(binarySearchRecursion([1, 2, 3, 4], 3)).toBe(2)
    })

    it('非正常情况', () => {
        expect(binarySearchRecursion()).toBe(-1)

        expect(binarySearchRecursion(undefined, 3)).toBe(-1)
        
        expect(binarySearchRecursion([1, 2, 3, 4])).toBe(-1)
    })
})
