import * as pk from '../../data/dex'
import Canvas from '../canvas';

export default class DescHud extends Canvas {
    private w = this.canvas.width / 17
    private h = this.canvas.height / 11
    // private isDraw: boolean = false

    public constructor(canvas: HTMLCanvasElement) {
        super(canvas);
    }

    public draw(n: number): void {
        //if is found on dictionary, draw description
        if (pk.default[n] != undefined) {

            this.canvas.classList.add("zIndex");
            this.canvas.focus();

            this.drawWindow();
            this.displayAbilities(n);
            this.displayNameNum(n);
            this.displayImgs(n);
            this.displayStats(n);
        }
    }
    public clearDescHud(): void {
        this.context.clearRect(0, 0, innerWidth, innerHeight);
        this.canvas.classList.remove("zIndex");
        this.canvas.blur();
    }

    private drawWindow(): void {
        //window background, border and title background
        this.context.fillStyle = "rgba(77, 77, 77, 1)";
        this.context.fillRect(this.canvas.width / 2 - this.w * 4.5, this.h * 2, this.w * 9, this.h * 5.75);
        this.context.fillStyle = "black";
        this.context.rect(this.canvas.width / 2 - this.w * 4.5, this.h * 2, this.w * 9, this.h * 5.75);
        this.context.fillRect(this.canvas.width / 2 - this.w * 4.5, this.h * 2, this.w * 9, this.h * 1);
    }

    private displayAbilities(n: number): void {
        //abilitys background
        this.context.fillRect(this.canvas.width / 2 - this.w * 4.5, this.h * 5.25, this.w * 4.5, this.h * .5);
        this.context.fillRect(this.canvas.width / 2 - this.w * 4.5, this.h * 6.5, this.w * 4.5, this.h * 1);

        //abilities
        this.context.fillStyle = "white";
        this.context.font = `${this.h * .2}px Verdana`;
        this.context.fillText(`Ability: ${pk.default[n].ability[0]}`, this.w * 4.1, this.h * 5.55);
        if (pk.default[n].ability[1]) {
            this.context.fillStyle = "black";
            this.context.fillRect(this.canvas.width / 2 - this.w * 4.5, this.h * 5.75, this.w * 4.5, this.h * .5);

            this.context.fillStyle = "white";
            this.context.fillText(`${pk.default[n].ability[1]}`, this.w * 5.3, this.h * 6.05);
        }

        //hidden ability
        this.context.fillText(`Hidden Ability:`, this.w * 4.1, this.h * 6.8);
        this.context.fillText(`${pk.default[n].hAbility}`, this.w * 5.3, this.h * 7.3);
    }

    private displayNameNum(n: number): void {
        // num
        this.context.fillStyle = "white";
        this.context.font = `${this.h * .2}px Arial Black`;
        this.context.fillText(`#${pk.default[n].num}`, this.canvas.width / 2 - this.w, this.h * 2.60);

        //name
        this.context.fillStyle = "white";
        this.context.font = `${this.h * .4}px Arial Black`;
        this.context.fillText(`${pk.default[n].name}`, this.canvas.width / 2, this.h * 2.65);
    }

    private displayImgs(n: number): void {
        //pk type 1 image
        const imgType1 = new Image();
        imgType1.setAttribute('src', `img/types/${pk.default[n].type[0]}.png`);
        imgType1.onload = () => {
            this.context.drawImage(imgType1, this.w * 4.1, this.h * 2.3, this.w * 1, this.h * .4);
        }

        //pk type 2 image if exists
        if (pk.default[n].type[1] != undefined) {
            let imgType2 = new Image();
            imgType2.setAttribute('src', `img/types/${pk.default[n].type[1]}.png`);
            imgType2.onload = () => {
                this.context.drawImage(imgType2, this.w * 5.2, this.h * 2.3, this.w * 1, this.h * .4);
            }
        }

        //pk image
        let img = new Image();
        img.setAttribute('src', `${pk.default[n].src}`);
        img.onload = () => {
            this.context.drawImage(img, this.w * 5.15, this.h * 3, this.w * 2.2, this.h * 2.25);
        }
    }

    private displayStats(n: number): void {
        let aux = 3.25;
        const auxArr = ["hp", "atk", "def", "spa", "spd", "spe"];
        for (let i = 0; i < 6; i++) {

            //background
            this.context.fillStyle = "black";
            this.context.fillRect(this.canvas.width / 2 + this.w * .1, this.h * aux, this.w * 4.4, this.h * .5);

            // text, numbers and bars
            this.context.font = `${this.h * .2}px Verdana`;
            this.context.fillStyle = "white";
            this.context.fillText(auxArr[i], this.canvas.width / 2 + this.w * .15, this.h * (aux + .3));
            this.context.fillText(`${pk.default[n].stats[i]}`, this.canvas.width / 2 + this.w * 3.8, this.h * (aux + .3));
            this.context.fillRect(this.w * 9.25, this.h * (aux + .15), parseInt(pk.default[n].stats[i]) * this.w * 3 / 255, this.h * .15);

            aux += .75;
        }
        this.context.stroke();
    }
}

