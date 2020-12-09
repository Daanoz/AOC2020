import {PuzzleSolution} from './index'

describe('Puzzle 09', () => {
    let solution: PuzzleSolution
    beforeEach(() => {
        solution = new PuzzleSolution()
        solution.setInput(`35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`)
        solution.preambleLength = 5
    })
    describe('part A', () => {
        test('should find missing sum', () => {
            const result = solution.run()
            expect(result.a).toBe(127)
        })
    })
    describe('part B', () => {
        test('should find the contiguous set', () => {
            const result = solution.run()
            expect(result.b).toBe(62)
        })
    })
})