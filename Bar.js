class Bar {


    constructor(index, x, y, width, height) {
        this.index = index;
        this.Pressed = false;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.tint = 255;
        this.Available = false;
    }

    show() {
        if (this.Pressed)
            this.tint = 125;
        else
            this.tint = 255;
        gameSketch.fill(this.tint, 125, 125);
        gameSketch.stroke(0);
        gameSketch.rect(this.x, this.y, this.width, this.height);
        gameSketch.fill(0);
        gameSketch.stroke(0);
        gameSketch.text(this.index, this.x + this.width / 2, this.y + this.height / 2);


        if (this.Available) {
            gameSketch.fill(0, 255, 0);
            gameSketch.ellipse(this.x + this.width / 2, this.y + this.height / 5, 10);
        } else {
            gameSketch.fill(255, 0, 0);
            gameSketch.ellipse(this.x + this.width / 2, this.y + this.height / 5, 10);
        }
    }
    checkPressed(x, y) {
        if (!firstRoll && this.Available)
            if ((x > this.x) &&
                (x < this.x + this.width) &&
                (y > this.y) &&
                (y < this.y + this.height) &&
                (!this.Pressed)) {
                this.Pressed = true;
                sumRemaining -= this.index;
                turnRemaining -= this.index;
                cardsLeft--;
                let rolInd = 0;
                dices.forEach(dice => {
                    distSketch.stroke(255);
                    distSketch.fill(255, 0, 0);
                    distSketch.textSize(30);
                    distSketch.text(dice, distSketch.width / 2 + rolInd * 40, distSketch.height / 4);
                    if (rolInd == 0)
                        distSketch.text("|", distSketch.width / 2 + 20, distSketch.height / 4);
                    rolInd = 1;
                });
                gameSketch.CheckAvailable();
            } else {
                //  this.Pressed = false;
            }
    }
}