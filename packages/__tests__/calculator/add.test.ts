import { add } from '../../lib/calculator'

describe('add(a, b) => a + b', () => {
    it('a 与 b 均为整数', () => {
        expect(add(1, 2)).toBe(3)
    })

    it('a 与 b 均为浮点数', () => {
        expect(add(0.1, 0.2)).toBe(0.3)
    })

    it('a 与 b 中有一个为浮点数', () => {
        expect(add(1, 0.1)).toBe(1.1)
        expect(add(0.2, 2)).toBe(2.2)
    })

    it('a 与 b 中有 undefined', () => {
        expect(add(undefined, 1)).toBe(1)
        expect(add(2, undefined)).toBe(2)
        expect(add(undefined, undefined)).toBe(0)
    })
})
