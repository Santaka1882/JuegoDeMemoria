const btnRanked = document.getElementById('btnRanked')
const btnCasual = document.getElementById('btnCasual')
const celeste = document.getElementById('celeste')
const rosa = document.getElementById('rosa')
const amarillo= document.getElementById('amarillo')
const verde = document.getElementById('verde')

const score = document.querySelector('.points')
const scoreTitle = document.querySelector('.score-title')

const ULTIMO_NIVEL = 10

let puntuacion = 0

class Juego {
    constructor() {
        this.inicializar()
        this.generarSecuencia()
        setTimeout(() => this.siguienteNivel(), 1000)
    }

    inicializar() {
        this.elegirColor = this.elegirColor.bind(this)
        btnRanked.classList.add('hide')
        btnCasual.classList.add('hide')
        this.nivel = 1
        scoreTitle.textContent = 'Nivel'
        score.textContent = this.nivel
        this.colores = {
            celeste,
            rosa,
            amarillo,
            verde
        }
    }

    generarSecuencia() {
        this.secuencia = new Array(10).fill(0).map(n => Math.floor(Math.random() * 4))
    }

    siguienteNivel() {
        this.subnivel = 0
        this.iluminarSecuencia()
        this.agregarEventos()
    }

    transformarNumeroAColor(numero) {
        switch(numero) {
            case 0:
                return 'celeste'
            case 1:
                return 'rosa'
            case 2: 
                return 'amarillo'
            case 3:
                return 'verde'
        }
    }

    transformarColorANumero(color) {
        switch(color) {
            case 'celeste':
                return 0
            case 'rosa':
                return 1
            case 'amarillo': 
                return 2
            case 'verde':
                return 3
        }
    }

    iluminarSecuencia() {
        for(let i = 0; i < this.nivel; i++) {
            const color = this.transformarNumeroAColor(this.secuencia[i])

            setTimeout(() => this.iluminarColor(color), 700 * i)
        }  
    }

    iluminarColor(color) {
        this.colores[color].classList.add('light')
        setTimeout(() => this.apagarColor(color), 250)
    }

    apagarColor(color) {
        this.colores[color].classList.remove('light')
    }

    agregarEventos() {
        this.colores.celeste.addEventListener('click', this.elegirColor)
        this.colores.rosa.addEventListener('click', this.elegirColor)
        this.colores.amarillo.addEventListener('click', this.elegirColor)
        this.colores.verde.addEventListener('click', this.elegirColor)
    }

    eliminarEventos() {
        this.colores.celeste.removeEventListener('click', this.elegirColor)
        this.colores.rosa.removeEventListener('click', this.elegirColor)
        this.colores.amarillo.removeEventListener('click', this.elegirColor)
        this.colores.verde.removeEventListener('click', this.elegirColor)
    }

    elegirColor(event) {
        const nombreColor = event.target.dataset.color
        const numeroColor = this.transformarColorANumero(nombreColor)
        this.iluminarColor(nombreColor)

        if (numeroColor === this.secuencia[this.subnivel]) {
            this.subnivel++
            if (this.subnivel === this.nivel) {
                if (this.nivel < 10) {
                    this.nivel++
                } else {
                    this.nivel = 10
                }
                
                this.eliminarEventos()

                score.textContent = this.nivel

                if (this.nivel === ULTIMO_NIVEL) {
                    this.ganar()
                } else {
                    this.subnivel = 0
                    setTimeout(() => this.siguienteNivel(), 1000)
                } 
            }
        } else {
            this.perder()
        }
    }

    ganar() {
        swal('Ganaste :D', '¡Tienes una memoria genial!', 'success')
            .then(() => {
                btnRanked.classList.remove('hide')
                btnCasual.classList.remove('hide')
                this.eliminarEventos()
                this.nivel = 1
                this.subnivel = 0
                score.textContent = ""
                scoreTitle.textContent = ""
            })
    }

    perder() {
        swal('Perdiste :(', '¡No te rindas!', 'error')
            .then(() => {
                btnRanked.classList.remove('hide')
                btnCasual.classList.remove('hide')
                this.eliminarEventos()
                this.nivel = 1
                this.subnivel =0
                score.textContent = ""
                scoreTitle.textContent = ""
            })
    }
}

class JuegoRanked extends Juego{
    inicializar() {
        this.elegirColor = this.elegirColor.bind(this)
        btnRanked.classList.add('hide')
        btnCasual.classList.add('hide')
        this.nivel = 1
        scoreTitle.textContent = 'Puntuacion:'
        score.textContent = `${puntuacion} puntos`
        this.colores = {
            celeste,
            rosa,
            amarillo,
            verde
        }
    }

    generarSecuencia() {
        this.secuencia = new Array(100).fill(0).map(n => Math.floor(Math.random() * 4))
    }

    elegirColor(event) {
        const nombreColor = event.target.dataset.color
        const numeroColor = this.transformarColorANumero(nombreColor)
        this.iluminarColor(nombreColor)

        if (numeroColor === this.secuencia[this.subnivel]) {
            this.subnivel++
            if (this.subnivel === this.nivel) {
                this.nivel++

                puntuacion = this.nivel * 100 - 100

                score.textContent = `${puntuacion} puntos`

                this.eliminarEventos()

                if (this.nivel === ULTIMO_NIVEL + 1) {
                    this.ganar()
                } else {
                    this.subnivel = 0
                    setTimeout(() => this.siguienteNivel(), 1000)
                } 
            }
        } else {
            this.terminar()
        }
    }

    ganar() {
        swal('Llegaste al final!', 'Felicidades!', 'success')
            .then(() => {
                btnRanked.classList.remove('hide')
                btnCasual.classList.remove('hide')
                this.eliminarEventos()
                this.nivel = 1
                this.subnivel = 0
                score.textContent = ""
                scoreTitle.textContent = ""
            })
    }

    terminar() {
        swal({
            title: '¿Cual es tu nombre?',
            content: 'input',
            icon: 'info'
        })
        .then( (name) => {
            swal(`${name}`, `Tu puntuacion fue: ${puntuacion} puntos`, 'success')
            .then(() => {
                btnRanked.classList.remove('hide')
                btnCasual.classList.remove('hide')
                this.eliminarEventos()
                this.nivel = 1
                this.subnivel = 0
                score.textContent = ""
                scoreTitle.textContent = ""
            })
        })
    }
}

function empezarJuego() {
    let juego = new Juego()
}

function empezarJuegoRanked() {
    let juego = new JuegoRanked()
}