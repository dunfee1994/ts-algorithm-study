import customPlus from './custom-plus'
import customMinus from './custom-minus'

export default class BigNumCalculator {
    static sum(numStra: string, numStrb: string): string {
        const firstLettera = numStra[0]
        const firstLetterb = numStrb[0]

        if (!isNaN(+firstLettera) && !isNaN(+firstLetterb)) {
            return customPlus(numStra, numStrb)
        }

        if (isNaN(+firstLettera) && isNaN(+firstLetterb)) {
            numStra = numStra.substring(1)
            numStrb = numStrb.substring(1)

            if (firstLettera === '+' && firstLetterb === '+') {
                return customPlus(numStra, numStrb)
            }

            if (firstLettera === '-' && firstLetterb === '-') {
                return '-' + customPlus(numStra, numStrb)
            }

            if (firstLettera === '+') {
                return customMinus(numStra, numStrb)
            }

            return customMinus(numStrb, numStra)
        }

        if (isNaN(+firstLettera)) {
            numStra = numStra.substring(1)

            if (firstLettera === '+') {
                return customPlus(numStra, numStrb)
            }

            return customMinus(numStrb, numStra)
        }

        numStrb = numStrb.substring(1)

        if (firstLetterb === '+') {
            return customPlus(numStra, numStrb)
        }

        return customMinus(numStra, numStrb)
    }

    static sub(numStra: string, numStrb: string): string {
        const firstLettera = numStra[0]
        const firstLetterb = numStrb[0]

        if (!isNaN(+firstLettera) && !isNaN(+firstLetterb)) {
            return customMinus(numStra, numStrb)
        }

        if (isNaN(+firstLettera) && isNaN(+firstLetterb)) {
            numStra = numStra.substring(1)
            numStrb = numStrb.substring(1)

            if (firstLettera === '+' && firstLetterb === '+') {
                return customMinus(numStra, numStrb)
            }

            if (firstLettera === '-' && firstLetterb === '-') {
                return customMinus(numStrb, numStra)
            }

            if (firstLettera === '+') {
                return customPlus(numStra, numStrb)
            }

            return '-' + customPlus(numStra, numStrb)
        }

        if (isNaN(+firstLettera)) {
            numStra = numStra.substring(1)

            if (firstLettera === '+') {
                return customMinus(numStra, numStrb)
            }

            return '-' + customPlus(numStra, numStrb)
        }

        numStrb = numStrb.substring(1)

        if (firstLetterb === '+') {
            return customMinus(numStra, numStrb)
        }

        return customPlus(numStra, numStrb)
    }
}
