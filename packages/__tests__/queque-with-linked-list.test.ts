import Queue from '../lib/queque-with-linked-list'

describe('使用链表实现队列', () => {
    it('入队', () => {
        const q = new Queue()

        expect(q.join(1)).toEqual({
            value: 1,
            next: null
        })

        expect(q.join(2)).toEqual({
            value: 1,
            next: {
                value: 2,
                next: null
            }
        })

        expect(q.join(3)).toEqual({
            value: 1,
            next: {
                value: 2,
                next: {
                    value: 3,
                    next: null
                }
            }
        })
    })

    it('出队', () => {
        const q = new Queue()

        q.join(1)
        q.join(2)
        q.join(3)

        expect(q.out()).toBe(1)
        expect(q.out()).toBe(2)
        expect(q.out()).toBe(3)
        expect(q.out()).toBe(null)
        expect(q.out()).toBe(null)
    })

    it('获取队列的长度', () => {
        const q = new Queue()

        q.join(1)
        expect(q.length).toBe(1)

        q.join(2)
        expect(q.length).toBe(2)

        q.out()
        expect(q.length).toBe(1)

        q.out()
        expect(q.length).toBe(0)

        q.out()
        expect(q.length).toBe(0)
    })
})
