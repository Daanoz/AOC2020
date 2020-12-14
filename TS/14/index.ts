import { Puzzle, Runner, BasePuzzle, Result } from '../shared/'

export class PuzzleSolution extends BasePuzzle implements Puzzle {
    public skipB = false
    public run(): Result {
        const result: Result = {}
        const program = this.getInputAsRows()

        result.a = this.solveA(program)
        result.b = this.skipB ? 0 :this.solveB(program)

        return result
    }

    private solveA(program: string[]): number {
        const addressSpace: {[key: string]: number} = {}
        let mask: {bit: string, index: number}[] = []
        program.forEach(p => {
            const maskRegex = /mask = ([X10]*)/
            const memRegex = /mem\[(\d*)\] = (\d*)/
            const maskMatch = p.match(maskRegex)
            const memMatch = p.match(memRegex)
            if (maskMatch) {
                mask = maskMatch[1].split('').map((bit, index) => ({bit, index})).filter(m => m.bit !== 'X')
            } else if (memMatch) {
                let bitStr = (parseInt(memMatch[2], 10) >>> 0).toString(2).padStart(36, '0')
                mask.forEach(m => bitStr = bitStr.substr(0, m.index) + m.bit + bitStr.substr(m.index + 1))
                addressSpace[memMatch[1]] = parseInt(bitStr, 2)
            } else {
                throw new Error('Failed to match ' + p)
            }
        })
        return Object.values(addressSpace).reduce((sum, v) => sum + v, 0)
    }

    private solveB(program: string[]): number {
        const addressSpace: {[key: string]: number} = {}
        let mask: string[] = []
        program.forEach(p => {
            const maskRegex = /mask = ([X10]*)/
            const memRegex = /mem\[(\d*)\] = (\d*)/
            const maskMatch = p.match(maskRegex)
            const memMatch = p.match(memRegex)
            if (maskMatch) {
                mask = maskMatch[1].split('')
            } else if (memMatch) {
                const value = parseInt(memMatch[2], 10)
                let addressBitStr = (parseInt(memMatch[1], 10) >>> 0).toString(2).padStart(36, '0').split('')
                addressBitStr = mask.map((m, i) => m === '0' ? addressBitStr[i] : m)
                const addresses = this.resolveMemoryAddresses(addressBitStr)
                addresses.forEach(address => addressSpace[address] = value)
            } else {
                throw new Error('Failed to match ' + p)
            }
        })
        return Object.values(addressSpace).reduce((sum, v) => sum + v, 0)
    }

    private resolveMemoryAddresses(bitStr: string[]): string[] {
        const currentBit = bitStr.shift() as string
        if (bitStr.length <= 0) {
            return currentBit === 'X' ? ['0', '1'] : [currentBit]
        } else {
            const currentAddresses = this.resolveMemoryAddresses([currentBit])
            const recursedAddresses = this.resolveMemoryAddresses(bitStr)
            return currentAddresses.reduce(
                (list, address) => list.concat(
                    recursedAddresses.map(recursedAddress => address + recursedAddress)
                ),
                [] as string[]
            )
        }
    }
}

Runner(PuzzleSolution)