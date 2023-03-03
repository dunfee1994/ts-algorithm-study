// 添加后缀
function addSuffix(oldName: string, newKey: number): string {
    return `${oldName}(${newKey})`
}

/**
 * 给你一个长度为 n 的字符串数组 names。
 * 在第 i 分钟，新建名为 names[i] 的文件夹。
 *
 * 由于两个文件不能共享相同的文件名，
 * 因此如果新建文件夹使用的文件名已经被占用，
 * 系统会以 (k) 的形式为新文件夹的文件名添加后缀。
 * 其中 k 是能保证文件名唯一的最小正整数。
 *
 * @param {string[]} names 字符串数组（新建时输入的文件夹名）
 *
 * @returns {string[]} 处理后字符串数组（实际分配的文件夹名）
 */
export function getFolderNames(names: string[]): string[] {
    const map = new Map<string, number>()
    return names.map(name => {
        if (!map.has(name)) {
            map.set(name, 1)

            return name
        }

        let newName = ''
        let newKey = map.get(name)
        while (map.has(newName = addSuffix(name, newKey))) {
            newKey++
        }

        map.set(name, newKey)
        map.set(newName, 1)

        return newName
    })
}
