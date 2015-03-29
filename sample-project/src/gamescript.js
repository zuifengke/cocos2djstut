

var Game = cc.Layer.extend({
    init : function() {
    }
});

var MemoryTile = cc.Sprite.extend({
    ctor : function() {
        this._super();
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