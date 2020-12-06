import { Puzzle, Runner, BasePuzzle, Result } from '../shared/'

export class PuzzleSolution extends BasePuzzle implements Puzzle {
    public run(): Result {
        const result: Result = {}

        const data = this.getInput()
        const groups = data.split('\n\n')

        result.a = groups
            .map(grp => grp.replace(/\n/g, '').split(''))
            .map(grp => grp.reduce((list, val) => {
                if (list.indexOf(val) < 0) {
                    list.push(val)
                }
                return list
            }, [] as string[]))
            .reduce((sum, grpAnswers) => sum + grpAnswers.length, 0)

        result.b = groups
            .map(grp => ({
                count: grp.split('\n').length,
                answers: grp
                    .replace(/\n/g, '')
                    .split('')
                    .reduce((counts, char) => {
                        if (!counts[char]) { counts[char] = 0 }
                        counts[char]++
                        return counts
                    }, {} as {[key: string]: number})
            }))
            .map(({ count, answers }) => 
                Object.keys(answers).filter(char => answers[char] === count)
            )
            .reduce((sum, grpAnswers) => sum + grpAnswers.length, 0)

        return result
    }

}

Runner(PuzzleSolution)