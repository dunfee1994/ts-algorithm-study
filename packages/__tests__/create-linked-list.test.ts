import createLinkedList, { LinkedListNode } from '../lib/create-linked-list'

describe('创建链表', () => {
    it('非空数组', () => {
        const nums: number[] = [1, 2, 3, 4]
        const expected: LinkedListNode = {
            value: 1,
            next: {
                value: 2,
                next: {
                    value: 3,
                    next: {
                        value: 4,
                        next: null
                    }
                }
            }
        }
        expect(createLinkedList(nums)).toEqual(expected)
    })

    it('空数组', () => {
        expect(createLinkedList([])).toBeNull()
    })

    it('无传入', () => {
        expect(createLinkedList()).toBeNull()
    })
})
