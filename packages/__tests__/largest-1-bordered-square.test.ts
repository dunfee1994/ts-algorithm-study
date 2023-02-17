import largest1BorderedSquare from '../core/largest-1-bordered-square'

describe('largest1BorderedSquare 边界全部由 1 组成的最大正方形子网格中的元素数量', () => {
    it('[[0]]', () => {
        expect(largest1BorderedSquare([[0]])).toBe(0)
    })

    it('[[1]]', () => {
        expect(largest1BorderedSquare([[1]])).toBe(1)
    })

    it('[[1, 1]]', () => {
        expect(largest1BorderedSquare([[1, 1]])).toBe(1)
    })

    it('[[1], [1]]', () => {
        expect(largest1BorderedSquare([[1], [1]])).toBe(1)
    })

    it('[[1, 0, 1]]', () => {
        expect(largest1BorderedSquare([[1, 0, 1]])).toBe(1)
    })

    it('[[1], [0], [1]]', () => {
        const grid = [[1], [0], [1]]
        expect(largest1BorderedSquare(grid)).toBe(1)
    })

    it('[[1, 1], [1, 1]]', () => {
        const grid = [[1, 1], [1, 1]]
        expect(largest1BorderedSquare(grid)).toBe(4)
    })

    it('[[1, 1, 1], [1, 0, 1], [1, 1, 1]]', () => {
        const grid = [[1, 1, 1], [1, 0, 1], [1, 1, 1]]
        expect(largest1BorderedSquare(grid)).toBe(9)
    })
})
