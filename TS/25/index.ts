import { Puzzle, Runner, BasePuzzle, Result } from '../shared/'

export class PuzzleSolution extends BasePuzzle implements Puzzle {
    public run(): Result {
        const result: Result = {}

        const [cardPublicKey, doorPublicKey] = this.getInputAsRows().map(v => parseInt(v))
        const subjectNumber = 7
        const remainder = 20201227

        let cardKey = 1
        let doorKey = 1

        while(cardKey !== cardPublicKey) {
            cardKey = (cardKey * subjectNumber) % remainder
            doorKey = (doorKey * doorPublicKey) % remainder
        }
        result.a = doorKey
         
        return result
    }

}

Runner(PuzzleSolution)