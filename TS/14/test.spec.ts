import {PuzzleSolution} from './index'

describe('Puzzle 14', () => {
    let solution: PuzzleSolution
    beforeEach(() => {
        solution = new PuzzleSolution()
    })
    describe('part A', () => {
        beforeEach(() => {
            solution.skipB = true
            solution.setInput(`mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0`)
        })
        test('should calculate the sum', () => {
            expect(solution.run().a).toBe(165)
        })
    })
    describe('part B', () => {
        beforeEach(() => {
            solution.setInput(`mask = 000000000000000000000000000000X1001X
mem[42] = 100
mask = 00000000000000000000000000000000X0XX
mem[26] = 1`)
        })
        test('should calculate the sum', () => {
            expect(solution.run().b).toBe(208)
        })
    })
})