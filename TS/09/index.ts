import { Puzzle, Runner, BasePuzzle, Result } from '../shared/'

export class PuzzleSolution extends BasePuzzle implements Puzzle {

    public preambleLength = 25
    public run(): Result {
        const result: Result = {}

        const data = this.getInputAsRows().map(v => parseInt(v, 10))

        for (let i = this.preambleLength; i < data.length; i++) {
            if (!this.isValid(data, i)) {
                result.a = data[i]
                i = data.length
            }
        }
        result.b = this.findContiguousSum(data, result.a as number)
        return result
    }

    private isValid(data: number[], index: number): boolean {
        const slice = data.slice(index - this.preambleLength, index)

        for(let i = 0; i < slice.length; i++) {
            for(let j = 0; j < slice.length; j++) {
                if (i !== j && slice[i] !== slice[j]) {
                    if (slice[i] + slice[j] === data[index]) {
                        return true
                    }
                }
            }   
        }
        return false
    }

    private findContiguousSum(data: number[], value: number): number {
        for (let i = 0; i < data.length; i++) {
            for (let l = i; l < data.length; l++) {
                if (data[l] < value) {
                    const set = data.slice(i, l)
                    const sum = set.reduce((sum, v) => sum + v, 0)
                    if (sum === value) {
                        return Math.min(...set) + Math.max(...set)
                    } else if (sum > value) {
                        l = data.length
                    }
                } else {
                    l = data.length
                }
            }
        }
        return -1
    }
}

Runner(PuzzleSolution)