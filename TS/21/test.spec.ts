import {PuzzleSolution} from './index'

describe('Puzzle 21', () => {
    let solution: PuzzleSolution
    beforeEach(() => {
        solution = new PuzzleSolution()
        solution.setInput(`mxmxvkd kfcds sqjhc nhms (contains dairy, fish)
trh fvjkl sbzzf mxmxvkd (contains dairy)
sqjhc fvjkl (contains soy)
sqjhc mxmxvkd sbzzf (contains fish)`)
    })
    test('should determine the ingredient list', () => {
        const result = solution.run()
        expect(result.a).toBe(5)
        expect(result.b).toBe('mxmxvkd,sqjhc,fvjkl')
    })
})