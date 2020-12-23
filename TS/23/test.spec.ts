import {PuzzleSolution} from './index'

describe('Puzzle 23', () => {
    let solution: PuzzleSolution
    beforeEach(() => {
        solution = new PuzzleSolution()
        solution.setInput('389125467')
    })
    test('it should calcuate the game outcome', () => {
        const result = solution.run()
        expect(result.a).toBe('67384529')
        expect(result.b).toBe(149245887792)
    })
})