export default class Preload {
    private div: HTMLDivElement

    public constructor(div: HTMLDivElement) {
        this.div = div;
        this.loadCharSprites();
        this.loadPkm();
    }

    private loadPkm(): void {
        let arr: HTMLImageElement[] = [];
        for (let i = 0; i < 721; i++) {
            arr[i] = new Image(0,0);
            arr[i].setAttribute('src', `img/mons/${i+1}.png`);
            arr[i].onload = () => {
                this.div.appendChild(arr[i]);
            }
        }
    }

    private loadCharSprites(){
        let arr: HTMLImageElement[] = [];
        for (let i = 0; i < 4; i++) {
            arr[i]= new Image(0,0);
            arr[i].setAttribute('src', `img/char/${i+1}.png`);
            arr[i].onload = () => {
                this.div.appendChild(arr[i]);
            }
        }
    }
}