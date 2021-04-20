import { Direction, DrawingMode, Dimensions, Mark } from "./constants";

export class Canvas {
    
    public x: number;
    public y: number;
    private drawingMode: DrawingMode
    private direction: Direction
    private canvas: string[][];

    constructor() {
        this.x = 15;
        this.y = 15;
        this.drawingMode = DrawingMode.DRAW;
        this.direction = Direction.TOP;
        this.initializeBlankCanvas();
    }

    /**
     * Helper method called in the constructor and when the canvas is cleared;
     * this sets our canvas variable to a multidimensional array initialized with all blank marks.
     */
    private initializeBlankCanvas() {
        this.canvas = Array.from({ length: Dimensions.HEIGHT }, 
            () => Array.from({ length: Dimensions.WIDTH }, 
                () => Mark.BLANK));
    }

    /**
     * List containing our directions in the order they are cycled through. 
     */
    readonly directions = [
        Direction.TOP,
        Direction.TOP_RIGHT,
        Direction.RIGHT,
        Direction.BOTTOM_RIGHT,
        Direction.BOTTOM,
        Direction.BOTTOM_LEFT,
        Direction.LEFT,
        Direction.TOP_LEFT
    ]

    /**
     * @param n the number of cycles to turn
     * Takes the ordered index of our current direction and shifts it by n (mod 8 to handle overflow)
     * and gets our new direction's index. We then set the new direction.
     */
    left(n: number): void {
        const newDirectionIndex = (this.directions.indexOf(this.direction) + (8 - n)) % 8;
        this.direction = this.directions[newDirectionIndex];
    }

    /**
     * @param n the number of cycles to turn
     * Takes the ordered index of our current direction and shifts it by n (mod 8 to handle overflow)
     * and gets our new direction's index. We then set the new direction.
     */
    right(n: number): void {
        const newDirectionIndex = (this.directions.indexOf(this.direction) + n) % 8;
        this.direction = this.directions[newDirectionIndex];
    }

    /**
     * 
     * @returns our present coordinate (x,y) as a string.
     */
    coord(): string {
        return `(${this.x},${this.y})\r\n`;
    }

    /**
     * Sets the brush mode to Hover.
     */
    hover(): void {
        this.drawingMode = DrawingMode.HOVER;
    }

    /**
     * Sets the brush mode to Draw.
     */
    draw(): void {
        this.drawingMode = DrawingMode.DRAW;
    }

    /**
     * Sets the brush mode to Erase.
     */
    eraser(): void {
        this.drawingMode = DrawingMode.ERASER;
    }

    /**
     * Erases our current canvas 
     */
    clear(): void {
        this.initializeBlankCanvas();
    }

    // Rendering the canvas using frame from: https://frontapp.github.io/front-backend-exercise/2019-06-14-dbd77b/
    // and joining inner array values of each row with join('') to exclude commas.
    render(): string {
        let res = '╔══════════════════════════════╗\r\n';
        this.canvas.forEach((row) => {
            res += `║${row.join('')}║\r\n`;
        });
        res += `╚══════════════════════════════╝\r\n\r\n`;
        return res;
    }

    /**
     * Helper method for us to actually mark a coordinate (x,y) on our canvas 
     * based on the current drawing mode.
     * @param curX our current x position.
     * @param curY our current y position.
     */
    private drawStep(curX: number, curY: number): void {
        if (this.drawingMode === DrawingMode.HOVER) {
            return;
        } else if (this.drawingMode === DrawingMode.ERASER) {
            this.canvas[curY][curX] = Mark.BLANK;
        } else {
            this.canvas[curY][curX] = Mark.STAR;
        }
    }

    /**
     * Handles the conditional logic to take n number of the steps in whichever direction we are presently facing.
     * @param n the number of steps to takes
     */
    steps(n: number): void {
        let curX;
        let curY;
        switch (this.direction) {
            case Direction.TOP:
                curX = this.x;
                for (curY = this.y; curY > this.y - n && curY >= 0; curY--) {
                    this.drawStep(curX, curY);
                }
                this.y = curY >= 0 ? curY : 0;
                break;
            case Direction.TOP_RIGHT:
                for (curX = this.x, curY = this.y; (curX < this.x + n && curX < Dimensions.WIDTH) && (curY > this.y - n && curY >= 0); curX++, curY--) {
                    this.drawStep(curX, curY);
                }
                this.x = curX < Dimensions.WIDTH ? curX : Dimensions.WIDTH - 1;
                this.y = curY >= 0 ? curY : 0;
                break;
            case Direction.RIGHT:
                curY = this.y;
                for (curX = this.x; curX < this.x + n && curX < Dimensions.WIDTH; curX++) {
                    this.drawStep(curX, curY);
                }
                this.x = curX < Dimensions.WIDTH ? curX : Dimensions.WIDTH - 1;
                break;
            case Direction.BOTTOM_RIGHT:
                for (curX = this.x, curY = this.y; (curX < this.x + n && curX < Dimensions.WIDTH) && (curY < this.y + n && curY < Dimensions.HEIGHT); curX++, curY++) {
                    this.drawStep(curX, curY);
                }
                this.x = curX < Dimensions.WIDTH ? curX : Dimensions.WIDTH - 1;
                this.y = curY < Dimensions.HEIGHT ? curY : Dimensions.HEIGHT - 1;
                break;
            case Direction.BOTTOM:
                curX = this.x;
                for (curY = this.y; curY < this.y + n && curY < Dimensions.HEIGHT; curY++) {
                    this.drawStep(curX, curY);
                }
                this.y = curY < Dimensions.HEIGHT ? curY : Dimensions.HEIGHT - 1;
                break;
            case Direction.BOTTOM_LEFT:
                for (curX = this.x, curY = this.y; (curX > this.x - n && curX >= 0) && (curY < this.y + n && curY < Dimensions.HEIGHT); curX--, curY++) {
                    this.drawStep(curX, curY);
                }
                this.y = curY < Dimensions.HEIGHT ? curY : Dimensions.HEIGHT - 1;
                this.x = curX >= 0 ? curX : 0;
                break;
            case Direction.LEFT:
                curY = this.y;
                for (curX = this.x; curX > this.x - n && curX >= 0; curX--) {
                    this.drawStep(curX, curY);
                }
                this.x = curX >= 0 ? curX : 0;
                break;
            case Direction.TOP_LEFT:
                for (curY = this.y, curX = this.x; (curX > this.x - n && curX >= 0) && (curY > this.y - n && curY >= 0); curX--, curY--) {
                    this.drawStep(curX, curY);
                }
                this.x = curX >= 0 ? curX : 0;
                this.y = curY >= 0 ? curY : 0;
                break;
            default:
                break;
        }
    }
}