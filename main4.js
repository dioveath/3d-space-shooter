window.onload = function () {

  var canvas = document.getElementById("canvas"),
  context = canvas.getContext("2d"),
  width = canvas.width = window.innerWidth,
  height = canvas.height = window.innerHeight;


  update();

  function update(){
    context.clearRect(0, 0, width, height);

    context.fillStyle = "red";
    context.beginPath();
    context.arc(width/2 - 200, height/2 - 100, 5, 0, Math.PI * 2, false);
    context.fill();
    context.fillStyle = "black";
    context.transform(1, 0.01, 0.01, 1, 0, 0);
    context.fillRect( width/2 - 200, height/2 - 100, 400, 200);
    requestAnimationFrame(update);
    context.setTransform(1, 0, 0, 1, 0, 0);
  }

  function drawPlane(){

  }

}
