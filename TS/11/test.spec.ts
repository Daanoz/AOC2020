import {PuzzleSolution} from './index'

describe('Puzzle 11', () => {
    let solution: PuzzleSolution
    beforeEach(() => {
        solution = new PuzzleSolution()
        solution.setInput(`L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`)
    })
    describe('part A', () => {
        test('count number of occupied seats after chaos', () => {
            const result = solution.run()
            expect(result.a).toBe(37)
        })
    })
    describe('part B', () => {
        test('count number of occupied seats after chaos', () => {
            const result = solution.run()
            expect(result.b).toBe(26)
        })
    })
})