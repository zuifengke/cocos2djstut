var gameLayer;
var itemsLayer;
var topLayer;
var cart;
var xSpeed = 0;
var left;
var right;

var touchOrigin;
var touching = false;
var touchEnd;


var Game = cc.Layer.extend({
    init : function() {
        this._super();

        //add gradient
        var backgroundLayer = cc.LayerGradient.create(cc.color(0, 0, 255),
            cc.color(0x46, 0x82, 0xB4, 255));
        this.addChild(backgroundLayer);

        itemsLayer = cc.Layer.create();
        this.addChild(itemsLayer);

        topLayer = cc.Layer.create();
        this.addChild(topLayer);

        cart = cc.Sprite.create(res.cart);
        topLayer.addChild(cart, 1);
        cart.setPosition(240, 24);

        //left = cc.Sprite.create(res.leftButton);
        //topLayer.addChild(left, 0);
        //left.setPosition(40, 160);
        //left.setOpacity(128);
        //
        //right = cc.Sprite.create(res.rightButton);
        //topLayer.addChild(right, 0);
        //right.setPosition(440, 160);
        //right.setOpacity(128);

        cc.eventManager.addListener(touchListener, this);
        this.scheduleUpdate();
        this.schedule(this.addItem, 1);
    },
    addItem : function() {
        var item = new Item();
        itemsLayer.addChild(item);
    },
    removeItem : function(item) {
        itemsLayer.removeChild(item);
    },
    update : function(dt) {
        if(touching) {
            xSpeed = (touchEnd.getPosition().x - touchOrigin.getPosition().x)/ 50;
            if(xSpeed > 0){
                cart.setFlippedX(true);
            }
            if(xSpeed < 0){
                cart.setFlippedX(false);
            }
            //console.log(cart.getPosition().x);
            cart.setPosition(cart.getPosition().x + xSpeed, cart.getPosition().y);
        }
    }
});

var touchListener = cc.EventListener.create({
    event : cc.EventListener.TOUCH_ONE_BY_ONE,
    swallowTouches : true,
    onTouchBegan: function(touch, event) {
       /* if(touch.getLocation().x < 240) {
            xSpeed = -2;
            left.setOpacity(255);
            right.setOpacity(128);
        }else {
            xSpeed = 2;
            left.setOpacity(128);
            right.setOpacity(255);
        }*/
        touchOrigin = cc.Sprite.create(res.touchOrigin);
        topLayer.addChild(touchOrigin, 0);
        touchOrigin.setPosition(touch.getLocation().x, touch.getLocation().y);

        touchEnd = cc.Sprite.create(res.touchEnd);
        touchEnd.setPosition(-30, -30);
        topLayer.addChild(touchEnd, 0);
        touching = true;
        return true;
    },
    onTouchMoved: function(touch, event) {
        touchEnd.setPosition(touch.getLocation().x, touch.getLocation().y);
    },
    onTouchEnded: function(touch, event) {
        /*xSpeed = 0;
        left.setOpacity(128);
        right.setOpacity(128);*/
        touching = false;
        topLayer.removeChild(touchOrigin);
        topLayer.removeChild(touchEnd);
    }
});


var Item = cc.Sprite.extend({
    ctor : function() {
        this._super();
        if(Math.random() < 0.5) {
            this.initWithFile(res.bomb);
            this.isBomb = true;
        }else {
            this.initWithFile(res.strawberry);
            this.isBomb = false;
        }

    },
    onEnter : function() {
        this._super();
        this.setPosition(Math.random() * 400 + 40, 350);
        var moveAction = cc.MoveTo.create(8, new cc.Point(Math.random()*400+40, -50));
        this.runAction(moveAction);

        //update the game sprite
        this.scheduleUpdate();
    },
    update : function(dt) {
        //fruit detection
        if(this.getPosition().y < 35 && this.getPosition().y > 30
                //item and cart gap
        && Math.abs(cart.getPosition().x - this.getPosition().x) < 10 && !this.isBomb) {
            gameLayer.removeItem(this);
            console.log("FRUIT")
        }

        //bomb detection
        if(this.getPosition().y < 35 &&
        Math.abs(this.getPosition().x - cart.getPosition().x) < 25  && this.isBomb) {
            gameLayer.removeItem(this);
            console.log("BOMB");
        }

        if(this.getPosition().y < -30) {
            gameLayer.removeItem(this);
        }
    }
});


var GameScene = cc.Scene.extend({
    onEnter : function() {
        this._super();
        gameLayer = new Game()
        gameLayer.init();
        this.addChild(gameLayer);
    }
});