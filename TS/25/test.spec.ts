import {PuzzleSolution} from './index'

describe('Puzzle 25', () => {
    let solution: PuzzleSolution
    beforeEach(() => {
        solution = new PuzzleSolution()
        solution.setInput(`5764801
17807724`)
    })
    describe('part A', () => {
        test('should calculate the key', () => {
            expect(solution.run().a).toBe(14897079)
        })
    })
})