import {PuzzleSolution} from './index'

describe('Puzzle 13', () => {
    let solution: PuzzleSolution
    beforeEach(() => {
        solution = new PuzzleSolution()
        solution.setInput(`939
7,13,x,x,59,x,31,19`)
    })
    test('calculate the next bus departing and when the depart in sequence', () => {
        const result = solution.run()
        expect(result.a).toBe(295)
        expect(result.b).toBe(1068781)
    })
})