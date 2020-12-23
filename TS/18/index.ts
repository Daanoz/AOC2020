import { Puzzle, Runner, BasePuzzle, Result } from '../shared/'

const parenthesesRegex = /\(([^\(\)]*)\)/g
const additionRegex = /(\d*) \+ (\d*)/
const factorRegex = /(\d*) \* (\d*)/

export class PuzzleSolution extends BasePuzzle implements Puzzle {
    public run(): Result {
        const result: Result = {}

        const mathLines = this.getInputAsRows()
        result.a = mathLines.reduce((sum, mathLine) => sum + this.calculateMath(mathLine), 0)
        result.b = mathLines.reduce((sum, mathLine) => sum + this.calculateMath(mathLine, true), 0)

        return result
    }

    private calculateMath(input: string, advancedMode = false): number {
        while(input.match(parenthesesRegex)) {
            input = input.replace(parenthesesRegex, (match, $1) => `${this.calculate($1, advancedMode)}`)
        }
        return this.calculate(input, advancedMode)
    }

    private calculate(input: string, advancedMode: boolean): number {
        if (!advancedMode) {
            const parts = input.split(' ')
            let value = parseInt(parts[0])
            for (let i = 2; i < parts.length; i+=2) {
                if (parts[i - 1] === '*') {
                    value *= parseInt(parts[i])
                } else if (parts[i - 1] === '+') {
                    value += parseInt(parts[i])
                } else {
                    throw new Error('Unknown operator')
                }
            }
            return value
        } else {
            while(input.match(additionRegex)) {
                input = input.replace(additionRegex, (match, $1, $2) => `${parseInt($1) + parseInt($2)}`)
            }
            while(input.match(factorRegex)) {
                input = input.replace(factorRegex, (match, $1, $2) => `${parseInt($1) * parseInt($2)}`)
            }
            return parseInt(input)
        }
    }

}

Runner(PuzzleSolution)