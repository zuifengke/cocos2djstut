var gameLayer;
var world;
var worldScale = 30; //1 meter = 30px

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