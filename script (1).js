const playertext = document.querySelector("#playertext");
const cputext = document.querySelector("#cputext");
const resulttext = document.querySelector("#resulttext");
const RPS = document.querySelectorAll("#RPS");
document.getElementById('results').innerHTML =   `&nbsp` ;
document.getElementById('player').innerHTML =   `&nbsp` ;
document.getElementById('cpu').innerHTML =   `&nbsp` ;
var player;
var cpu;
 function rock()
 { document.getElementById('player').innerHTML =   "ĐẤM" ;
    cputurn();
    cpuplay();
    player =1;
    RESULT();

 }
 function paper()
 {  document.getElementById('player').innerHTML =   "LÁ" ;
    cputurn();
    cpuplay();
    player =2;
    RESULT();

 }
 function scissors()
 {  document.getElementById('player').innerHTML =   "KÉO" ;
    cputurn();
    cpuplay();
    player =3;
    RESULT();

 }
 
 function cputurn()
 {
    cpu =Math.floor(Math.random() *3)+ 1;
    
 }
  function cpuplay(){
    if (cpu==1){
        document.getElementById('cpu').innerHTML =   "ĐẤM" ;
    }
    else if (cpu==2){
        document.getElementById('cpu').innerHTML =   "LÁ" ;
    }
    else if (cpu==3){
        document.getElementById('cpu').innerHTML =   "KÉO" ;
    }

  }
 function RESULT(){
    if (player==cpu){
        document.getElementById('results').innerHTML = "HOÀ";}
    else if (cpu==1){
        if (player == 2){
            document.getElementById('results').innerHTML = "THẮNG";
        }
        else {
            document.getElementById('results').innerHTML = "THUA";
        }
    }
    else if (cpu=="2"){
        if (player == "3"){
            document.getElementById('results').innerHTML = "THẮNG";
        }
        else {
            document.getElementById('results').innerHTML = "THUA";
        }}
    else if (cpu=="3"){
        if (player == "1"){
            document.getElementById('results').innerHTML = "THẮNG";
         }
        else {
            document.getElementById('results').innerHTML = "THUA";
        }}
        

    }


    
 
