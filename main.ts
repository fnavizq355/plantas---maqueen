function accion_A () {
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, velocidad)
    basic.pause(500)
    parada = 0
    anda = true
}
function en_parada () {
    if (parada < cantidad) {
        radio.sendString("" + (arboles[parada]))
        parada = parada + 1
        basic.pause(2000)
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, velocidad)
        basic.pause(1000)
    } else {
        radio.sendString("Fin del paseo")
        anda = false
    }
}
function accion_B () {
    if (anda) {
        anda = false
        maqueen.motorStop(maqueen.Motors.All)
        radio.sendString("Paseo detenido")
    } else {
        anda = true
        radio.sendString("Paseo reanudado")
    }
}
radio.onReceivedString(function (receivedString) {
    if (receivedString == "A") {
        accion_A()
    }
    if (receivedString == "B") {
        accion_B()
    }
})
let parada = 0
let cantidad = 0
let anda = false
let velocidad = 0
let arboles: string[] = []
radio.setGroup(1)
arboles = [
"Palmera",
"Naranjo",
"Jacaranda",
"Pino",
"Olivo",
"Platanero"
]
velocidad = 50
anda = false
cantidad = arboles.length
basic.forever(function () {
    if (anda) {
        if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
            maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, velocidad)
        } else if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
            maqueen.motorStop(maqueen.Motors.M2)
        } else if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
            maqueen.motorStop(maqueen.Motors.M1)
        } else {
            maqueen.motorStop(maqueen.Motors.All)
            en_parada()
        }
    }
})
