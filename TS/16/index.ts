import { Puzzle, Runner, BasePuzzle, Result } from '../shared/'

const ruleRegex = /([a-z ]*): (\d*)-(\d*) or (\d*)-(\d*)/

class Rule {
    private field: string;
    private range1: [number, number];
    private range2: [number, number];

    constructor(rule: string) {
        const match = rule.match(ruleRegex)
        if (!match) {
            throw new Error('Unable to parse rule: ' + rule)
        }
        this.field = match[1]
        this.range1 = [parseInt(match[2]), parseInt(match[3])]
        this.range2 = [parseInt(match[4]), parseInt(match[5])]
    }

    public getField(): string {
        return this.field
    }
    
    public isValid(value: number): boolean {
        return (value >= this.range1[0] && value <= this.range1[1]) ||
               (value >= this.range2[0] && value <= this.range2[1])
    }
}
class Ticket {
    private values: number[]
    constructor(valueList: string) {
        this.values = valueList.split(',').map(v => parseInt(v))
    }
    public getValues(): number[] {
        return this.values
    }
    public getValue(index: number): number {
        return this.values[index]
    }
    public findErrorRate(ruleList: Rule[]): { errorRate: number, invalid: boolean } {
        let errorRate = 0
        let invalid = false
        this.values.forEach(v => {
            if(!ruleList.find(rule => rule.isValid(v))) {
                errorRate += v
                invalid = true
            }
        })
        return { errorRate, invalid }
    }
}

export class PuzzleSolution extends BasePuzzle implements Puzzle {
    public ruleList: Rule[] = []
    public ticketList: Ticket[] = []

    public run(): Result {
        const result: Result = {}

        const [rules, ticket, nearby] = this.getInputAsRows('\n\n')
        const myTicketValues = ticket.split('\n')[1].split(',').map(v => parseInt(v))


        this.ruleList = rules.split('\n').map(rule => new Rule(rule))
        let errorRate = 0
        this.ticketList = nearby
            .split('\n')
            .slice(1)
            .map(nearbyTicket => new Ticket(nearbyTicket))
            .filter(nearbyTicket => {
                const ticketErrorResult = nearbyTicket.findErrorRate(this.ruleList)
                errorRate += ticketErrorResult.errorRate
                return !ticketErrorResult.invalid
            })

        result.a = errorRate

        let ruleMatches: {index: number, rules: Rule[]}[] = []
        for(let i = 0; i < myTicketValues.length; i++) {
            const validRules = [...this.ruleList].filter(
                rule => this.ticketList.every(ticket => {
                    const v = rule.isValid(ticket.getValue(i))
                    return v
                })
            )
            ruleMatches.push({
                index: i,
                rules: validRules
            })
        }
        const ruleMap: Map<number, Rule> = new Map()
        while (ruleMatches.length > 0) {
            const ruleMatch = ruleMatches.find(rm => rm.rules.length === 1)
            if (!ruleMatch) {
                throw new Error('No single rule match')
            }
            ruleMap.set(ruleMatch.index, ruleMatch.rules[0])
            ruleMatches = ruleMatches.filter(rm => rm !== ruleMatch)
            ruleMatches.forEach(rm => {
                rm.rules = rm.rules.filter(rule => rule != ruleMatch.rules[0])
            })
        }
        const departureKeys = Array.from(ruleMap.keys()).filter(key => ruleMap.get(key)!.getField().indexOf('departure') >= 0)
        result.b = departureKeys.reduce((result, key) => result * myTicketValues[key], 1)

        return result
    }

}

Runner(PuzzleSolution)