(function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        if(!app) {
            throw new Error("Invaid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }

        // container which will be returned
        var background;
        var backGroundBox,
            backGroundBox1,
            backGroundBox2; // because this is space shared by both render and update, both functions can access this variable
        // let me know if you need any other help! i'm going to leave your workspace now...
        
        // add objects for display inb ackground
        // called at the start of game and whenever the page is resized
        function render() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            background.removeAllChildren();

            // TODO: 3 - YOUR DRAW CODE GOES HERE
            
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth,groundY,'#2d2d2d');
            background.addChild(backgroundFill);
            
            /** Remember to add any background after the background fill */
            var circle;
            for (var i = 0; i < 100; i++) {
                circle = draw.circle(10, 'white', 2, 'grey');
                circle.x = canvasWidth*Math.random();
                circle.y = groundY-25*Math.random();
                background.addChild(circle);
            } 
            var earth = draw.bitmap('/projects/runtime/img/Earth-Free-Download-PNG.png');
            earth.scaleX = .5;
            earth.scaleY = .5;
            background.addChild(earth);
            
            /** By redeclaring these variables down here the global
            variables above are not being assigned. This is why your boxes
            didn't move */
            // var
            //     backGroundBox,
            //     backGroundBox1,
            //     backGroundBox2;
            
                backGroundBox1 = draw.rect(75,200,'white', .2);
                backGroundBox1.x = canvasWidth - 300;
                backGroundBox1.y = groundY - 200;
                background.addChild(backGroundBox1);
            
                backGroundBox2 = draw.rect(50,100,'white', .2);
                backGroundBox2.x = canvasWidth - 500;
                backGroundBox2.y = groundY - 100;
                background.addChild(backGroundBox2);
            
                backGroundBox = draw.rect(125,275,'white', .2);
                backGroundBox.x = canvasWidth - 700;
                backGroundBox.y = groundY - 275;
                background.addChild(backGroundBox);
        
        }
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            backGroundBox.x = backGroundBox.x - 2;
            if (backGroundBox.x < -125) {
                backGroundBox.x = canvasWidth;
            }
            backGroundBox1.x = backGroundBox1.x - 1.5;
            if (backGroundBox1.x < -125) {
                backGroundBox1.x = canvasWidth;
            }
            backGroundBox2.x = backGroundBox2.x - 1;
            if (backGroundBox2.x < -125) {
                backGroundBox2.x = canvasWidth;
            }

        }

        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        app.addResizeable(background);
        app.addUpdateable(background);
        
        render();
        return background;
    };
}(window));