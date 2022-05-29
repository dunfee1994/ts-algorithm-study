import findContinuousCharByRegexp from '../../lib/find-continuous-char/regexp'

describe('通过 正则表达式 方式找出连续字符及其出现次数', () => {
    it('有多个连续出现次数的字符', () => {
        const str = 'aaaaabbbbcccceeee1111'
        const expcted = {
            char: 'a',
            count: 5
        }

        expect(findContinuousCharByRegexp(str)).toEqual(expcted)
    })

    it('有 1 个连续出现次数的字符', () => {
        const str = 'aaaaaaaaaaaa'
        const expcted = {
            char: 'a',
            count: str.length
        }

        expect(findContinuousCharByRegexp(str)).toEqual(expcted)
    })

    it('空字符串', () => {
        const expcted = {
            char: '',
            count: 0
        }

        expect(findContinuousCharByRegexp('')).toEqual(expcted)
    })
})
