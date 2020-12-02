import { Puzzle, Runner, BasePuzzle, Result } from '../shared/'

export class PuzzleSolution extends BasePuzzle implements Puzzle {
    public run(): Result {
        const result: Result = {}

        const records: number[] = this.getInputAsRows().map(v => parseFloat(v))

        const totalNumber = 2020

        records.forEach(valueA => {
            if (result.a && result.b) { return }
            if (valueA > totalNumber) { return }

            records.forEach(valueB => {
                if (result.a && result.b) { return }
                if (valueA + valueB > totalNumber) { return }

                if (valueA + valueB === totalNumber) {
                    result.a = valueA * valueB
                }

                records.forEach(valueC => {
                    if (valueA + valueB + valueC === totalNumber) {
                        result.b = valueA * valueB * valueC
                    } 
                })
            })
        })

        return result
    }

}

Runner(PuzzleSolution)