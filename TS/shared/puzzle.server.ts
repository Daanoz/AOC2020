import WebSocket from 'ws';

export class PuzzleServer {
    private server: WebSocket.Server;
    private sockets: WebSocket[] = [];
    private lastFlush?: string;

    private buffer: {
        type: 'PROP'|'FUNC'|'CLEAR',
        identifier: string,
        args: any[]
    }[] = [];

    private firstRenderPromise: Promise<boolean>;
    private firstRenderResolve?: Function;

    constructor() {
        this.server = new WebSocket.Server({
            port: 9898,
        });
        this.server.on('connection', ws => {
            this.sockets.push(ws);
            if (this.lastFlush) {
                ws.send(this.lastFlush);
                this.resolveFirstRender();
            }
        });
        this.firstRenderPromise = new Promise((resolve, reject) => {
            this.firstRenderResolve = resolve;
        });
        this.clearCanvas();
    }

    public waitForFirstRender() {
        return this.firstRenderPromise;
    }
    private resolveFirstRender() {
        if (this.firstRenderResolve) { this.firstRenderResolve(true); }
        this.firstRenderResolve = undefined;
    }

    public clearCanvas() {
        this.buffer = [];
        this.buffer.push({
            type: 'CLEAR',
            identifier: '',
            args: []
        });
    }
    public addToBuffer(type: 'PROP'|'FUNC', identifier: string, args: any[]) {
        this.buffer.push({
            type,
            identifier,
            args
        });
    }

    public flush() {
        const data = JSON.stringify(this.buffer);
        this.sockets.forEach(s => s.send(data));
        if (this.sockets.length > 0) {
            this.resolveFirstRender();
        }
        this.lastFlush = data;
        this.buffer = [];
    }

    public close() {
        try { this.sockets.forEach(s => s.close()); } catch(e) { }
        try { this.server.close(); } catch(e) { }
    }
}