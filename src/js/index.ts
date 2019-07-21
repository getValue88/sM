import Game from './game';
// import Mouse from './controls/mouse'

const gMap = <HTMLCanvasElement>document.querySelector("#grass");
const sMap = <HTMLCanvasElement>document.querySelector("#solid");
const hud = <HTMLCanvasElement>document.querySelector("#hud");
const invHud = <HTMLCanvasElement>document.querySelector("#itemHud");
const pcHud = <HTMLCanvasElement>document.querySelector("#pcHud");

const game = new Game(gMap, sMap, hud, invHud, pcHud);

window.onload = () => {
    game.startGame();
    loop();

    window.addEventListener('resize', function () {
    });
    window.addEventListener('keydown', function (e) {
        game.getKeyboard().onKeypress(e, game.getGrass(), game.getSolid());
    })
    game.getHud().getContext().canvas.addEventListener('click', function (e) {
        game.getMouse().onClickHud(e);
    });
     game.getInvHud().getContext().canvas.addEventListener('click', function (e) {
        game.getMouse().onClickInvHud(e);
    });
    game.getPcHud().getContext().canvas.addEventListener('click', function (e) {
        game.getMouse().onClickPcHud(e);
    }); 
}

function loop() {
    game.getGrass().draw();
    game.getSolid().draw();
    requestAnimationFrame(loop);
}


