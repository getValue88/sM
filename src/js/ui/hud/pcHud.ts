import Canvas from "../canvas";
import Player from "../../player/player";

export default class PcHud extends Canvas {
    private w = this.canvas.width / 17
    private h = this.canvas.height / 11
    private player: Player
    private pc = new Image()
    private isDraw: boolean = false
    private box2: boolean = false
    private box3: boolean = false
    private box4: boolean = false
    private activeBox: number

    constructor(canvas: HTMLCanvasElement, player: Player) {
        super(canvas);
        this.player = player;
        this.pc.setAttribute('src', 'img/hud/2.png');
        this.activeBox = 1;
    }

    public getBox(n: number): boolean | undefined {
        switch (n) {
            case 2: {
                return this.box2;
            }
            case 3: {
                return this.box3;
            }
            case 4: {
                return this.box4;
            }
        }
    }
    public getActiveBox(): number {
        return this.activeBox;
    }

    public draw(): void {
        if (!this.isDraw) {
            this.context.beginPath();
            this.context.moveTo(this.w * .1, this.h * 1.49);
            this.context.lineTo(this.w * 16.9, this.h * 1.49);

            this.context.moveTo(this.w * 16.4, this.h);
            this.context.lineTo(this.w * 16.4, this.h * 1.5);
            this.context.stroke();

            this.context.fillStyle = "rgba(77, 77, 77, 1)";
            this.context.fillRect(this.w * .1, this.h, this.w * 16.8, this.h * .5);

            this.context.fillStyle = "black";
            this.context.rect(this.w * .1, this.h, this.w * 16.8, this.h * 9);

            this.context.fillStyle = "rgba(77, 77, 77, .5)";
            this.context.fillRect(this.w * .1, this.h, this.w * 16.8, this.h * 9);

            this.context.stroke();

            this.context.font = "3vw Georgia";
            this.context.fillStyle = "white";
            this.context.textBaseline = "middle";
            this.context.fillText("PC", this.w * .6, this.h * 1.25);
            this.context.fillText("x", this.w * 16.52, this.h * 1.23);
            this.context.font = "2vw Georgia";
            this.context.fillStyle = "white";
            this.context.fillText("Box 1", this.w * 1.5, this.h * 1.25);

            this.context.stroke();


            this.context.drawImage(this.pc, this.w * .1, this.h, this.w * .5, this.h * .5);
            this.isDraw = true;
            this.drawBox(this.player.getPc(), this.player.getImgArr(), 1);
            this.onBox(1);
            this.canvas.classList.add("zIndex");
            this.canvas.focus();

        } else {
            this.clearInv();
        }
    }

    public clearInv(): void {
        this.context.clearRect(this.w * .05, this.h * .95, this.w * 16.9, this.h * 9.1);
        this.isDraw = false;
        this.canvas.classList.remove("zIndex");
        this.canvas.blur();
    }

    public isdraw(): boolean {
        return this.isDraw;
    }


    public drawBox(arr: number[], imgs: HTMLImageElement[], n: number): void {
        this.activeBox = n;
        if (n == 1) {
            n = 0;
        } else if (n == 2) {
            n = 240
        } else if (n == 3) {
            n = 480
        } else if (n == 4) {
            n = 720
        }

        let x = this.w * .05;
        let y = this.h * 1.6;
        let tx = x + this.w * .25;
        let ty = y + this.h * .7;

        for (let i = n; i < imgs.length; i++) {
            let cant;
            let lastBar;

            this.context.drawImage(imgs[i], x, y, this.w * .7, this.h * .7);
            x += this.w * .7;

            cant = imgs[i].src;
            lastBar = cant.lastIndexOf("/");
            cant = cant.slice(lastBar + 1, cant.length - 4);
            this.context.font = '2vw Georgia';
            this.context.fillStyle = "white";
            if (arr[parseInt(cant) - 1] > 1)
                this.context.fillText(`${arr[parseInt(cant) - 1]}`, tx, ty);

            tx += this.w * .7;

            if (x > this.w * 16.2) {
                x = this.w * .05;
                y += this.h * .8;
                tx = x + this.w * .25;
                ty += this.h * .8;
            }
            if (imgs.length >= 240) {
                this.context.font = "2vw Georgia";
                this.context.fillText(`Box 2`, this.w * 2.6, this.h * 1.25);
                this.box2 = true;
            }
            if (imgs.length >= 480) {
                this.context.font = "2vw Georgia";
                this.context.fillText(`Box 3`, this.w * 3.7, this.h * 1.25);
                this.box3 = true;
            }
            if (imgs.length >= 720) {
                this.context.font = "2vw Georgia";
                this.context.fillText(`Box 4`, this.w * 4.8, this.h * 1.25);
                this.box4 = true;
            }
            if (i >= n + 239) {
                break;
            }
        }
    }

    public clearBox(): void {
        this.context.clearRect(this.w * .12, this.h * 1.6, this.w * 16.66, this.h * 8.3);
        this.context.fillStyle = "rgba(77, 77, 77, .5)";
        this.context.fillRect(this.w * .12, this.h * 1.6, this.w * 16.665, this.h * 8.3);
    }

    public onBox(n: number): void {
        this.activeBox = n;

        this.context.beginPath();
        this.context.clearRect(this.w * 1.4, this.h * 1.05, this.w * 4.7, this.h * .4);
        this.context.fillStyle = "rgba(77, 77, 77, 1)";
        this.context.fillRect(this.w * 1.38, this.h * 1.03, this.w * 4.74, this.h * .43);
        this.context.fillStyle = "white";
        this.context.fillText("Box 1", this.w * 1.5, this.h * 1.25);
        if (this.box2) {
            this.context.fillStyle = "white";
            this.context.fillText(`Box 2`, this.w * 2.6, this.h * 1.25);
        }
        if (this.box3) {
            this.context.fillStyle = "white";
            this.context.fillText(`Box 3`, this.w * 3.7, this.h * 1.25);
        }
        if (this.box4) {
            this.context.fillStyle = "white";
            this.context.fillText(`Box 4`, this.w * 4.8, this.h * 1.25);
        }

        switch (n) {
            case 1: {
                this.context.fillStyle = "black";
                this.context.rect(this.w * 1.4, this.h * 1.1, this.w, this.h * .3);
                this.context.stroke();
                break;
            }
            case 2: {
                this.context.fillStyle = "black";
                this.context.rect(this.w * 2.5, this.h * 1.1, this.w, this.h * .3);
                this.context.stroke();
                break;
            }
            case 3: {
                this.context.fillStyle = "black";
                this.context.rect(this.w * 3.6, this.h * 1.1, this.w, this.h * .3);
                this.context.stroke();
                break;
            }
            case 4: {
                this.context.fillStyle = "black";
                this.context.rect(this.w * 4.7, this.h * 1.1, this.w, this.h * .3);
                this.context.stroke();
                break;
            }
        }
        this.context.closePath();
    }
}