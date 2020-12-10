import { Puzzle, Runner, BasePuzzle, Result } from '../shared/'

export class PuzzleSolution extends BasePuzzle implements Puzzle {
    private pathCache: Map<string, number> = new Map<string, number>();

    public run(): Result {
        const result: Result = {}

        const adapters = this.getInputAsRows()
            .map(v => parseInt(v, 10))
            .sort((a, b) => a - b)
        adapters.push(Math.max(...adapters) + 3)
            
        result.a = this.findJoltsUsingAll(adapters)
        result.b = this.countPaths(adapters, 0)

        return result
    }

    public findJoltsUsingAll(adapters: number[]): number {
        let oneJolt = 0
        let threeJolt = 0
        adapters.reduce((lastValue, adapter) => {
            if (adapter - lastValue === 3) {
                threeJolt++
            } else if (adapter - lastValue === 1) {
                oneJolt++
            }
            return adapter
        }, 0)
        return oneJolt * threeJolt
    }
    
    public countPaths(adapters: number[], last: number): number {
        if (adapters.length === 1) { return 1 }
        
        const argHash = adapters.join(',') + ';' + last
        if (this.pathCache.has(argHash)) {
            return this.pathCache.get(argHash)!
        }

        const available = adapters.filter(a => a <= last + 3)
        const result = available.reduce((sum, adapter, index) => {
            const remainingAdapters = adapters.slice(index + 1)
            return sum + this.countPaths(remainingAdapters, adapter)
        }, 0)
        this.pathCache.set(argHash, result)
        return result
    }
}

Runner(PuzzleSolution)