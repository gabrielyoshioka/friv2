let gameMatrix = [];
let tempSelected=null;

function creatValues() {
function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let randomIntegers = [];

    for (let i = 0; i < 18; i++) {
        const randomInt = getRandomInt(1, 10);
      // const randomInt = 1;
        randomIntegers.push(randomInt);
    }

    // 复制数组并合并
const copiedArray = randomIntegers.slice();
const mergedArray = copiedArray.concat(randomIntegers);
// 洗牌算法
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// 复制并打乱数组
const shuffledArray = [...mergedArray];
shuffleArray(shuffledArray);

// 打印原始数组和打乱后的数组
//console.log("Original Array:", mergedArray);
//console.log("Shuffled Array:", shuffledArray);
return shuffledArray;
    }

    let total=36;
    const linhas = 8;
    const colunas = 8;
    const value=0;
    let selectedTile = null;

function initializeGameBoard() {
        const gameBoard = document.getElementById('gameBoard');
        const valueToInsert=creatValues();
        let temp=0;

    for (let i = 0; i < linhas; i++) {

            let linhas = [];
            for (let j = 0; j <colunas; j++) {    
                const tile = document.createElement('div');
                tile.classList.add('game-tile');
                tile.dataset.linhas = i;
                tile.dataset.colunas = j;
                if(j>=1&&j<=6&&i>=1&&i<=6){

                tile.dataset.value = valueToInsert[temp];
                linhas.push(valueToInsert[temp]);
                temp=temp+1;
              }else{
                tile.dataset.value = -1;
                linhas.push(-1);}
              
                //tile.textContent = i + '-' + j+ '-' + valueToinsert[temp];
                
                
        //img
        if(j>=1&&j<=6&&i>=1&&i<=6){
        const img = document.createElement('img');
        img.src = `https://github.com/weixiaoUfesa/pweb_2020.2_weixiaoChen/blob/main/CoisasDeUnifesp/jogo/${Number(tile.dataset.value)}.gif?raw=true`;
        img.style.width = '80px';
        img.style.height = '80px';
        tile.appendChild(img);
        tile.addEventListener('click', handleTileClick); }
            gameBoard.appendChild(tile);
            }
        gameMatrix.push(linhas);
    }
    /*for (let i = 0; i < 8; i++) {
for (let j = 0; j <8; j++){
  
    if(j>=1&&j<=6&&i>=1&&i<=6){
    }else{gameMatrix[i][j]=-1}
}  }*/
    return gameMatrix;
        
    }
                    
function handleTileClick(event) 
{
        if (event.target.tagName === 'IMG') 
        {
        event.target.closest('.game-tile');
        const clickedTile = event.target.closest('.game-tile');
        clickedTile.style.border =  '2px solid red';
        
        if (selectedTile) 
        {
              if (semVirada(selectedTile, clickedTile) && sameValue(selectedTile, clickedTile) || sameValue(selectedTile, clickedTile) && semViradaReta(selectedTile, clickedTile)|| sameValue(selectedTile, clickedTile) && umaVirada(selectedTile,clickedTile)|| sameValue(selectedTile, clickedTile) && duasVirada(selectedTile,clickedTile))
              {
            //if (semVirada(selectedTile, clickedTile) && sameValue(selectedTile, clickedTile) || sameValue(selectedTile, clickedTile) && semViradaReta(selectedTile, clickedTile)|| sameValue(selectedTile, clickedTile) && umaVirada(selectedTile, //clickedTile))
            conectado(selectedTile, clickedTile)

              } else {
                // nao combinou, escolhe denovo
                clickedTile.style.border =  'none';
                selectedTile.style.border =  'none';
                selectedTile=null;
                    }
    } else {
          selectedTile = clickedTile;// escolher o primeiro bloco
                }
        }
}
    
function resetSelection(tile1, tile2) {
    if (tile1 && tile2) {
        tile1.style.border = 'none';
        tile2.style.border = 'none';
        tempSelected=selectedTile;
        selectedTile = null;
    }
}
  
function sameValue(tile1, tile2) {

    if(tile1.dataset.colunas === tile2.dataset.colunas&&tile1.dataset.linhas === tile2.dataset.linhas){return false}

return tile1.dataset.value === tile2.dataset.value;

}
//Reta
function semVirada(tile1, tile2) {

    return tile1.dataset.colunas === tile2.dataset.colunas && Number(tile1.dataset.linhas) === Number(tile2.dataset.linhas)-1 ||
tile1.dataset.colunas === tile2.dataset.colunas && Number(tile1.dataset.linhas) === Number(tile2.dataset.linhas)+1 ||
Number(tile1.dataset.colunas) === Number(tile2.dataset.colunas) + 1 && tile1.dataset.linhas === tile2.dataset.linhas ||
Number(tile1.dataset.colunas) === Number(tile2.dataset.colunas) -1 && tile1.dataset.linhas === tile2.dataset.linhas; 
    
} 


//Reta
function semViradaReta(tile1, tile2) {
    
    let MatrizTemp = JSON.parse(JSON.stringify(gameMatrix));

    // uma direçao
    function handleDirection(linhaDelta, colunaDelta) {
        let linha = Number(tile1.dataset.linhas) + linhaDelta;
        let coluna = Number(tile1.dataset.colunas) + colunaDelta;

        while (linha >= 0 && linha <= 7 && coluna >= 0 && coluna <= 7) {
            if (gameMatrix[linha][coluna] !== -1) {
                MatrizTemp[linha][coluna] = -2;
                break;
            }
            linha += linhaDelta;
            coluna += colunaDelta;
        }
    }

    //direito
    handleDirection(0, 1);

    //esquerdo
    handleDirection(0, -1);

    // baixo
    handleDirection(1, 0);

    // cima
    handleDirection(-1, 0);

    // se é igual?
    if (MatrizTemp[tile2.dataset.linhas][tile2.dataset.colunas] === -2) {
        return true;
    }

    return false;
}

//uma virada
function umaVirada(tile1, tile2){
    
    let MatrizTemp2 = [];
    MatrizTemp2  = JSON.parse(JSON.stringify(gameMatrix));
//para direito>

    // let i = Number(tile1.dataset.colunas)+1;
    
    let i = Number(tile1.dataset.colunas);
    while (i <= 7){
        if(gameMatrix[tile1.dataset.linhas][i]>0){  break; }
        if (gameMatrix[tile1.dataset.linhas][i]<0){//nao vazio, para cima
            for (let linha = tile1.dataset.linhas; linha >=0; linha--) {
              if (gameMatrix[linha ][i] > 0) {//nao vazio, marcar e sair
                MatrizTemp2[linha][i] = -2;
                break;
              }
            }   
        }

        if (gameMatrix[tile1.dataset.linhas][i]<0){//nao vazio, para baixo
            for (let linha = tile1.dataset.linhas; linha <= 7; linha++) {
              if (gameMatrix[linha ][i] > 0) {//nao vazio, marcar e sair
                MatrizTemp2[linha][i] = -2;
                break;
              }
            }     
    
        }

        //console.log(MatrizTemp2);
    i++;//coluna;
} 

//para esquerdo
//let a = Number(tile1.dataset.colunas)-1;
a = Number(tile1.dataset.colunas);

    
while ( a >= 0 ){
        
        if(gameMatrix[tile1.dataset.linhas][a]>0){  break; }
        if (gameMatrix[tile1.dataset.linhas][a]<0){//不是空格，往上搜索
            for (let linha = tile1.dataset.linhas; linha >=0; linha--) {
              if (gameMatrix[linha ][a] > 0) {//不是空格，标记，退出
                MatrizTemp2[linha][a] = -2;
                break;
              }
            }   
        }

        if (gameMatrix[tile1.dataset.linhas][a]<0){//不是空格，往xia搜索
            for (let linha = tile1.dataset.linhas; linha <= 7; linha++) {
              if (gameMatrix[linha ][a] > 0) {//不是空格，标记，退出
                MatrizTemp2[linha][a] = -2;
                break;
              }
            }     
    
        }

        if( a < 0 ){ break;}
        if (Number(gameMatrix[tile1.dataset.linhas][a]) !== -1) {
        MatrizTemp2[Number(tile1.dataset.linhas)][a] = -2;   
        break;
    }
    a--;
} 

//para baixo

//let w = Number(tile1.dataset.linhas)+1;
let w = Number(tile1.dataset.linhas);
while ( w <= 7 ){
  
        if(gameMatrix[w][tile1.dataset.colunas]>0){  break; }
        if (gameMatrix[w][tile1.dataset.colunas]<0){//不是空格，往you搜索
            for (let colunas = tile1.dataset.colunas; colunas >=0; colunas--) {
              if (gameMatrix[w][colunas] > 0) {//不是空格，标记，退出
                MatrizTemp2[w][colunas] = -2;
                break;
              }
            }   
        }

        if (gameMatrix[w][tile1.dataset.colunas]<0){//不是空格，往zuo搜索
            for (let colunas = tile1.dataset.colunas; colunas <= 7; colunas++) {
              if (gameMatrix[w][colunas] > 0) {//不是空格，标记，退出
                MatrizTemp2[w][colunas] = -2;
                break;
              }
            }     
    
        }
        
    w++;
}

//para cim
    //let s = Number(tile1.dataset.linhas)-1;
    let s = Number(tile1.dataset.linhas);
    while ( s >=0 ){
        if(gameMatrix[s][tile1.dataset.colunas]>0){  break; }
        if (gameMatrix[s][tile1.dataset.colunas]<0){//不是空格，往you搜索
            for (let colunas = tile1.dataset.colunas; colunas >=0; colunas--) {
              if (gameMatrix[s][colunas] > 0) {//不是空格，标记，退出
                MatrizTemp2[s][colunas] = -2;
                break;
              }
            }   
        }

        if (gameMatrix[s][tile1.dataset.colunas]<0){//不是空格，往xia搜索
            for (let colunas = tile1.dataset.colunas; colunas <=7; colunas++ ) {
              if (gameMatrix[s][colunas] > 0) {//不是空格，标记，退出
                MatrizTemp2[s][colunas] = -2;
                break;
              }
            }     
        }
      
    s--;
    } 


  if (Number(MatrizTemp2[tile2.dataset.linhas][tile2.dataset.colunas])===-2 ){return true}

}
      
function duasVirada(tile1, tile2)
{
  
    let MatrizTemp2 = [];
    MatrizTemp2  = JSON.parse(JSON.stringify(gameMatrix));
//para direito>

    let i = Number(tile1.dataset.colunas)+1;
    //para direito>

    while (i <= 7) {
        if(gameMatrix[tile1.dataset.linhas][i]>0){  break; }
        if (gameMatrix[tile1.dataset.linhas][i]<0){//nao vazio, para cima
            for (let linha = tile1.dataset.linhas; linha >=0; linha--) {

                for (let j=i; j>=0; j--) { // 右for
                if (gameMatrix[linha ][j] > 0) {//nao vazio, marcar e sair
                MatrizTemp2[linha][j] = -2;
                break; } }


                for (let j=i; j<=7; j++) { // 右for
              if (gameMatrix[linha][j] > 0) {//nao vazio, marcar e sair
                MatrizTemp2[linha][j] = -2;
                break;
              } }

              if (gameMatrix[linha][i] > 0) {//nao vazio, marcar e sair
                MatrizTemp2[linha][i] = -2;
                break;} 
            }   
        }

        if (gameMatrix[tile1.dataset.linhas][i]<0){//nao vazio, para baixo
            for (let linha = tile1.dataset.linhas; linha <= 5; linha++) {


                for (let j=i; j>=0; j--) { // 右for
                if (gameMatrix[linha ][j] > 0) {//nao vazio, marcar e sair
                MatrizTemp2[linha][j] = -2;
                break; } }


                for (let j=i; j<=7; j++) { // 右for
              if (gameMatrix[linha][j] > 0) {//nao vazio, marcar e sair
                MatrizTemp2[linha][j] = -2;
                break;
              } }
                
              if (gameMatrix[linha ][i] > 0) {//nao vazio, marcar e sair
                MatrizTemp2[linha][i] = -2;
                break;
              }
            }     
    
        }

        //console.log(MatrizTemp2);
    i++;//coluna;
} 
//para esquerdo
let a = Number(tile1.dataset.colunas)-1;
    console.log(tile1.dataset.colunas);
    
    while ( a >= 0 ) {
        
        if(gameMatrix[tile1.dataset.linhas][a]>0){  break; }
        if (gameMatrix[tile1.dataset.linhas][a]<0){//不是空格，往上搜索
            for (let linha = tile1.dataset.linhas; linha >=0; linha--) {

                for (let j=a; j>=0; j--) { // 右for
                if (gameMatrix[linha ][j] > 0) {//nao vazio, marcar e sair
                MatrizTemp2[linha][j] = -2;
                break; } }


                for (let j=a; j<=7; j++) { // 右for
              if (gameMatrix[linha][j] > 0) {//nao vazio, marcar e sair
                MatrizTemp2[linha][j] = -2;
                break;
              } }


              if (gameMatrix[linha ][a] > 0) {//不是空格，标记，退出
                MatrizTemp2[linha][a] = -2;
                break;
              }
            }   
        }

        if (gameMatrix[tile1.dataset.linhas][a]<0){//不是空格，往xia搜索
            for (let linha = tile1.dataset.linhas; linha <= 5; linha++) {
                

                for (let j=a; j>=0; j--) { // 右for
                if (gameMatrix[linha ][j] > 0) {//nao vazio, marcar e sair
                MatrizTemp2[linha][j] = -2;
                break; } }


                for (let j=a; j<=7; j++) { // 右for
              if (gameMatrix[linha][j] > 0) {//nao vazio, marcar e sair
                MatrizTemp2[linha][j] = -2;
                break;
              } }

              if (gameMatrix[linha ][a] > 0) {//不是空格，标记，退出
                MatrizTemp2[linha][a] = -2;
                break;
              }
            }     
    
        }

        if( a < 0 ){ break;}
        if (Number(gameMatrix[tile1.dataset.linhas][a]) !== -1) {
        MatrizTemp2[Number(tile1.dataset.linhas)][a] = -2;   
        break;
    }
    a--;
}
//para baixo

let w = Number(tile1.dataset.linhas)+1;
while ( w <= 7 ){
        if(gameMatrix[w][tile1.dataset.colunas]>0){  break; }
        if (gameMatrix[w][tile1.dataset.colunas]<0){//不是空格，往you搜索
            for (let colunas = tile1.dataset.colunas; colunas >=0; colunas--) {

                for (let j=w; j>=0; j--) { // 上
                if (gameMatrix[j][colunas] > 0) {//nao vazio, marcar e sair
                MatrizTemp2[j][colunas] = -2;
                break; } }


                for (let j=w; j<=7; j++) { // 下 for
                if (gameMatrix[j][colunas] > 0) {//nao vazio, marcar e sair
                MatrizTemp2[j][colunas] = -2;
                break;
              } }



              if (gameMatrix[w][colunas] > 0) {//不是空格，标记，退出
                MatrizTemp2[w][colunas] = -2;
                break;
              }
            }   
        }

        if (gameMatrix[w][tile1.dataset.colunas]<0){//不是空格，往zuo搜索
            for (let colunas = tile1.dataset.colunas; colunas <= 7; colunas++) {

                for (let j=w; j>=0; j--) { // // 上for
                if (gameMatrix[j][colunas] > 0) {//nao vazio, marcar e sair
                MatrizTemp2[j][colunas] = -2;
                break; } }


                for (let j=w; j<=7; j++) { // 下 for
                if (gameMatrix[j][colunas] > 0) {//nao vazio, marcar e sair
                MatrizTemp2[j][colunas] = -2;
                break;
              } }


              if (gameMatrix[w][colunas] > 0) {//不是空格，标记，退出
                MatrizTemp2[w][colunas] = -2;
                break;
              }
            }     
    
        }
        
    w++;
} 

//para cim
    let s = Number(tile1.dataset.linhas)-1;
    console.log(`valor-s`,s);
    console.log(`,gameMatrix`,gameMatrix[s+1][tile1.dataset.colunas]);
    while ( s >=0 ){
        if(gameMatrix[s][tile1.dataset.colunas]>0){  break; }
        if (gameMatrix[s][tile1.dataset.colunas]<0){//不是空格，往you搜索
            for (let colunas = tile1.dataset.colunas; colunas >=0; colunas--) {
                for (let j=s; j>=0; j--) { // 上
                if (gameMatrix[j][colunas] > 0) {//nao vazio, marcar e sair
                MatrizTemp2[j][colunas] = -2;
                break; } }


                for (let j=s; j<=7; j++) { // 下 for
                if (gameMatrix[j][colunas] > 0) {//nao vazio, marcar e sair
                MatrizTemp2[j][colunas] = -2;
                break;
              } }
              if (gameMatrix[s][colunas] > 0) {//不是空格，标记，退出
                MatrizTemp2[s][colunas] = -2;
                break;
              }
            }   
        }

        if (gameMatrix[s][tile1.dataset.colunas]<0){//不是空格，往xia搜索
            for (let colunas = tile1.dataset.colunas; colunas <= 5; colunas++ ) {

                for (let j=s; j>=0; j--) { // 上
                if (gameMatrix[j][colunas] > 0) {//nao vazio, marcar e sair
                MatrizTemp2[j][colunas] = -2;
                break; } }


                for (let j=s; j<=7; j++) { // 下 for
                if (gameMatrix[j][colunas] > 0) {//nao vazio, marcar e sair
                MatrizTemp2[j][colunas] = -2;
                break;
              } }

              if (gameMatrix[s][colunas] > 0) {//不是空格，标记，退出
                MatrizTemp2[s][colunas] = -2;
                break;
              }
            }     
        }
      
    s--;
    } 
  

  
    
if (Number(MatrizTemp2[tile2.dataset.linhas][tile2.dataset.colunas])===-2 ){return true}
}


function conectado(tile1, tile2) {
                        console.log("连接有效");
                        // 连接有效，处理连接逻辑
                            //console.log(`Connecting ${tile1.textContent} and ${tile2.textContent}`);
                        // 变透明
                        tile1.style.opacity = 0;
                        tile2.style.opacity = 0;
                                gameMatrix[tile1.dataset.linhas][tile1.dataset.colunas]=-1;
                                gameMatrix[tile2.dataset.linhas][tile2.dataset.colunas]=-1;
                                tile1.style.border = 'none';
                                tile2.style.border = 'none';
                                console.log(`selectedTile( ${tile1.textContent} clickedTile( ${tile2.textContent}`);
                                selectedTile=null;
                                total=total-2;
                                if(total===0){window.alert("venceu");}
                                console.log(gameMatrix);
}
window.onload = initializeGameBoard;




console.log(`aaaa`,gameMatrix);