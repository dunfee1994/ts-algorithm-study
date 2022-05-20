import { mul } from '../../lib/calculator'

describe('add(a, b) => a + b', () => {
    it('a 与 b 均为整数', () => {
        expect(mul(2, 1)).toBe(2)
    })

    it('a 与 b 均为浮点数', () => {
        expect(mul(0.1, 0.2)).toBe(0.02)
    })

    it('a 与 b 中有一个为浮点数', () => {
        expect(mul(1, 0.1)).toBe(0.1)
        expect(mul(0.2, 2)).toBe(0.4)
    })

    it('a 与 b 中有 undefined', () => {
        expect(mul(undefined, 1)).toBe(0)
        expect(mul(2, undefined)).toBe(0)
        expect(mul(undefined, undefined)).toBe(0)
    })
})
