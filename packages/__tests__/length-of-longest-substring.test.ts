import lengthOfLongestSubstring from '../core/length-of-longest-substring'

describe('找出字符串 str 其中不含有重复字符的最长子串的长度', () => {
    it('字符串 str 不包含重复字符', () => {
        const str = 'abcdefg'
        expect(lengthOfLongestSubstring(str)).toBe(str.length)
    })

    it('字符串 str 重复出现一个字符', () => {
        expect(lengthOfLongestSubstring('aaaaaaaa')).toBe(1)
    })

    it('字符串 str 包含重复字符，出现的位置随意', () => {
        expect(lengthOfLongestSubstring('abckabba')).toBe(4)

        expect(lengthOfLongestSubstring('aaabbbccc')).toBe(2)

        expect(lengthOfLongestSubstring('aaabbbccc')).toBe(2)

        expect(lengthOfLongestSubstring('1211234aabbc')).toBe(5)
    })
})
