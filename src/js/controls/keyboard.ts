import Grass from '../ui/map/grass'
import Solid from '../ui/map/solid'
import Action from './action';
import ItemHud from '../ui/hud/itemHud';
import PcHud from '../ui/hud/pcHud';
import Player from '../player/player';

export default class Keyboard {
    private keyboardEv?: KeyboardEvent
    private keyCode?: number
    private action: Action
    private prevKey: number = 83
    private itemHud: ItemHud
    private pcHud: PcHud
    private player: Player

    constructor(action: Action, itemHud: ItemHud, pcHud: PcHud, player: Player) {
        this.action = action;
        this.itemHud = itemHud;
        this.pcHud = pcHud;
        this.player = player;
    }

    public onKeypress(e: KeyboardEvent, grassMap: Grass, solidMap: Solid): void {
        this.keyboardEv = e;
        if (this.keyboardEv)
            this.keyCode = this.keyboardEv.keyCode;
        switch (this.keyCode) {
            // W - up arrow
            case 87:
            case 38: {
                this.action.onUp(grassMap, solidMap);
                this.prevKey = 87;
                break;
            }
            // S - down arrow
            case 83:
            case 40: {
                this.action.onDown(grassMap, solidMap);
                this.prevKey = 83;
                break;
            }
            // A - left arrow
            case 65:
            case 37: {
                this.action.onLeft(grassMap, solidMap);
                this.prevKey = 65;
                break;
            }
            // D - right arrow
            case 68:
            case 39: {
                this.action.onRight(grassMap, solidMap);
                this.prevKey = 68;
                break;
            }
            // Z - K  pick
            case 90:
            case 75: {
                switch (this.prevKey) {
                    //arriba
                    case 87: {
                        this.action.pickObject("up", solidMap);
                        break;
                    }
                    //abajo
                    case 83: {
                        this.action.pickObject("down", solidMap);
                        break;
                    }
                    //izquierda
                    case 65: {
                        this.action.pickObject("left", solidMap);
                        break;
                    }
                    //derecha
                    case 68: {
                        this.action.pickObject("right", solidMap);
                        break;
                    }
                }
                break;
            }
            case 73: {
                this.pcHud.clearInv();
                this.pcHud.getContext().canvas.classList.remove('zIndex');
                this.itemHud.draw();

                break;
            }
            case 80: {
                this.itemHud.clearInv();
                this.itemHud.getContext().canvas.classList.remove('zIndex');
                this.pcHud.draw();
                break;
            }
            
        }
    }
    public onKeyPressPcHud(e: KeyboardEvent){
        this.keyboardEv = e;
        if (this.keyboardEv)
            this.keyCode = this.keyboardEv.keyCode;
            // alert(this.keyCode)
        switch(this.keyCode){
            case 49: {
                this.pcHud.clearBox();
                this.pcHud.drawBox(this.player.getPc(), this.player.getImgArr(), 1);
                this.pcHud.onBox(1);
                break;
            }
            case 50: {
                if (this.pcHud.getBox(2)) {
                    this.pcHud.clearBox();
                    this.pcHud.drawBox(this.player.getPc(), this.player.getImgArr(), 2);
                    this.pcHud.onBox(2);
                }
                break;
            }
            case 51: {
                if(this.pcHud.getBox(3)){
                    this.pcHud.clearBox();
                    this.pcHud.drawBox(this.player.getPc(), this.player.getImgArr(), 3);
                    this.pcHud.onBox(3);
                }
                break;
            }
            case 52: {
                if(this.pcHud.getBox(4)){
                    this.pcHud.clearBox();
                    this.pcHud.drawBox(this.player.getPc(), this.player.getImgArr(), 4);
                    this.pcHud.onBox(4);
                }
                break;
            }
        }
    }
}


