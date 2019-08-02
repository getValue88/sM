import Grass from '../ui/map/grass'
import Solid from '../ui/map/solid'
import Tile from '../ui/map/tile'
import Player from '../player/player'
import Hud from '../ui/hud/hud'

export default class Action {
    private player: Player
    private hud: Hud

    public constructor(hud: Hud, player: Player) {
        this.hud = hud;
        this.player = player;
    }
    public onUp(grassMap: Grass, solidMap: Solid): void {
        if (solidMap.getContent()[4][8].getSrc().getAttribute('src') == "" || solidMap.getContent()[4][8].getSrc().getAttribute('src') == "img/solid/1.png") {
            let getNewRow = this.onMove(17);
            grassMap.getContent().unshift(getNewRow[0]);
            grassMap.getContent().pop();
            solidMap.getContent().unshift(getNewRow[1]);
            solidMap.getContent().pop();

            this.setCharSrc(2, solidMap);
            this.redraw(6, 8, solidMap);

            solidMap.getContext().clearRect(0, 0, solidMap.getContext().canvas.width, solidMap.getContext().canvas.height);
        } else {
            this.setCharSrc(2, solidMap);
        }
    }

    public onDown(grassMap: Grass, solidMap: Solid): void {
        if (solidMap.getContent()[6][8].getSrc().getAttribute('src') == "" || solidMap.getContent()[6][8].getSrc().getAttribute('src') == "img/solid/1.png") {
            let getNewRow = this.onMove(17);
            grassMap.getContent().push(getNewRow[0]);
            grassMap.getContent().shift();
            solidMap.getContent().push(getNewRow[1]);
            solidMap.getContent().shift();

            this.setCharSrc(1, solidMap);
            this.redraw(4, 8, solidMap);

            solidMap.getContext().clearRect(0, 0, solidMap.getContext().canvas.width, solidMap.getContext().canvas.height);
        } else {
            this.setCharSrc(1, solidMap);
        }
    }

    public onLeft(grassMap: Grass, solidMap: Solid): void {
        if (solidMap.getContent()[5][7].getSrc().getAttribute('src') == "" || solidMap.getContent()[5][7].getSrc().getAttribute('src') == "img/solid/1.png") {
            let getNewCol = this.onMove(11);
            for (let i = 0; i < grassMap.getContent().length; i++) {
                grassMap.getContent()[i].unshift(getNewCol[0][i]);
                grassMap.getContent()[i].pop();
                solidMap.getContent()[i].unshift(getNewCol[1][i]);
                solidMap.getContent()[i].pop();
            }

            this.setCharSrc(3, solidMap);
            this.redraw(5, 9, solidMap);

            solidMap.getContext().clearRect(0, 0, solidMap.getContext().canvas.width, solidMap.getContext().canvas.height);
        } else {
            this.setCharSrc(3, solidMap);
        }
    }

    public onRight(grassMap: Grass, solidMap: Solid): void {
        if (solidMap.getContent()[5][9].getSrc().getAttribute('src') == "" || solidMap.getContent()[5][9].getSrc().getAttribute('src') == "img/solid/1.png") {
            let getNewCol = this.onMove(11);
            for (let i = 0; i < grassMap.getContent().length; i++) {
                grassMap.getContent()[i].push(getNewCol[0][i]);
                grassMap.getContent()[i].shift();
                solidMap.getContent()[i].push(getNewCol[1][i]);
                solidMap.getContent()[i].shift();
            }

            this.setCharSrc(4, solidMap);
            this.redraw(5, 7, solidMap);

            solidMap.getContext().clearRect(0, 0, solidMap.getContext().canvas.width, solidMap.getContext().canvas.height);
        } else {
            this.setCharSrc(4, solidMap);
        }
    }

    public pickObject(direction: string, solidMap: Solid): void {
        let x: number;
        let y: number;
        let nextTo: string[];
        switch (direction) {
            case "up": {
                x = 4
                y = 8
                break;
            }
            case "down": {
                x = 6;
                y = 8;
                break;
            }
            case "left": {
                x = 5;
                y = 7;
                break;
            }
            case "right": {
                x = 5;
                y = 9;
                break;
            }
            default: {
                x = -1
                y = -1;
            }
        }
        nextTo = this.getRouteFrom(x, y, solidMap);
        if (nextTo[0] == "mons") {
            this.redraw(x, y, solidMap);
            this.player.addObject(this.player.getPc(), parseInt(nextTo[1]));
            this.hud.showMessageTop(nextTo[0], nextTo[1]);
            //si el objeto es un item
        } else if (nextTo[0] == "item") {
            this.redraw(x, y, solidMap);

            //si es nugget
            if (nextTo[1] == "nugget") {
                this.player.addMoney(1);
                this.hud.refreshMoney();
                this.hud.showMessageTop(nextTo[0], nextTo[1]);

                //si es ball
            } else {
                let item = this.getRandomItem();
                this.player.addObject(this.player.getInv(), item);
                this.hud.showMessageTop(nextTo[0], item.toString());
            }
        }
    }

    private getRouteFrom(x: number, y: number, solidMap: Solid): string[] {
        let source;
        let src: string[];

        if (x != -1 && y != -1) {
            source = solidMap.getContent()[x][y].getSrc().getAttribute('src');

            if (source == null)
                source = "";
            else {
                source = source.slice(4, -4);
                src = source.split("/");
                return src;
            }
        }
        return ["", ""];
    }

    private onMove(n: number): Tile[][] {
        let newRowSolid: Tile[] = new Array(n);
        let newRowGrass: Tile[] = new Array(n);

        for (let i = 0; i < newRowSolid.length; i++) {
            newRowSolid[i] = new Tile();
            newRowGrass[i] = new Tile();

            newRowGrass[i].setGrassSrc();
            newRowSolid[i].setSolidSrc();
        }
        return [newRowGrass, newRowSolid]
    }

    private redraw(x: number, y: number, solidMap: Solid): void {
        let w = solidMap.getContext().canvas.width / 17;
        let h = solidMap.getContext().canvas.height / 11;
        solidMap.getContext().clearRect(y * w, x * h, w, h);
        if (solidMap.getContent()[x][y].getSrc().getAttribute('src') != "img/solid/1.png")
            solidMap.getContent()[x][y].setSrc("");
        else {
            solidMap.getContent()[x][y].setSrc("img/solid/1.png");
        }
        solidMap.getContext().drawImage(solidMap.getContent()[x][y].getSrc(), x * w, y * h, w, h);
    }

    private setCharSrc(n: number, solidMap: Solid): void {
        solidMap.getContext().clearRect(0, 0, solidMap.getContext().canvas.width, solidMap.getContext().canvas.height);


        if (solidMap.getContent()[5][8].getSrc().getAttribute('src') == "img/solid/1.png")
            solidMap.getContent()[5][8].setSrc("img/solid/1.png");
        else {
            solidMap.getContent()[5][8].setSrc(`img/char/${n}.png`);
        }
    }

    private getRandomItem(): number {
        let randomTier: number = Math.random();
        let randomItem: number;

        //vitaminas
        if (randomTier <= .3) {
            randomItem = Math.ceil(Math.random() * 6);

            //brazales
        } else if (randomTier > .3 && randomTier <= .6) {
            randomItem = Math.ceil(Math.random() * 6) + 6;

            //bayas
        } else if (randomTier > .6 && randomTier <= .85) {
            randomItem = Math.ceil(Math.random() * 27) + 12;

            //mid battle items
        } else if (randomTier > .85 && randomTier <= .95) {
            randomItem = Math.ceil(Math.random() * 11) + 38;

            //high battle items
        } else if (randomTier > .95 && randomTier <= .995) {
            randomItem = Math.ceil(Math.random() * 14) + 49;

            //pp max
        } else {
            randomItem = 64;
        }

        return randomItem;
    }
}