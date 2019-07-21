import Canvas from "../canvas";
import Player from "../../player/player";

export default class PcHud extends Canvas {
    private w = this.canvas.width / 17
    private h = this.canvas.height / 11
    private player: Player
    private pc = new Image()
    private isDraw: boolean = false

    constructor(canvas: HTMLCanvasElement, player: Player) {
        super(canvas);
        this.player = player;
        this.pc.setAttribute('src', 'img/hud/2.png');
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
            this.context.stroke();


            this.context.drawImage(this.pc, this.w * .1, this.h, this.w * .5, this.h * .5);
            this.isDraw = true;
            this.showItems(this.player.getPc());
            this.canvas.classList.add("zIndex");

            //si esta dibujado, esconderlo
        } else {
            this.clearInv();
        }
    }

    public isdraw(): boolean {
        return this.isDraw;
    }

    public clearInv(): void {
        this.context.clearRect(this.w * .05, this.h * .95, this.w * 16.9, this.h * 9.1);
        this.isDraw = false;
        this.canvas.classList.remove("zIndex");
    }

    private showItems(arr: number[]) {
        let imgs: HTMLImageElement[] = [];
        let j = 0;
        let x = this.w * .05;
        let y = this.h * 1.6;
        let tx = x + this.w * .2;
        let ty = y + this.h * .7;

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] > 0) {
                imgs[j] = new Image();
                imgs[j].setAttribute('src', `img/mons/${i + 1}.png`);
                j++;
            }
        }

        for (let i = 0; i < imgs.length; i++) {
            let cant;
            let lastBar;

            imgs[i].onload = () => {
                this.context.drawImage(imgs[i], x, y, this.w * .7, this.h * .7);
                x += this.w * .7;

                cant = imgs[i].src;
                lastBar = cant.lastIndexOf("/");
                cant = cant.slice(lastBar + 1, cant.length - 4);
                this.context.font = '2vw Georgia';
                this.context.fillText("x" + arr[parseInt(cant) - 1], tx, ty);

                tx += this.w * .7;

                if (x > this.w * 16.2) {
                    x = this.w * .05;
                    y += this.h * .8;
                    tx = x + this.w * .2;
                    ty += this.h * .8;
                }
            }
        }
    }
}