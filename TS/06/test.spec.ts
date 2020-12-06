import {PuzzleSolution} from './index'

describe('Puzzle 06', () => {
    let solution: PuzzleSolution
    beforeEach(() => {
        solution = new PuzzleSolution()
        solution.setInput(`abc

a
b
c

ab
ac

a
a
a
a

b`)
    })
    describe('part A', () => {
        test('anyone has entered yes', () => {
            const result = solution.run()
            expect(result.a).toBe(11)
        })
    })
    describe('part B', () => {
        test('everyone has entered yes', () => {
            const result = solution.run()
            expect(result.b).toBe(6)
        })
    })
})