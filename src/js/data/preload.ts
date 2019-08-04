export default class Preload {
    private div: HTMLDivElement

    public constructor(div: HTMLDivElement) {
        this.div = div;
        this.loadImg("mons", 721);
        this.loadImg("char", 4);
        this.loadImg("grass", 2);
        this.loadImg("solid", 2);
        this.loadImg("grass", 2);
        this.loadImg("item", 64);
        this.loadExtra();
    }

    private loadImg(type: string, length: number): void {
        let arr: HTMLImageElement[] = [];
        for (let i = 0; i < length; i++) {
            arr[i] = new Image(0, 0);
            arr[i].setAttribute('src', `img/${type}/${i + 1}.png`);
            arr[i].onload = () => {
                this.div.appendChild(arr[i]);
            }
        }
    }
    
    private loadExtra() {
        let arr: HTMLImageElement[] = [
            new Image(0, 0),
            new Image(0, 0)
        ];
        arr[0].setAttribute('src', `img/item/ball.png`);
        arr[1].setAttribute('src', `img/item/nugget.png`);


        for (let i = 0; i < arr.length; i++) {
            arr[i].onload = () => {
                this.div.appendChild(arr[i]);
            }
        }
    }
}