

var Game = cc.Layer.extend({
    ctor: function() {
        this._super();
        this.init();
    },
    init : function() {
        this._super();
        var winSize = cc.director.getWinSize();
        var centerPos = cc.p(winSize.width / 2, winSize.height / 2);

        //var bg1 = new cc.Sprite("#background.png");
        //bg1.attr(centerPos);
        //bg1.scaleY = winSize.height / bg1.getContentSize().height;

        this.addParallaxSprite("background.png", centerPos, SpriteTag.background, winSize,"scaleY", "center", 1);
        this.addParallaxSprite("background.png", centerPos, SpriteTag.background, winSize,"scaleY", "center", 2);
        this.addParallaxSprite("groundGrass.png", centerPos, SpriteTag.ground, winSize, "noScale", "down", 1);
        this.addParallaxSprite("groundGrass.png", centerPos, SpriteTag.ground, winSize, "noScale", "down", 2);
        this.addParallaxSprite("rockDown.png", centerPos, SpriteTag.rock, winSize, "noScale", "up", 1);
        //this.addParallaxSprite("rockDown.png", centerPos, SpriteTag.rock, winSize, "noScale", "up", 2);
        this.addParallaxSprite("rock.png", centerPos, SpriteTag.rock, winSize, "noScale", "down", 1);

        //var bg2 = new cc.Sprite("#background.png");
        //centerPos.x = centerPos.x + bg2.getContentSize().width;
        //bg2.attr(centerPos);
        //bg2.scaleY = winSize.height / bg2.getContentSize().height;

        //var ground1 = new cc.Sprite("#groundGrass.png");
        //centerPos.x = ground1.getContentSize().width / 2;
        //centerPos.y = ground1.getContentSize().height / 2;
        //ground1.attr(centerPos);
        //ground1.scaleY = winSize.height / ground1.getContentSize().width;

        //var ground2 = new cc.Sprite("#groundGrass.png");
        //centerPos.x = centerPos.x + ground2.getContentSize().width - 5;
        //ground2.attr(centerPos);
        //ground2.scaleY = winSize.height / ground2.getContentSize().width;

        //rockDown
        //var rockDown1 = new cc.Sprite("#rockDown.png");
        //centerPos = cc.p(winSize.width / 2, winSize.height / 2);
        //centerPos.y = winSize.height - rockDown1.getContentSize().width;
        //rockDown1.attr(centerPos);


        //this.addChild(bg1, SpriteTag.background);
        //this.addChild(bg2, SpriteTag.background);
        //this.addChild(ground1, SpriteTag.ground);
        //this.addChild(ground2, SpriteTag.ground);
        //this.addChild(rockDown1, SpriteTag.rock);

        //this.updatePosition();
        this.scheduleUpdate();
    },
    update: function(dt) {
        var nodes = this.getChildren();

        for(var i = 0; nodes.length > i; i++) {
            var node = nodes[i];
            var speed = 0;
            if(node.getLocalZOrder() == SpriteTag.ground) {
                speed = 5;
            }else if(node.getLocalZOrder() == SpriteTag.background){
                speed = 1;
            }else if(node.getLocalZOrder() == SpriteTag.rock){
                speed = 3;
            }

            // update position
            var pos = node.getPosition();
            pos.x = pos.x - speed;
            node.setPosition(pos);

            // parallax effect
            if(node.getPosition().x < -node.getContentSize().width/2) {
                node.setPosition(node.getContentSize().width + cc.director.getVisibleSize().width - 100, node.getPosition().y);
            }
        }

    },
    addParallaxSprite: function(spriteName, spritePos, spriteTag, winSize, scaleType, posType, count) {
        var sprite = new cc.Sprite("#"+spriteName);
        if(count == 2) {
            spritePos.x = spritePos.x + sprite.getContentSize().width - 5;
        }

        // scaling
        if(scaleType == "scaleX"){
            sprite.setScaleX(winSize.width / sprite.getContentSize().width);
        }else if(scaleType == "scaleY"){
            sprite.setScaleY(winSize.height / sprite.getContentSize().height);
        }

        // positioning
        if(posType == "center"){

        }else if(posType == "up"){
            spritePos.y = winSize.height - sprite.getContentSize().width;
        }else if(posType == "down"){
            spritePos.y = sprite.getContentSize().height / 2;
        }
        if(spriteTag != SpriteTag.background && count == 1) {
            spritePos.x = sprite.getContentSize().width / 2;
        }
        sprite.attr(spritePos);

        this.addChild(sprite, spriteTag);
    },
    log: function(data) {
        console.log(data);
    }

});



var GameScene = cc.Scene.extend({
    onEnter : function() {
        this._super();
        //sprites
        cc.spriteFrameCache.addSpriteFrames(res.spritesheet_plist);
        this.spriteSheet = new cc.SpriteBatchNode(res.spritesheet_png);
        this.addChild(this.spriteSheet);

        gameLayer = new Game()
        //gameLayer.init();
        this.addChild(gameLayer);
    }
});