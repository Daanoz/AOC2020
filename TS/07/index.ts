import { Puzzle, Runner, BasePuzzle, Result } from '../shared/'

class Bag {
    private parents: Bag[] = []
    private childs: {
        bag: Bag,
        count: number
    }[] = []
    constructor(private color: string) {}
    public getColor(): string { return this.color }
    public addParent(bag: Bag) {
        this.parents.push(bag)
    }
    public addChild(bag: Bag, count: number) {
        this.childs.push({
            bag, count
        })
    }
    public getParentList(): Bag[] {
        return this.parents.concat(
            this.parents.reduce((list, parent) => list.concat(parent.getParentList()), [] as Bag[])
        )
    }
    public getChildCount(): number {
        return this.childs.reduce(
            (sum, child) => sum + child.count + (child.count * child.bag.getChildCount()), 
            0
        )
    }
}

export class PuzzleSolution extends BasePuzzle implements Puzzle {
    private mainRuleRegex = /([a-z ]*) bags? contain ([0-9 a-z,]*)./
    private childBagRegex = /([0-9]*) ([a-z ]*) bags?/
    private bags: Map<string, Bag> = new Map()

    public run(): Result {
        const result: Result = {}

        const myBag = 'shiny gold'

        const rules = this.getInputAsRows()
        rules.forEach(r => this.addRule(r))

        const parents = this.getBagByColor(myBag).getParentList()
            .map(p => p.getColor())
            .reduce((list, color) => {
                if (list.indexOf(color) < 0) { list.push(color) }
                return list
            }, [] as string[])
        result.a = parents.length

        result.b = this.getBagByColor(myBag).getChildCount()

        return result
    }

    private addRule(rule: string): void {
        const match = rule.match(this.mainRuleRegex)
        if (!match) { throw new Error('Invalid rule: ' + rule)}

        const parent = this.getBagByColor(match[1])
        const childs = match[2]
            .split(', ')
            .filter(child => child !== 'no other bags')
            .map(child => {
                const childMatch = child.match(this.childBagRegex)
                if (!childMatch) { throw new Error('Invalid child: ' + child)}
                return ({
                    count: parseInt(childMatch[1], 10),
                    bag: this.getBagByColor(childMatch[2])
                })
            })
        childs.forEach(c => {
            parent.addChild(c.bag, c.count)
            c.bag.addParent(parent)
        })
    }

    private getBagByColor(color: string): Bag {
        if (this.bags.has(color)) {
            return this.bags.get(color)!
        }
        this.bags.set(color, new Bag(color))
        return this.bags.get(color)!
    }

}

Runner(PuzzleSolution)