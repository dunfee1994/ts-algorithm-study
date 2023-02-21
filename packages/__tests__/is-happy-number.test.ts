import isHappyNumber from '../core/is-happy-number'

describe('isHappyNumber 判断是否是快乐数', () => {
    it('正整数 num 等于 0', () => {
        expect(isHappyNumber(0)).toBeFalsy()
    })

    it('正整数 num 等于 1', () => {
        expect(isHappyNumber(1)).toBeTruthy()
    })

    it('正整数 num 等于 2', () => {
        expect(isHappyNumber(2)).toBeFalsy()
    })

    it('正整数 num 等于 3', () => {
        expect(isHappyNumber(3)).toBeFalsy()
    })

    it('正整数 num 等于 4', () => {
        expect(isHappyNumber(4)).toBeFalsy()
    })

    it('正整数 num 等于 5', () => {
        expect(isHappyNumber(5)).toBeFalsy()
    })

    it('正整数 num 等于 6', () => {
        expect(isHappyNumber(6)).toBeFalsy()
    })

    it('正整数 num 等于 7', () => {
        expect(isHappyNumber(7)).toBeTruthy()
    })

    it('正整数 num 等于 8', () => {
        expect(isHappyNumber(8)).toBeFalsy()
    })

    it('正整数 num 等于 9', () => {
        expect(isHappyNumber(9)).toBeFalsy()
    })

    it('正整数 num 等于 10', () => {
        expect(isHappyNumber(10)).toBeTruthy()
    })

    it('正整数 num 等于 19', () => {
        expect(isHappyNumber(19)).toBeTruthy()
    })

    it('正整数 num 等于 20', () => {
        expect(isHappyNumber(20)).toBeFalsy()
    })
})

