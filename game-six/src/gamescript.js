var gameLayer;
var world;
var worldScale = 30; //1 meter = 30px

/*
* var world;
 var worldScale = 30;

 var gameScene = cc.Scene.extend({
 onEnter:function () {
 this._super();
 gameLayer = new game();
 gameLayer.init();
 this.addChild(gameLayer);
 }
 });

 var game = cc.Layer.extend({
 init:function () {
 this._super();
 var backgroundLayer = cc.LayerGradient.create(cc.color(0xdf,0x9f,0x83,255), cc.color(0xfa,0xf7,0x9f,255));
 this.addChild(backgroundLayer);
 var gravity = new Box2D.Common.Math.b2Vec2(0, -10)
 world = new Box2D.Dynamics.b2World(gravity, true);
 this.scheduleUpdate();
 this.addBody(240,10,480,20,false,"assets/ground.png","ground");
 this.addBody(204,32,24,24,true,"assets/brick1x1.png","destroyable");
 this.addBody(276,32,24,24,true,"assets/brick1x1.png","destroyable");
 this.addBody(240,56,96,24,true,"assets/brick4x1.png","destroyable");
 this.addBody(240,80,48,24,true,"assets/brick2x1.png","solid");
 this.addBody(228,104,72,24,true,"assets/brick3x1.png","destroyable");
 this.addBody(240,140,96,48,true,"assets/brick4x2.png","solid");
 this.addBody(240,188,24,48,true,"assets/totem.png","totem");
 cc.eventManager.addListener(touchListener, this);
 },
 update:function(dt){
 world.Step(dt,10,10);
 for (var b = world.GetBodyList(); b; b = b.GetNext()) {
 if (b.GetUserData() != null) {
 var mySprite = b.GetUserData().asset;
 mySprite.setPosition(b.GetPosition().x * worldScale, b.GetPosition().y * worldScale);
 mySprite.setRotation(-1 * cc.radiansToDegrees(b.GetAngle()));
 if(b.GetUserData().type=="totem"){
 for(var c = b.GetContactList(); c; c = c.m_next){
 if(c.other.GetUserData() && c.other.GetUserData().type=="ground"){
 console.log("Oh no!!!!");
 }
 }
 }
 }
 }
 },
 addBody: function(posX,posY,width,height,isDynamic,spriteImage,type){
 var fixtureDef = new  Box2D.Dynamics.b2FixtureDef;
 fixtureDef.density = 1.0;
 fixtureDef.friction = 0.5;
 fixtureDef.restitution = 0.2;
 fixtureDef.shape = new Box2D.Collision.Shapes.b2PolygonShape;
 fixtureDef.shape.SetAsBox(0.5*width/worldScale,0.5*height/worldScale);
 var bodyDef = new Box2D.Dynamics.b2BodyDef;
 if(isDynamic){
 bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
 }
 else{
 bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
 }
 bodyDef.position.Set(posX/worldScale,posY/worldScale);
 var userSprite = cc.Sprite.create(spriteImage);
 this.addChild(userSprite, 0);
 userSprite.setPosition(posX,posY);
 bodyDef.userData = {
 type: type,
 asset: userSprite
 }
 var body = world.CreateBody(bodyDef)
 body.CreateFixture(fixtureDef);
 }
 });

 var touchListener = cc.EventListener.create({
 event: cc.EventListener.TOUCH_ONE_BY_ONE,
 swallowTouches: true,
 onTouchBegan: function (touch, event) {
 var worldPoint = new Box2D.Common.Math.b2Vec2(touch.getLocation().x/worldScale,touch.getLocation().y/worldScale);
 for (var b = world.GetBodyList(); b; b = b.GetNext()) {
 if (b.GetUserData() != null && b.GetUserData().type=="destroyable") {
 for(var f = b.GetFixtureList();f; f=f.GetNext()){
 if(f.TestPoint(worldPoint)){
 gameLayer.removeChild(b.GetUserData().asset)
 world.DestroyBody(b);
 }
 }
 }
 }
 }
 })
* */

var Game = cc.Layer.extend({
    init : function() {
        this._super();

        var backgroundLayer = cc.LayerGradient.create(cc.color(0xdf, 0x9f, 0x83, 255),
        cc.color(0xfa, 0xf7, 0x9f, 255));
        this.addChild(backgroundLayer);

        //gravity + world
        var gravity = new Box2D.Common.Math.b2Vec2(0, -10);
        world = new Box2D.Dynamics.b2World(gravity, true);

        this.addBody(220, 10, 480, 20, false, res.ground, "ground")
        //this.addBody(204, 100, 24, 24, true, res.brick1x1, "destroyable")
        this.addBody(276,32,24,24,true,res.brick1x1,
            "destroyable");
        this.addBody(240,56,96,24,true,res.brick4x1,
            "destroyable");
        this.addBody(240,80,48,24,true,res.brick2x1,"solid");
        this.addBody(228,104,72,24,true, res.brick3x1,
            "destroyable");
        this.addBody(240,140,96,48,true,res.brick4x2,"solid");
        this.addBody(240,188,24,48,true,res.totem,"totem");

        this.scheduleUpdate();

    },
    update : function(dt) {
        world.Step(dt, 10, 10);

        for(var b = world.GetBodyList(); b; b = b.GetNext()) {
            if(b.GetUserData() != null) {
                var mySprite = b.GetUserData().asset;
                //console.log(b.type)
                //console.log(b.GetPosition().x * worldScale+":"+b.GetPosition().y * worldScale)
                //mySprite.setPosition(b.GetPosition().x, b.GetPosition().y);
                mySprite.setRotation(-1 * cc.radiansToDegrees(b.GetAngle()));
            }
        }
    },
    addBody: function(posX, posY, width, height, isDynamic, spriteImage, type) {
        var fixtureDef = new Box2D.Dynamics.b2FixtureDef;
        fixtureDef.density = 1.0;
        fixtureDef.friction = 0.5;
        fixtureDef.restitution = 0.2;
        fixtureDef.shape = new Box2D.Collision.Shapes.b2PolygonShape;
        fixtureDef.shape.SetAsBox(0.5*width/worldScale, 0.5*height/worldScale);

        var bodyDef = new Box2D.Dynamics.b2BodyDef;
        if(isDynamic) {
            bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
        }else {
            bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
        }

        var userSprite = cc.Sprite.create(spriteImage);
        this.addChild(userSprite, 0);
        userSprite.setPosition(posX, posY);
        bodyDef.userData = {
            type: type,
            asset: userSprite
        }

        var body = world.CreateBody(bodyDef);
        body.CreateFixture(fixtureDef);
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