import {PuzzleSolution} from './index'

describe('Puzzle 05', () => {
    let solution: PuzzleSolution
    beforeEach(() => {
        solution = new PuzzleSolution()
    })
    describe('part A', () => {
        test('should calculate the sid correctly', () => {
            solution.setInput('FBFBBFFRLR')
            const result = solution.run()
            expect(result.a).toBe(357)
        })
    })
    describe('part B', () => {
        beforeEach(() => {
            solution.setInput(`FBFBBFFLLL
FBFBBFFRRR
FBFBBFFRLR
FBFBBFFRRL
FBFBBFFRLL
FBFBBFFLRR
FBFBBFFLLR    
`)
        })

        test('should find the missing sid correctly', () => {
            const result = solution.run()
            expect(result.b).toBe(354)
        })
    })
})