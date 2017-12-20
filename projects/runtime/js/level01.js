(function (window) {
    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            name: "Robot Romp",
            number: 1, 
            speed: -3,
            gameItems: [
                {type: 'sawblade',x:400,y:groundY},
                {type: 'sawblade',x:600,y:groundY},
                {type: 'sawblade',x:900,y:groundY}
            ]
        };

        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // BEGIN EDITING YOUR CODE HERE
        var createObstacle = function(x, y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
            myObstacle.x = x;
            myObstacle.y = y;
            game.addGameItem(myObstacle);
            var obstacleImage = draw.bitmap('img/sawblade.png');
            myObstacle.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
        };
        
        createObstacle(100, 200);
        
        
        levelData.gameItems.forEach(function(gameItem){
            createObstacle(gameItem.x, gameItem.y);
            
            
        });
    
        
        
        
        var enemy = game.createGameItem('enemy', 25);
        var dohnut = draw.bitmap('/projects/runtime/img/donut.png');
        dohnut.x = -25;
        dohnut.y = -25;
        enemy.addChild(dohnut);
        enemy.x = 400;
        enemy.y = groundY - 50;
        enemy.velocityX = -1;
        enemy.rotationVelocity = 10;
        
       var rewardSize = 25;
       var reward = game.createObstacle(rewardSize, 0);
       var wrench = draw.bitmap('/projects/runtime/img/wrench.png');
       wrench.x = -25;
       wrench.y = -25;
       reward.addChild(wrench);
       reward.x = 500;
       reward.y = groundY - 75;
       reward.velocityX = -1;
       
       reward.onPlayerCollision = function() {
           game.increaseScore(500);
           reward.fadeOut();
       };
        
        enemy.onPlayerCollision = function() {
            console.log('The enemy has hit Halle');
            game.changeIntegrity(10);
            enemy.fadeOut();
        };
        
        /** the property is called onProjectileCollision and, though it stores 
         a function, "onProjectileCollision" is just the key and so it doesn't
         need () - same for onPlayerCollision
        */
        
        enemy.onProjectileCollision = function() {
            console.log('Halle has hit the enemy');
            game.increaseScore(100);
            enemy.flyTo(2000, 0);
        };
        
        game.addGameItem(enemy);
    };
})(window);
