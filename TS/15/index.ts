import { Puzzle, Runner, BasePuzzle, Result } from '../shared/'

export class PuzzleSolution extends BasePuzzle implements Puzzle {
    public run(): Result {
        const result: Result = {}

        const startDigits = this.getInputAsRows(',').map(n => parseInt(n, 10))

        result.a = this.runUntill(startDigits, 2020)
        result.b = this.runUntill(startDigits, 30000000)

        return result
    }

    private runUntill(startDigits: number[], turns: number) : number {
        let turn = startDigits.length + 1
        const lastSpoken: Map<number, number> = new Map()
        startDigits.slice(0, -1).forEach((digit, index) => lastSpoken.set(digit, index + 1))
        let last = startDigits[startDigits.length - 1]
        while (turn <= turns) {
            let nextSpoken
            if (!lastSpoken.has(last)) {
                nextSpoken = 0
            } else {
                const lastTurn = lastSpoken.get(last)!
                nextSpoken = (turn - 1) - (lastTurn)
            }
            lastSpoken.set(last, turn - 1)
            last = nextSpoken
            turn++ 
        }
        return last
    }

}

Runner(PuzzleSolution)