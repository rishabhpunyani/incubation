
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext("2d");
document.onkeydown = checkKey;
var canvasWidth = 600;
var canvasHeight = 600;
var chickenLenght = canvasWidth / 12;
var craftLenght = canvasWidth / 6; 
var time = 21 ;
var y = 0;
var grid = [];
var craft = {
    xPos: canvasWidth / 2 - craftLenght/2,
    yPos: canvasHeight - canvasHeight / 6 - craftLenght / 2,
    dim: craftLenght
}
var bullet = {
    xPos: 0,
    yPos: 0,
    dim: craftLenght / 10,
    status: "active"
}
var startGame = function(){};

var overGame = function(){};

var timmer = function(){
    var myVar = setInterval(function(){
        if( y > 6){
            clearInterval(myVar);
        }
        updateGrid( );
        y++;
        
    },4000)
};

var drawChicken = function(i, j){
    ctx.fillStyle = "#FF0000";
    width = canvasWidth / 12;
    grid[i][j].xPos = j * width + width;
    grid[i][j].yPos = i * width + y * width
    ctx.fillRect((j * width) + width, i * width + y * width, width - 5, width - 5);
}
var deleteChicken = function(i, j){
    ctx.fillStyle = "#FF0000";
    width = canvasWidth / 12;
    ctx.clearRect((j * width) + width, i * width, width - 4, width - 4);
}
var makeGrid = function(){
    for (var i = 0; i < 4; i++) {
        grid[i] = [];
        for (var j = 0; j < 10; j++) {
            grid[i][j] = {
                xPos: 0,
                yPos: 0,
                status: "alive"
            }
            drawChicken(i,j);  
        }
    }
}
var updateGrid = function( ){
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 10; j++) {
            deleteChicken(i,j);  
        }
    }
    var k = 0; 
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 10; j++) {
            if(grid[i][j].status == "alive"){
                k++;
                drawChicken(i, j);
            }
        }
    }
    if(k == 0){
        console.log("you Won");

    }

}
var makeCraft = function(){
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(craft.xPos, craft.yPos, craftLenght, craftLenght);
}

makeGrid();
makeCraft();
timmer();
var manageGrid = function(){};

var destroyChicken = function(){
    var k = 0;
    for(i = 3;i >= 0; i-- ){
        for(j = 9;j >= 0; j--){
            var c = grid[i][j];
            if(c.status == "alive"){
                if((c.xPos < bullet.xPos + 10 && bullet.xPos < c.xPos + chickenLenght) && ( bullet.yPos < c.yPos + chickenLenght - 20)){
                    grid[i][j].status = "dead";
                    console.log(i,j);
                    deleteBullet();
                    clearInterval(moveBullet);
                    bullet.status = "active";
                    k++;
                    break;
                }
            }
        }
    }
    if(k > 0){
        updateGrid();
    }
};

var deleteCraft = function(){
    ctx.clearRect(craft.xPos - 2, craft.yPos, craft.dim + 5, craft.dim);
};

var makeBullet = function(){
    ctx.fillStyle = "#456746";
    ctx.fillRect(bullet.xPos, bullet.yPos, bullet.dim, bullet.dim);
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

    if (e.keyCode == '38' && bullet.status == "active") {
        // up arrow

        bullet.xPos = craft.xPos + craft.dim / 2 - bullet.dim / 2;
        bullet.yPos = craft.yPos - bullet.dim - 2;
        bullet.status = "busy";
        makeBullet(bullet);
        moveBullet = setInterval(function(){
            deleteBullet();
            bullet.yPos = bullet.yPos - 30;
            makeBullet();
            stopBullet();
            destroyChicken();
        }, 25);
    }
    else if (e.keyCode == '40') {
        // down arrow
    }
    else if (e.keyCode == '37') {
       // left arrow
        if (craft.xPos > 10){
            console.log(craft.xPos - 10, craft.yPos);
            deleteCraft();
            craft.xPos = craft.xPos - 10; 
            makeCraft();
        }
    
    }
    else if (e.keyCode == '39') {
       // right arrow
        if (craft.xPos < canvasWidth - 10 - craft.dim ){
            console.log(craft.xPos - 10, craft.yPos);
            deleteCraft();
            craft.xPos = craft.xPos + 10; 
            makeCraft();
        }
    }

}

var score = function(){};