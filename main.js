//Shreetosh Shelar; GameDev

canvas = document.getElementById("myCanvas");
l = canvas.getContext("2d");

canvas.width = 1200;
canvas.height = 720;

var x = 480, bRadius = 15, btRadius = 50;
var bPosition=[]; //Ball array
var btPosition = {x:700, y:670};  //Basket
var speed = 2;
var velocity = {x:speed, y:-speed};
var e = window.event;
var score = 0;
var lives = 3;
var bcnt=-1,drawcnt=-1;

  function ballCollision(i){ //check for collision of a ball with basket
     
    if (bPosition[i].x + bRadius >= x - 50 && bPosition[i].x + bRadius <= x + 50){
      if (bPosition[i].y + bRadius >= 690 && bPosition[i].y <= 690 + 10){
        score += 1;
        bPosition.splice(i,1); bcnt--; //Remove ball from array
       }
      }
   
  }

  
  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function gameOver(){
    for(i=0;i<bcnt;i++)
      if (bPosition[i].y + bRadius == canvas.height){ //If ball falls
        lives--; //decrement live count
         
        if (lives==0)
        { alert("Game Over!"); 
          window.location.reload(true);
        }
        }
      }

  function draw()
{
drawcnt++;

//Playing Area
l.fillStyle = "#000000";
l.beginPath();
l.rect(0,0,canvas.width,canvas.height);
l.fill();
l.closePath();

//ball 
if(drawcnt%100==0)  //Adds new ball afer 100th call
{
 bcnt++;
 bPosition.push({x:Math.random()*1200, y:25, c:getRandomColor()});
} 
for(i=0;i<bcnt;i++) 
{ 
    ballCollision(i); //check ball in basket
    l.beginPath();
    l.fillStyle = bPosition[i].c;  
    l.arc(bPosition[i].x, bPosition[i].y, bRadius, 0, Math.PI*2, false);
    l.fill();
    l.closePath();
    bPosition[i].y -= velocity.y
}

//basket
l.fillStyle = "White"; 
l.beginPath();
l.arc(x, btPosition.y, btRadius, 0, Math.PI, false);
l.fill();
l.closePath();
//scorecard
l.font = "30px Arial";
l.fillText("Score:", 1050, 50)
l.fillText(score, 1150, 50)
//Lives
l.font = "30px Arial"
l.fillText("Lives:", 1050, 100);
l.fillText(lives, 1150, 100); 

gameOver();

}


onmousemove = function(e){
  x = e.clientX - 60;
};

function setLevel(){
  
  var level = prompt("Select Level (Easy, Normal, Hard, Pro)", "Normal");
  
  if (level.toUpperCase() == "EASY") {
    setInterval(draw,15);     
  }
   if (level.toUpperCase() == "NORMAL") {
    setInterval(draw,10); 
  }
   if (level.toUpperCase() == "HARD") {
    setInterval(draw,5); 
  }
   if (level.toUpperCase() == "PRO") {
    setInterval(draw,1); 
  } 
   
}

setLevel();

