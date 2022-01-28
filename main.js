canvas = document.getElementById("myCanvas");
l = canvas.getContext("2d");

canvas.width = 1200;
canvas.height = 750;

var x = 480, bRadius = 15, btRadius = 50;

var bPosition=[];
//={x:Math.random()*1200, y:25};

var btPosition = {x:700, y:690};  
var speed = 2;
var velocity = {x:speed, y:-speed};
var e = window.event;
var score = 0;
var bcnt=-1,drawcnt=-1;


  function ballCollision(i){
     
    if (bPosition[i].x + bRadius >= x - 50 && bPosition[i].x + bRadius <= x + 50){
      if (bPosition[i].y + bRadius >= 690 && bPosition[i].y <= 690 + 10){
        //velocity.y *= -1;
        score += 1;
        //bRadius -= bRadius;
        bPosition.splice(i,1); bcnt--;
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

function draw()
{
//l.clearRect(0, 0, canvas.width, canvas.height);
drawcnt++;
//Playing Area
l.fillStyle = "#000000";
l.beginPath();
l.rect(0,0,canvas.width,canvas.height);
l.fill();
l.closePath();

//ball 
if(drawcnt%100==0)
{
 bcnt++;
 bPosition.push({x:Math.random()*1200, y:25, c:getRandomColor()});
} 
for(i=0;i<bcnt;i++)
{ 
    ballCollision(i);
    l.beginPath();
    l.fillStyle = bPosition[i].c; //"GREEN"; // randomColor; 
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
  l.fillText(score, 1150, 50)
}


function gameOver(){
for(i=0;i<bcnt;i++)
  if (bPosition[i].y + bRadius == canvas.height){
    alert("Game Over!");
    window.location.reload(true);
  }
}

onmousemove = function(e){
  x = e.clientX - 60;
};

function setLevel(){
  var level = prompt("Select Level (Easy, Normal, Hard)", "Normal");
  if (level == "Easy") {
   
    setInterval(draw,15); 
       
  }
  if (level == "Normal") {
    setInterval(draw,10); 
  }
  if (level == "Hard") {
    setInterval(draw,5); 
  }
  if (level == "Devil") {
    setInterval(draw,1); 
  }
}
//start
setInterval(gameOver,1);

setLevel();
gameOver();


