import {PuzzleSolution} from './index'

describe('Puzzle TEMPLATE', () => {
    let solution: PuzzleSolution
    beforeEach(() => {
        solution = new PuzzleSolution()
        solution.setInput(`F10
N3
F7
R90
F11`)
    })
    describe('part A', () => {
        test('to calculate the distance', () => {
            const result = solution.run()
            expect(result.a).toBe(25)
        })
    })
    describe('part B', () => {
        test('to calculate the distance using a WP', () => {
            const result = solution.run()
            expect(result.b).toBe(286)
        })
    })
})