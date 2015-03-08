var gameLayer;

var Game = cc.Layer.extend({
    init : function() {
        this._super();
        this.audioEngine = cc.audioEngine;
        var playSoundMenu = new cc.MenuItemFont.create("Play Sound effect", this.playSound, this);
        playSoundMenu.setPosition(new cc.Point(0, 350));

        var playBGMusicMenu = new cc.MenuItemFont.create("Play BG Music", this.playBGMusic, this);
        playBGMusicMenu.setPosition(new cc.Point(0, 300));

        var stopBGMusic = new cc.MenuItemFont.create("Stop BG Music", this.stopBGMusic, this);
        stopBGMusic.setPosition(new cc.Point(0, 250));

        var musicUpMenu = new cc.MenuItemFont.create("Music volume Up", this.musicUp, this);
        musicUpMenu.setPosition(new cc.Point(0, 200));

        var musicDownMenu = new cc.MenuItemFont.create("Music volume Down", this.musicDown, this);
        musicDownMenu.setPosition(new cc.Point(0, 150));

        var effectsUpMenu = new cc.MenuItemFont.create("Effects volume Up", this.effectsUp, this);
        effectsUpMenu.setPosition(new cc.Point(0, 100));

        var effectsDownMenu = new cc.MenuItemFont.create("Effects volume Down", this.effectsDown, this);
        effectsDownMenu.setPosition(new cc.Point(0, 50));

        var menu = cc.Menu.create(playSoundMenu, playBGMusicMenu, stopBGMusic, musicUpMenu, musicDownMenu,
        effectsUpMenu, effectsDownMenu);
        menu.setPosition(new cc.Point(160, 40));
        this.addChild(menu);
    },
    playSound : function() {
        this.audioEngine.playEffect(res.bang);
    },
    playBGMusic :  function() {
        if(!this.audioEngine.isMusicPlaying()) {
            this.audioEngine.playMusic(res.loop, true);
        }
    },
    stopBGMusic : function() {
        if(this.audioEngine.isMusicPlaying()) {
            this.audioEngine.stopMusic();
        }
    },
    musicUp : function() {
        this.audioEngine.setMusicVolume(this.audioEngine.getMusicVolume() + 0.1);
    },
    musicDown : function() {
        this.audioEngine.setMusicVolume(this.audioEngine.getMusicVolume() - 0.1);
    },
    effectsUp : function() {
        this.audioEngine.setEffectsVolume(this.audioEngine.getEffectsVolume() + 0.1);
    },
    effectsDown : function() {
        this.audioEngine.setEffectsVolume(this.audioEngine.getEffectsVolume() - 0.1);
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