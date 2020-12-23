import { Puzzle, Runner, BasePuzzle, Result } from '../shared/'

export class PuzzleSolution extends BasePuzzle implements Puzzle {
    public run(): Result {
        const result: Result = {}

        const [player1Deck, player2Deck] = this.getInputAsRows('\n\n')
        result.a = this.playRoundA(player1Deck, player2Deck)
        result.b = this.playRoundB(player1Deck, player2Deck)
        return result
    }

    private playRoundA(player1Deck: string, player2Deck: string): number {
        const player1 = player1Deck.split('\n').slice(1).map(v => parseInt(v))
        const player2 = player2Deck.split('\n').slice(1).map(v => parseInt(v))

        while (player1.length > 0 && player2.length > 0) {
            const p1Val = player1.shift()!
            const p2Val = player2.shift()!
            if (p1Val > p2Val) {
                player1.push(p1Val, p2Val)
            } else {
                player2.push(p2Val, p1Val)
            }
        }
        let winner = player2
        if (player1.length > player2.length) {
            winner = player1
        }
        return winner.reverse().reduce((sum, value, index) => sum + (value * (index + 1)), 0)
    }

    private playRoundB(player1Deck: string, player2Deck: string): number {
        const player1 = player1Deck.split('\n').slice(1).map(v => parseInt(v))
        const player2 = player2Deck.split('\n').slice(1).map(v => parseInt(v))

        const wins = this.playRecurse(
            player1,
            player2
        )
        let winner = wins.player2
        if (wins.player1.length > wins.player2.length) {
            winner = wins.player1
        }
        return winner.reverse().reduce((sum, value, index) => sum + (value * (index + 1)), 0)
    }

    private playRecurse(player1: number[], player2: number[]): { player1: number[], player2: number[] } {
        const rounds: string[] = []
        while (player1.length > 0 && player2.length > 0) {
            let p1Wins = false
            const p1Hash = player1.join(',')
            const p2Hash = player2.join(',')
            if (rounds.indexOf(p1Hash) >= 0 || rounds.indexOf(p2Hash) >= 0) {
                p1Wins = true
            } else {
                rounds.push(p1Hash, p2Hash)
            }

            const p1Val = player1.shift()!
            const p2Val = player2.shift()!

            if (p1Wins) {
            } else if (p1Val <= player1.length && p2Val <= player2.length) {
                const wins = this.playRecurse(
                    player1.slice(0, p1Val),
                    player2.slice(0, p2Val)
                )
                p1Wins = wins.player1 > wins.player2
            } else {
                p1Wins = p1Val > p2Val
            }

            if (p1Wins) {
                player1.push(p1Val, p2Val)
            } else {
                player2.push(p2Val, p1Val)
            }
        }
        return { player1, player2 }
    }
}

Runner(PuzzleSolution)