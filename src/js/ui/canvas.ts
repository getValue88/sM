export default class Canvas{
    protected canvas: HTMLCanvasElement
    protected context: CanvasRenderingContext2D

    constructor(canvas: HTMLCanvasElement){
        this.canvas = canvas;
        this.context = <CanvasRenderingContext2D>this.canvas.getContext("2d");
        this.canvas.width = (Math.round(window.innerWidth/17)*17);
        this.canvas.height = (Math.round(window.innerWidth/11)*11);
    }

    public getContext(){
        return this.context;
    }
}