interface LinkedListNode {
    value: number
    next: LinkedListNode | null
}

export default class Queue {
    private _len: number = 0
    private _head: LinkedListNode | null = null
    private _tail: LinkedListNode | null = null

    // 入队
    join(value: number): LinkedListNode {
        const _curNode: LinkedListNode = {
            value,
            next: null
        }

        if (this._head === null) {
            this._head = _curNode
        }

        if (this._tail !== null) {
            this._tail.next = _curNode
        }
        this._tail = _curNode

        this._len++

        return this._head
    }

    // 出队
    out(): number | null {
        if (this.length === 0) return null

        if (this._head === null) return null

        const { value, next } = this._head

        this._head = next

        this._len--

        return value
    }

    // 队长
    get length(): number {
        return this._len
    }
}
