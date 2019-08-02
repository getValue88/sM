import Canvas from "../canvas";
import Player from '../../player/player'
import pk from "../../data/dex";

export default class Hud extends Canvas {
    private w = this.canvas.width / 17
    private h = this.canvas.height / 11
    private bag = new Image()
    private pc = new Image()
    private chat = new Image()
    private menu = new Image()
    private coin = new Image()
    private player: Player


    constructor(canvas: HTMLCanvasElement, player: Player) {
        super(canvas)
        this.bag.setAttribute('src', 'img/hud/1.png');
        this.pc.setAttribute('src', 'img/hud/2.png');
        this.chat.setAttribute('src', 'img/hud/3.png');
        this.menu.setAttribute('src', 'img/hud/4.png');
        this.coin.setAttribute('src', 'img/hud/5.png');
        this.player = player;
    }

    public draw(): void {
        this.drawBorders();
        this.drawBoxes();
        this.drawImgs();
        this.drawMoney();
    }

    public refreshMoney(): void {
        this.context.clearRect(this.w * .5, this.h * .1, this.w * .9, this.h * .39);
        this.context.fillStyle = "rgba(77, 77, 77, .5)"
        this.context.fillRect(this.w * .5, this.h * .1, this.w * .9, this.h * .39);
        this.drawMoney();
    }

    public showMessageTop(object: string, num: string): void {
        let string: string = "";
        let img = new Image();

        this.context.clearRect(this.canvas.width / 2 - this.w * 3, this.h * .1, this.w * 6, this.h * .6);

        //si se atrapo un mon
        if (object == "mons") {
            this.context.fillStyle = "rgba(77, 77, 77, .5)";
            this.context.fillRect(this.canvas.width / 2 - this.w * 3, this.h * .1, this.w * 6, this.h * .6);
            img.src = `img/${object}/${num}.png`;
            string = `${pk[parseInt(num) - 1].name} was catched!`;

            //si es item y...
        } else if (object == "item") {
            this.context.fillStyle = "rgba(77, 77, 77, .5)";
            this.context.fillRect(this.canvas.width / 2 - this.w * 3, this.h * .1, this.w * 4, this.h * .6);
            //es nugget
            if (num == "nugget") {
                img.src = `img/${object}/${num}.png`;
                string = `You found a ${num}`;

                //es ball
            } else {
                img.src = `img/${object}/ball.png`;
                string = "You found a ";
                let itemImg = new Image();
                itemImg.src = `img/item/${num}.png`;
                itemImg.onload = () => {
                    this.context.drawImage(itemImg, this.canvas.width / 2 + this.w * .2, this.h * .1, this.w * .6, this.h * .6);
                }
            }
        }
        img.onload = () => {
            this.context.drawImage(img, this.canvas.width / 2 - this.w * 3, this.h * .1, this.w * .6, this.h * .6);
        }
        this.context.font = "2vw Georgia";
        this.context.fillStyle = "white";
        this.context.textBaseline = "middle";
        this.context.fillText(string, this.canvas.width / 2 - this.w * 2, this.h * .4);

        this.deleteMsg();
    }

    //borrar mensaje superior central
    private deleteMsg(): void {
        setTimeout(() => {
            this.context.clearRect(this.canvas.width / 2 - this.w * 3, this.h * .1, this.w * 6, this.h * .6);
        }, 3000);
    }

    private drawBorders(): void {
        let x = .9;
        this.context.fillStyle = "black"
        for (let i = 0; i < 4; i++) {
            this.context.rect(this.canvas.width - this.w * x, this.canvas.height - this.h * .9, this.w * .8, this.h * .79);
            x += .9;
        }

        this.context.rect(this.w * .1, this.h * .09, this.w * 1.4, this.h * .41);

        this.context.stroke();
    }

    private drawBoxes(): void {
        let x = .9;
        this.context.fillStyle = "rgba(77, 77, 77, .5)"
        for (let i = 0; i < 4; i++) {
            this.context.fillRect(this.canvas.width - this.w * x, this.canvas.height - this.h * .9, this.w * .8, this.h * .8);
            x += .9;
        }

        this.context.fillRect(this.w * .1, this.h * .1, this.w * 1.4, this.h * .4);

        this.context.stroke();
    }

    private drawImgs(): void {
        this.context.drawImage(this.bag, this.canvas.width - this.w * 3.6, this.canvas.height - this.h * .9, this.w * .8, this.h * .8);
        this.context.drawImage(this.pc, this.canvas.width - this.w * 2.7, this.canvas.height - this.h * .9, this.w * .8, this.h * .8);
        this.context.drawImage(this.chat, this.canvas.width - this.w * 1.8, this.canvas.height - this.h * .9, this.w * .8, this.h * .8);
        this.context.drawImage(this.menu, this.canvas.width - this.w * .9, this.canvas.height - this.h * .9, this.w * .8, this.h * .8);
        this.context.drawImage(this.coin, this.w * .1, this.h * .1, this.w * .4, this.h * .4);
    }

    private drawMoney(): void {
        this.context.font = "2.5vw Georgia";
        this.context.fillStyle = "white";
        this.context.textBaseline = "middle";
        this.context.fillText(this.player.getMoney().toString(), this.w * .5, this.h * .25);
    }
}
