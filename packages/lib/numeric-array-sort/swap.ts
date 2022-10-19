export default function swap(list: number[], i: number, j: number) {
    [list[i], list[j]] = [list[j], list[i]]
}
