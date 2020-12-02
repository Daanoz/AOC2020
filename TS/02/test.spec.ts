import {PuzzleSolution} from './index'

describe('Puzzle TEMPLATE', () => {
    let solution: PuzzleSolution
    beforeEach(() => {
        solution = new PuzzleSolution()
    })
    describe('part A', () => {
        test('should check for valid passwords using count', () => {
            solution.setInput([
                '1-2 a: aa',
                '4-8 b: aabbbaabb',
                '1-20 c: aaaaaaaaaaaaaac',
                '8-9 d: ddddddddd',
            ].join('\n'))
            const result = solution.run()
            expect(result.a).toBe(4)
        })
        test('should check for invalid passwords using count', () => {
            solution.setInput([
                '1-2 a: bb',
                '4-8 b: aaccbaabb',
                '1-20 c: ccccccccccacccccccccccc',
                '8-9 d: eeeeeeeeee',
            ].join('\n'))
            const result = solution.run()
            expect(result.a).toBe(0)
        })
    })
    describe('part B', () => {
        test('should check for valid passwords using position', () => {
            solution.setInput([
                '1-2 a: ab',
                '4-8 b: aabbbaaaabb',
                '1-20 c: caaaaaaaaaaaaaac',
                '8-9 d: dddddddedd',
            ].join('\n'))
            const result = solution.run()
            expect(result.b).toBe(4)
        })
        test('should check for invalid passwords using position', () => {
            solution.setInput([
                '1-2 a: bb', // no match
                '4-8 b: aaccbaccabb', // no match
                '1-20 c: ccccccccccacccccccccccc', // two match
                '8-9 d: eeeeeeeeee', // two match
            ].join('\n'))
            const result = solution.run()
            expect(result.b).toBe(0)
        })
    })
})