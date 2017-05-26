
class Particle {
  PVector speed;

  float x;
  float y;

  float rx;
  float ry;

  float tx;
  float ty;

  //SPEED
  float s = 0.04;
  boolean life;
  int lifeTime;
  boolean fadeout=false;


  Particle(float _x, float _y) {

    this.x = _x+width/2;
    this.y = _y+height/2; 
    tx=x;
    ty=y;
    rx=random(width);
    ry=random(height);
    speed = new PVector(random(0.02, s), random(0.02, s));
    life=true;
    lifeTime=400+int(random(200));
  }


  void draw() {
    movement();
  }

  void reset() {
    rx=random(width);
    ry=random(height);
    speed = new PVector(random(0.02, s), random(0.02, s));
  }

  void explore() {
    tx=random(width);
    ty=random(height);
    speed = new PVector(random(0.02, s), random(0.02, s));
  }

  void back() {
    tx=x;
    ty=y;
    speed = new PVector(random(0.02, s), random(0.02, s));
  }

  void movement() {

    if (lifeTime>0) {
      lifeTime--;
    } else {
      life=false;
    }

    if (lifeTime==100) {
      fadeout=true;
    }
    if (fadeout==true) {
      explore() ;
      fadeout=false;
    }

    if (abs(rx-tx)>0) {
      rx=rx-(rx-tx)*speed.x;
    }
    if (abs(ry-ty)>0) {
      ry=ry-(ry-ty)*speed.y;
    }

    pushMatrix();
    //fill(0,255,0);
    //ellipse(x,y,10,10);

    fill(255);
    //ellipse(rx,ry,2,2);
    popMatrix();
  }


  float distance(Particle p) {
    return dist(this.rx, this.ry, p.rx, p.ry);
  }
}