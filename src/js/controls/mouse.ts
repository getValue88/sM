import ItemHud from '../ui/hud/itemHud'
import PcHud from '../ui/hud/pcHud'
import Hud from '../ui/hud/hud';
import Player from '../player/player';
import DescHud from '../ui/hud/descHud';

export default class Mouse {
    private w: number = innerWidth / 17;
    private h: number = innerHeight / 11;
    private mouseEv?: MouseEvent
    private clientX?: number
    private clientY?: number
    private hud: Hud
    private invHud: ItemHud
    private pcHud: PcHud
    private descHud: DescHud
    private player: Player

    public constructor(hud: Hud, invHud: ItemHud, pcHud: PcHud, player: Player, descHud: DescHud) {
        this.hud = hud;
        this.invHud = invHud;
        this.pcHud = pcHud;
        this.player = player;
        this.descHud = descHud;
    }

    //hud principial
    public onClickHud(e: MouseEvent): void {
        this.mouseEv = e;
        this.clientX = this.mouseEv.clientX;
        this.clientY = this.mouseEv.clientY;

        //bag button
        if ((this.clientX >= this.w * 13.4 && this.clientX <= this.w * 14.2) && (this.clientY >= this.h * 10.1 && this.clientY <= this.h * 10.9)) {
            this.invHud.draw();

            //pc button
        } else if ((this.clientX >= this.w * 14.3 && this.clientX <= this.w * 15.1) && (this.clientY >= this.h * 10.1 && this.clientY <= this.h * 10.9)) {
            this.pcHud.draw();
        }
    }

    //hud items
    public onClickInvHud(e: MouseEvent): void {
        this.mouseEv = e;
        this.clientX = this.mouseEv.clientX;
        this.clientY = this.mouseEv.clientY;

        //bag button
        if ((this.clientX >= this.w * 13.4 && this.clientX <= this.w * 14.2) && (this.clientY >= this.h * 10.1 && this.clientY <= this.h * 10.9)) {
            this.invHud.draw();
        }

        //pc button
        if ((this.clientX >= this.w * 14.3 && this.clientX <= this.w * 15.1) && (this.clientY >= this.h * 10.1 && this.clientY <= this.h * 10.9)) {
            this.invHud.clearInv();
            this.pcHud.draw();
        }

        // close window
        if ((this.clientX >= this.w * 11 && this.clientX <= this.w * 11.5) && (this.clientY >= this.h && this.clientY <= this.h * 1.5)) {
            this.invHud.clearInv();
        }
    }

    //pc hud
    public onClickPcHud(e: MouseEvent): void {
        this.mouseEv = e;
        this.clientX = this.mouseEv.clientX;
        this.clientY = this.mouseEv.clientY;

        //bag button
        if ((this.clientX >= this.w * 13.4 && this.clientX <= this.w * 14.2) && (this.clientY >= this.h * 10.1 && this.clientY <= this.h * 10.9)) {
            this.pcHud.clearInv();
            this.invHud.draw();

        }
        //pc button
        if ((this.clientX >= this.w * 14.3 && this.clientX <= this.w * 15.1) && (this.clientY >= this.h * 10.1 && this.clientY <= this.h * 10.9)) {
            this.pcHud.draw();
        }
        //close window
        if ((this.clientX >= this.w * 16.39 && this.clientX <= this.w * 16.9) && (this.clientY >= this.h && this.clientY <= this.h * 1.5)) {
            this.pcHud.clearInv();
        }

        //box 1 button
        if ((this.clientX >= this.w * 1.4 && this.clientX <= this.w * 2.4) && (this.clientY >= this.h * 1.1 && this.clientY <= this.h * 1.4)) {
            this.pcHud.clearBox();
            this.pcHud.drawBox(this.player.getPc(), this.player.getImgArr(), 1);
            this.pcHud.onBox(1);
        }
        //box 2 button
        if (this.pcHud.getBox(2) && (this.clientX > this.w * 2.6 && this.clientX < this.w * 3.6) && (this.clientY > this.h * 1.1 && this.clientY < this.h * 1.4)) {
            this.pcHud.clearBox();
            this.pcHud.drawBox(this.player.getPc(), this.player.getImgArr(), 2);
            this.pcHud.onBox(2);
        }
        //box 3 button
        if (this.pcHud.getBox(3) && (this.clientX >= this.w * 3.6 && this.clientX <= this.w * 4.6) && (this.clientY >= this.h * 1.1 && this.clientY <= this.h * 1.4)) {
            this.pcHud.clearBox();
            this.pcHud.drawBox(this.player.getPc(), this.player.getImgArr(), 3);
            this.pcHud.onBox(3);
        }
        //box 4 button
        if (this.pcHud.getBox(4) && (this.clientX >= this.w * 4.7 && this.clientX <= this.w * 5.7) && (this.clientY >= this.h * 1.1 && this.clientY <= this.h * 1.4)) {
            this.pcHud.clearBox();
            this.pcHud.drawBox(this.player.getPc(), this.player.getImgArr(), 4);
            this.pcHud.onBox(4);
        }


        //match the mon clicked in the box with pc player array then show description
        if ((this.clientX >= this.w * .1 && this.clientX <= this.w * 16.8) && (this.clientY >= this.h * 1.6 && this.clientY <= this.h * 9.6)) {
            let x = Math.floor(((this.clientX - this.w * .1) / this.w) / .6958)
            let y = Math.floor(((this.clientY - this.h * 1.6) / this.h) / .8)
            // alert(x + y * 24);
            let n: number = x + y * 24 + (this.pcHud.getActiveBox() - 1) * 240;
            let j = 0;

            for (let i = 0; i < this.player.getPc().length - 1; i++) {
                if (this.player.getPc()[i] > 0)
                    j++;
                if (j > n) {
                    this.descHud.draw(i);
                    break;
                }
            }
        }
    }

    public onDescHudClick(e: MouseEvent): void {
        this.descHud.clearDescHud();
    }
}
