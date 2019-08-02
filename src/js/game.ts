import Grass from "./ui/map/grass";
import Solid from "./ui/map/solid";
import Player from "./player/player";
import Action from "./controls/action";
import Hud from "./ui/hud/hud";
import ItemHud from "./ui/hud/itemHud";
import PcHud from "./ui/hud/pcHud";
import Keyboard from "./controls/keyboard";
import Mouse from "./controls/mouse";
import descHud from "./ui/hud/descHud";
import DescHud from "./ui/hud/descHud";

export default class Game {
    private grass: Grass
    private solid: Solid
    private player: Player
    private action: Action
    private hud: Hud
    private invHud: ItemHud
    private pcHud: PcHud
    private descHud: descHud
    private keyboard: Keyboard
    private mouse: Mouse

    public constructor(gMapCanvas: HTMLCanvasElement, sMapCanvas: HTMLCanvasElement, hudCanvas: HTMLCanvasElement, itemHudCanvas: HTMLCanvasElement, pcHudCanvas: HTMLCanvasElement, descHud: HTMLCanvasElement) {
        this.player = new Player();
        this.grass = new Grass(gMapCanvas);
        this.solid = new Solid(sMapCanvas);
        this.hud = new Hud(hudCanvas, this.player);
        this.action = new Action(this.hud, this.player);
        this.invHud = new ItemHud(itemHudCanvas, this.player);
        this.pcHud = new PcHud(pcHudCanvas, this.player);
        this.descHud = new DescHud(descHud);
        this.keyboard = new Keyboard(this.action, this.invHud, this.pcHud, this.player);
        this.mouse = new Mouse(this.hud, this.invHud, this.pcHud, this.player, this.descHud);
    }

    public getGrass(): Grass {
        return this.grass;
    }
    public getSolid(): Solid {
        return this.solid;
    }
    public getPlayer(): Player {
        return this.player;
    }
    public getAction(): Action {
        return this.action;
    }
    public getHud(): Hud {
        return this.hud;
    }
    public getInvHud(): ItemHud {
        return this.invHud;
    }
    public getPcHud(): PcHud {
        return this.pcHud;
    }
    public getDescHud(): DescHud {
        return this.descHud;
    }
    public getKeyboard(): Keyboard {
        return this.keyboard;
    }
    public getMouse(): Mouse {
        return this.mouse;
    }

    public startGame(): void {
        this.grass.load();
        this.solid.load();
        this.hud.draw();
    }
}