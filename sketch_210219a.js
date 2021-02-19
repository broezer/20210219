const Y_AXIS = 1;
const X_AXIS = 2;
let pg;
let c1, c2, c3;
let b1, b2, b3;
let t1, t2 , t3;


let cols02, rows02;
let scl02 = 40;
let w02 = 1600;
let h02 = 1200;

function setup() {
  createCanvas(400, 400, WEBGL);
  
  c1 = color(252, 95, 255);
  c2 = color(255, 18, 216);
  c3 = color(139, 250, 255);
  
  b1 = color(4,0, 6);
  b2 = color(27,42, 116);
  b3 = color(94, 238, 245);

  t1 = color(120, 48, 165);
  t2 = color(100, 240, 255);
  t3 = color(100, 100, 200);


  
  cols02 = w02 / scl02;
  rows02 = h02 / scl02;
  
  
  
  pg = createGraphics(400,500); // offscreen buffer;
  
}

function draw() {
  push();
  translate(0, height * -0.3, width * -2);
  setGradient(-width*2, height * -2 , width * 4, height * 4, b1, b2, b3, Y_AXIS);
  //setGradient(-width*2,0, width * 4, height * 2, b3, b1, b1,Y_AXIS);

  translate(0, 0, 1);
  rotateZ(PI / 2);
  setCircle(0, 0, width * 2, c1, c2, c3);
  
  rotateZ(-PI / 2);
  setGradientShutter(-width*2, height * -2 , width * 4, height * 4, b1, b2, b3, Y_AXIS);
  pop();
  
  
  
  push();
  translate(-width*2, height*0.2, -width);
  rotateX(radians(90));
  for (let y = 0; y < rows02 - 1; y++) {
        for (let x = 0; x < cols02; x++) {
        fill(t1);
        stroke(c3);
        rect(x*scl02, y*scl02, scl02, scl02);
        }
    }
  pop();
  
 


  push();
    translate(-width/4, -height/6, 0);
    pg.noFill();
    pg.stroke(c3);
    pg.strokeWeight(8);
    pg.triangle( 10, height * 0.3, width * 0.2, 10, width * 0.6, height * 0.24); 
    pg.filter(BLUR,1);
    tint(255,210);
    image(pg,0,0);
  pop();


  push();
    translate(-width/4.2, -height/8, 0);
    pg.fill(c1);
    pg.stroke(c1);
    //pg.strokeWeight(0);
    pg.triangle( 10, height * 0.3, width * 0.2, 10, width * 0.6, height * 0.24); 
    pg.filter(BLUR,1);
    tint(255,210);
    image(pg,0,0);
  pop();

 
  
  

  //save("20210219.png");
  noLoop();
}

function setGradient(x, y, w, h, c1, c2, c3, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, (y + h) - ((h/2)), 0, 1);
      let c = lerpColor(c1, c2, inter);
      
      let inter02 = map(i, (y + h) - ((h/2)) ,  y + h , 0, 1);
      let p = lerpColor(c2, c3, inter02);
      
      stroke(255);
      line(x, i, x + w, i);
      
      if ( i <= (y + h) - ((h/2))){
        stroke(c);
        line(x, i, x + w, i);
      }else{
        stroke(p);
        line(x, i, x + w, i);
      }
      
      
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x,(x + w) - (w/2), 0, 1);
      let c = lerpColor(c1, c2, inter);
      
      let inter02 = map(i, (x + w) - (w/2), x + w, 0, 1);
      let p = lerpColor(c2, c3, inter02);
      
      stroke(255);
      line(i, y, i, y + h);
      if ( i <= (x + w) - (w/2)){
        stroke(c);
        line(i, y, i, y + h);
      }else{
        stroke(p);
        line(i, y, i, y + h);
      }
      
    }
  }
}


function setCircle(x, y, d, c1, c2, c3) {
 let c = 100;
 //circle(x,y,d);
 
 
 for (let i=0; i<c; i++) {
   let col = lerpColor(c1, c2, (i/c)*3 );
   let col02 = lerpColor(c2, c3, ((i - (c/3))/(c/3)));
   let a = lerp(PI, 0, i/c);
   
   if ( i <= c/3){
      fill(col);
      noStroke();
      arc(x, y, d, d, -a, a, CHORD);
    }else{
      fill(col02);
      noStroke();
      arc(x, y, d, d, -a, a, CHORD);
    }   

 }
}

function setGradientShutter(x, y, w, h, c1, c2, c3, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, (y + h) - ((h/2)), 0, 1);
      let c = lerpColor(c1, c2, inter);
      
      let inter02 = map(i, (y + h) - ((h/2)) ,  y + h , 0, 1);
      let p = lerpColor(c2, c3, inter02);
      
      stroke(255);
      //line(x, i, x + w, i);
      
      if ( i >= (y + h) - ((h/2)) - h*0.08  && i <= (y + h) - ((h/2)) - h*0.07   ){
        stroke(c);
        line(x, i, x + w, i);

      }
      if ( i >= (y + h) - ((h/2)) - h*0.05  && i <= (y + h) - ((h/2)) - h*0.04   ){
        stroke(c);
        line(x, i, x + w, i);

      }

      if ( i >= (y + h) - ((h/2)) - h*0.02  && i <= (y + h) - ((h/2)) - h*0.01   ){
        stroke(c);
        line(x, i, x + w, i);

      }

      if ( i >= (y + h) - ((h/2)) + h*0.02 &&  i <= (y + h) - ((h/2)) + h*0.028 ){
        stroke(p);
        line(x, i, x + w, i);
      }

      if ( i >= (y + h) - ((h/2)) + h*0.058 &&  i <= (y + h) - ((h/2)) + h*0.066 ){
        stroke(p);
        line(x, i, x + w, i);
      }

      if ( i >= (y + h) - ((h/2)) + h*0.096 &&  i <= (y + h) - ((h/2)) + h*0.102 ){
        stroke(p);
        line(x, i, x + w, i);
      }

      if ( i >= (y + h) - ((h/2)) + h*0.132 &&  i <= (y + h) - ((h/2)) + h*0.138 ){
        stroke(p);
        line(x, i, x + w, i);
      }
      
      
      

     
      

      else{
        //stroke(p);
        //line(x, i, x + w, i);
      }
      
      
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x,(x + w) - (w/2), 0, 1);
      let c = lerpColor(c1, c2, inter);
      
      let inter02 = map(i, (x + w) - (w/2), x + w, 0, 1);
      let p = lerpColor(c2, c3, inter02);
      
      stroke(255);
      line(i, y, i, y + h);
      if ( i <= (x + w) - (w/2)){
        stroke(c);
        line(i, y, i, y + h);
      }else{
        stroke(p);
        line(i, y, i, y + h);
      }
      
    }
  }
}