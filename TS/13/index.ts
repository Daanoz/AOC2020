import { Puzzle, Runner, BasePuzzle, Result } from '../shared/'

export class PuzzleSolution extends BasePuzzle implements Puzzle {
    public run(): Result {
        const result: Result = {}

        const [timestampStr, busTimes] = this.getInputAsRows()
        const timestamp = parseInt(timestampStr, 10)

        const firstBus = busTimes
            .split(',')
            .filter(t => t !== 'x')
            .map(t => parseInt(t, 10))
            .reduce((firstBus, t) => {
                const arrivesIn = t - (timestamp % t)
                if (arrivesIn < firstBus.arrivesIn) {
                    return {
                        id: t,
                        arrivesIn
                    }
                }
                return firstBus
            }, {
                id: 0,
                arrivesIn: Number.POSITIVE_INFINITY
            })

        result.a = firstBus.id * firstBus.arrivesIn

        const timeOffsets = busTimes
            .split(',')
            .map((t, index) => ({
                time: t === 'x' ? -1 : parseInt(t, 10),
                min: index
            }))
            .filter(t => t.time > 0)

        let offset = 0
        let increment = timeOffsets[0].time
        for (let i = 1; i < timeOffsets.length; i++) {
            while ((offset + timeOffsets[i].min) % timeOffsets[i].time !== 0) {
                offset += increment
            }
            increment *= timeOffsets[i].time
        }
        result.b = offset

        return result
    }
}

Runner(PuzzleSolution)