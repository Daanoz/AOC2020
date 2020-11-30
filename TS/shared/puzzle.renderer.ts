import { PuzzleServer } from "./puzzle.server";

export class PuzzleRenderer implements CanvasRenderingContext2D {
    constructor(private server?: PuzzleServer) {}

    protected setProp(propKey: string, propValue: any) {
        if (!this.server) { return; }
        this.server.addToBuffer(
            'PROP',
            propKey,
            [propValue]
        )
    }
    protected callMethod(funcKey: string, args: any[]) {
        if (!this.server) { return; }
        this.server.addToBuffer(
            'FUNC',
            funcKey,
            args
        )
    }
    public clear() {
        if (!this.server) { return; }
        this.server.clearCanvas();
    }
    public flush() {
        if (!this.server) { return; }
        this.server.flush();
    }

    /**
     * Captured canvas methods
     */
    get canvas(): HTMLCanvasElement { throw new Error("Method not implemented.") };
    set canvas(val: HTMLCanvasElement) { throw new Error("Method not implemented.") };

    private _globalAlpha: number = 1;
    private _globalCompositeOperation: string = 'source-over';
    private _fillStyle: string | CanvasGradient | CanvasPattern = '#000000';
    private _strokeStyle: string | CanvasGradient | CanvasPattern = '#000000';
    private _filter: string = 'none';
    private _imageSmoothingEnabled: boolean = true;
    private _imageSmoothingQuality: ImageSmoothingQuality = "low";
    private _lineCap: CanvasLineCap = "butt";
    private _lineDashOffset: number = 0;
    private _lineJoin: CanvasLineJoin = "miter";
    private _lineWidth: number = 1;
    private _miterLimit: number = 10;
    private _shadowBlur: number = 0;
    private _shadowColor: string = 'rgba(0, 0, 0, 0)';
    private _shadowOffsetX: number = 0;
    private _shadowOffsetY: number = 0;
    private _direction: CanvasDirection = "ltr";
    private _font: string = "10px sans-serif";
    private _textAlign: CanvasTextAlign = "start";
    private _textBaseline: CanvasTextBaseline = "alphabetic";

    get globalAlpha(): number { return this._globalAlpha; };
    get globalCompositeOperation(): string { return this._globalCompositeOperation; };
    get fillStyle(): string | CanvasGradient | CanvasPattern { return this._fillStyle; };
    get strokeStyle(): string | CanvasGradient | CanvasPattern { return this._strokeStyle; };
    get filter(): string { return this._filter; };
    get imageSmoothingEnabled(): boolean { return this._imageSmoothingEnabled; };
    get imageSmoothingQuality(): ImageSmoothingQuality { return this._imageSmoothingQuality; };
    get lineCap(): CanvasLineCap { return this._lineCap; };
    get lineDashOffset(): number { return this._lineDashOffset; };
    get lineJoin(): CanvasLineJoin { return this._lineJoin; };
    get lineWidth(): number { return this._lineWidth; };
    get miterLimit(): number { return this._miterLimit; };
    get shadowBlur(): number { return this._shadowBlur; };
    get shadowColor(): string { return this._shadowColor; };
    get shadowOffsetX(): number { return this._shadowOffsetX; };
    get shadowOffsetY(): number { return this._shadowOffsetY; };
    get direction(): CanvasDirection { return this._direction; };
    get font(): string { return this._font; };
    get textAlign(): CanvasTextAlign { return this._textAlign; };
    get textBaseline(): CanvasTextBaseline { return this._textBaseline; };

    set globalAlpha(val: number) { this._globalAlpha = val; this.setProp('globalAlpha', val); };
    set globalCompositeOperation(val: string) { this._globalCompositeOperation = val; this.setProp('globalCompositeOperation', val); };
    set fillStyle(val: string | CanvasGradient | CanvasPattern) { this._fillStyle = val; this.setProp('fillStyle', val); };
    set strokeStyle(val: string | CanvasGradient | CanvasPattern) { this._strokeStyle = val; this.setProp('strokeStyle', val); };
    set filter(val: string) { this._filter = val; this.setProp('filter', val); };
    set imageSmoothingEnabled(val: boolean) { this._imageSmoothingEnabled = val; this.setProp('imageSmoothingEnabled', val); };
    set imageSmoothingQuality(val: ImageSmoothingQuality) { this._imageSmoothingQuality = val; this.setProp('imageSmoothingQuality', val); };
    set lineCap(val: CanvasLineCap) { this._lineCap = val; this.setProp('lineCap', val); };
    set lineDashOffset(val: number) { this._lineDashOffset = val; this.setProp('lineDashOffset', val); };
    set lineJoin(val: CanvasLineJoin) { this._lineJoin = val; this.setProp('lineJoin', val); };
    set lineWidth(val: number) { this._lineWidth = val; this.setProp('lineWidth', val); };
    set miterLimit(val: number) { this._miterLimit = val; this.setProp('miterLimit', val); };
    set shadowBlur(val: number) { this._shadowBlur = val; this.setProp('shadowBlur', val); };
    set shadowColor(val: string) { this._shadowColor = val; this.setProp('shadowColor', val); };
    set shadowOffsetX(val: number) { this._shadowOffsetX = val; this.setProp('shadowOffsetX', val); };
    set shadowOffsetY(val: number) { this._shadowOffsetY = val; this.setProp('shadowOffsetY', val); };
    set direction(val: CanvasDirection) { this._direction = val; this.setProp('direction', val); };
    set font(val: string) { this._font = val; this.setProp('font', val); };
    set textAlign(val: CanvasTextAlign) { this._textAlign = val; this.setProp('textAlign', val); };
    set textBaseline(val: CanvasTextBaseline) { this._textBaseline = val; this.setProp('textBaseline', val); };

    drawImage(image: CanvasImageSource, dx: number, dy: number): void;
    drawImage(image: CanvasImageSource, dx: number, dy: number, dw: number, dh: number): void;
    drawImage(image: CanvasImageSource, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number): void;
    drawImage(...args: any[]): void { this.callMethod('beginPdrawImageath', args); }
    beginPath(): void { this.callMethod('beginPath', []); }
    clip(fillRule?: CanvasFillRule): void;
    clip(path: Path2D, fillRule?: CanvasFillRule): void;
    clip(...args: any[]) { this.callMethod('clip', args); }
    fill(fillRule?: CanvasFillRule): void;
    fill(path: Path2D, fillRule?: CanvasFillRule): void;
    fill(...args: any[]) { this.callMethod('fill', args); }
    isPointInPath(x: number, y: number, fillRule?: CanvasFillRule): boolean;
    isPointInPath(path: Path2D, x: number, y: number, fillRule?: CanvasFillRule): boolean;
    isPointInPath(...args: any[]): boolean {
        throw new Error("Method not implemented.");
    }
    isPointInStroke(x: number, y: number): boolean;
    isPointInStroke(path: Path2D, x: number, y: number): boolean;
    isPointInStroke(...args: any[]): boolean {
        throw new Error("Method not implemented.");
    }
    stroke(): void;
    stroke(path: Path2D): void;
    stroke(...args: any[]) { this.callMethod('stroke', args); }
    createLinearGradient(...args: any[]): CanvasGradient {
        throw new Error("Method not implemented.");
    }
    createPattern(...args: any[]): CanvasPattern | null {
        throw new Error("Method not implemented.");
    }
    createRadialGradient(...args: any[]): CanvasGradient {
        throw new Error("Method not implemented.");
    }
    createImageData(sw: number, sh: number): ImageData;
    createImageData(imagedata: ImageData): ImageData;
    createImageData(...args: any[]): ImageData {
        throw new Error("Method not implemented.");
    }
    getImageData(sx: number, sy: number, sw: number, sh: number): ImageData;
    getImageData(...args: any[]): ImageData {
        throw new Error("Method not implemented.");
    }
    putImageData(imagedata: ImageData, dx: number, dy: number): void;
    putImageData(imagedata: ImageData, dx: number, dy: number, dirtyX: number, dirtyY: number, dirtyWidth: number, dirtyHeight: number): void;
    putImageData(...args: any[]) { this.callMethod('putImageData', args); }
    arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean): void;
    arc(...args: any[]) { this.callMethod('arc', args); }
    arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void;
    arcTo(...args: any[]) { this.callMethod('arcTo', args); }
    bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void;
    bezierCurveTo(...args: any[]) { this.callMethod('bezierCurveTo', args); }
    closePath() { this.callMethod('closePath', []); }
    ellipse(x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, anticlockwise?: boolean): void;
    ellipse(...args: any[]) { this.callMethod('ellipse', args); }
    lineTo(x: number, y: number): void;
    lineTo(...args: any[]) { this.callMethod('lineTo', args); }
    moveTo(x: number, y: number): void ;
    moveTo(...args: any[]) { this.callMethod('moveTo', args); }
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;
    quadraticCurveTo(...args: any[]) { this.callMethod('quadraticCurveTo', args); }
    rect(x: number, y: number, w: number, h: number): void;
    rect(...args: any[]) { this.callMethod('rect', args); }
    getLineDash(): number[] {
        throw new Error("Method not implemented.");
    }
    setLineDash(segments: number[]): void;
    setLineDash(segments: Iterable<number>): void;
    setLineDash(...args: any[]) { this.callMethod('setLineDash', args); }
    clearRect(x: number, y: number, w: number, h: number): void;
    clearRect(...args: any[]) { this.callMethod('clearRect', args); }
    fillRect(x: number, y: number, w: number, h: number): void;
    fillRect(...args: any[]) { this.callMethod('fillRect', args); }
    strokeRect(x: number, y: number, w: number, h: number): void;
    strokeRect(...args: any[]) { this.callMethod('strokeRect', args); }
    restore() { this.callMethod('restore', []); }
    save() { this.callMethod('save', []); }
    fillText(text: string, x: number, y: number, maxWidth?: number): void;
    fillText(...args: any[]) { this.callMethod('fillText', args); }
    measureText(text: string): TextMetrics {
        throw new Error("Method not implemented.");
    }
    strokeText(text: string, x: number, y: number, maxWidth?: number): void;
    strokeText(...args: any[]) { this.callMethod('strokeText', args); }
    getTransform(): DOMMatrix {
        throw new Error("Method not implemented.");
    }
    resetTransform() { this.callMethod('resetTransform', []); }
    rotate(angle: number): void ;
    rotate(...args: any[]) { this.callMethod('rotate', args); }
    scale(x: number, y: number): void;
    scale(...args: any[]) { this.callMethod('scale', args); }
    setTransform(a: number, b: number, c: number, d: number, e: number, f: number): void;
    setTransform(transform?: DOMMatrix2DInit): void;
    setTransform(...args: any[]) { this.callMethod('setTransform', args); }
    transform(a: number, b: number, c: number, d: number, e: number, f: number): void;
    transform(...args: any[]) { this.callMethod('transform', args); }
    translate(x: number, y: number): void;
    translate(...args: any[]) { this.callMethod('translate', args); }
    drawFocusIfNeeded(element: Element): void;
    drawFocusIfNeeded(path: Path2D, element: Element): void;
    drawFocusIfNeeded(...args: any[]) { this.callMethod('drawFocusIfNeeded', args); }
    scrollPathIntoView(): void;
    scrollPathIntoView(path: Path2D): void;
    scrollPathIntoView(...args: any[]) { this.callMethod('scrollPathIntoView', args); }
}