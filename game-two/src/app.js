var background;
var gameLayer;
var scrollSpeed = 1;
var ship;
var gameGravity = -0.05;
var gameThrust = 0.1;
var emitter;

var GameScene = cc.Scene.extend({
    onEnter : function() {
        this._super();
        gameLayer = new GameLayer();
        gameLayer.init();
        this.addChild(gameLayer);
    }
});

var GameLayer = cc.Layer.extend({
    init : function() {
        this._super();

        //space thrust to touch
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesBegan: function (touches, event) {
                ship.engineOn = true;
            },
            onTouchesEnded: function (touches, event) {
                ship.engineOn = false;
            }
        }, this);

        //add background
        background = new ScrollingBG();
        this.addChild(background);

        //add ship
        ship = new Ship();
        this.addChild(ship);

        //add ship particle
        emitter = cc.ParticleSun.create();
        this.addChild(emitter, 1);
        var myTexture = cc.textureCache.addImage(res.particle);
        emitter.setTexture(myTexture);
        emitter.setStartSize(2);
        emitter.setEndSize(4);

        this.scheduleUpdate();
        this.schedule(this.addAsteroid, 0.5);
    },
    update : function(dt) {
        //scrolling
        background.scroll();

        //ship gravity update
        ship.updateY();
    },
    addAsteroid : function() {
        var asteroid = new Asteroid();
        this.addChild(asteroid, 1);
    },
    removeAsteroid : function(asteroid) {
        this.removeChild(asteroid);
    }
});

var Ship = cc.Sprite.extend({
    ctor : function() {
        this._super();
        this.initWithFile(res.ship);
        this.ySpeed = 0;
        this.engineOn = false;
        this.invulnerbility = 0;
    },
    onEnter: function() {
        this.setPosition(60, 160);
    },
    updateY : function() {
        if(this.engineOn) {
            this.ySpeed += gameThrust;
        }

        if(this.invulnerbility > 0) {
            this.invulnerbility -= 1;
            this.setOpacity(255 - this.getOpacity());
        }

        this.setPosition(this.getPosition().x, this.getPosition().y + this.ySpeed);
        this.ySpeed += gameGravity;

        if(this.getPosition().y < 0 || this.getPosition().y > 320) {
            restartGame();
        }

        emitter.setPosition(this.getPosition().x - 25, this.getPosition().y);
    }
});

var Asteroid = cc.Sprite.extend({
    ctor : function() {
        this._super();
        this.initWithFile(res.asteroid);
    },
    onEnter : function() {
        this._super();
        this.setPosition(600, Math.random() * 320);
        var moveAction = cc.MoveTo.create(2.5, new cc.Point(-100, Math.random() * 320));
        this.runAction(moveAction);
        this.scheduleUpdate();
    },
    update : function(dt) {
        var shipBoundingBox = ship.getBoundingBox();
        var asteroidBoundingBox = this.getBoundingBox();

        if(cc.rectIntersectsRect(shipBoundingBox, asteroidBoundingBox) && ship.invulnerbility == 0) {
            gameLayer.removeAsteroid(this);
            restartGame();
        }

        if(this.getPosition().x < -50) {
            gameLayer.removeAsteroid(this);
        }
        //console.log("asteroid update: " + dt)
    }
});

function restartGame() {
    ship.ySpeed = 0;
    ship.setPosition(ship.getPosition().x, 160);
    ship.invulnerbility = 100;
}


var ScrollingBG = cc.Sprite.extend({
    ctor : function() {
        this._super();
        this.initWithFile(res.background);
    },
    onEnter : function() {
        this.setPosition(480, 160);
    },
    scroll : function() {
        this.setPosition(this.getPosition().x - scrollSpeed, this.getPosition().y);
        if(this.getPosition().x < 0) {
            this.setPosition(this.getPosition().x + 480, this.getPosition().y);
        }
    }

});