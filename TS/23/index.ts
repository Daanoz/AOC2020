import { Puzzle, Runner, BasePuzzle, Result } from '../shared/'

class Cup {
    private nextCup?: Cup
    constructor (private value: number) {}
    public setNext(nextCup: Cup) {
        this.nextCup = nextCup
    }
    public getNext(): Cup {
        return this.nextCup!
    }
    public getValue(): number {
        return this.value
    }
    public pickUp(count: number): { list: Cup[], last: Cup } {
        count--
        if (count <= 0) {
            return {
                list: [this],
                last: this.getNext()
            }
        }
        const pickUp = this.getNext().pickUp(count)
        pickUp.list.unshift(this)
        return pickUp
    }
    public insertAt(cups: Cup[]) {
        cups[cups.length - 1].setNext(this.getNext())
        this.setNext(cups[0])
    }
    public serialize(cup?: Cup): string {
        if (!cup) {
            return this.getValue() + this.nextCup!.serialize(this)
        } else if (cup === this) {
            return ''
        }
        return `${this.value}` + this.nextCup!.serialize(cup)
    }
}

export class PuzzleSolution extends BasePuzzle implements Puzzle {
    public run(): Result {
        const result: Result = {}

        const firstCup = this.runGame(9, 100).get(1)!
        result.a = firstCup.serialize().substr(1)

        const firstCupForB = this.runGame(1000000, 10000000).get(1)!
        result.b = firstCupForB.getNext()!.getValue() * firstCupForB.getNext()!.getNext()!.getValue() 

        return result
    }

    private runGame(maxCup: number, rounds: number): Map<number, Cup> {
        const cups: Map<number, Cup> = new Map
        let firstCup: Cup
        let prevCup: (Cup | undefined)
        this
            .getInputAsRows('')
            .forEach(c => {
                const nextCup = new Cup(parseInt(c))
                cups.set(parseInt(c), nextCup)
                if (!firstCup) { firstCup = nextCup }
                if (prevCup) {
                    prevCup?.setNext(nextCup)
                }
                prevCup = nextCup
            })
        for (
            let i = this.getInputAsRows('').reduce((max, val) => Math.max(max, parseInt(val)), 0) + 1;
            i <= maxCup;
            i++
        ) {
            const nextCup = new Cup(i)
            cups.set(i, nextCup)
            if (prevCup) {
                prevCup?.setNext(nextCup)
            }
            prevCup = nextCup
        }
        prevCup!.setNext(firstCup!)

        let currentCup = firstCup!
        for (let i = 0; i < rounds; i++) {
            let cupDestination = currentCup.getValue() - 1
            const pickUp = currentCup.getNext().pickUp(3)
            currentCup.setNext(pickUp.last)
            const vals = pickUp.list.map(c => c.getValue())
            while (vals.indexOf(cupDestination) >= 0 || cupDestination <= 0) {
                cupDestination -= 1
                if (cupDestination <= 0) {
                    cupDestination = maxCup
                }
            }
            cups.get(cupDestination)!.insertAt(pickUp.list)
            currentCup = currentCup.getNext()
        }
        return cups
    }

}

Runner(PuzzleSolution)