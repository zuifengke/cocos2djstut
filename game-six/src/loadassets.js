var res = {
    brick1x1 : "assets/brick1x1.png",
    brick2x1 : "assets/brick2x1.png",
    brick3x1 : "assets/brick3x1.png",
    brick4x1 : "assets/brick4x1.png",
    brick4x2 : "assets/brick4x2.png",
    ground : "assets/ground.png",
    totem : "assets/totem.png"
};

var gameResources = [];
for (var i in res) {
    gameResources.push(res[i]);
}
