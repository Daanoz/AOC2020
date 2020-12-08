import {PuzzleSolution} from './index'

describe('Puzzle 08', () => {
    let solution: PuzzleSolution
    beforeEach(() => {
        solution = new PuzzleSolution()
        solution.setInput(`nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`)
    })
    describe('part A', () => {
        test('should be able to run till it starts to loop', () => {
            const result = solution.run()
            expect(result.a).toBe(5)
        })
    })
    describe('part B', () => {
        test('should be able to fix the loop', () => {
            const result = solution.run()
            expect(result.b).toBe(8)
        })
    })
})