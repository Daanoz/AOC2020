import { Puzzle, Runner, BasePuzzle, Result } from '../shared/'

export class PuzzleSolution extends BasePuzzle implements Puzzle {
    public run(): Result {
        const result: Result = {}

        const regex = /(\d*)-(\d*) ([a-z]): ([a-z]*)/
        const passwords = this.getInputAsRows()
        let validA = 0
        let validB = 0
        passwords.forEach(password => {
            const matches = regex.exec(password)
            if (matches) {
                const firstParam = parseInt(matches[1])
                const secondParam = parseInt(matches[2])
                const char = matches[3]

                const count = matches[4].split('').filter(c => c === char).length
                if (count >= firstParam && count <= secondParam) {
                    validA++
                }
                const firstParamValid = matches[4].substr(firstParam - 1, 1) === char
                const secondParamValid = matches[4].substr(secondParam - 1, 1) === char
                if ((firstParamValid || secondParamValid) && !(firstParamValid && secondParamValid)) {
                    validB++
                }
            } else {
                console.error('match failed!: ' + password)
            }
        })

        result.a = validA
        result.b = validB

        return result
    }

}

Runner(PuzzleSolution)