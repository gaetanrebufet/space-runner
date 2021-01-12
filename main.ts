sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    game.over(false, effects.dissolve)
})
let projectile: Sprite = null
let mySprite = sprites.create(img`
    f f f f f f f f f f f f f f f 
    f f f f f f c c f f f f f f f 
    f f f f f f c c c f f f f f f 
    f f f f f c b b c f f f f f f 
    f f f f f e b b e e f f f f f 
    f f f f c b a a b b f f f f f 
    f f f c c d b b d c c f f f f 
    f f f c b d b b d b c f f f f 
    f c c b b d b b d b b c c f f 
    c b b d b d b b d b d b b c f 
    e b d d d d d d d d d d b e f 
    e d d d d d d d d d d d d e e 
    d d d d d b d d b d d d d d e 
    b d d d d b b b b d d d d b f 
    e c b 4 b b b b b b b 4 c e f 
    c c c c c c c c c e c c c f f 
    `, SpriteKind.Player)
let asteroids = [
sprites.space.spaceSmallAsteroid0,
sprites.space.spaceAsteroid3,
sprites.space.spaceAsteroid3,
sprites.space.spaceAsteroid4,
sprites.space.spaceAsteroid1,
sprites.space.spaceSmallAsteroid3,
sprites.space.spaceSmallAsteroid2
]
mySprite.setFlag(SpriteFlag.StayInScreen, true)
mySprite.bottom = scene.screenHeight()
controller.moveSprite(mySprite, 150, 150)
info.setScore(0)
effects.starField.startScreenEffect()
game.onUpdateInterval(500, function () {
    projectile = sprites.createProjectileFromSide(asteroids[randint(0, asteroids.length - 1)], 0, randint(100, 200))
    projectile.x = randint(0, scene.screenWidth())
    info.changeScoreBy(1)
})
