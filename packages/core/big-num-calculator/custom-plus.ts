export default function customPlus(numStra: string, numStrb: string): string {
    const maxLength = Math.max(numStra.length, numStrb.length)

    numStra = numStra.padStart(maxLength, '0')
    numStrb = numStrb.padStart(maxLength, '0')

    let c = 0
    let res = ''

    for (let i = maxLength - 1; i >= 0; i--) {
        let sum = +numStra[i] + +numStrb[i] + c

        c = sum > 9 ? 1 : 0
        sum = sum > 9 ? sum - 10 : sum

        res = sum + res
    }

    return c === 0 ? res : c + res
}
