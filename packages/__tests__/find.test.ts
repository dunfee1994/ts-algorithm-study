import find from '../lib/find'

interface Person {
    name: string // 名字
    [extraProperty: string]: any
}

describe('Find 查找方法', () => {
    it('从左至右找出第一个大于 3 的值', () => {
        const list = [1, 2, 3, 4, 5]
        const fn = (item: any): boolean => item > 3

        expect(find(list, fn)).toBe(4)
    })

    it('在人群中找人', () => {
        const Black: Person = {
            name: 'Black'
        }
        const Wanna: Person = {
            name: 'Wanna',
            age: 20
        }
        const Jack: Person = {
            name: 'Jack',
            like: 'Watch Movie'
        }
        const Nick: Person = {
            name: 'Nick',
            sex: 'Man'
        }

        const crowd: Person[] = [Black, Wanna, Jack, Nick]

        // 找的人在人群中
        let fn = (item: Person): boolean => item.name === 'Jack'
        expect(find(crowd, fn)).toEqual(Jack)

        // 找的人不在人群中
        fn = (item: Person): boolean => item.name === 'Dunfee'
        expect(find(crowd, fn)).toBeUndefined()
    })
})
