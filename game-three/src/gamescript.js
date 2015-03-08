var level = [
    [1,1,1,1,1,1,1],
    [1,1,0,0,0,0,1],
    [1,1,3,0,2,0,1],
    [1,0,0,4,0,0,1],
    [1,0,3,1,2,0,1],
    [1,0,0,1,1,1,1],
    [1,1,1,1,1,1,1]
];
var gameLayer;
var cache;
var cratesArray = [];
var playerPosition;
var playerSprite;
var gameScale = 5;
var startTouch;
var endTouch;
var swipeTolerance = 10;

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
        cache = cc.spriteFrameCache;
        cache.addSpriteFrames(res.plist, res.png);

        //add background image
        var backgroundSprite = cc.Sprite.create(cache.getSpriteFrame("background.png"));
        backgroundSprite.getTexture().setAntiAliasTexParameters();
        backgroundSprite.setPosition(240, 160);
        this.addChild(backgroundSprite);
        backgroundSprite.setScale(gameScale);

        //add level image
        var levelSprite = cc.Sprite.create(cache.getSpriteFrame("level.png"));
        levelSprite.setPosition(240, 110);
        levelSprite.setScale(gameScale);
        this.addChild(levelSprite);


        //add level information
        for(var i = 0; i < 7; i++) {
            cratesArray[i] = [];
            for(var j = 0; j < 7; j++) {
                switch (level[i][j]) {
                    case 4 :
                    case 6:
                        playerSprite = cc.Sprite.create(cache.getSpriteFrame("player.png"));
                        playerSprite.setPosition(165+25*j, 185-25*i);
                        playerSprite.setScale(gameScale);
                        this.addChild(playerSprite);
                        playerPosition = {x : j, y : i};
                        cratesArray[i][j] = null;
                        break;
                    case 3 :
                    case 5 :
                        var crateSprite = cc.Sprite.create(cache.getSpriteFrame("crate.png"));
                        crateSprite.setPosition(165+25*j, 185-25*i);
                        crateSprite.setScale(gameScale);
                        this.addChild(crateSprite);
                        cratesArray[i][j] = crateSprite;
                        break;
                    default :
                        cratesArray[i][j] = null;
                }
            }
        }

        //swipe event
        cc.eventManager.addListener(listener, this);
    }
});

function swipeDirection() {
    var distX = startTouch.x - endTouch.x;
    var distY = startTouch.y - endTouch.y;

    //is swipe activated
    if(Math.abs(distX) + Math.abs(distY) > swipeTolerance) {
        //horizontal
        if(Math.abs(distX) > Math.abs(distY)) {
            //left
            if(distX > 0) {
                move(-1, 0);
            }
            //right
            else {
                move(1, 0);
            }
        }
        //vertical
        else {
            //up
            if(distY > 0) {
                move(0, 1);
            }
            //down
            else {
                move(0, -1);
            }
        }
    }

}

function move(deltaX, deltaY) {
    //playerSprite.setPosition(playerSprite.getPosition().x + (deltaX * 25),
    //    playerSprite.getPosition().y + (deltaY * 25));

    switch (level[playerPosition.y+deltaY][playerPosition.x+deltaX]) {
        case 0 :
        case 2 :
            level[playerPosition.y][playerPosition.x] -= 4;
            playerPosition.x += deltaX;
            playerPosition.y += deltaY;
            level[playerPosition.y][playerPosition.x] += 4;
            playerSprite.setPosition(165+25*playerPosition.x, 185-25*playerPosition.y);
            break;
        case 3 :
        case 5:
            if(level[playerPosition.y+deltaY*2][playerPosition.x+deltaX*2] == 0
            || level[playerPosition.y+deltaY*2][playerPosition.x+deltaX*2] == 2) {
                    playerPosition.x += deltaX;
                    playerPosition.y += deltaY;
                level[playerPosition.y][playerPosition.x] += 1;
                playerSprite.setPosition(165+25*playerPosition.x, 185-25*playerPosition.y);
                level[playerPosition.y+deltaY][playerPosition.x+deltaX] += 3;
                var movingCrate = cratesArray[playerPosition.y][playerPosition.x];
                movingCrate.setPosition(movingCrate.getPosition().x+25*deltaX,
                    movingCrate.getPosition().y-25*deltaY);
                cratesArray[playerPosition.y+deltaY][playerPosition.x+deltaX] = movingCrate;
                cratesArray[playerPosition.y][playerPosition.x] = null;
            }
            break;
    }
}


var listener = cc.EventListener.create({
    event : cc.EventListener.TOUCH_ONE_BY_ONE,
    swallowTouches : true,
    onTouchBegan : function(touch, event) {
        startTouch = touch.getLocation();
        return true;
    },
    onTouchEnded : function(touch, event) {
        endTouch = touch.getLocation();
        swipeDirection();
    }
});