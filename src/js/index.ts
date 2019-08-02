import Game from './game';
import Preload from './data/preload';

const gMap = <HTMLCanvasElement>document.querySelector("#grass");
const sMap = <HTMLCanvasElement>document.querySelector("#solid");
const hud = <HTMLCanvasElement>document.querySelector("#hud");
const invHud = <HTMLCanvasElement>document.querySelector("#itemHud");
const pcHud = <HTMLCanvasElement>document.querySelector("#pcHud");
const descHud = <HTMLCanvasElement>document.querySelector("#descHud");
const preloadDiv = <HTMLDivElement>document.querySelector("#preloader");

new Preload(preloadDiv);

const game = new Game(gMap, sMap, hud, invHud, pcHud, descHud);

window.onload = () => {
    game.startGame();
    loop();

    window.addEventListener('keydown', function (e) {
        game.getKeyboard().onKeypress(e, game.getGrass(), game.getSolid());
    });

    game.getPcHud().getContext().canvas.addEventListener('keydown', function (e) {
        game.getKeyboard().onKeyPressPcHud(e);
    });

    game.getHud().getContext().canvas.addEventListener('click', function (e) {
        game.getMouse().onClickHud(e);
    });
    game.getInvHud().getContext().canvas.addEventListener('click', function (e) {
        game.getMouse().onClickInvHud(e);
    });
    game.getPcHud().getContext().canvas.addEventListener('click', function (e) {
        game.getMouse().onClickPcHud(e);
    });
    game.getDescHud().getContext().canvas.addEventListener('click', function () {
        game.getDescHud().clearDescHud();
    })

}

function loop() {
    game.getGrass().draw();
    game.getSolid().draw();
    requestAnimationFrame(loop);
}


