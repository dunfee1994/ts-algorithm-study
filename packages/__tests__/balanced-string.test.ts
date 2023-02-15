import balancedString from '../core/balanced-string'

describe('BalancedString 平衡字符串', () => {
    it('输入 QWER', () => {
        expect(balancedString('QWER')).toBe(0)
    })

    it('输入 QQER', () => {
        expect(balancedString('QQER')).toBe(1)
    })

    it('输入 QQQR', () => {
        expect(balancedString('QQQR')).toBe(2)
    })

    it('输入 QRQQ', () => {
        expect(balancedString('QQQR')).toBe(2)
    })

    it('输入 QQQQ', () => {
        expect(balancedString('QQQQ')).toBe(3)
    })

    it('输入 QQQQQWER', () => {
        expect(balancedString('QQQQQWER')).toBe(3)
    })

    it('输入 QQQQQWEQ', () => {
        expect(balancedString('QQQQQWEQ')).toBe(4)
    })
})
