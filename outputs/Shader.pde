PShader rgb;
PGraphics pg3;

PShader horizon;
PGraphics pg2;

float vol, vol2, grid;
boolean change, change2;
int radOrNot, radOrNot2;

void shaderSetting() {
  pg3 = createGraphics(width, height, P2D);
  rgb = loadShader("glitch_1.glsl");
  rgb .set("dimen", float(pg3.width), float(pg3.height));

  pg2 = createGraphics(width, height, P2D);
  horizon = loadShader("glitch_2.glsl");
  horizon .set("dimen", float(pg2.width), float(pg2.height));
}


void randomShader() {
  if ((frameCount%30)==0) {
    change=true;
  }
  if (change==true) {
    change=false;
    radOrNot=int(random(2));
    if (radOrNot==1) {
      vol=random(0, 0.1);
      grid=random(0, 200);
    } else {
      vol=0;
      grid=0;
    }
  }

  if ((frameCount%45)==0) {
    change2=true;
  }
  if (change2==true) {
    change2=false;
    radOrNot2=int(random(2));
    if (radOrNot2==1) {
      vol2=random(0, 0.5);
    } else {
      vol2=0;
    }
  }
}


void drawShader() {
  blendMode(ADD);
  pushMatrix();
  rgb.set("time", millis()/1000.0);
  rgb.set("tex", logoBg[radLogo]);
  rgb.set("vol", vol);
  rgb.set("grid", grid);
  pg3.beginDraw();
  pg3.background(0);
  pg3.shader(rgb);
  pg3.rect(0, 0, pg3.width, pg3.height);
  pg3.endDraw();

  horizon.set("time", millis()/1000.0);
  horizon.set("tex", pg3);
  horizon.set("vol", vol2);
  pg2.beginDraw();
  pg2.background(0);
  pg2.shader(horizon);
  pg2.rect(0, 0, pg2.width, pg2.height);
  pg2.endDraw();

  translate( width/2, height/2);
  rotate(radians(ro));
  scale(ss);
  image(pg2, 0, 0, width, height);
  popMatrix();
  blendMode(BLEND);
}