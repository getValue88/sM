export default class Player {
    private name: string = ""
    private sprite = ""
    private pc: number[] = new Array(721)
    private inventory: number[] = new Array(64)
    private money: number = 0

    public constructor() {
        for (let i = 0; i < this.pc.length; i++) {
            this.pc[i] = 1;
        }
        for (let i = 0; i < this.inventory.length; i++) {
            this.inventory[i] = 1;
        }
    }

    public getMoney(): number {
        return this.money;
    }

    public getInv(): number[] {
        return this.inventory;
    }
    
    public getPc(): number[] {
        return this.pc;
    }

    public addObject(pc_inv: number[], index: number): void {
        if (pc_inv == this.pc)
            this.pc[index - 1]++;
        if (pc_inv == this.inventory)
            this.inventory[index - 1]++;
    }

    public addMoney(n: number): void {
        this.money += n;
    }

    public getImgArr(): HTMLImageElement[] {
        let imgs: HTMLImageElement[] = [];
        let j = 0;

        for (let i = 0; i < this.getPc().length; i++) {
            if (this.getPc()[i] > 0) {
                imgs[j] = new Image();
                imgs[j].setAttribute('src', `img/mons/${i + 1}.png`);
                j++;
            }
        }
        return imgs;
    }
}