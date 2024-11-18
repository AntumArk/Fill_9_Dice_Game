let distribution = [0, 0, 0, 0, 0, 0];
let rolls = [0, 0, 0, 0, 0, 0];
let rollCount = 0;
let dices = [0, 0]; //Two dices, when the sum is below 7, then roll one dice
let barWidth = 30;

var sketchDist = function(p) {
    p.draw = function() {
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
    }
    p.setup = function() {

        p.createCanvas(6 * barWidth, 100);

        p.background(0);
        p.frameRate(10);
        //rollButton = p.createButton("Roll");
        rollButton.mousePressed(roll);
        p.frameRate(30);

        for (let i = 0; i < 6; i++) {

        }
    }
}

function roll() {
    if (turnEnded) {
        turnEnded = false;
        Bars.forEach(bar => {
            bar.Available = false;
        });
        distSketch.background(255);
        distSketch.stroke(255);
        distSketch.fill(255);
        if (sumRemaining > 6) {
            dices[0] = (distSketch.int(distSketch.random(1, 7)));
            dices[1] = (distSketch.int(distSketch.random(1, 7)));
            rollCount += 2;
        } else {
            dices = [(distSketch.int(distSketch.random(1, 7))), 0];
            rollCount++;
        }
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
        turnRemaining = 0;
        dices.forEach(dice => {
            turnRemaining += dice;
            switch (dice) {
                case 1:
                    rolls[0]++;
                    break;
                case 2:
                    rolls[1]++;
                    break;
                case 3:
                    rolls[2]++;
                    break;
                case 4:
                    rolls[3]++;
                    break;
                case 5:
                    rolls[4]++;
                    break;
                case 6:
                    rolls[5]++;
                    break;
            }


        });
        let i = 0;
        distSketch.fill(0);
        distribution.forEach(element => {
            distSketch.fill(0);
            // distSketch.background(255);
            distSketch.stroke(0);
            element = rolls[i] / rollCount;
            distSketch.rect(i * barWidth, 0, barWidth, (1 - element) * distSketch.height);
            //  push();
            distSketch.stroke(0, 255, 255);
            distSketch.fill(0, 255, 255);
            distSketch.textSize(8);
            distSketch.text(distSketch.nf(element, 1, 2) * 100, i * barWidth + barWidth / 2, distSketch.height / 2 + distSketch.height * 0.1);
            // pop();
            i++;
        });
        gameSketch.CheckAvailable();
        firstRoll = false;
    }
}

var distSketch = new p5(sketchDist);