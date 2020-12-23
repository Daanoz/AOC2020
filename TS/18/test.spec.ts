import {PuzzleSolution} from './index'

describe('Puzzle 18', () => {
    let solution: PuzzleSolution
    beforeEach(() => {
        solution = new PuzzleSolution()
    })
    describe('part A', () => {
        test('should calculate \'simple\' math', () => {
            solution.setInput(`2 * 3 + (4 * 5)
5 + (8 * 3 + 9 + 3 * 4 * 3)
5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))
((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2`)
            expect(solution.run().a).toBe(26 + 437 + 12240 + 13632)
        })
    })
    describe('part B', () => {
        test('shoud calculate more tricky math', () => {
            solution.setInput(`1 + (2 * 3) + (4 * (5 + 6))
2 * 3 + (4 * 5)
5 + (8 * 3 + 9 + 3 * 4 * 3)
5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))
((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2`)
            expect(solution.run().b).toBe(51 + 46 + 1445 + 669060 +23340)
        })

    })
})