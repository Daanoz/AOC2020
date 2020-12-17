import { Puzzle, Runner, BasePuzzle, Result } from '../shared/'

export class PuzzleSolution extends BasePuzzle implements Puzzle {
    private static offsets = [-1, 0, 1]

    private grid: Map<string, boolean> = new Map()
    private ranges: [number, number][] = []
    private activeCount = 0

    public run(): Result {
        const result: Result = {}

        const rows = this.getInputAsRows()
        //const rows = ['.#.', '..#', '###']

        result.a = this.runCycles(rows, 3, 6)
        result.b = this.runCycles(rows, 4, 6)

        return result
    }

    private runCycles(rows: string[], depth: number, cycles: number) {
        const baseCoords = new Array(depth - 2).fill(0)
        this.ranges = new Array(depth).fill([]).map(() => [0, 0])
        for (let y = 0; y < rows.length; y++) {
            rows[y].split('').forEach((c, x) => this.set([...baseCoords, y, x], c === '#'))
        }

        const getNeighbourCount = (prevGrid: Map<string, boolean>, currentDepth: number, currentCoord: number[], offsets: number[]): number => {
            let count = 0
            PuzzleSolution.offsets.forEach(offset => {
                if (currentDepth + 1 >= depth) {
                    if (offsets.every(v => v === 0) && offset === 0) { 
                        return 
                    }
                    count += this.get(prevGrid, [...offsets, offset].map((off, i) => currentCoord[i] + off)) ? 1 : 0
                } else {
                    count += getNeighbourCount(prevGrid, currentDepth + 1, currentCoord, [...offsets, offset])
                }
            })    
            return count
        }
        
        const setCell = (prevGrid: Map<string, boolean>, currentCoord: number[]) => {
            const count = getNeighbourCount(prevGrid, 0, currentCoord, [])
            const currentState = this.get(prevGrid, currentCoord)

            if (currentState) {
                this.set(currentCoord, (count >= 2 && count <= 3))
            } else {
                this.set(currentCoord, (count === 3))
            }
        }

        const loopOverCoords = (prevGrid: Map<string, boolean>, currentDepth: number, ranges: [number, number][], currentCoord: number[]) => {
            for (let i = ranges[currentDepth][0] - 1; i <= ranges[currentDepth][1] + 1; i++) {
                if (currentDepth + 1 >= depth) {
                    setCell(prevGrid, [...currentCoord, i])
                } else {
                    loopOverCoords(prevGrid, currentDepth + 1, ranges, [...currentCoord, i])
                }
            }
        }

        for (let cycle = 0; cycle < cycles; cycle++) {
            const prevGrid = this.grid
            this.grid = new Map()
            this.activeCount = 0
            const ranges = this.ranges.map(r => [...r]) as [number, number][]
            loopOverCoords(prevGrid, 0, ranges, [])
        }
        return this.activeCount
    }

    private set(coords: number[], state: boolean) {
        if (!state) { return }
        coords.forEach((c, index) => {
            this.ranges[index][0] = Math.min(this.ranges[index][0], c)
            this.ranges[index][1] = Math.max(this.ranges[index][1], c)
        })
        this.grid.set(coords.join(','), state)
        this.activeCount++
    }

    private get(grid: Map<string, boolean>, coords: number[]) : boolean {
        return !!grid.get(coords.join(','))
    }

    private show() {
        for (let z = this.ranges[0][0]; z <= this.ranges[0][1]; z++) {
            console.log('\nz=' + z)
            for (let y = this.ranges[1][0]; y <= this.ranges[1][1]; y++) {
                let row = ''
                for (let x = this.ranges[2][0]; x <= this.ranges[2][1]; x++) {
                    row += this.get(this.grid, [z, y, x]) ? '#' : '.'
                }
                console.log(row)
            }   
        }
    }
}

Runner(PuzzleSolution)