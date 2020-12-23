import {PuzzleSolution} from './index'

describe('Puzzle 22', () => {
    let solution: PuzzleSolution
    beforeEach(() => {
        solution = new PuzzleSolution()
        solution.setInput(`Player 1:
9
2
6
3
1

Player 2:
5
8
4
7
10`)
    })
    test('should calculate the game winner', () => {
        const result = solution.run()
        expect(result.a).toBe(306)
        expect(result.b).toBe(291)
    })
})