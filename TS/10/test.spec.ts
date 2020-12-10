import {PuzzleSolution} from './index'

describe('Puzzle 10', () => {
    let solution: PuzzleSolution
    beforeEach(() => {
        solution = new PuzzleSolution()
    })
    describe('first example', () => {
        beforeEach(() => {
            solution.setInput(`16
10
15
5
1
11
7
19
6
12
4`)
        })
        describe('part A', () => {
            test('should calculate the jolts', () => {
                expect(solution.run().a).toBe(5 * 7)
            })
        })
        describe('part B', () => {
            test('should calculate the number of options', () => {
                expect(solution.run().b).toBe(8)
            })
        })
    })
    describe('second example', () => {
        beforeEach(() => {
            solution.setInput(`28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`)
        })
        describe('part A', () => {
            test('should calculate the jolts', () => {
                expect(solution.run().a).toBe(22 * 10)
            })
        })
        describe('part B', () => {
            test('should calculate the number of options', () => {
                expect(solution.run().b).toBe(19208)
            })
        })
    })
})