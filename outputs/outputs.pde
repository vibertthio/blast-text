import oscP5.*;
import netP5.*;
import gohai.glvideo.*;
GLMovie[] video=new GLMovie[3];

OscP5 oscP5;
String[] word={"預設內容1", "預設內容2", "預設內容3", "預設內容4",
  "預設內容5", "預設內容6", "預設內容7", "預設內容8", "預設內容9", "預設內容10"};
PFont myFont;
int linenum;
boolean bang;
boolean start;

boolean explore=true;
PImage logo;
PImage[] logoBg=new PImage[5] ;
int stage;
int drawNum;
int mask;
int textKeyIn=1;
int videId=1;
int workTime;
int radBlend;
int radLogo;
int ro;
float ss;
boolean bkCh=true;
float invert=0;
int mode=0;
//-----------------------------------------------------
import geomerative.*;
Particle p;
ArrayList myParticles;
ArrayList myAgents;
RFont ff;
float distMin=15;
boolean showPartocle=false;
boolean showFontAgent=false;
RGroup maGroupe ;
RPoint[] points;
//-----------------------------------------------------

pdLine l1;

void setup() {
  //size(720, 408, P2D);
  size(1280, 720, P2D);
  shaderSetting() ;
  video[0] = new GLMovie(this, "space.mov");
  video[0].loop();
  video[1] = new GLMovie(this, "space2.mov");
  video[1].loop();
  video[2] = new GLMovie(this, "space3.mov");
  video[2].loop();
  logo=loadImage("logo.png");
  img=loadImage("data/dot.png");
  logoBg[0]=loadImage("data/logo_0.png");
  logoBg[1]=loadImage("data/logo_1.png");
  logoBg[2]=loadImage("data/logo_2.png");
  logoBg[3]=loadImage("data/logo_3.png");
  logoBg[4]=loadImage("data/logo_4.png");
  pg = createGraphics(720, 408 );
  myFont = createFont("simhei", 64);
  imageMode(CENTER);
  textFont(myFont);
  stage=1;
  mask=0;
  l1=new pdLine(0, 2000);
  radBlend=6;
  oscP5 = new OscP5(this, 12000);
  bang=false;
  start=false;
  //-----------------------------------------------------
  RG.init(this);
  RCommand.setSegmentLength(12);
  ff = new RFont("simhei.ttf", 120, RFont.CENTER);
  maGroupe = ff.toGroup(word[textKeyIn]);
  points = maGroupe.getPoints();
  //readParticle();
  //-----------------------------------------------------
}

void draw() {
  workTime=millis();
  l1.update();
  if (bkCh==true) {
    invert=l1.o;
  } else {
    invert=1-l1.o;
  }
  switch(stage) {
  case 0:
    drawNum=2000;
    drawText();
    break;

  case 1:
    drawNum=4000;
    drawLogo();
    break;
  }
  //---------------------------------開始繪圖

  background(0);

  switch(videId) {
  case 0:
    if (video[0].available()) {
      video[0].read();
    }
    break;
  case 1:
    if (video[1].available()) {
      video[1].read();
    }
    break;
  case 2:
    if (video[2].available()) {
      video[2].read();
    }
    break;
  }

  //if () {
  //}

  tint(255, invert*255);
  image(video[videId], width/2, height/2, width, height);

  tint(255);
  randomShader() ;
  drawShader();

  fill(0, mask);
  rect(0, 0, width, height);
  //---------------------------------背景結束

  blendMode(ADD);


  textin();//當訊號輸入時，在控制台列印出訊息

  if (showPartocle==true) {
    drawParticle() ;
  }
  if (showFontAgent==true) {
    drawFontAgent() ;
  }

  drawFrameRate() ;
}
