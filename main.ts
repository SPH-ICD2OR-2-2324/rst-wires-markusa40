namespace SpriteKind {
    export const Wire = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    cursorPos += -1
    if (cursorPos < 0) {
        cursorPos = wireCount - 1
    }
    UpdateCursor()
})
function UpdateCursor () {
    cursor.top = Math.floor(120 / Ratio) * (cursorPos + 1) - 2
}
function startPhase () {
    while (wireCount < 3 || wireCount > 6) {
        wireCount = game.askForNumber("# of wires? (3-6)", 1)
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (wireCount == 3) {
        wire3()
    } else if (wireCount == 4) {
        wire4()
    } else if (wireCount == 5) {
        wire5()
    } else if (wireCount == 6) {
        wire6()
    }
})
function InitSerial () {
    SerialNumber = game.askForNumber("Last Digit of Serial Number", 1)
}
function InitWirePhase () {
    InitColours()
    InitCursor()
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    WireList[cursorPos] = WireList[cursorPos] - 1
    if (WireList[cursorPos] < 0) {
        WireList[cursorPos] = colourList.length - 1
    }
    WireSprites[cursorPos].fill(colourList[WireList[cursorPos]])
    WireSprites[cursorPos].drawRect(0, 0, 160, 5, 15)
    sprite_list = sprites.allOfKind(SpriteKind.Wire)
    for (let value of sprite_list) {
        if (value.top == Math.floor(120 / Ratio) * (cursorPos + 1)) {
            value.destroy()
        }
    }
    mySprite2 = sprites.create(WireSprites[cursorPos], SpriteKind.Wire)
    mySprite2.top = Math.floor(120 / Ratio) * (cursorPos + 1)
})
function InitCursor () {
    mySprite = img`
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        `
    mySprite.drawRect(0, 0, 160, 9, 10)
    mySprite.drawRect(0, 1, 160, 7, 10)
    cursor = sprites.create(mySprite, SpriteKind.Wire)
    cursor.top = Math.floor(120 / Ratio) - 2
    cursorPos = 0
}
function InitColours () {
    colourList = [
    2,
    1,
    8,
    5,
    15
    ]
    WireList = []
    Ratio = wireCount + 1
    WireSprites = []
    for (let index = 0; index <= wireCount - 1; index++) {
        WireList.push(0)
        mySprite = img`
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            `
        mySprite.fill(colourList[WireList[index]])
        mySprite.drawRect(0, 0, 160, 5, 15)
        WireSprites.push(mySprite)
        mySprite2 = sprites.create(mySprite, SpriteKind.Wire)
        mySprite2.top = Math.floor(120 / Ratio) * (index + 1)
    }
}
function wire3 () {
    redCount = 0
    WhiteCount = 0
    blueCount = 0
    for (let value of WireList) {
        if (value == 0) {
            redCount += 1
        } else if (value == 1) {
            WhiteCount += 1
        } else if (value == 2) {
            blueCount += 1
        }
    }
    if (redCount == 0) {
        game.splash("Cut wire 2")
    } else if (WireList[2] == 1) {
        game.splash("Cut Last Wire")
    } else if (blueCount > 1) {
        game.splash("Cut Last Blue Wire")
    } else {
        game.splash("Cut Last Wire")
    }
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    WireList[cursorPos] = (WireList[cursorPos] + 1) % colourList.length
    WireSprites[cursorPos].fill(colourList[WireList[cursorPos]])
    WireSprites[cursorPos].drawRect(0, 0, 160, 5, 15)
    sprite_list = sprites.allOfKind(SpriteKind.Wire)
    for (let value of sprite_list) {
        if (value.top == Math.floor(120 / Ratio) * (cursorPos + 1)) {
            value.destroy()
        }
    }
    mySprite2 = sprites.create(WireSprites[cursorPos], SpriteKind.Wire)
    mySprite2.top = Math.floor(120 / Ratio) * (cursorPos + 1)
})
sprites.onCreated(SpriteKind.Wire, function (sprite) {
    sprite.setFlag(SpriteFlag.Ghost, true)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    cursorPos += 1
    cursorPos = cursorPos % wireCount
    UpdateCursor()
})
function wire5 () {
    let BlackCount = 0
    redCount = 0
    WhiteCount = 1
    blueCount = 2
    for (let value of list) {
        if (value == 0) {
            redCount += 1
        } else if (value == 1) {
            WhiteCount += 1
        } else if (value == 2) {
            blueCount += 1
        }
    }
    if (WireList[4] == 4 && SerialNumber % 2 == 1) {
        game.splash("Cut wire 4")
    } else if (redCount == 1 && YellowCount > 1) {
        game.splash("Cut wire 1")
    } else if (BlackCount == 0) {
        game.splash("Cut wire 2")
    } else {
        game.splash("Cut wire 1")
    }
}
function wire6 () {
    redCount = 0
    WhiteCount = 1
    blueCount = 2
    YellowCount = 3
    for (let value of list) {
        if (value == 0) {
            redCount += 1
        } else if (value == 1) {
            WhiteCount += 1
        } else if (value == 2) {
            blueCount += 1
        } else if (value == 3) {
            YellowCount += 1
        }
    }
    if (YellowCount > 1 && SerialNumber % 2 == 1) {
        game.splash("Cut wire 3")
    } else if (YellowCount == 0 && WhiteCount < 1) {
        game.splash("Cut wire 4")
    } else if (redCount == 0) {
        game.splash("Cut wire 6")
    } else {
        game.splash("Cut wire 4")
    }
}
// 0 = Red
// 1 = White
// 2 = Blue 
// 3 = Yellow 
// 4 = Black
function wire4 () {
    redCount = 0
    WhiteCount = 0
    for (let value of WireList) {
        if (value == 0) {
            redCount += 1
        } else if (value == 1) {
            redCount += 1
        }
    }
    if (redCount > 1 && SerialNumber % 2 == 1) {
        if (WireList[3] == 0) {
            game.splash("Cut wire 4")
        } else if (WireList[2] == 0) {
            game.splash("Cut wire 3")
        } else {
            game.splash("Cut wire 2")
        }
    } else if (WireList[3] == 3 && redCount == 0) {
        game.splash("Cut wire 1")
    } else if (WireList[2] == 2) {
        game.splash("Cut wire 1")
    } else if (WireList[3] > 1) {
        game.splash("Cut wire 4")
    } else {
        game.splash("Cut wire 2")
    }
}
let YellowCount = 0
let list: number[] = []
let blueCount = 0
let WhiteCount = 0
let redCount = 0
let mySprite: Image = null
let mySprite2: Sprite = null
let sprite_list: Sprite[] = []
let WireSprites: Image[] = []
let colourList: number[] = []
let WireList: number[] = []
let SerialNumber = 0
let Ratio = 0
let cursor: Sprite = null
let cursorPos = 0
let wireCount = 0
wireCount = 0
enum phase {start, wire, solve}
let state:phase=phase.start
startPhase()
if (wireCount > 3) {
    InitSerial()
}
state += 1
scene.setBackgroundColor(1)
InitWirePhase()
