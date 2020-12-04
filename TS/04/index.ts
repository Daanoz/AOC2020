import { Puzzle, Runner, BasePuzzle, Result } from '../shared/'

class Passport {
    private data: Map<string, string> = new Map();
    constructor () {

    }
    public addData(data: string): void {
        let record
        const regex = /([a-z]{3}):([#a-z0-9]*)/g
        while((record = regex.exec(data)) !== null) {
            this.data.set(record[1], record[2])
        }
    }
    public isValid(): boolean {
        return [
            'byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'
        ].every(key => this.data.has(key))
    }
    public isStrictValid(): boolean {
        return this.isValid() &&
            this.isBirthYearValid() &&
            this.isIssueYearValid() &&
            this.isExpirationYearValid() &&
            this.isHeightValid() &&
            this.isHairColorValid() &&
            this.isEyeColorValid() &&
            this.isPassportIdValid()
    }
    private isBirthYearValid(): boolean {
        const byr = parseInt(this.data.get('byr')!, 10)
        return (byr >= 1920 && byr <= 2002)
    }
    private isIssueYearValid(): boolean {
        const iyr = parseInt(this.data.get('iyr')!, 10)
        return (iyr >= 2010 && iyr <= 2020)
    }
    private isExpirationYearValid(): boolean {
        const eyr = parseInt(this.data.get('eyr')!, 10)
        return (eyr >= 2020 && eyr <= 2030)
    }
    private isHeightValid(): boolean {
        const regex = /^(\d{2,3})(cm|in)$/
        const height = this.data.get('hgt')!
        const matches = height.match(regex)
        if (!matches) { return false }
        const size = parseInt(matches[1])
        const unit = matches[2]
        switch (unit) {
            case 'cm': return (size >= 150 && size <= 193)
            case 'in': return (size >= 59 && size <= 76)
        }
        return false
    }
    private isHairColorValid(): boolean {
        const regex = /^#[a-f0-9]{6}$/
        const color = this.data.get('hcl')!
        return !!color.match(regex)
    }
    private isEyeColorValid(): boolean {
        const color = this.data.get('ecl')!
        return [
            'amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'
        ].indexOf(color) >= 0
    }
    private isPassportIdValid(): boolean {
        const pid = this.data.get('pid')!
        const regex = /^[0-9]{9}$/
        return !!pid.match(regex)
    }
}

export class PuzzleSolution extends BasePuzzle implements Puzzle {
    public run(): Result {
        const result: Result = {}

        const lines = this.getInputAsRows()
        let currentPassport = new Passport()
        const passports: Passport[] = []
        lines.forEach(line => {
            if(line === '') {
                passports.push(currentPassport)
                currentPassport = new Passport()
            }
            currentPassport.addData(line)
        })
        passports.push(currentPassport)

        result.a = passports.filter(p => p.isValid()).length
        result.b = passports.filter(p => p.isStrictValid()).length

        return result
    }

}

Runner(PuzzleSolution)