import isHappyNumber from '../core/is-happy-number'

describe('isHappyNumber 判断是否是快乐数', () => {
    it('传入 0', () => {
        expect(isHappyNumber(0)).toBeFalsy()
    })

    it('传入 1', () => {
        expect(isHappyNumber(1)).toBeTruthy()
    })

    it('传入 2', () => {
        expect(isHappyNumber(2)).toBeFalsy()
    })

    it('传入 7', () => {
        expect(isHappyNumber(7)).toBeTruthy()
    })

    it('传入 19', () => {
        expect(isHappyNumber(7)).toBeTruthy()
    })
})
