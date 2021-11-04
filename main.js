window.onload = function(){

  var canvas = document.getElementById("canvas"),
  context = canvas.getContext("2d"),
  width = canvas.width = window.innerWidth,
  height = canvas.height = window.innerHeight;

  var focalLength = 300,
      perspectiveBack, perspectiveFront;

  var shipPos = [];
  var ship = particle.create(20, 20, 0, 0);
  ship.z = 50;
  ship.width = 50;
  ship.height = 50;
  ship.depth = 50;
  ship.topLeft = {
    x: - ship.width/2,
    y: - ship.height/2
  };
  ship.topRight = {
    x:  ship.width/2,
    y: - ship.height/2
  };
  ship.bottomLeft = {
    x:- ship.width/2,
    y:  ship.height/2
  };
  ship.bottomRight = {
    x:  ship.width/2,
    y:  ship.height/2
  };
  shipPos.push(ship.topLeft);
  shipPos.push(ship.topRight);
  shipPos.push(ship.bottomLeft);
  shipPos.push(ship.bottomRight);
  ship.friction = 0.9;

  var movingLeft = false,
      movingRight = false,
      movingUp = false,
      movingDown = false;


  update();

  function update(){
    context.clearRect(0, 0, width, height);

    if(movingLeft && !movingRight){
      ship.accelerate(-1, 0);
    }
    if(movingRight && !movingLeft){
      ship.accelerate(1, 0);
    }
    if(!movingDown && movingUp){
      ship.accelerate(0, -1);
    }
    if(movingDown && !movingUp){
      ship.accelerate(0, 1);
    }

    ship.vx = utils.clamp(ship.vx, -10, 10);
    ship.vy = utils.clamp(ship.vy, -10, 10);

    perspectiveFront = focalLength / (focalLength + ship.z + ship.depth);
    perspectiveBack = focalLength / (focalLength + ship.z );

    ship.update();
    for(var i = 0; i < 4; i++){
      context.save();
      context.translate(width/2, height/2);
      context.scale(perspectiveFront, perspectiveFront);
      context.beginPath();
      context.moveTo(shipPos[i].x + ship.x + ship.width/2, shipPos[i].y + ship.y + ship.height/2);
      context.restore();
      context.save();
      context.translate(width/2, height/2);
      context.scale(perspectiveBack, perspectiveBack);
      context.lineTo(ship.x + shipPos[i].x + ship.width /2, ship.y + shipPos[i].y + ship.height /2);
      context.stroke();
      context.restore();
      if(i == 3){
        context.save();
        context.translate(width/2, height/2);
        context.scale(perspectiveFront, perspectiveFront);
        context.beginPath();
        context.rect(ship.x, ship.y, ship.width, ship.height);
        context.stroke();
        context.restore();
        context.save();
        context.translate(width/2, height/2);
        context.scale(perspectiveBack, perspectiveBack);
        context.beginPath();
        context.rect(ship.x, ship.y, ship.width, ship.height);
        context.stroke();
        context.restore();
      }
    }

    requestAnimationFrame(update);
  }

  document.body.addEventListener("keydown", function(event){
    switch(event.keyCode){
      case 37:
        movingLeft = true;
      break;
      case 38:
        movingUp = true;
      break;
      case 39:
        movingRight = true;
      break;
      case 40:
        movingDown = true;
      break;
    }
  });

  document.body.addEventListener("keyup", function(event){
    switch(event.keyCode){
      case 37:
        movingLeft = false;
      break;
      case 38:
        movingUp = false;
      break;
      case 39:
        movingRight = false;
      break;
      case 40:
        movingDown = false;
      break;
    }
  });



};
