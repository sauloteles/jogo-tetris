const canvas = document.getElementById('canvas');
let quadrados;
let verticalBarra =true;
let mover = true
let linha = 0
let largura = 10;

for(let k = 0; k < 200;++k){
    let quadrado = document.createElement('div');
    quadrado.setAttribute('class','quadrado ');
    quadrado.setAttribute('id',k);

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
        this.cordenadasColisao = this.cordenadas;
        this.colisaoHorizontal = true;

    }
    desenhar(){
        for(let i = 0; i < this.cordenadas.length;++i){
            quadrados[this.cordenadas[i]].classList.add('peca-1');
        }
        if(this.colisaoHorizontal){
            this.cordenadasColisao = this.cordenadas;

        }else if(!this.colisaoHorizontal){
            this.cordenadasColisao = [this.cordenadas[3]];
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
            this.colisaoHorizontal = false;
            
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
            
            this.colisaoHorizontal = true;
            
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
        this.colisaoHorizontal = true;

    }
    desenhar(){
        for(let i = 0; i < this.cordenadas.length;++i){
            quadrados[this.cordenadas[i]].classList.add('peca-1');
        }
        if(this.escadinhaTipo){
            if(this.colisaoHorizontal){
                this.cordenadasColisao =[this.cordenadas[1],this.cordenadas[2],this.cordenadas[3]] ;
            }else{
                this.cordenadasColisao =[this.cordenadas[1],this.cordenadas[3]] 
            }
        }else if(!this.escadinhaTipo){
            if(this.colisaoHorizontal){
                this.cordenadasColisao =[this.cordenadas[0],this.cordenadas[2],this.cordenadas[3]];
            }else{
                this.cordenadasColisao =[this.cordenadas[1],this.cordenadas[3]];
            }
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
                this.colisaoHorizontal = false
                this.cordenadas[0] = aux-10;
                this.cordenadas[2] = aux+1;
                this.cordenadas[3] = aux+11;                
            }else if(!this.escadinhaTipo){
                this.colisaoHorizontal = false
                this.cordenadas[2] =aux-10;
                this.cordenadas[3] =aux+9;        
            }
        }
    }
    horizontal(){
        if(mover){
            this.remove();
            verticalBarra = true;
            let aux = this.cordenadas[1];
            if(this.escadinhaTipo){
                this.colisaoHorizontal = true
                this.cordenadas[0] = aux-1;
                this.cordenadas[2] = aux+9;
                this.cordenadas[3] = aux+8;
            }else if(!this.escadinhaTipo){
                this.colisaoHorizontal = true
                this.cordenadas[2] =aux+10;
                this.cordenadas[3] =aux+11;        
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
        this.horizontalBolean = true

        this.verticalBolean = true
        this.cordenadasColisao = [this.cordenada1,this.cordenada2,this.cordenada3];
        
    }
    desenhar(){
        for(let i = 0; i < this.cordenadas.length;++i){
            quadrados[this.cordenadas[i]].classList.add('peca-1');
        }
        if(verticalBarra){
            if(this.horizontalBolean){
                this.cordenadasColisao = [this.cordenadas[0],this.cordenadas[1],this.cordenadas[2]]
            }else{
                this.cordenadasColisao = [this.cordenadas[0],this.cordenadas[1],this.cordenadas[3]]
            }
        }else{
            if(this.verticalBolean){
                this.cordenadasColisao = [this.cordenadas[2],this.cordenadas[3]]
            }else{
                this.cordenadasColisao = [this.cordenadas[2],this.cordenadas[3]]
            }    
            

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
            if(this.verticalBolean){
                this.cordenadas[0] = aux-10 
                this.cordenadas[2] = aux+10
                this.cordenadas[3] = this.cordenadas[2]+1
                this.verticalBolean = false;

            }else{
                this.cordenadas[0] = aux-10 
                this.cordenadas[2] = aux+10
                this.cordenadas[3] = this.cordenadas[0]-1
                this.verticalBolean = true;
            }        
        }
    }
    horizontal(){
        if(mover){
            let aux = this.cordenadas[1];
            verticalBarra = true;
            this.remove();
            if(this.horizontalBolean){
                this.cordenadas[0] = aux+1
                this.cordenadas[2] = aux-1
                this.cordenadas[3] = this.cordenadas[2]+10
                this.horizontalBolean = false;

            }else{
                this.cordenadas[0] = aux-1
                this.cordenadas[2] = aux+1
                this.cordenadas[3] = this.cordenadas[2]-10
                this.horizontalBolean = true;

            }
  
        }

    }
}
class Quadrado{
    constructor(cordenada1,cordenada2,cordenada3,cordenada4){
        this.cordenada1 = cordenada1
        this.cordenada2 = cordenada2
        this.cordenada3 = cordenada3
        this.cordenada4 = cordenada4
        
        this.cordenadas = [this.cordenada1,this.cordenada2,this.cordenada3,this.cordenada4]
        this.cordenadasColisao = [this.cordenadas[2],this.cordenadas[3]]

    }
    desenhar(){
        for(let i = 0; i < this.cordenadas.length;++i){
            quadrados[this.cordenadas[i]].classList.add('peca-1');
        }
        this.cordenadasColisao = [this.cordenadas[2],this.cordenadas[3]]

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
   
}
class Te{
    constructor(cordenada1,cordenada2,cordenada3,cordenada4){
        this.cordenada1 = cordenada1
        this.cordenada2 = cordenada2
        this.cordenada3 = cordenada3
        this.cordenada4 = cordenada4
        
        this.cordenadas = [this.cordenada1,this.cordenada2,this.cordenada3,this.cordenada4]
        this.cordenadasColisao =[this.cordenadas[0],this.cordenadas[1],this.cordenadas[2]];
        this.horizontalBolean = true;
        this.verticalBolean = true

    }
    desenhar(){
        for(let i = 0; i < this.cordenadas.length;++i){
            quadrados[this.cordenadas[i]].classList.add('peca-1');
        }
        if(verticalBarra){
            if(this.horizontalBolean){
                this.cordenadasColisao = [this.cordenadas[0],this.cordenadas[1],this.cordenadas[2]]
            }else{
                this.cordenadasColisao = [this.cordenadas[0],this.cordenadas[1],this.cordenadas[3]]               
            }
        }else{
            this.cordenadasColisao = [this.cordenadas[1],this.cordenadas[3]]
            
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
            let aux = this.cordenadas[2];
            verticalBarra = false;
            this.remove();
            if(this.verticalBolean){
                this.cordenadas[0] = aux-10
                this.cordenadas[1] = aux+10
                this.cordenadas[3] = aux+1
                this.verticalBolean = false
            }else{
                this.cordenadas[0] = aux-10
                this.cordenadas[1] = aux+10
                this.cordenadas[3] = aux-1
                this.verticalBolean = true
            }


        }
    }
    horizontal(){
        if(mover){
            let aux = this.cordenadas[2];
            verticalBarra = true;
            this.remove();
            if(this.horizontalBolean){
                this.cordenadas[0] = aux-1
                this.cordenadas[1] = aux+1
                this.cordenadas[3] = aux+10
                this.horizontalBolean = false
            }else{
                this.cordenadas[0] = aux-1
                this.cordenadas[1] = aux+1
                this.cordenadas[3] = aux-10
                this.horizontalBolean = true
            }
            
        }

    }
}


let peca;
function colisaoBase(){
    if(peca.cordenadas[0] < 190 && peca.cordenadas[1] < 190 && peca.cordenadas[2] < 190  && peca.cordenadas[3] < 190 ){
        return true;
    }
    return false;
}
function sistemaPontuacao(){
    let x = 0
    let cordenadasLinhas = []
    for(let i = 0; i < quadrados.length;i+= 10){
        for(let j = i; j <= i+9;++j){
            if(quadrados[j].classList[1] == 'peca-1'){
                ++x;
                cordenadasLinhas.push(j)
            }            
        }
        if(x == 10){
            for(let k = 0; k < cordenadasLinhas.length;++k){
                // canvas.removeChild(quadrados[cordenadasLinhas[k]])
                quadrados[cordenadasLinhas[k]].classList.remove('peca-1')
            }
            for(let j = cordenadasLinhas[9];j >= 0; j-=1){
                if(quadrados[j].classList.length == 2){
                    if(quadrados[j+10].classList.length != 2){
                        quadrados[j].classList.remove('peca-1')
                        quadrados[j+10].classList.add('peca-1')
                    }                    

                }
            }

        }
        x = 0
        cordenadasLinhas = []
    }
}

function criarBarra(){
    mover = true;
    verticalBarra = true;
    peca = new Barra(3,4,5,6)
    peca.desenhar()

}
function criarEscadinha1(){
    mover = true;
    verticalBarra = true
    peca  = new Escadinha(3,4,13,12,true)
    peca.desenhar()
}
function criarEscadinha2(){
    mover = true;
    verticalBarra = true
    peca  = new Escadinha(3,4,14,15,false)
    peca.desenhar()
}
function criarEle1(){
    mover = true
    verticalBarra = true
    peca  = new Ele(13,14,15,5)
    peca.desenhar()   
}
function criarEle2(){
    mover = true;
    verticalBarra = true
    peca  = new Ele(13,14,15,3)
    peca.desenhar()   
}
function criarTe(){
    mover = true;
    verticalBarra = true
    peca  = new Te(13,14,15,4)
    peca.desenhar()   
}
function criarQuadrado(){
    mover = true;
    peca  = new Quadrado(3,4,13,14)
    peca.desenhar()   
}

criarBarra()

function colisaoPecas(){
    for(let i = 0; i < peca.cordenadasColisao.length; ++i){
        if(quadrados[peca.cordenadasColisao[i]+10].classList[1] == 'peca-1'){
            return false;
        }
    }
    return true;
}
setInterval(()=>{
    if(colisaoBase() && colisaoPecas()){        
        peca.remove()
        for(let i = 0; i < peca.cordenadas.length;++i){
            peca.cordenadas[i] += 10
        }    
        sistemaPontuacao()
        peca.desenhar()  
    }else{
        mover = false
        let x = Math.floor(Math.random() * 6 );
        if(x == 0) criarBarra();
        if(x == 1) criarQuadrado();
        if(x == 2) criarEscadinha2();
        if(x == 3) criarEscadinha1();
        if(x == 4) criarEle1();
        if(x == 5) criarEle2();
        if(x == 6) criarTe();
    }
},500)
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