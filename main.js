class CanvasGame {
    constructor(IdCanvas) {
        this.canvas = document.getElementById(IdCanvas)
        this.ctx = this.canvas.getContext('2d')
        this.speed = 25;
        this.isRuning = true;
        this.listComponents = [];
        this.component;
        this.i = true
        this.componentChoice = Math.floor(Math.random() * 7);
        // this.componentChoice = 4
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
        return new ComponenteI([{ x: 25, y: 0 }, { x: 50, y: 0, }, { x: 75, y: 0, }, { x: 100, y: 0, }])
    }
    criarZ1() {
        return new ComponenteZ([{ x: 25, y: 0, }, { x: 50, y: 0 }, { x: 50, y: -25, }, { x: 75, y: -25 }]);
    }
    criarZ2() {
        return new ComponenteZ([{ x: 25, y: -25, }, { x: 50, y: -25 }, { x: 50, y: 0, }, { x: 75, y: 0 }]);
    }
    criarQuadrado() {
        return new Component([{ x: 0, y: 0 }, { x: 25, y: 0 }, { x: 0, y: -25 }, { x: 25, y: -25 }])
    }
    criarL1() {
        return new ComponenteL1([{ x: 0, y: -25 }, { x: 0, y: 0 }, { x: 25, y: 0 }, { x: 50, y: 0 }])
    }
    criarL2() {
        return new ComponenteL2([{ x: 0, y: 0 }, { x: 25, y: 0 }, { x: 50, y: 0 }, { x: 50, y: -25 }])
    }
    criarT() {
        return new ComponenteT([{ x: 0, y: 0 }, { x: 25, y: 0 }, { x: 50, y: 0 }, { x: 25, y: -25 }])
    }


    drawListComponent(x, y) {
        this.ctx.fillStyle = 'blue';
        this.ctx.fillRect(x, y, 25, 25)

    }

    confirmCreateComponent() {
        this.createComponent = true;
        this.componentChoice = Math.floor(Math.random() * 7)
        // this.componentChoice = 4

    }


    update() {
        this.clearCanvas()


        if (this.isRuning) {
            if (this.createComponent) {
                console.log(this.componentChoice)

                switch (this.componentChoice) {
                    case 0:
                        this.component = this.criarZ1();
                        break;
                    case 1:
                        this.component = this.criarBarra();
                        break;
                    case 2:
                        this.component = this.criarQuadrado();
                        break;
                    case 3:
                        this.component = this.criarZ2();
                        break;
                    case 4:
                        this.component = this.criarL2()
                        break;
                    case 5:
                        this.component = this.criarT();
                        break;
                    case 6:
                        this.component = this.criarL1();
                        break;
                }

                this.createComponent = false;
            }
            this.colisaoX = false;
            this.colisaoPeca = false

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
                                    this.colisaoPeca = true;
                                    i = this.listComponents.length;
                                    j = this.component.cordenadas.length;

                                    this.confirmCreateComponent()
                                    break;
                                }
                            }
                        }
                    }

                }
                if (this.colisaoPeca || this.colisaoX) {
                    for (let i = 0; i < this.listComponents.length; ++i) {
                        for (let j = 0; j < this.listComponents[i].length; ++j) {
                            let posY = this.listComponents[i][j].y;
                            for (let k = 0; k < this.listComponents.length; ++k) {
                                for (let c = 0; c < this.listComponents[k].length; ++c) {
                                    if (posY == this.listComponents[k][c].y) {
                                        this.listDelete.push({ linha: k, elemnto: this.listComponents[k][c] })
                                    }
                                }
                            }
                            if (this.listDelete.length == 10) {
                                for (let i = 0; i < this.listDelete.length; ++i) {
                                    let linha = this.listDelete[i].linha;
                                    let elemnto = this.listDelete[i].elemnto;
                                    let index = this.listComponents[linha].indexOf(elemnto);
                                    this.listDelete[i].index = index;
                                    this.listComponents[linha].splice(index, 1);
                                }
                                console.log(this.listDelete)
                                console.log(this.listComponents)
                                let linha = this.listDelete[0].elemnto.y;
                                let index = linha -25
                                for (let i =index; i > 0; i -= 25) {
                                    let blocoMovido = false
                                    for (let k = 0; k < this.listComponents.length; ++k) {
                                        for (let j = 0; j < this.listComponents[k].length; ++j) {
                                            if (i == this.listComponents[k][j].y) {
                                                blocoMovido = true;
                                                this.listComponents[k][j].y = linha;

                                            }
                                        }
                                    }
                                    if (blocoMovido) {
                                        linha -= 25;
                                    }
                                }
                            }
                            this.listDelete = []
                        }
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
        }
    }
    handleKeyDown(e) {
        if (e.key === 'ArrowRight' && this.component.colisaoBorda1()) {
            this.component.moveRight();
        } if (e.key === 'ArrowLeft' && this.component.colisaoBorda2()) {
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
        this.intervalId = setInterval(() => this.update(), 300)
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
    colisaoBorda1() {
        for (let i = 0; i < this.cordenadas.length; ++i) {
            if (this.cordenadas[i].x > 200) {
                return false;
            }
        }
        return true;

    }
    colisaoBorda2() {
        for (let i = 0; i < this.cordenadas.length; ++i) {
            if (this.cordenadas[i].x < 25) {
                return false;
            }
        }
        return true;

    }


}
class ComponenteI extends Component {
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
        if (this.cordenadas[0].y == 475) {
            return true
        }
        return false;

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

class ComponenteZ extends Component {
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
class ComponenteL1 extends Component {
    constructor(cordenadas) {
        super(cordenadas);
        this.cpx = game.ctx;
        this.width = 25;
        this.stop = false;
        this.cordenadas = cordenadas;
        this.horizontal = true
        this.horizontal1 = true;
        this.vertical1 = true;

    }
    // L([{ x: 0, y: -25 }, { x: 0, y: 0 }, { x: 25, y: 0 }, { x:50, y: 0 }])
    moveVertical() {
        if (this.vertical1) {
            let aux = this.cordenadas[2]

            this.cordenadas[0].x = aux.x - 25
            this.cordenadas[0].y = aux.y + 25
            this.cordenadas[1].x = aux.x
            this.cordenadas[1].y = aux.y + 25
            this.cordenadas[3].x = aux.x
            this.cordenadas[3].y = aux.y - 25
            this.vertical1 = false
        } else {
            let aux = this.cordenadas[2]
            if (this.cordenadas[2].x == 225) {
                aux.x -= 25
            }

            this.cordenadas[0].x = aux.x + 25
            this.cordenadas[0].y = aux.y
            this.cordenadas[1].x = aux.x
            this.cordenadas[1].y = aux.y + 25
            this.cordenadas[3].x = aux.x
            this.cordenadas[3].y = aux.y + 50


            this.vertical1 = true
        }
        this.horizontal = false;

    }
    moveHorizontal() {
        if (this.horizontal1) {
            let aux = this.cordenadas[2]
            if (aux.x == 225) {
                aux.x -= 25
            }
            this.cordenadas[0].x = aux.x + 25
            this.cordenadas[0].y = aux.y + 25
            this.cordenadas[1].x = aux.x + 25
            this.cordenadas[1].y = aux.y
            this.cordenadas[3].x = aux.x - 25
            this.cordenadas[3].y = aux.y
            this.horizontal1 = false
        } else {
            let aux = this.cordenadas[2]
            if (this.cordenadas[2].x == 0) {
                // aux.x -= 25

                aux.x += 25

            }
            this.cordenadas[0].x = aux.x - 25
            this.cordenadas[0].y = aux.y - 25
            this.cordenadas[1].x = aux.x - 25
            this.cordenadas[1].y = aux.y
            this.cordenadas[3].x = aux.x + 25
            this.cordenadas[3].y = aux.y
            this.horizontal1 = true
        }

        this.horizontal = true;
    }

}
class ComponenteL2 extends Component {
    constructor(cordenadas) {
        super(cordenadas);
        this.cpx = game.ctx;
        this.width = 25;
        this.stop = false;
        this.cordenadas = cordenadas;
        this.horizontal = true
        this.horizontal1 = true;
        this.vertical1 = true;
    }
    // ([{ x: 0, y: 0}, { x: 25, y: 0 }, { x: 50, y: 0 }, { x:50, y: -25}])
    moveVertical() {
        if (this.vertical1) {
            let aux = this.cordenadas[2]
            if (aux.x == 225) {
                aux.x -= 25
            }

            this.cordenadas[0].x = aux.x - 25;
            this.cordenadas[0].y = aux.y - 25;
            this.cordenadas[1].x = aux.x;
            this.cordenadas[1].y = aux.y - 25;
            this.cordenadas[3].x = aux.x;
            this.cordenadas[3].y = aux.y + 25;
            this.vertical1 = false
        } else {
            let aux = this.cordenadas[2]
            console.log(this.cordenadas)
            if (this.cordenadas[2].x == 225) {
                aux.x -= 25
            }

            this.cordenadas[0].x = aux.x
            this.cordenadas[0].y = aux.y - 50;
            this.cordenadas[1].x = aux.x
            this.cordenadas[1].y = aux.y - 25;
            this.cordenadas[3].x = aux.x + 25;
            this.cordenadas[3].y = aux.y


            this.vertical1 = true
        }
        this.horizontal = false;

    }
    moveHorizontal() {
        if (this.horizontal1) {
            let aux = this.cordenadas[2]
            if (this.cordenadas[2].x == 225) {
                aux.x -= 25
            }
            this.cordenadas[0].x = aux.x - 25
            this.cordenadas[0].y = aux.y + 25
            this.cordenadas[1].x = aux.x - 25
            this.cordenadas[1].y = aux.y
            this.cordenadas[3].x = aux.x + 25
            this.cordenadas[3].y = aux.y
            this.horizontal1 = false
            console.log('horizontal 1')

        } else {
            let aux = this.cordenadas[2]
            if (this.cordenadas[2].x == 0) {
                aux.x += 25
            }
            this.cordenadas[0].x = aux.x + 25
            this.cordenadas[0].y = aux.y - 25
            this.cordenadas[1].x = aux.x - 25
            this.cordenadas[1].y = aux.y
            this.cordenadas[3].x = aux.x + 25
            this.cordenadas[3].y = aux.y
            console.log('horizontal 2')
            this.horizontal1 = true
        }

        this.horizontal = true;
    }
}

class ComponenteT extends Component {
    constructor(cordenadas) {
        super(cordenadas);
        this.cpx = game.ctx;
        this.width = 25;
        this.stop = false;
        this.cordenadas = cordenadas;
        this.horizontal = true
        this.horizontal1 = true;
        this.vertical1 = true;
    }

    moveVertical() {
        let aux = this.cordenadas[1];
        if (this.vertical1) {
            this.cordenadas[0].x = aux.x
            this.cordenadas[0].y = aux.y - 25
            this.cordenadas[2].x = aux.x
            this.cordenadas[2].y = aux.y + 25
            this.cordenadas[3].x = aux.x - 25
            this.cordenadas[3].y = aux.y

            this.vertical1 = false;
        } else {
            this.cordenadas[0].x = aux.x
            this.cordenadas[0].y = aux.y - 25
            this.cordenadas[2].x = aux.x
            this.cordenadas[2].y = aux.y + 25
            this.cordenadas[3].x = aux.x + 25
            this.cordenadas[3].y = aux.y
            this.vertical1 = true;
        }

        this.horizontal = false;
    }

    moveHorizontal() {
        let aux = this.cordenadas[1];
        if (this.horizontal1) {
            if (aux.x == 225) {
                aux.x -= 25
            }
            this.cordenadas[0].x = aux.x - 25
            this.cordenadas[0].y = aux.y
            this.cordenadas[2].x = aux.x + 25
            this.cordenadas[2].y = aux.y
            this.cordenadas[3].x = aux.x
            this.cordenadas[3].y = aux.y + 25
            this.horizontal1 = false;

        } else {
            if (aux.x == 0) {
                aux.x += 25
            }
            this.cordenadas[0].x = aux.x - 25
            this.cordenadas[0].y = aux.y
            this.cordenadas[2].x = aux.x + 25
            this.cordenadas[2].y = aux.y
            this.cordenadas[3].x = aux.x
            this.cordenadas[3].y = aux.y - 25
            this.horizontal1 = true;
        }


        this.horizontal = true;
    }

}
