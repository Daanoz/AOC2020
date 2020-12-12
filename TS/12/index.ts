import { Puzzle, Runner, BasePuzzle, Result } from '../shared/'
import { PuzzleServer } from '../shared/puzzle.server'

export class PuzzleSolution extends BasePuzzle implements Puzzle {
    // TODO: make this automatic?
    private renderScale = 0.015
    private renderOffset = { x: 50000, y: 6000 }

    constructor(renderServer?: PuzzleServer) {
        super(renderServer)
        this.render.beginPath()
        this.render.moveTo(this.renderOffset.x * this.renderScale, this.renderOffset.y * this.renderScale)
    }

    public run(): Result {
        const result: Result = {}

        const instructions = this.getInputAsRows()

        const aResult = this.navigate(instructions)
        result.a = Math.abs(aResult.x) + Math.abs(aResult.y)

        const bResult = this.navigateWithWP(instructions)
        result.b = Math.abs(bResult.x) + Math.abs(bResult.y)
         
        // render it
        this.render.stroke()
        this.render.flush()

        return result
    }

    private navigate(instructions: string[]): {x: number, y: number} {
        const dirs = ['N', 'E', 'S', 'W']
        const pos = {x: 0, y: 0, dir: 'E'}
        instructions.forEach(ins => {
            const type = ins.substr(0, 1)
            const distance = parseInt(ins.substr(1))

            if (['R', 'L'].indexOf(type) >= 0) {
                const steps = ((distance / 90) % 4)
                const curDirIndex = dirs.indexOf(pos.dir)
                if (type === 'R') {
                    pos.dir = dirs[(curDirIndex + steps) % 4]
                } else {
                    pos.dir = dirs[((curDirIndex + 4) - steps) % 4]
                }
            } else {
                let dirType = type
                if (dirType === 'F') {
                    dirType = pos.dir
                }
                switch (dirType) {
                    case 'N': pos.y += distance; break
                    case 'S': pos.y -= distance; break
                    case 'E': pos.x += distance; break
                    case 'W': pos.x -= distance; break
                }
            }
        })
        return pos
    }

    private navigateWithWP(instructions: string[]): {x: number, y: number} {
        const wp = {x: 10, y: 1}
        const pos = {x: 0, y: 0}
        instructions.forEach(ins => {
            const type = ins.substr(0, 1)
            const distance = parseInt(ins.substr(1))

            switch (type) {
                case 'R': case 'L' :
                    let steps = ((distance / 90) % 4)
                    if (type === 'L') {
                        steps = 4 - steps
                    }
                    for (let r = 0; r < steps; r++) {
                        const newX = wp.y
                        wp.y = wp.x * -1
                        wp.x = newX
                    }
                    break
                case 'F':
                    pos.x += wp.x * distance
                    pos.y += wp.y * distance
                    break
                case 'N': wp.y += distance; break
                case 'S': wp.y -= distance; break
                case 'E': wp.x += distance; break
                case 'W': wp.x -= distance; break
            }
            if (true) {
                this.render.lineTo(
                    (pos.x + this.renderOffset.x) * this.renderScale, 
                    (pos.y + this.renderOffset.y) * this.renderScale
                )
            }
        })
        return pos
    }

}

Runner(PuzzleSolution)