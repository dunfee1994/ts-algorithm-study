import { div } from '../../lib/calculator'

describe('div(a, b) => a / b', () => {
    it('a 与 b 均为非 0 整数', () => {
        expect(div(2, 1)).toBe(2)
    })

    it('a 与 b 均为 0', () => {
        expect(div(0, 0)).toBeNaN()
    })

    it('a 与 b 中有一个为 0', () => {
        expect(div(0, 1)).toBe(0)
        expect(div(1, 0)).toBe(Infinity)
    })

    it('a 与 b 均为浮点数', () => {
        expect(div(0.3, 0.1)).toBe(3)
    })

    it('a 与 b 中有一个为浮点数', () => {
        expect(div(1, 0.1)).toBe(10)
        expect(div(0.2, 2)).toBe(0.1)
    })

    it('a 与 b 中有 undefined', () => {
        expect(div(undefined, 1)).toBe(0)
        expect(div(2, undefined)).toBe(2)
        expect(div(undefined, undefined)).toBe(0)
    })

    it('a 与 b 中有 null', () => {
        expect(div(null, 1)).toBe(0)
        expect(div(2, null)).toBe(Infinity)
        expect(div(null, null)).toBeNaN()
    })
})
