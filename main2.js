window.onload = function(){

  var canvas = document.getElementById("canvas"),
  context = canvas.getContext("2d"),
  width = canvas.width = window.innerWidth,
  height = canvas.height = window.innerHeight;

  var focalLength = 300,
      pBackRatio, pFrontRatio;

  var ship = particle.create(0, 0, 0, 0);
  ship.z = 100;
  ship.width = 50;
  ship.height = 25;
  ship.depth = 100;
  ship.friction = 0.9;
  ship.topLeft = {
    x: this.x - this.width/2,
    y: this.y - this.height/2
  };
  ship.topRight = {
    x: this.x + this.width/2,
    y: this.y - this.height/2
  };
  ship.bottomLeft = {
    x: this.x - this.width/2,
    y: this.y + this.height/2
  };
  ship.bottomRight = {
    x: this.x + this.width/2,
    y: this.y + this.height/2
  };
  var bullets = [];


  var movingLeft = false,
      movingRight = false,
      movingUp = false,
      movingDown = false,
      isFiring = false,
      isFired = false;



  context.translate(width/2, height/2);
  update();

  function update(){
    context.clearRect(-width/2, -height/2, width, height);

    if(movingLeft && !movingRight){
      ship.accelerate(-2, 0);
    }
    if(movingRight && !movingLeft){
      ship.accelerate(2, 0);
    }
    if(!movingDown && movingUp){
      ship.accelerate(0, -2);
    }
    if(movingDown && !movingUp){
      ship.accelerate(0, 2);
    }

    if(isFiring && !isFired){
      fireBullet();
      isFired = true;
    }

    ship.vx = utils.clamp(ship.vx, -20, 20);
    ship.vy = utils.clamp(ship.vy, -20, 20);
    ship.update();

    for(var i = bullets.length - 1; i >= 0; i--){
      var bullet = bullets[i];
      bullet.update();
      if(bullet.y > 5000){
        bullets.splice(i, 1);
      }
    }


    //Rendering
    //ship
    drawCube(ship.x, ship.y, ship.z, ship.width, ship.height, ship.depth);

    //bullets
    for(var i = bullets.length - 1; i >= 0; i--){
      var bullet = bullets[i];
      drawCube(bullet.x, bullet.z, bullet.y, 10, 10, 10);
    }

    requestAnimationFrame(update);
  }

  function fireBullet(){
    var bullet = particle.create(ship.x, ship.y, 10, Math.PI / 2);
    bullet.z = ship.y;
    console.log(bullet);
    bullets.push(bullet);
  }

  function drawCube(x, y, z, width, height, depth){
    var pBackRatio = focalLength / (focalLength + z - depth/2),
        pFrontRatio = focalLength / (focalLength + z + depth/2),
        points = [];

    var topLeft = {
      x: -width/2,
      y: -height/2
    };
    var bottomLeft = {
      x: -width/2,
      y: height/2
    };
    var topRight = {
      x: width/2,
      y: -height/2
    };
    var bottomRight = {
      x: width/2,
      y: height/2
    };
    var p0, p1, p2;
    if(x > 0){
      if(y > 0){
        p0 = bottomLeft;
        p1 = topLeft;
        p2 = topRight;
      } else {
        p0 = topLeft;
        p1 = bottomLeft;
        p2 = bottomRight;
      }
    } else {
      if(y > 0){
        p0 = topLeft;
        p1 = topRight;
        p2 = bottomRight;
      } else {
        p0 = bottomLeft;
        p1 = bottomRight;
        p2 = topRight;
      }
    }

    points.push(p0);
    points.push(p1);
    points.push(p2);

    context.save();
    context.scale(pBackRatio, pBackRatio);
    context.translate(x, y);
    context.beginPath();
    context.rect(topLeft.x, topLeft.y, width, height);
    context.stroke();
    context.restore();



    for(var i = 0; i < 3; i++){
      var p = points[i];
      context.save();
      context.setTransform(pBackRatio, 0, 0, pBackRatio, canvas.width/2, canvas.height/2);
      context.translate(x, y);
      context.beginPath();
      context.moveTo(p.x, p.y);
      context.setTransform(pFrontRatio, 0, 0, pFrontRatio, canvas.width/2, canvas.height/2);
      context.translate(x, y);
      context.lineTo(p.x, p.y);
      context.stroke();
      context.restore();
    }

    context.save();
    context.scale(pFrontRatio, pFrontRatio);
    context.translate(x, y);
    context.beginPath();
    context.moveTo(points[0].x, points[0].y);
    context.lineTo(points[1].x, points[1].y);
    context.lineTo(points[2].x, points[2].y);
    context.stroke();
    context.restore();

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
      case 32:
        isFiring = true;
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
      case 32:
        isFiring = false;
        isFired = false;
      break;
    }
  });

};
