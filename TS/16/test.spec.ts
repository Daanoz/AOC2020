import {PuzzleSolution} from './index'

describe('Puzzle 16', () => {
    let solution: PuzzleSolution
    beforeEach(() => {
        solution = new PuzzleSolution()
    })
    describe('part A', () => {
        beforeEach(() => {
            solution.setInput(`class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12`)
        })
        test('should calculate scanner error rate', () => {
            expect(solution.run().a).toBe(71)
        })
    })
    describe('part B', () => {
        beforeEach(() => {
            solution.setInput(`departure class: 0-1 or 4-19
row: 0-5 or 8-19
departure seat: 0-13 or 16-19

your ticket:
11,12,13

nearby tickets:
3,9,18
15,1,5
5,14,9`)
        })
        test('should calculate the ticket combination', () => {
            expect(solution.run().b).toBe(156)
        })
    })
})