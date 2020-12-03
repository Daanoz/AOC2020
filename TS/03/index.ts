import { Puzzle, Runner, BasePuzzle, Result } from '../shared/'

export class PuzzleSolution extends BasePuzzle implements Puzzle {
    private grid: string[] = [];
    public run(): Result {
        const result: Result = {}

        this.grid = this.getInputAsRows()
        result.a = this.traverse(3, 1)

        result.b = 
            this.traverse(1, 1) *
            result.a *
            this.traverse(5, 1) *
            this.traverse(7, 1) *
            this.traverse(1, 2)

        return result
    }

    private traverse(x: number, y: number): number {
        const pos = [0, 0]
        let count = 0
        while (pos[1] < this.grid.length) {
            const gridRow = this.grid[pos[1]]
            if (gridRow[pos[0] % gridRow.length] === '#') {
                count++
            }
            pos[0] += x
            pos[1] += y
        }
        return count
    }

}

Runner(PuzzleSolution)