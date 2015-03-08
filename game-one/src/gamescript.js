var gameArray = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7];
var pickedTiles = [];
var defaultTile = "assets/cover.png";
var gameLayer;
var moves = 0;
var scoreText;

var Game = cc.Layer.extend({
    init : function() {
        this._super();

        //add gradient object
        //rgb(255,168,76) 0%, rgb(255,123,13)
        var gradient = cc.LayerGradient.create(cc.color(0, 0, 0, 255)
        , cc.color(0x46, 0x82, 0xB4, 255));
        this.addChild(gradient);

        //score text
        scoreText = cc.LabelTTF.create("Moves: 0", "Arial", "32", cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(scoreText);
        scoreText.setPosition(90, 50);

        //add default tiles
        for(var i = 0; i < 16; i++) {
            //var tile = cc.Sprite.create(defaultTile);
            var tile = new MemoryTile();
            tile.pictureValue = gameArray[i];
            this.addChild(tile, 0);
            tile.setPosition(90+i%4*74, 400-Math.floor(i/4)*74);
        }
    }
});

var MemoryTile = cc.Sprite.extend({
    ctor : function() {
        this._super();
        this.initWithFile(defaultTile);
        cc.eventManager.addListener(listener.clone(), this);
    }
});

//listener
var listener = cc.EventListener.create({
    event : cc.EventListener.TOUCH_ONE_BY_ONE,
    swallowTouches : true,
    onTouchBegan : function(touch, event) {
        if(pickedTiles.length < 2) {
            var target = event.getCurrentTarget();
            var location = target.convertToNodeSpace(touch.getLocation());
            var targetSize = target.getContentSize();
            var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);
            if(cc.rectContainsPoint(targetRectangle, location)) {
                //console.log("I picked the title!");
                if(pickedTiles.indexOf(target) == -1) {
                    target.initWithFile("assets/tile_" + target.pictureValue + ".png");
                    pickedTiles.push(target);

                    if(pickedTiles.length == 2) {
                        checkTiles();
                    }
                }
            }
        }
    }
});

function checkTiles() {
    moves++;
    scoreText.setString("Moves: " + moves);
    var pause = setTimeout(function() {
        if(pickedTiles[0].pictureValue != pickedTiles[1].pictureValue) {
            pickedTiles[0].initWithFile(defaultTile);
            pickedTiles[1].initWithFile(defaultTile);
        }else {
            gameLayer.removeChild(pickedTiles[0]);
            gameLayer.removeChild(pickedTiles[1]);
        }
        pickedTiles = [];
    }, 2000);
}

function shuffle(v) {
    for(var j, x, i = v.length; i; j = parseInt(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x);
    return v;
}

var GameScene = cc.Scene.extend({
    onEnter : function() {
        gameArray = shuffle(gameArray)
        this._super();
        gameLayer = new Game()
        gameLayer.init();
        this.addChild(gameLayer);
    }
});