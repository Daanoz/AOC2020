import {PuzzleSolution} from './index'

describe('Puzzle 17', () => {
    let solution: PuzzleSolution
    beforeEach(() => {
        solution = new PuzzleSolution()
        solution.setInput('.#.\n..#\n###')
    })
    describe('run solution', () => {
        test('Part A & B', () => {
            const result = solution.run()
            expect(result.a).toBe(112)
            expect(result.b).toBe(848)
        })
    })
})