function getMaxNumStr(numStra: string, numStrb: string): string {
    const lena = numStra.length
    const lenb = numStrb.length

    if (lena !== lenb) {
        return lena > lenb ? numStra : numStrb
    }

    let i = 0
    while (i < lena && numStra[i] > numStrb[i]) i++
    return i === lena ? numStra : numStrb
}

function removeExtraZero(numStr: string): string {
    let i = 0
    while(i < numStr.length && numStr[i] === '0') i++
    return i === 0 ? numStr : numStr.substring(i)
}

export default function customMinus(numStra: string, numStrb: string): string {
    numStra = removeExtraZero(numStra)
    numStrb = removeExtraZero(numStrb)

    if (numStra === numStrb) return '0'

    const maxNumStr = getMaxNumStr(numStra, numStrb)
    const maxLength = Math.max(numStra.length, numStrb.length)

    let minNumStr = maxNumStr !== numStra ? numStra : numStrb
    minNumStr = minNumStr.padStart(maxLength, '0')

    let c = 0
    let res = ''

    for (let i = maxLength - 1; i >= 0; i--) {
        let sub = +maxNumStr[i] - +minNumStr[i] - c

        c = sub < 0 ? 1 : 0
        sub = sub > 0 ? sub + 10 : sub

        res = sub + res
    }

    res = removeExtraZero(res)
    return maxNumStr === numStra ? res : '-' + res
}
