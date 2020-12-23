import { Puzzle, Runner, BasePuzzle, Result } from '../shared/'

export class PuzzleSolution extends BasePuzzle implements Puzzle {
    private ruleBook: Map<string, {rawRule: string, regex?: string}> = new Map()

    public run(): Result {
        const result: Result = {}

        const [rulesStrData, dataSet] = this.getInputAsRows('\n\n')
        
        rulesStrData.split('\n').forEach(ruleStr => {
            const [ruleNo, rawRule] = ruleStr.split(': ')
            this.ruleBook.set(ruleNo, {
                rawRule
            })
        })

        const reg = new RegExp('^' + this.determineRegex('0') + '$')
        result.a = dataSet.split('\n').filter(data => data.match(reg)).length


        Array.from(this.ruleBook.values()).forEach(rule => rule.regex = undefined)
        this.ruleBook.set('8', { 
            rawRule: '42 | 42 8',
            regex: '(?:' + this.determineRegex('42') + ')+'
        })
        const regexRule11List = []
        for (let i = 1; i < 10; i++) { 
            // basically we need pair matching, lets 'assume' the maximum of pairs is 10
            // javascript doesn't have native backtrack counting AFAIK
            regexRule11List.push(`(?:(?:${this.determineRegex('42')}){${i}}(?:${this.determineRegex('31')}){${i}})`)
        }
        this.ruleBook.set('11', { 
            rawRule: '42 31 | 42 11 31',
            regex: `(?:${regexRule11List.join('|')})`
        })
        const reg2 = new RegExp('^' + this.determineRegex('0') + '$')
        result.b = dataSet.split('\n').filter(data => data.match(reg2)).length
        return result
    }


    private determineRegex = (ruleNo: string) : string => {
        const rule = this.ruleBook.get(ruleNo)
        if (!rule) throw new Error('Missing rule #' + ruleNo)
        if (rule.regex) {
            return rule.regex
        }
        const dataMatch = rule.rawRule.match(/"([a-z])"/)
        if (dataMatch) {
            rule.regex = dataMatch[1]
            return rule.regex
        }
        const regex = rule.rawRule
            .replace(/(\d+)/g, (match, $1) => this.determineRegex($1))
            .replace(/ /g, '')
        rule.regex = '(?:' + regex + ')'
        return rule.regex
    }
}

Runner(PuzzleSolution)