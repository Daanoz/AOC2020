import { Puzzle, Runner, BasePuzzle, Result } from '../shared/'

export class PuzzleSolution extends BasePuzzle implements Puzzle {
    private rowSize = 0
    public run(): Result {
        const result: Result = {}

        const originalSeating = this.getInput()
        this.rowSize = originalSeating.indexOf('\n')

        result.a = this.determine(originalSeating.replace(/\n/g, ''))
        result.b = this.determine(originalSeating.replace(/\n/g, ''), true)

        return result
    }

    private determine(seating: string, altMode = false) {
        let prevSeating = ''
        while (prevSeating !== seating) {
            prevSeating = seating
            seating = this.seatingTick(seating, altMode)
        }
        return seating.split('').filter(c => c === '#').length
    }

    private seatingTick(seating: string, altMode = false): string {
        let nextSeating = ''
        for (let i = 0; i < seating.length; i++) {
            const state = seating[i]
            if (state === '.') {
                nextSeating += state
            } else {
                const occupied = this.getNeighboursOf(seating, i, altMode).filter(v => v === '#').length
                if (state === 'L' && occupied === 0) {
                    nextSeating += '#'
                } else if (state === '#' && occupied >= (altMode ? 5 : 4)) {
                    nextSeating += 'L'
                } else {
                    nextSeating += state
                }
            }
        }
        return nextSeating
    }

    private getNeighboursOf(seating: string, index: number, altMode = false): string[] {
        const x = index % this.rowSize
        const y = (index - x) / this.rowSize
        const columnSize = seating.length / this.rowSize

        const findWithDelta = (pos: [number, number], xD: number, yD: number): string => {
            const newPos: [number, number] = [pos[0] + xD, pos[1] + yD]
            if (newPos[0] < 0 || newPos[0] > (this.rowSize - 1) || newPos[1] < 0 || newPos[1] > (columnSize - 1)) {
                return '.'
            }
            const seat = seating[newPos[1] * this.rowSize + newPos[0]]
            if (seat === '.' && altMode) {
                return findWithDelta(newPos, xD, yD)
            } else {
                return seat
            }
        }
        
        const deltas = [
            {xD: -1, yD: -1},
            {xD: 0,  yD: -1},
            {xD: 1,  yD: -1},
            {xD: -1, yD: 0},
            {xD: 1,  yD: 0},
            {xD: -1, yD: 1},
            {xD: 0,  yD: 1},
            {xD: 1,  yD: 1}
        ]
        return deltas.map(delta => findWithDelta([x, y], delta.xD, delta.yD))
    }

}

Runner(PuzzleSolution)