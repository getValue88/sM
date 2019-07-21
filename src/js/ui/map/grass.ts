import Tile from "./tile";
import Canvas from "../canvas";

export default class Grass extends Canvas {
    private content: Tile[][]

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);

        this.content = new Array(11);
        for (let i = 0; i < this.content.length; i++) {
            this.content[i] = new Array(17);
        }

        for (let i = 0; i < this.content.length; i++) {
            for (let j = 0; j < this.content[i].length; j++) {
                this.content[i][j] = new Tile();
            }
        }
    }

    public load() {
        for (let i = 0; i < this.content.length; i++) {
            for (let j = 0; j < this.content[i].length; j++) {
                this.content[i][j].setGrassSrc();
            }
        }
    }

    public draw(): void {
        let x = 0;
        let y = 0;
        let w = this.canvas.width / 17;
        let h = this.canvas.height / 11;

        for (let i = 0; i < this.content.length; i++) {
            for (let j = 0; j < this.content[i].length; j++) {
                this.content[i][j].getSrc().onload = () => {
                    for (let k = 0; k < this.content.length; k++) {
                        for (let l = 0; l < this.content[i].length; l++) {
                            this.context.drawImage(this.content[k][l].getSrc(), x, y, w-.5, h-.5);
                            x += w;
                            if (x >= this.canvas.width) {
                                y += h;
                                x = 0;
                            }
                        }
                    }
                }
            }
        }
    }

    public getTile(x: number, y: number): Tile {
        return this.content[x][y];
    }

    public getContent() {
        return this.content;
    }
}

