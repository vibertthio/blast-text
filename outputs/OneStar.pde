color PGRAPHICS_COLOR = color(0); 
PGraphics pg;
PImage img;
PFont font;
ArrayList<OneStar> stars = new ArrayList<OneStar>();


class OneStar {
  float x, y, fx, fy;
  float myRotate;
  float myBrightness, glowSpeed, glowOffs;
  int mySize;
  float r, g, b;
  int lifeTime; 
  boolean life=true;
  int lifeCount=0;
  int stage;

  OneStar(float _x, float _y, int _stage) {
    stage=_stage;
    x = _x;
    y = _y;
    if (stage==0) {
      fx=width/2;
      fy=height/2;
    } else {
      fx=random(width);
      fy=random(height);
    }

    glowSpeed = 5;
    myBrightness = 0;
    r=random(100, 255);
    g=random(100, 255);
    b=random(100, 255);
    glowOffs = random(10) * -1;
    float sizeFactor = random(2);
    mySize = ( int( max(10, (pow( sizeFactor, 4.5)))) );
    lifeTime=int(random(200, 300));
  }

  void setDead() {
    lifeTime=int(random(10, 50));
  }


  void update() {
    if (abs(fx-x)>0) {
      fx=(x-fx)*0.1+fx;
    }

    if (abs(fy-y)>0) {
      fy=(y-fy)*0.1+fy;
    }
    //println(fx+" "+fy);

    if (lifeCount<lifeTime) {
      lifeCount++;
      life=true;
    } else {
      life=false;
    }

    pushMatrix();
    noStroke();
    tint(r, g, b, max( myBrightness + glowOffs, 0));
    translate(fx, fy);
    imageMode(CENTER);
    image(img, 0, 0, mySize, mySize);
    popMatrix();

    myBrightness += glowSpeed;
    myBrightness = min(myBrightness, (255+ (-1 * glowOffs)) );
  }
}