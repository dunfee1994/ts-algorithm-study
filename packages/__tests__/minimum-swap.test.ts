import minimumSwap from '../core/minimum-swap'

describe('minimumSwap 交换字符使字符串相同', () => {
    it('传入相同字符串', () => {
        expect(minimumSwap('xxxx', 'xxxx')).toBe(0)

        expect(minimumSwap('yyyy', 'yyyy')).toBe(0)

        expect(minimumSwap('xyxy', 'xyxy')).toBe(0)

        expect(minimumSwap('yxyx', 'yxyx')).toBe(0)
    })

    it('由 s1[i] 和 s2[i] 组成的字符串 s3 是由成对的 xy 或 yx 组成', () => {
        expect(minimumSwap('xxxx', 'yyyy')).toBe(2)

        expect(minimumSwap('yyyy', 'xxxx')).toBe(2)
    })

    it('由 s1[i] 和 s2[i] 组成的字符串 s3 是由成对的 xy 或 yx 组成', () => {
        expect(minimumSwap('xxx', 'yyy')).toBe(-1)

        expect(minimumSwap('yyy', 'xxx')).toBe(-1)
    })

    it('由 s1[i] 和 s2[i] 组成的 xy 与 yx 的个数是偶数个', () => {
        expect(minimumSwap('xxxyyy', 'yyyxxx')).toBe(4)

        expect(minimumSwap('yyyxxx', 'xxxyyy')).toBe(4)
    })

    it('由 s1[i] 和 s2[i] 组成的 xy 与 yx 的个数是奇数个', () => {
        expect(minimumSwap('xxxyy', 'yyyxx')).toBe(-1)

        expect(minimumSwap('yyyxx', 'xxxyy')).toBe(-1)
    })
})
