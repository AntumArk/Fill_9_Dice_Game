   let rollButton;
   let Bars = [];
   let points = 0;
   let maxNum = 9;
   let turnEnded = true;
   let turnRemaining = 0;
   let firstRoll = true;
   let sumRemaining = 0;
   let cardsLeft = 0;
   let score = 0;
   let numOfTurns = 0;
   let nn;
   var sketchGame = function(p) {
       p.BarWidth = 0;
       p.BarHeight = 0
       p.draw = function() {
           p.background(0);
           p.stroke(255);
           p.fill(255);

           // p.text(roll1, p.width / 2, p.height / 2);

           Bars.forEach(bar => {

               //bar.checkPressed(p.mouseX, p.mouseY);
               bar.show();
           });

       }
       p.ResetGame = function() {
           Bars.forEach(bar => {
               cardsLeft = maxNum;
               sumRemaining++;
               turnEnded = true;
               bar.Pressed = false;
               bar.Available = false;
               //bar.checkPressed(p.mouseX, p.mouseY);
               bar.show();
           });
           sumRemaining += 1;
           firstRoll = true;
       }
       p.checkPressed = function() {

           Bars.forEach(bar => {

               bar.checkPressed(p.mouseX, p.mouseY);


               bar.show();
           });
       }

       p.setup = function() {
           nn = new NeuralNetwork(17, 6, maxNum);
           p.createCanvas(600, 200).mousePressed(p.checkPressed);
           p.BarHeight = p.height;
           p.BarWidth = p.width / maxNum;
           rollButton = p.createButton("Roll");
           rollButton.mousePressed(roll);
           resetButton = p.createButton("Reset");
           resetButton.mousePressed(p.ResetGame);
           p.frameRate(30);

           for (let i = 0; i < maxNum; i++) {
               Bars.push(new Bar(i + 1, i * p.BarWidth, 0, p.BarWidth, p.height))
               sumRemaining += i + 1;
           }

       }
       p.CheckAvailable = function() {
           let availableLeft = 0;
           Bars.forEach(bar => {
               //    if (!bar.Available)
               //        availableLeft--;
               bar.Available = false;
           });
           for (let i = 0; i < maxNum - 1; i++)
               for (let j = i + 1; j < maxNum; j++) {
                   if ((Bars[i].index + Bars[j].index == (turnRemaining)) && (!Bars[i].Pressed && !Bars[j].Pressed) && !Bars[j].Available) {
                       {
                           Bars[i].Available = true;
                           Bars[j].Available = true;
                           availableLeft--;
                       }
                   }
               }
           Bars.forEach(bar => {
               if (bar.index == (turnRemaining) && !bar.Pressed && !bar.Available) {
                   bar.Available = true;
                   availableLeft--;
               }
           });
           if (turnRemaining == 0) {
               turnEnded = true;
               numOfTurns++;
           }


           if (availableLeft == 0 && !turnEnded) {
               endGame();
           }
       }
   }

   function endGame() {
       turnEnded = false;
       Bars.forEach(bar => {
           if (!bar.Pressed)
               score += bar.index;

       });
       window.alert("Game Over, your score: " + score);

   }

   var gameSketch = new p5(sketchGame);