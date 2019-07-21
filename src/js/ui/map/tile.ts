export default class Tile {
    private height: number
    private width: number
    private content: HTMLImageElement

    constructor() {
        this.height = innerHeight/11;
        this.width = innerWidth/17;
        this.content = new Image();
    }

    public setSrc(src: string) {
        this.content.setAttribute('src',src);
    }

    public getSrc() {
        return this.content;
    }

    public setGrassSrc() {
        let src: number = Math.random();
        let imgSrc: number;
        if (src > .2) {
            imgSrc = 1;
        } else {
            imgSrc = 2;
        }

        this.content.src = `img/grass/${imgSrc}.png`;
    }

    public setSolidSrc() {
        let randomN = Math.random();
        let randomSolid;
        if (randomN <= .015) {
            this.content.src = `img/mons/${Math.ceil(Math.random() * 721)}.png`;
        } else if (randomN > 0.015 && randomN <= .018) {
            this.content.src = 'img/item/ball.png';
        } else if (randomN > 0.018 && randomN <= .020) {
            this.content.src = 'img/item/nugget.png';
        } else if (randomN > 0.020 && randomN <= .50) {
            randomSolid = Math.random();
            if (randomSolid < .30) {
                this.content.src = 'img/solid/1.png';
            } else {
                this.content.src = 'img/solid/2.png';
            }
        } else {
            this.content.src = "";
        }
    }
    public getWidth():number{
        return this.width;
    }
    public getHeight():number{
        return this.height;
    }
}

