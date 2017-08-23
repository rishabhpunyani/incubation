var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext("2d");
document.onkeydown = checkKey;
var canvasWidth = 600;
var canvasHeight = 600;
var chickenLenght = canvasWidth / 12;
var craftLenght = canvasWidth / 6; 
var time = 0 ;
var y = 0;
var level = 1;
var grid = [];
var moveBullet;
var myVar;
var timmer;
var chicken = new Image();      //  
chicken.src = './img/chicken.png';  // 
var sc = new Image(); //
sc.src = './img/sc.png';//
var b = new Image();//
b.src = './img/bullet.png';//
var bgg = new Image();//--------------------
bgg.src = './img/bg.jpg'//----------------------
var st = 0;//
var score = 0;//

var Intro = function(){///////////////////////
    ctx.font = "50px Aerial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("Chicken Invaders", canvas.width/2, canvas.height/2-200);
    ctx.font = "30px Aerial";
    ctx.fillText("Press Enter to Start!", canvas.width/2, canvas.height/2-100);
    ctx.font = "20px Aerial";
    ctx.fillText("Game Controls: Use Arrow keys to control movement and Space to fire", 
    canvas.width/2, canvas.height/2+200);
};

var craft = {
    xPos: canvasWidth / 2 - craftLenght/2,
    yPos: canvasHeight - canvasHeight / 6 - craftLenght / 2,
    dim: craftLenght
}

var icraft = craft;

var bg = function(){

}
var bullet = {
    xPos: 0,
    yPos: 0,
    dim: craftLenght / 10,
    status: "active"
}
var startGame = function(){////////////////////
    craft.xPos = canvasWidth / 2 - craftLenght/2;
    craft.yPos = canvasHeight - canvasHeight / 6 - craftLenght / 2;
    ctx.clearRect(0, 0, 600, 600);
    makeGrid();
    makeGrid();
    makeCraft();
    time = 1;
    clearInterval(myVar);
    myVar = setInterval(function(){
        if( y > level + 3){
            clearInterval(myVar);
            overGame();
        }
        y++;
        moveGrid();
    },4000);
    timmer = setInterval(function(){
        ctx.clearRect(0, canvasHeight - 50 , 100 , 50);
        ctx.font = "30px Aerial";
        ctx.fillStyle = "white";
        ctx.fillText(time, 0, canvasHeight - 50 );
        time = time + 1;
    },1000)
};


var overGame = function(){
    clearInterval(myVar);
    ctx.clearRect(0, 0, 600, 600);
    st=0;score=0;
    ctx.font = "50px Aerial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("You Lost", canvas.width/2, canvas.height/2-200);
    ctx.font = "30px Aerial";
    ctx.fillText("Press Enter to play Again!", canvas.width/2, canvas.height/2-100);
    ctx.font = "20px Aerial";
    ctx.fillText("Game Controls: Use Arrow keys to control movement and Space to fire", 
    canvas.width/2, canvas.height/2+200);
    y = 0;
    clearInterval(timmer);
};

var wonGame = function(){
    clearInterval(myVar);
    deleteGrid();
    ctx.clearRect(0, 0, 600, 600);
    clearInterval(timmer);
    ctx.font = "50px Aerial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("You Won score: " + score, canvas.width/2, canvas.height/2-200);
    ctx.font = "30px Aerial";
    ctx.fillText("Press Enter to play level" + (level + 1) , canvas.width/2, canvas.height/2-100);
    ctx.font = "20px Aerial";
    ctx.fillText("Game Controls: Use Arrow keys to control movement and Space to fire", 
    canvas.width/2, canvas.height/2+200);
    y = 0;
    st=0;
    score=0;
    if( level > 5){
        level = 1;
        overGame();
    }
    else{
        level = level + 1;
    }
    
   
}
//
var drawChicken = function(i, j){///////////////////////////////
    width = canvasWidth / 12;
    ctx.drawImage(chicken,grid[i][j].xPos, grid[i][j].yPos, width, width);
}

var deleteChicken = function(i, j){
    ctx.fillStyle = "#FF0000";
    width = canvasWidth / 12;
    ctx.clearRect(grid[i][j].xPos, grid[i][j].yPos, width, width);
}

var makeGrid = function(){
    width = canvasWidth / 12;
    for (var i = 0; i < level; i++) {
        grid[i] = [];
        for (var j = 0; j < 10; j++) {
            grid[i][j] = {
                xPos: j * width + width,
                yPos: i * width,
                status: "alive"
            }
            drawChicken(i,j);  
        }
    }
}

var updateGrid = function( ){
    var k = 0; 
    for (var i = level - 1; i >= 0; i--) {
        for (var j = 9; j >= 0; j--) {
            if(grid[i][j].status == "alive"){
                k++;
                drawChicken(i, j);
            }
        }
    }
    if(k == 0){
        wonGame();

    }

}
var deleteGrid = function( ){
    for (var i = 0; i < level; i++) {
        for (var j = 0; j < 10; j++) {
            deleteChicken(i,j);  
        }
    }
}
var moveGrid = function( ){
    for (var i = 0; i < level; i++) {
        for (var j = 0; j < 10; j++) {
            if(grid[i][j].status == "alive"){
             deleteChicken(i,j);
            }  
        }
    }
    console.log(grid);
    for (var i = 0; i < level; i++) {
        for (var j = 0; j < 10; j++) {
            grid[i][j].yPos  += 50;  
        }
    }
    console.log(grid);
    for (var i = level - 1; i >= 0; i--) {
        for (var j = 9; j >= 0; j--) {
            if(grid[i][j].status == "alive"){
                drawChicken(i, j);
            }
        }
    }
    craftCrash();
    ctx.clearRect(0, 0, canvasWidth , 20);

}

var makeCraft = function(){////////////////////////////
    ctx.drawImage(sc, craft.xPos, craft.yPos, craftLenght, craftLenght);
}

var craftCrash = function(){
    for (var i = level - 1; i >= 0; i--) {
        for (var j = 9; j >= 0; j--) {
            if(grid[i][j].status == "alive"){
                if( craft.yPos < grid[i][j].yPos + chickenLenght)
                {
                    if (craft.xPos >= grid[i][j].xPos) {
                        if (craft.xPos - grid[i][j].yPos < chickenLenght) {
                            overGame();
                            break;
                        }
                    }
                    else{
                        if(grid[i][j].xPos - craft.xPos < chickenLenght){
                            overGame();
                            break;
                        }
                    }
                    
                }
            }
        }
    }
}

var destroyChicken = function(){
    var k = 0;
    for(i = level - 1; i >= 0; i-- ){
        for(j = 9;j >= 0; j--){
            var c = grid[i][j];
            if(c.status == "alive"){
                if((c.xPos < bullet.xPos + 10 && bullet.xPos < c.xPos + chickenLenght) 
                    && ( bullet.yPos < c.yPos + chickenLenght - 10)&& bullet.yPos > c.yPos - 10){
                    grid[i][j].status = "dead";
                    console.log(i,j);
                    deleteBullet();
                    deleteChicken(i,j);
                    clearInterval(moveBullet);
                    bullet.status = "active";
                    k++;
                    scoreboard();
                    break;
                }
            }
        }
    }

    updateGrid();
};

var deleteCraft = function(){
    ctx.clearRect(craft.xPos - 2, craft.yPos, craft.dim + 5, craft.dim);
};

var makeBullet = function(){////////////////////////////////
    ctx.drawImage( b , bullet.xPos, bullet.yPos, bullet.dim, bullet.dim);
}

var deleteBullet = function(){
    ctx.clearRect(bullet.xPos, bullet.yPos, bullet.dim , bullet.dim);
}
var stopBullet = function(){
    if( bullet.yPos < 10){
        clearInterval(moveBullet);
        bullet.status = "active";
    }
}


function checkKey(e) {

    e = e || window.event;
    if(st==1)/////////////////////////////////////////////
{
    if (e.keyCode == '32' && bullet.status == "active") {
        // up arrow

        bullet.xPos = craft.xPos + craft.dim / 2 - bullet.dim / 2;
        bullet.yPos = craft.yPos - bullet.dim - 2;
        bullet.status = "busy";
        makeBullet(bullet);
        moveBullet = setInterval(function(){
            deleteBullet();
            bullet.yPos = bullet.yPos - 20;
            makeBullet();
            stopBullet();
            destroyChicken();
        }, 25);
    }
    else if (e.keyCode == '38'){
        if (craft.yPos > 10){
            deleteCraft();
            craft.yPos = craft.yPos - 10; 
            makeCraft();
            craftCrash();
        }
    }
    else if (e.keyCode == '40') {
        // down arrow
        if (craft.yPos < canvasHeight - 10 - craft.dim ){
            deleteCraft();
            craft.yPos = craft.yPos + 10; 
            makeCraft();
            craftCrash();
        }
    }
    else if (e.keyCode == '37') {
       // left arrow
        if (craft.xPos > 10){
            deleteCraft();
            craft.xPos = craft.xPos - 10; 
            makeCraft();
            craftCrash();
        }
    
    }
    else if (e.keyCode == '39') {
       // right arrow
        if (craft.xPos < canvasWidth - 10 - craft.dim ){
            deleteCraft();
            craft.xPos = craft.xPos + 10; 
            makeCraft();
            craftCrash();
        }
    }
}
    else if (e.keyCode == 13) {//////////////////////////////////
        startGame();
        st+=1;
    }
}

var scoreboard = function(){/////////////////////////////////////////
    score+=10;
    ctx.clearRect(canvas.width-70, canvas.height-20, 40 , 20);
    ctx.font = "30px Aerial";
    ctx.fillStyle = "white";
    ctx.fillText("score:"+ score, canvas.width-70, canvas.height-10);
};