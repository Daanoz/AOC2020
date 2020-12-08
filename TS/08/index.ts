import { Puzzle, Runner, BasePuzzle, Result } from '../shared/'

enum InstructionType {
    JMP = 'jmp',
    ACC = 'acc',
    NOP = 'nop'
}

type ProgramInstruction = {
    instruction: InstructionType,
    arg: number
}

class ProgramExecutor {
    private program: ProgramInstruction[] = []
    private global = 0
    private index = 0

    constructor(program: string[]) {
        program.forEach(line => {
            const parts = line.split(' ')
            this.program.push({
                instruction: parts[0] as InstructionType,
                arg: parseInt(parts[1], 10),
            })
        })
    }

    public getGlobal() {
        return this.global
    }

    public runTillLoop(): boolean {
        const seenInstructionList = []
        while(
            seenInstructionList.indexOf(this.index) < 0 &&
            this.index < this.program.length
        ) {
            seenInstructionList.push(this.index)
            this.tick()
        }
        return this.index >= this.program.length
    }

    public fixLoop(): number {
        const originalProgram = this.program.map(ins => ({ ...ins })) // clone
        let endResult = 0
        for (let i = 0; i < originalProgram.length; i++) {
            const instruction = this.program[i].instruction
            if ([InstructionType.JMP, InstructionType.NOP].indexOf(instruction) >= 0) {
                this.program = originalProgram.map(ins => ({ ...ins })) // clone
                this.program[i].instruction = instruction === InstructionType.NOP ? InstructionType.JMP : InstructionType.NOP
                this.reset()
                const hasFinished = this.runTillLoop()
                if (hasFinished) {
                    endResult = this.getGlobal()
                    i = originalProgram.length
                }
            }
        }
        return endResult
    }

    private reset() {
        this.global = 0
        this.index = 0
    }

    private tick() {
        const ins = this.program[this.index]
        switch(ins.instruction) {
            case InstructionType.ACC: this.acc(ins); break
            case InstructionType.NOP: this.nop(); break
            case InstructionType.JMP: this.jmp(ins); break
            default: throw new Error('Unknown instruction: ' + ins.instruction)
        }
    }
    private jmp(ins: ProgramInstruction) {
        this.index += ins.arg
    }
    private nop() {
        this.index++
    }
    private acc(ins: ProgramInstruction) {
        this.global += ins.arg
        this.index++
    }
}

export class PuzzleSolution extends BasePuzzle implements Puzzle {
    public run(): Result {
        const result: Result = {}

        const program = this.getInputAsRows()
        const executor = new ProgramExecutor(program)
        executor.runTillLoop()
        result.a = executor.getGlobal()
        result.b = executor.fixLoop()

        return result
    }

}

Runner(PuzzleSolution)