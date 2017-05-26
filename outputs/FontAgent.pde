class FontAgent {

  PVector ll;
  float x1, y1;

  float xMove;
  float xMove2;
  float theta;
  float theta2;
  float lifeTime=500;
  float lifeRandom;
  boolean life;

  FontAgent(float x, float y) {
    ll = new PVector(x+width/2, y+height/2);
    x1=x+width/2;
    y1=y+height/2;
    xMove=random(0, 360);
    xMove2=random(0, 360);
    lifeRandom=random(0.5, 2);
    life=true;
  }

  void back() {
    lifeTime=255;
    ll = new PVector(x1, y1);
  }
  void motion() {
    xMove += random (-10, 10);
    xMove2 += random (-10, 10);
    theta = radians(xMove);
    theta2 = radians(xMove2);
    ll.x += sin(theta);
    ll.y += cos(theta2);
  }  

  void draw() {

    if (lifeTime<400) {
      motion();
    }

    if (lifeTime>0) {
      lifeTime=lifeTime-lifeRandom;
    } else {
      life=false;
    }
    noStroke();
    fill(255);
    ellipse(ll.x, ll.y, 2, 2);
  }
}