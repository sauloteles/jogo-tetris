const canvas = document.getElementById('canvas');
let quadrados;
let verticalBarra =true;
let mover = true
let linha = 0
let largura = 10;

for(let k = 0; k < 200;++k){
    let quadrado = document.createElement('div');
    quadrado.setAttribute('class','quadrado ');
    canvas.appendChild(quadrado);
}

quadrados = Array.from(document.getElementsByClassName('quadrado'))

console.log(quadrados)

class Barra{
    constructor(cordenada1,cordenada2,cordenada3,cordenada4){
        this.cordenada1 = cordenada1
        this.cordenada2 = cordenada2
        this.cordenada3 = cordenada3
        this.cordenada4 = cordenada4
        
        this.cordenadas = [this.cordenada1,this.cordenada2,this.cordenada3,this.cordenada4]

    }
    desenhar(){
        for(let i = 0; i < this.cordenadas.length;++i){
            quadrados[this.cordenadas[i]].classList.add('peca-1');
        }
    }
    moverEsquerda(){
        if(mover){
            this.remove()
            for(let i = 0; i < this.cordenadas.length;++i){
                this.cordenadas[i] -=1; 
            }

        }

    }
    moverDireita(){
        if(mover){
            this.remove()
            for(let i = 0; i < this.cordenadas.length;++i){
                this.cordenadas[i] +=1; 
            }
        }

    }
    remove(){
        for(let i = 0; i < this.cordenadas.length;++i){
            quadrados[this.cordenadas[i]].classList.remove('peca-1');
        }
    }
    vertical(){
        if(mover){
            let aux = this.cordenadas[this.cordenadas.length-1];
            verticalBarra = false;
            this.remove();
            for(let i = this.cordenadas.length-1; i >=0 ;--i){
                this.cordenadas[i] = aux;
                aux-=10
            }            
        }
    }
    horizontal(){
        if(mover){
            let aux = this.cordenadas[this.cordenadas.length-1];
            verticalBarra = true;
            this.remove();
            for(let i = this.cordenadas.length-1; i >=0 ;--i){
                this.cordenadas[i] = aux;
                aux-=1
            }            
        }

    }
}

class Escadinha{
    constructor(cordenada1,cordenada2,cordenada3,cordenada4,escadinhaTipo){
        this.cordenada1 = cordenada1
        this.cordenada2 = cordenada2
        this.cordenada3 = cordenada3
        this.cordenada4 = cordenada4
        this.escadinhaTipo = escadinhaTipo;
        
        this.cordenadas = [this.cordenada1,this.cordenada2,this.cordenada3,this.cordenada4]

    }
    desenhar(){
        for(let i = 0; i < this.cordenadas.length;++i){
            quadrados[this.cordenadas[i]].classList.add('peca-1');
        }
    }
    moverEsquerda(){
        if(mover){
            this.remove()
            for(let i = 0; i < this.cordenadas.length;++i){
                this.cordenadas[i] -=1; 
            }

        }

    }
    moverDireita(){
        if(mover){
            this.remove()
            for(let i = 0; i < this.cordenadas.length;++i){
                this.cordenadas[i] +=1; 
            }
        }

    }
    remove(){
        for(let i = 0; i < this.cordenadas.length;++i){
            quadrados[this.cordenadas[i]].classList.remove('peca-1');
        }
    }
    vertical(){
        if(mover){
            this.remove();
            verticalBarra = false;
            let aux = this.cordenadas[1];
            if(this.escadinhaTipo){
                this.cordenadas[0] = aux-10;
                this.cordenadas[2] = aux+1;
                this.cordenadas[3] = aux+11;                
            }else if(!this.escadinhaTipo){
                this.cordenadas[2] -=1 ;
                this.cordenadas[3] -=21 ;        
            }

        }
    }
    horizontal(){
        if(mover){
            this.remove();
            verticalBarra = true;
            if(this.escadinhaTipo){
                let aux = this.cordenadas[1];
                this.cordenadas[0] = aux-1;
                this.cordenadas[2] = aux+9;
                this.cordenadas[3] = aux+8;
            }else if(!this.escadinhaTipo){
                this.cordenadas[2] +=1;
                this.cordenadas[3] += 21;        
            }
        }

    }
}
class Ele{
    constructor(cordenada1,cordenada2,cordenada3,cordenada4){
        this.cordenada1 = cordenada1
        this.cordenada2 = cordenada2
        this.cordenada3 = cordenada3
        this.cordenada4 = cordenada4
        
        this.cordenadas = [this.cordenada1,this.cordenada2,this.cordenada3,this.cordenada4]
        this.horizontal1 = true
        this.horizontal2 = false

        this.vertical1 = true
        this.vertical2 = false
        
    }
    desenhar(){
        for(let i = 0; i < this.cordenadas.length;++i){
            quadrados[this.cordenadas[i]].classList.add('peca-1');
        }
    }
    moverEsquerda(){
        if(mover){
            this.remove()
            for(let i = 0; i < this.cordenadas.length;++i){
                this.cordenadas[i] -=1; 
            }
        }
    }

    moverDireita(){
        if(mover){
            this.remove()
            for(let i = 0; i < this.cordenadas.length;++i){
                this.cordenadas[i] +=1; 
            }
        }

    }
    remove(){
        for(let i = 0; i < this.cordenadas.length;++i){
            quadrados[this.cordenadas[i]].classList.remove('peca-1');
        }
    }
    vertical(){
        if(mover){
            let aux = this.cordenadas[1];
            verticalBarra = false;
            this.remove();
            if(this.vertical1){
 
                this.cordenadas[0] = aux-10 
                this.cordenadas[2] = aux+10
                this.cordenadas[3] = this.cordenadas[2]+1
                this.vertical1 = false;
                this.vertical2 = true;

            }else if(this.vertical2){
 
                this.cordenadas[0] = aux-10 
                this.cordenadas[2] = aux+10
                this.cordenadas[3] = this.cordenadas[0]-1
                this.vertical1 = true;
                this.vertical2 = false;
            }        
        }
    }
    horizontal(){
        if(mover){
            let aux = this.cordenadas[1];
            verticalBarra = true;
            this.remove();
            if(this.horizontal1){
                this.cordenadas[0] = aux+1
                this.cordenadas[2] = aux-1
                this.cordenadas[3] = this.cordenadas[2]+10
                this.horizontal1 = false;
                this.horizontal2 = true;

            }else if(this.horizontal2){
                this.cordenadas[0] = aux-1
                this.cordenadas[2] = aux+1
                this.cordenadas[3] = this.cordenadas[2]-10
                this.horizontal1 = true;
                this.horizontal2 = false;

            }
  
        }

    }
}
let peca;

function criarBarra(){
    mover = true;
    peca = new Barra(3,4,5,6)
    peca.desenhar()

}
function criarEscadinha1(){
    mover = true;
    peca  = new Escadinha(3,4,13,12,true)
    peca.desenhar()
}
function criarEscadinha2(){
    mover = true;
    peca  = new Escadinha(3,4,14,15,false)
    peca.desenhar()
}
function criarEle1(){
    mover = true;
    peca  = new Ele(13,14,15,5)
    peca.desenhar()   
}
function criarEle2(){
    mover = true;
    peca  = new Ele(13,14,15,3)
    peca.desenhar()   
}
criarEle2()
console.log(peca.horizontal2)
setInterval(()=>{
    if(peca.cordenadas[0] < 190 && peca.cordenadas[1] < 190 && peca.cordenadas[2] < 190  && peca.cordenadas[3] < 190 ){        
        peca.remove()
        for(let i = 0; i < peca.cordenadas.length;++i){
            peca.cordenadas[i] += 10
        }    
        peca.desenhar()
        
    }else{
        mover = false
    }
},800)
document.addEventListener('keydown',(e)=>{
    switch(e.key){
        case 'ArrowLeft':
            let esquerda = peca.cordenadas[0] % largura === 0;
            if(!esquerda) peca.moverEsquerda();
            break;
        case 'ArrowRight':
            let direita = peca.cordenadas[peca.cordenadas.length-1] % largura === largura - 1
            if(!direita) peca.moverDireita();
            break;
        case 'ArrowUp':
            if(verticalBarra) peca.vertical();
            else peca.horizontal();
            break;
    }
})