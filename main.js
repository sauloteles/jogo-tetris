class CanvasGame {
    constructor(IdCanvas) {
        //variaveis globais ou constructors
        this.canvas = document.getElementById(IdCanvas)
        this.ctx = this.canvas.getContext('2d')
        this.speed = 25;
        this.isRuning = true;
        this.listComponents = [];
        this.component;
        this.i = true
        this.componentChoice = Math.floor(Math.random() * 3);
        this.createComponent = true;
        this.colisaoX = false;
        this.listDelete = []


        this.init()

    }



    clearCanvas() {
        this.ctx.beginPath()
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    criarBarra() {
        return new Barra([{ x: 25, y: 0 }, { x: 50, y: 0, }, { x: 75, y: 0, }, { x: 100, y: 0, }])
    }
    criarZ() {
        return new Z([{ x: 25, y: 0, }, { x: 50, y: 0 }, { x: 50, y: -25, }, { x: 75, y: -25 }]);
    }
    criarQuadrado() {
        return new Component([{ x: 0, y: 0 }, { x: 25, y: 0 }, { x: 0, y: -25 }, { x: 25, y: -25 }])
    }


    drawListComponent(x, y) {
        this.ctx.fillStyle = 'blue';
        this.ctx.fillRect(x, y, 25, 25)

    }

    colisaoBorda1() {
        if (this.component.cordenadas[0].x < 225 && this.component.cordenadas[1].x < 225 && this.component.cordenadas[2].x < 225 && this.component.cordenadas[3].x < 225) {
            return true;
        }

    }
    colisaoBorda2() {
        if (this.component.cordenadas[0].x > 0 && this.component.cordenadas[1].x > 0 && this.component.cordenadas[2].x > 0 && this.component.cordenadas[3].x > 0) {
            return true;
        }

    }
    confirmCreateComponent() {
        this.createComponent = true;
        this.componentChoice = Math.floor(Math.random() * 3)
        // this.componentChoice = 1

    }


    update() {
        this.clearCanvas()
        if (this.isRuning) {
            if (this.createComponent) {
                console.log(this.componentChoice)
                switch (this.componentChoice) {
                    case 0:
                        this.component = this.criarZ();
                        break;
                    case 1:
                        this.component = this.criarBarra();
                        break;
                    case 2:
                        this.component = this.criarQuadrado();
                        break;
                }
                this.createComponent = false;
            }
            this.colisaoX = false;
            if (this.component.colision()) {
                this.listComponents.push(this.component.cordenadas);
                this.component.stop = true;
                this.colisaoX = true;
                this.confirmCreateComponent()

            }

            if (this.listComponents.length > 0) {
                if (!this.colisaoX) {
                    for (let j = 0; j < this.component.cordenadas.length; ++j) {
                        for (let i = 0; i < this.listComponents.length; ++i) {
                            for (let k = 0; k < this.listComponents[i].length; ++k) {
                                if (this.listComponents[i][k].x == this.component.cordenadas[j].x && this.listComponents[i][k].y == this.component.cordenadas[j].y + 25) {
                                    console.log('colision peça')

                                    this.listComponents.push(this.component.cordenadas);
                                    this.component.stop = true;
                                    i = this.listComponents.length;
                                    j = this.component.cordenadas.length;

                                    this.confirmCreateComponent()
                                    break;
                                }
                            }
                        }
                    }
                }


                for (let i = 0; i < this.listComponents.length; ++i) {
                    for (let j = 0; j < this.listComponents[i].length; ++j) {
                        let posY = this.listComponents[i][j].y;
                        for (let k = 0; k < this.listComponents.length; ++k) {
                            for (let c = 0; c < this.listComponents[k].length; ++c) {
                                if (posY == this.listComponents[k][c].y) {
                                    this.listDelete.push({ linha: k, elemnto:this.listComponents[k][c]})
                                }
                            }
                        }
                        if (this.listDelete.length == 10) {
                            // for (let i = listDelete[listDelete.length - 1]; i < this.listComponents.length; ++i) {
                            //     for (let k = 0; k < this.listComponents[i].length; ++k) {
                            //         this.listComponents[i][k].y += 25
                            //     }
                            // }
                            for (let i = 0; i < this.listDelete.length; ++i) {
                                let linha = this.listDelete[i].linha;
                                let elemnto = this.listDelete[i].elemnto;
                                let index = this.listComponents[linha].indexOf(elemnto);
                                this.listComponents[linha].splice(index, 1);
                            }
                            console.log(this.listDelete)
                            console.log(this.listComponents)
                        }
                        this.listDelete = []
                    }
                }
                for (let i = 0; i < this.listComponents.length; ++i) {
                    for (let k = 0; k < this.listComponents[i].length; ++k) {
                        this.drawListComponent(this.listComponents[i][k].x, this.listComponents[i][k].y)

                    }
                }
            }
            this.component.drawComponent()
            if (!this.component.stop) {
                this.component.move()
            }
        } else {

        }
    }
    handleKeyDown(e) {
        if (e.key === 'ArrowRight' && this.colisaoBorda1()) {
            this.component.moveRight();
        } if (e.key === 'ArrowLeft' && this.colisaoBorda2()) {
            this.component.moveLeft();
        } if (e.key === 'ArrowUp') {
            if (this.component.horizontal) {
                this.component.moveVertical()
            } else {
                this.component.moveHorizontal()
            }
        }
    }
    addEventListeners() {
        document.addEventListener("keydown", (e) => this.handleKeyDown(e));
    }
    menu() {
        this.ctx.beginPath()
        this.ctx.fillStyle = ''
        this.ctx.fillText('texto', x, y)
    }
    init() {
        this.addEventListeners()
        this.intervalId = setInterval(() => this.update(), 100)
    }

}
const game = new CanvasGame('canvas')

class Component {
    constructor(cordenadas) {
        this.cpx = game.ctx;
        this.cordenadas = cordenadas
        this.width = 25;
        this.color = 'blue';
    }
    drawComponent() {
        this.cpx.fillStyle = 'blue';
        for (let i = 0; i < this.cordenadas.length; ++i) {
            this.cpx.fillRect(this.cordenadas[i].x, this.cordenadas[i].y, this.width, this.width);
        }
    }

    moveRight() {
        for (let i = 0; i < this.cordenadas.length; ++i) {
            this.cordenadas[i].x += 25;

        }
    }
    moveLeft() {
        for (let i = 0; i < this.cordenadas.length; ++i) {
            this.cordenadas[i].x -= 25;

        }
    }
    colision() {
        for (let i = 0; i < this.cordenadas.length; ++i) {
            if (this.cordenadas[i].y > 450) {
                console.log('quadrado limite y')

                return true;
            }
        }
    }
    moveHorizontal() {
        return false;
    }
    move() {
        for (let i = 0; i < this.cordenadas.length; ++i) {
            this.cordenadas[i].y += 25
        }
    }


}
class Barra extends Component {
    constructor(cordenadas) {
        super(cordenadas);
        this.cpx = game.ctx;
        this.width = 25;
        this.stop = false;
        this.cordenadas = cordenadas;
        this.horizontalCordenadas = [{ x: 0, y: 0 }, { x: -25, y: -25 }, { x: -50, y: -50 }, { x: -75, y: -75 }]
        this.c = 0
        this.horizontal = true
        this.colisionX = 450
    }
    colision() {
        for (let i = 0; i < this.cordenadas.length; ++i) {
            if (this.cordenadas[i].y > this.colisionX) {
                console.log('barra limite y')

                return true;
            }
        }

    }
    moveVertical() {
        for (let i = 0; i < this.cordenadas.length; ++i) {
            this.cordenadas[i].x += this.horizontalCordenadas[i].x
            this.cordenadas[i].y += this.horizontalCordenadas[i].y
        }
        this.colisionX = 450
        this.horizontal = false;
    }

    moveHorizontal() {
        this.colisionX = 425
        if (this.cordenadas[2].x == 225) {
            this.c = 75
        }
        for (let i = 0; i < this.cordenadas.length; ++i) {
            this.cordenadas[i].x -= this.horizontalCordenadas[i].x + this.c
            this.cordenadas[i].y -= this.horizontalCordenadas[i].y
        }
        this.c = 0
        this.horizontal = true;
    }

}

class Z extends Component {
    constructor(cordenadas) {
        super(cordenadas)
        this.cpx = game.ctx;
        this.width = 25;
        this.stop = false;
        this.horizontalCordenadas = [{ x: 50, y: 0 }, { x: 25, y: -25 }, { x: 0, y: 0 }, { x: -25, y: -25 }]
        this.verticalCordenadas = [{ x: -50, y: 0 }, { x: -25, y: 25 }, { x: 0, y: 0 }, { x: 25, y: 25 }]
        this.c = 0
        this.cordenadas = cordenadas;
        this.horizontal = true;

    }
    colision() {
        for (let i = 0; i < this.cordenadas.length; ++i) {
            if (this.cordenadas[i].y > 450) {
                console.log('z limite y')

                return true;
            }
        }
    }

    moveVertical() {

        for (let i = 0; i < this.cordenadas.length; ++i) {
            this.cordenadas[i].x += this.horizontalCordenadas[i].x
            this.cordenadas[i].y += this.horizontalCordenadas[i].y
        }

        this.horizontal = false;

    }
    moveHorizontal() {
        if (this.cordenadas[2].x == 0) {
            this.c = 25
        }
        for (let i = 0; i < this.cordenadas.length; ++i) {
            this.cordenadas[i].x += this.verticalCordenadas[i].x + this.c
            this.cordenadas[i].y += this.verticalCordenadas[i].y
        }

        this.c = 0
        this.horizontal = true;


    }

}