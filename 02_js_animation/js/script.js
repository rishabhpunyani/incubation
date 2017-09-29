document.onkeydown = checkKey;
document.onkeyup = releaseKey;
var car = document.getElementById('car');
var msg = document.getElementById('msg');
var main = document.getElementById('main');
var reset = document.getElementById('reset');
var parking = document.getElementById('parking');
var auto = document.getElementById('auto');
auto.addEventListener('click',autopark);
reset.addEventListener('click',resetpark);
car.style.margin = 0 +"px";

//This is executed when key is pressed
function checkKey(e) {

    msg.style.transition = "all 1s"
    main.style.transition = "background-color 3s";
    if ((parseInt(car.style.marginTop) >= 8 && parseInt(car.style.marginTop) <=14) && (parseInt(car.style.marginLeft) >= 46 && parseInt(car.style.marginLeft) <= 52) ){
        msg.innerText = "Car Parked" ;
        main.style.backgroundColor = "#5cb85c";
        auto.style.display = "none";
        reset.style.display = "block";
        function myMove() {
            pos = 0;
            var id = setInterval(frame , 5);
            function frame() {
              if (pos == 1440) {
                clearInterval(id);
              }
              else{
                pos++;
                car.style.transform = "rotate(" + pos + "deg)";
              }
            }
          }
          myMove();


    }

    else if (e.keyCode == '38') {
        // up arrow
        msg.innerText = "Moving car up" ;
        if( parseInt(car.style.marginTop) > 0){
            car.style.marginTop = parseInt(car.style.marginTop) - 1 + "%"; 
            car.style.transition = "margin 0.5s";
            main.style.backgroundColor = "#5cb85c";
        }
    }
    else if (e.keyCode == '40') {
        // down arrow
        msg.innerText = "Moving car down" ;
        if( parseInt(car.style.marginTop) < 32 ){
        car.style.marginTop = parseInt(car.style.marginTop) + 1 + "%"; 
        car.style.transition = "margin 0.5s";
        main.style.backgroundColor = "#5cb85c";
        }
    }
    else if (e.keyCode == '37') {
       // left arrow
       msg.innerText = "Moving car Backward" ;
        if( parseInt(car.style.marginLeft) > 0 ){
            car.style.marginLeft = parseInt(car.style.marginLeft) - 1 + "%";
            car.style.transition = "margin 0.5s"
            main.style.backgroundColor = "#5cb85c"
        }
    }
    else if (e.keyCode == '39') {
       // right arrow
       msg.innerText = "Moving car Forward" ;
       if( parseInt(car.style.marginLeft) < 90 ){
            car.style.marginLeft = parseInt(car.style.marginLeft) + 1 + "%";
            car.style.transition = "margin 0.5s"
            main.style.backgroundColor = "#5cb85c"
        }
    }

}
//This is executed when key is released
function releaseKey(e) {
    e = e || window.event;
    if(msg.innerText != "Car Parked"){
    msg.innerText = "Car Stopped" ;
    main.style.backgroundColor = "#d5921a";
    }
}

function resetpark(){
    msg.innerText = "Press arow key to play" ;
    main.style.backgroundColor = "#d5921a";
    reset.style.display = "none";
    car.style.margin = 0 +"px";
    auto.style.display = "block";
}

function autopark(){
    resetpark();
    auto.style.display = "none";
    car.style.marginLeft = parseInt(car.style.marginLeft) + 48 + "%";
    car.style.transition = "margin 12s";
    car.style.marginTop = parseInt(car.style.marginTop) + 10 + "%";
    car.style.transition = "margin 8s";
    msg.innerText = "Car Parked" ;
    main.style.backgroundColor = "#5cb85c"
    reset.style.display = "block";
    
    
}