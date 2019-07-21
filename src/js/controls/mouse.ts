import ItemHud from '../ui/hud/itemHud'
import PcHud from '../ui/hud/pcHud'
import Hud from '../ui/hud/hud';

export default class Mouse {
    private w = innerWidth / 17
    private h = innerHeight / 11
    private mouseEv?: MouseEvent
    private clientX?: number
    private clientY?: number
    // private action:Action = new Action()
    private hud: Hud
    private invHud: ItemHud
    private pcHud: PcHud


    constructor(hud: Hud, invHud: ItemHud, pcHud: PcHud) {
        this.hud = hud;
        this.invHud = invHud;
        this.pcHud = pcHud;
    }

    public onClickHud(e: MouseEvent) {
        this.mouseEv = e;
        this.clientX = this.mouseEv.clientX;
        this.clientY = this.mouseEv.clientY;

        if ((this.clientX >= this.w * 13.4 && this.clientX <= this.w * 14.2) && (this.clientY >= this.h * 10.1 && this.clientY <= this.h * 10.9)) {
            this.invHud.draw();


        } else if ((this.clientX >= this.w * 14.3 && this.clientX <= this.w * 15.1) && (this.clientY >= this.h * 10.1 && this.clientY <= this.h * 10.9)) {
            this.pcHud.draw();
        }
    }

    public onClickInvHud(e: MouseEvent) {
        this.mouseEv = e;
        this.clientX = this.mouseEv.clientX;
        this.clientY = this.mouseEv.clientY;

        if ((this.clientX >= this.w * 13.4 && this.clientX <= this.w * 14.2) && (this.clientY >= this.h * 10.1 && this.clientY <= this.h * 10.9)) {
            this.invHud.draw();

        } else if ((this.clientX >= this.w * 14.3 && this.clientX <= this.w * 15.1) && (this.clientY >= this.h * 10.1 && this.clientY <= this.h * 10.9)) {
            this.invHud.clearInv();
            this.pcHud.draw();
        } else if((this.clientX >= this.w * 11 && this.clientX <= this.w * 11.5) && (this.clientY >= this.h  && this.clientY <= this.h * 1.5)){
            this.invHud.clearInv();
        }
    }

    public onClickPcHud(e: MouseEvent) {
        this.mouseEv = e;
        this.clientX = this.mouseEv.clientX;
        this.clientY = this.mouseEv.clientY;

        if ((this.clientX >= this.w * 13.4 && this.clientX <= this.w * 14.2) && (this.clientY >= this.h * 10.1 && this.clientY <= this.h * 10.9)) {
            this.pcHud.clearInv();
            this.invHud.draw();

        } else if ((this.clientX >= this.w * 14.3 && this.clientX <= this.w * 15.1) && (this.clientY >= this.h * 10.1 && this.clientY <= this.h * 10.9)) {
            this.pcHud.draw();
        }else if((this.clientX >= this.w * 16.39 && this.clientX <= this.w * 16.9) && (this.clientY >= this.h  && this.clientY <= this.h * 1.5)){
            this.pcHud.clearInv();
        }
    }
}