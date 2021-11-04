window.onload = function(){

  var canvas = document.getElementById("canvas"),
  context = canvas.getContext("2d"),
  width = canvas.width = window.innerWidth,
  height = canvas.height = window.innerHeight;

  var focalLength = 300;

  var points = [];
  for(var i = 0; i < 5; i++){
    var point = {
      x: utils.randomRange(-1000, 1000),
      y: utils.randomRange(-1000, 1000),
      z: utils.randomRange(0, 1000)
    }
    points.push(point);
  }


  context.translate(width/2, height/2);
  update();
  function update(){
    context.clearRect(0, 0, width, height);

    for(var i = 0; i < points.length - 1; i += 2){
      context.beginPath();
      drawLine(points[i], points[i + 1]);
      context.stroke();
    }

    requestAnimationFrame(update);
  }


  function drawLine(p0, p1){
    var persp0 = focalLength / (focalLength + p0.z),
        persp1 = focalLength / (focalLength + p1.z);

    context.save();
    context.scale(persp0, persp0);
    context.moveTo(p0.x, p0.y);
    context.restore();
    context.save();
    context.scale(persp1, persp1);
    context.lineTo(p1.x, p1.y);
    context.restore();
  }



};
