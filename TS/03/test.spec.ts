import {PuzzleSolution} from './index'

describe('Puzzle TEMPLATE', () => {
    let solution: PuzzleSolution
    beforeEach(() => {
        solution = new PuzzleSolution()
        solution.setInput(`..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`)
    })
    describe('part A', () => {
        test('should traverse through the trees with the given incline', () => {
            const result  = solution.run()
            expect(result.a).toBe(7)
        })
    })
    describe('part B', () => {
        test('should traverse through the trees with the given incline', () => {
            const result  = solution.run()
            expect(result.b).toBe(336)
        })
    })
})