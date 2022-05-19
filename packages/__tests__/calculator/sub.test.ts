import { sub } from '../../lib/calculator'

describe('sub(a, b) => a - b', () => {
    it('a 与 b 均为 number', () => {
        // 均为整数
        expect(sub(2, 1)).toBe(1)

        // 均为浮点数
        expect(sub(0.3, 0.1)).toBe(0.2)

        // 有一个是浮点数
        expect(sub(1, 0.1)).toBe(0.9)
        expect(sub(0.2, 2)).toBe(-1.8)
    })

    it('a 与 b 中有 undefined', () => {
        expect(sub(undefined, 1)).toBe(-1)
        expect(sub(2, undefined)).toBe(2)
        expect(sub(undefined, undefined)).toBe(0)
    })
})
