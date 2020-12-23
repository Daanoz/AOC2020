import { Puzzle, Runner, BasePuzzle, Result } from '../shared/'

const flip = (value: number) => {
    return parseInt((value >>> 0).toString(2).padStart(10, '0').split('').reverse().join(''), 2)
}

const imageToNumber = (value: string): number => {
    return parseInt(value.replace(/\./g, '0').replace(/#/g, '1') , 2)
}

const hflipImage = (image: string[]) => {
    return image.map(row => row.split('').reverse().join(''))
}
const vflipImage = (image: string[]) => {
    return image.reverse()
}
const rotateCWImage = (image: string[]) => {
    return image.map((row, y) => row.split('').map((_, x) => {
        return image[(image.length - 1) - x][y]
    }).join(''))
}

enum Direction {
    TOP = 0,
    RIGHT = 1,
    BOTTOM = 2,
    LEFT = 3
}

class Tile {
    private tileId: number
    private image: string[]
    private borders: [number, number, number, number] // top right bottom left
    private simplifiedBorders: [number, number, number, number] // top right bottom left
    private neighbours: [Tile?, Tile?, Tile?, Tile?] = [undefined, undefined, undefined, undefined] // top right bottom left
    private lockedOrientation = false

    private activeRotation = 0
    private activeHFlip = 0
    private activeVFlip = 0

    constructor(tile: string) {
        const [header, image] = tile.split(':\n')
        this.tileId = parseInt(header.split(' ')[1])
        const rows = image.split('\n')
        this.image = rows
        this.borders = [
            imageToNumber(rows[0]),
            imageToNumber(rows.map(r => r[r.length - 1]).join('')),
            imageToNumber(rows[rows.length - 1]),
            imageToNumber(rows.map(r => r[0]).join('')),
        ]
        this.simplifiedBorders = this.borders.map(b => Math.min(b, flip(b))) as [number, number, number, number]
    }

    public getTileId() { return this.tileId }
    public toString() { return `${this.tileId} ` }
    public getNeighbours() { return this.neighbours }
    public getBorders() { return this.borders }
    public getSimplifiedBorders() { return this.simplifiedBorders }
    public hasBorder(borderIndex: number, borderValue: number): boolean {
        if (this.neighbours[borderIndex]) {
            return false // can this actually happen?
        }
        return this.borders[borderIndex] === borderValue
    }
    public setNeighbour(borderIndex: number, tile: Tile) {
        if (this.neighbours[borderIndex]) {
            throw new Error('Neighbour already in location')
        }
        this.lock()
        this.neighbours[borderIndex] = tile
    }
    public lock() { this.lockedOrientation = true }
    public isLocked() { return this.lockedOrientation }
    public applyRotation() {
        if (this.activeHFlip) {
            this.image = hflipImage(this.image)
        }
        if (this.activeVFlip) {
            this.image = vflipImage(this.image)
        }
        for (let rot = 0; rot < this.activeRotation; rot++) {
            this.image = rotateCWImage(this.image)
        }
        this.image.shift()
        this.image.pop()
        this.image = this.image.map(row => row.substr(1, row.length - 2))
    }
    public getImageRow(i: number) {
        return this.image[i]
    }
    public rotateCW() { 
        this.borders = [
            flip(this.borders[3]),
            this.borders[0],
            flip(this.borders[1]),
            this.borders[2],
        ]
        this.activeRotation = (this.activeRotation + 1) % 4
    }
    public flipHorizontal() { 
        const borders = [...this.borders]
        const leftBorder = borders[1]
        borders[0] = flip(borders[0])
        borders[1] = borders[3]
        borders[2] = flip(borders[2])
        borders[3] = leftBorder
        this.activeHFlip = (this.activeHFlip + 1) % 2
        this.borders = borders as [number, number, number, number]
    }
    public flipVertical() { 
        const borders = [...this.borders]
        const topBorder = borders[0]
        borders[0] = borders[2]
        borders[1] = flip(borders[1])
        borders[2] = topBorder
        borders[3] = flip(borders[3])
        this.activeVFlip = (this.activeVFlip + 1) % 2
        this.borders = borders as [number, number, number, number]
    }

    public locateOrientation(borderIndex: number, value: number): boolean {
        if (this.isLocked()) {
            if (this.hasBorder(borderIndex, value)) { return true }
            return false
        }
        for (let rot = 0; rot < 4; rot++) {
            if (this.hasBorder(borderIndex, value)) { 
                return true 
            }
            this.rotateCW()
        }
        this.flipHorizontal()
        for (let rot = 0; rot < 4; rot++) {
            if (this.hasBorder(borderIndex, value)) { return true }
            this.rotateCW()
        }
        this.flipHorizontal()
        this.flipVertical()                
        for (let rot = 0; rot < 4; rot++) {
            if (this.hasBorder(borderIndex, value)) { return true }
            this.rotateCW()
        }
        this.flipVertical()
        return false
    }

    public locateNeighbourInDirection(tiles: Tile[], direction: number): Tile | undefined {
        if (this.neighbours[direction]) {
            return this.neighbours[direction]
        }
        const connectingBorderIndex = (direction + 2) % 4
        const borderValue = this.borders[direction]

        const neighbourTile = tiles.find(tile => tile.locateOrientation(connectingBorderIndex, borderValue))
        if (neighbourTile) {
            this.neighbours[direction] = neighbourTile
            neighbourTile.setNeighbour(connectingBorderIndex, this)
            return neighbourTile
        }
        return undefined
    }
}

export class PuzzleSolution extends BasePuzzle implements Puzzle {
    public run(): Result {
        const result: Result = {}

        const inputTiles = this.getInputAsRows('\n\n')
        const tiles = inputTiles.map(t => new Tile(t))

        const corners = tiles.reduce((list, tile) => {
            const matchingCorners = tile
                .getSimplifiedBorders()
                .filter(border => 
                    tiles
                        .filter(t => t !== tile)
                        .find(t => t.getSimplifiedBorders().indexOf(border) >= 0)
            )
            if (matchingCorners.length === 2) {
                list.push(tile)
            }
            return list
        }, [] as Tile[])
        result.a = corners.reduce((val, tile) => val * tile.getTileId(), 1)

        const linkTiles = (tileA: Tile, tileB: Tile, dir: number) => {
            tileA.setNeighbour(dir, tileB)
            tileB.setNeighbour((dir + 2) % 4, tileA)
        }

        // start by setting the topleft tile orientation
        const startTile = corners[0]
        for (let rot = 0; rot < 4; rot++) {
            const rightValue = startTile.getBorders()[Direction.RIGHT]
            const bottomValue = startTile.getBorders()[Direction.BOTTOM]
            const rightTile = tiles.find(t => t !== startTile && t.locateOrientation(Direction.LEFT, rightValue))
            const bottomTile = tiles.find(t => t !== startTile && t.locateOrientation(Direction.TOP, bottomValue))
            if (rightTile && bottomTile) {
                rot = 4
                linkTiles(startTile, bottomTile, Direction.BOTTOM)
                linkTiles(startTile, rightTile, Direction.RIGHT)
            } else {
                startTile.rotateCW()
            }
        }
        const grid: Tile[][] = [[
            startTile
        ]]
        let rowTile: Tile | undefined = startTile
        let rowIndex = 0
        while(rowTile !== undefined) {
            let current: Tile | undefined  = rowTile
            while(current !== undefined) {
                current = current.locateNeighbourInDirection(tiles, 1)
                if (current) {
                    if (rowIndex > 0) {
                        linkTiles(current, grid[rowIndex - 1][grid[rowIndex].length], Direction.TOP)
                    }
                    grid[rowIndex].push(current)
                }
            }
            rowTile = rowTile.locateNeighbourInDirection(tiles, 2)
            if (rowTile) {
                rowIndex++
                grid.push([rowTile])
            }
        }

        let finalImage = ''
        grid.forEach(row => {
            row.forEach(cell => cell.applyRotation())
            for (let i = 0; i < 8; i++) {
                row.forEach(cell => 
                    finalImage += cell.getImageRow(i)
                )
                finalImage += '\n'
            }
        })

        result.b = this.findDragons(finalImage)

        return result
    }

    private findDragons(image: string): number {
        for (let rot = 0; rot < 4; rot++) {
            const rough = this.replaceSeaDragons(image)
            if (rough > 0) {
                return rough
            }
            image = rotateCWImage(image.split('\n')).join('\n')
        }
        image = hflipImage(image.split('\n')).join('\n')
        for (let rot = 0; rot < 4; rot++) {
            const rough = this.replaceSeaDragons(image)
            if (rough > 0) {
                return rough
            }
            image = rotateCWImage(image.split('\n')).join('\n')
        }
        image = hflipImage(image.split('\n')).join('\n')
        image = vflipImage(image.split('\n')).join('\n')
        for (let rot = 0; rot < 4; rot++) {
            const rough = this.replaceSeaDragons(image)
            if (rough > 0) {
                return rough
            }
            image = rotateCWImage(image.split('\n')).join('\n')
        }
        image = vflipImage(image.split('\n')).join('\n')
        return 0
    }

    private replaceSeaDragons(image: string): number {
        /** |                  # |
         *  |#    ##    ##    ###|
         *  | #  #  #  #  #  #   | 
         */
        const regexTop    = /(..................)#(.)/
        const regexMiddle = /#(....)##(....)##(....)###/
        const regexBottom = /(.)#(..)#(..)#(..)#(..)#(..)#(...)/

        const imageRows = image.split('\n')
        let seaDragons = 0
        imageRows.forEach((row, rowIndex) => {
            if (rowIndex > 0 && rowIndex < (imageRows.length - 1)) {
                for (let startIndex = 0; startIndex < (row.length - 20); startIndex++) {
                    if (imageRows[rowIndex    ].substr(startIndex, 20).match(regexMiddle) &&
                        imageRows[rowIndex - 1].substr(startIndex, 20).match(regexTop) &&
                        imageRows[rowIndex + 1].substr(startIndex, 20).match(regexBottom)) {
                        seaDragons++
                        imageRows[rowIndex - 1] = 
                            imageRows[rowIndex - 1].substr(0, startIndex) +
                            imageRows[rowIndex - 1].substr(startIndex, 20).replace(regexTop, '$1O$2') +
                            imageRows[rowIndex - 1].substr(startIndex + 20)
                        imageRows[rowIndex - 0] = 
                            imageRows[rowIndex - 0].substr(0, startIndex) +
                            imageRows[rowIndex - 0].substr(startIndex, 20).replace(regexMiddle, 'O$1OO$2OO$3OOO') +
                            imageRows[rowIndex - 0].substr(startIndex + 20)
                        imageRows[rowIndex + 1] = 
                            imageRows[rowIndex + 1].substr(0, startIndex) +
                            imageRows[rowIndex + 1].substr(startIndex, 20).replace(regexBottom, '$1O$2O$3O$4O$5O$6O$7') +
                            imageRows[rowIndex + 1].substr(startIndex + 20)
                    }
                }
            }
        })
        if (seaDragons > 0) {
            // console.log(imageRows.join('\n'))
            // console.log('Found ' +seaDragons+ ' sea dragons')
            return imageRows.join('\n').split('#').length - 1
        }
        return 0
    }
}

Runner(PuzzleSolution)