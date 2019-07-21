import ItemHud from '../ui/hud/itemHud'
import PcHud from '../ui/hud/pcHud'
import Hud from '../ui/hud/hud';

export default class Mouse {
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

    public onClickHud(e: MouseEvent, ) {

        this.mouseEv = e;
        if (this.mouseEv) {
            this.clientX = this.mouseEv.clientX;
            this.clientY = this.mouseEv.clientY;
        }
    }
}