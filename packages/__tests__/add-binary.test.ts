import addBinary from '../core/add-binary'

describe('addBinary 求两个二进制字符串的二进制字符串形式的和', () => {
    it('有进位', () => {
        expect(addBinary('11', '1')).toBe('100')
        expect(addBinary('1', '101')).toBe('110')
    })

    it('无进位', () => {
        expect(addBinary('100', '11')).toBe('111')
        expect(addBinary('101', '1010')).toBe('1111')
    })

    it('长度一致', () => {
        expect(addBinary('100', '100')).toBe('1000')
        expect(addBinary('100', '010')).toBe('110')
    })

    it('长度不一致', () => {
        expect(addBinary('100', '10')).toBe('110')
        expect(addBinary('1', '1010')).toBe('1011')
    })
})

