controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.setImage(spacecraft_left)
})
controller.right.onEvent(ControllerButtonEvent.Released, function () {
    mySprite.setImage(spacecraft)
})
controller.left.onEvent(ControllerButtonEvent.Released, function () {
    mySprite.setImage(spacecraft)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.setImage(spacecraft_right)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    otherSprite.destroy(effects.ashes, 500)
    info.changeLifeBy(-1)
})
info.onLifeZero(function () {
    music.setVolume(0)
    game.over(false, effects.dissolve)
})
function play_melody (tempo: number) {
    music.playMelody("C - C C D C C - ", tempo)
    music.playMelody("C F F - D C C - ", tempo)
    music.playMelody("C - C C D C C - ", tempo)
    music.playMelody("C F F - D C C - ", tempo)
    music.playMelody("C - C C D C C - ", tempo)
    music.playMelody("C F A - C - C - ", tempo)
}
let projectile: Sprite = null
let tempo = 0
let mySprite: Sprite = null
let spacecraft_right: Image = null
let spacecraft_left: Image = null
let spacecraft: Image = null
spacecraft = img`
    . . . . . . . . . . . . . . . 
    . . . . . . c c . . . . . . . 
    . . . . . . c c c . . . . . . 
    . . . . . c b b c . . . . . . 
    . . . . . e b b e e . . . . . 
    . . . . c b a a b b . . . . . 
    . . . c c d b b d c c . . . . 
    . . . c b d b b d b c . . . . 
    . c c b b d b b d b b c c . . 
    c b b d b d b b d b d b b c . 
    e b d d d d d d d d d d b e . 
    e d d d d d d d d d d d d e e 
    d d d d d b d d b d d d d d e 
    b d d d d b b b b d d d d b . 
    e c b 4 b b b b b b b 4 c e . 
    c c c c c c c c c e c c c . . 
    `
spacecraft_left = img`
    . . . . . . . . . . . . . . . 
    . . . . . . c c . . . . . . . 
    . . . . . . c c c . . . . . . 
    . . . . . c b b c . . . . . . 
    . . . . . e b b e e . . . . . 
    . . . . c b a a b b . . . . . 
    . . . . c d b b d c c . . . . 
    . . . . b d b b d b c . . . . 
    . . . c b d b b d b b c c . . 
    . . c b b d b b d b d b b c . 
    . . e b d d d d d d d d b e . 
    . e e d d d d d d d d d d e e 
    . e d d d b d d b d d d d d e 
    . . b d d b b b b d d d d b . 
    . . e c b b b b b b b 4 c e . 
    . . c c c c c c c e c c c . . 
    `
spacecraft_right = img`
    . . . . . . . . . . . . . . . 
    . . . . . . c c . . . . . . . 
    . . . . . . c c c . . . . . . 
    . . . . . c b b c . . . . . . 
    . . . . . e b b e e . . . . . 
    . . . . c b a a b b . . . . . 
    . . . c c d b b d c . . . . . 
    . . . c b d b b d b . . . . . 
    . c c b b d b b d b c . . . . 
    c b b d b d b b d b b c . . . 
    e b d d d d d d d d b e . . . 
    e d d d d d d d d d d e e . . 
    d d d d d b d d b d d d e . . 
    b d d d d b b b b d d b . . . 
    e c b 4 b b b b b b c e . . . 
    c c c c c c c c c e c . . . . 
    `
game.showLongText("Avoid the asteroids", DialogLayout.Center)
mySprite = sprites.create(spacecraft, SpriteKind.Player)
let asteroids = [
sprites.space.spaceSmallAsteroid0,
sprites.space.spaceAsteroid3,
sprites.space.spaceAsteroid3,
sprites.space.spaceAsteroid4,
sprites.space.spaceAsteroid1,
sprites.space.spaceSmallAsteroid3,
sprites.space.spaceSmallAsteroid2,
sprites.space.spaceAsteroid0
]
mySprite.setFlag(SpriteFlag.StayInScreen, true)
mySprite.bottom = scene.screenHeight() - 10
controller.moveSprite(mySprite, 125, 125)
info.setScore(0)
effects.starField.startScreenEffect()
let asteroid_speed = 20
info.setLife(3)
game.onUpdateInterval(1000, function () {
    asteroid_speed += 1
})
forever(function () {
    tempo = 370
    play_melody(tempo)
})
game.onUpdateInterval(500, function () {
    projectile = sprites.createProjectileFromSide(asteroids[randint(0, asteroids.length - 1)], randint(-10, 10), randint(asteroid_speed, asteroid_speed + 50))
    projectile.x = randint(0, scene.screenWidth())
    info.changeScoreBy(1)
})
