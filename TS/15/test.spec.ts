import {PuzzleSolution} from './index'

describe('Puzzle 15', () => {
    let solution: PuzzleSolution
    beforeEach(() => {
        solution = new PuzzleSolution()
        solution.setInput('0,3,6')
    })
    test('should calculate thje right number after set number of iterations', () => {
        const result = solution.run()
        expect(result.a).toBe(436)
        expect(result.b).toBe(175594)
    })
})