import { EndlessGrid } from "./endless-grid";
import { PuzzleRenderer } from "./puzzle.renderer";
import { PuzzleServer } from "./puzzle.server";

export abstract class BasePuzzle {
    private timings: Map<string, {start: number, end: number, duration: number}> = new Map();
    private input: string = '';
    protected render: PuzzleRenderer;

    constructor(renderServer?: PuzzleServer) {
        this.render = new PuzzleRenderer(renderServer)
    }

    public setInput(data: string) {
        this.input = data;
    }
    protected getInput(): string {
        return this.input;
    }
    protected getInputAsRows(splitBy?: string | RegExp): string[] {
        return this.getInput().split(splitBy === undefined ? /\r\n|\n|\r/ : splitBy);
    }
    protected getInputAsTable(splitByCol?: string | RegExp, splitByRow?: string | RegExp): string[][] {
        return this.getInputAsRows(splitByRow).map(row => row.split(splitByCol === undefined ? ',': splitByCol));
    }
    protected getInputAsGrid(): EndlessGrid<string> {
        const grid = new EndlessGrid<string>();
        this.getInputAsTable('').forEach((row, y) => row.forEach((cell, x) => grid.set(x, y * -1, cell)));
        return grid;
    }

    protected timed<T>(label: string, func: Function): T {
        this.timerStart(label);
        const result = func();
        this.timerEnd(label);
        return result as T;
    }

    protected timerStart(label: string) {
        const existingTiming = this.timings.get(label);
        const startInMs = new Date().getTime();
        if (existingTiming) {
            existingTiming.duration += existingTiming.end - existingTiming.start;
            existingTiming.start = startInMs;
            existingTiming.end = startInMs;
        } else {
            this.timings.set(label, {
                start: startInMs,
                end: startInMs,
                duration: 0
            })
        }
    }
    protected timerEnd(label: string) {
        const existingTiming = this.timings.get(label);
        if (existingTiming) {
            existingTiming.end = new Date().getTime();
        }
    }
    public getBenchmarks(): {label: string, time: number}[] {
        return Array.from(this.timings.keys()).map(label => {
            const timing = this.timings.get(label)!;
            return {
                label,
                time: timing.duration + (timing.end - timing.start)
            }
        });
    }
}