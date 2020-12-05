import { Puzzle, Runner, BasePuzzle, Result } from '../shared/'

export class PuzzleSolution extends BasePuzzle implements Puzzle {
    public run(): Result {
        const result: Result = {}

        const passes = this.getInputAsRows()
        result.a = 0
        let sidList: number[] = []
        passes.forEach(pass => {
            const row = this.toBinRow(pass.substr(0, 7))
            const col = this.toBinCol(pass.substr(7))
            const sid = row * 8 + col
            sidList.push(sid)
            if (result.a as number < sid) {
                result.a = sid
            }
        })
        sidList = sidList.sort()
        sidList.forEach((sid, index) => {
            if (index > 1 && !result.b) {
                if (sidList[index - 1] == sid - 2) {
                    result.b = sid - 1
                }
            }
        })

        return result
    }

    private toBinRow(val: string): number {
        return parseInt(
            val.replace(/F/g, '0').replace(/B/g, '1').split('').join(''),
            2
        )
    }
    private toBinCol(val: string): number {
        return parseInt(
            val.replace(/L/g, '0').replace(/R/g, '1').split('').join(''),
            2
        )
    }

}

Runner(PuzzleSolution)