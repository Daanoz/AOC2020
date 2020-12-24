import { Puzzle, Runner, BasePuzzle, Result, EndlessGrid } from '../shared/'

export class PuzzleSolution extends BasePuzzle implements Puzzle {
    public run(): Result {
        const result: Result = {}

        const rules = this.getInputAsRows()

        let grid = new EndlessGrid<string>()
        rules.forEach(rule => {
            let coord = [0, 0]
            while (rule.length > 0) {
                if (rule[0] === 'n' || rule[0] === 's') {
                    switch (rule.substr(0, 2)) {
                        case 'ne': coord = [coord[0] + 1, coord[1] + 1]; break
                        case 'nw': coord = [coord[0] - 1, coord[1] + 1]; break
                        case 'se': coord = [coord[0] + 1, coord[1] - 1]; break
                        case 'sw': coord = [coord[0] - 1, coord[1] - 1]; break
                    }
                    rule = rule.substr(2)
                } else {
                    switch (rule[0]) {
                        case 'e': coord = [coord[0] + 2, coord[1]]; break
                        case 'w': coord = [coord[0] - 2, coord[1]]; break
                    }
                    rule = rule.substr(1)
                }
            }
            const currentTile = grid.get(coord[0], coord[1], ' ')
            grid.set(coord[0], coord[1], currentTile === ' ' ? '#' : ' ')
        })

        result.a = grid.filter((cell) => cell === '#').length

        // console.log(grid.toString())
        for (let i = 0; i < 100; i++) {
            grid = this.flipDay(grid)
            // console.log(grid.toString())
        }

        result.b = grid.filter((cell) => cell === '#').length
        
        return result
    }

    private flipDay(grid: EndlessGrid<string>): EndlessGrid<string> {
        const nextGrid = new EndlessGrid<string>()
        const yRange = grid.getYRange()
        const xRange = grid.getXRange()
        const neighBours = [
            [1, 1], [-1, 1], 
            [1, -1], [-1, -1], 
            [2, 0], [-2, 0]
        ]
        for (let y = yRange[0] - 1; y <= yRange[1] + 1; y++) {
            let startX = xRange[0] - 2
            if (Math.abs(startX) % 2 !== Math.abs(y) % 2) {
                startX--
            }
            for (let x = startX; x <= xRange[1] + 2; x += 2) {
                const currentTile = grid.get(x, y, ' ')
                const blackTiles = neighBours.filter(offset => grid.get(x + offset[0], y + offset[1]) === '#').length
                if (currentTile === '#' && (blackTiles === 0 || blackTiles > 2)) {
                    nextGrid.set(x, y, ' ')
                } else if (currentTile === ' ' && blackTiles === 2) {
                    nextGrid.set(x, y, '#')
                } else if (currentTile === '#') {
                    nextGrid.set(x, y, '#')
                }
            }
        }
        return nextGrid
    }
}

Runner(PuzzleSolution)
