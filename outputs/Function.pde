
void textin() {
  if (bang==true) {
    println("got message------------------");

    bang=false;
    String lines[]= loadStrings("output.txt");
    //println("there are " + lines.length + " lines");
    linenum= lines.length;
    for (int i = 0; i < lines.length; i++) {
      // String[] word = lines[i];
      word[i]=lines[i];
    }
    println(word);
    println("message end------------------");
    start=true;
  }
  /*
  fill(255);
   textSize(32); 
   fill(255);
   textSize(32);
   if (start==true) {
   if (word[0].length() >1) {
   text(word[0], 20, 30);
   }  
   if (word[1].length() >1) {
   text(word[1], 20, 80);
   }  
   if (word[2].length() >1) {
   text(word[2], 20, 130);
   } 
   if (word[3].length() >1) {
   text(word[3], 20, 180);
   }
   }
   */
}

void keyPressed() {

  if (mode==0) {
    if (key == 'e') {
      for (int i=0; i<myParticles.size(); i++) {
        Particle p = (Particle) myParticles.get(i);
        p.explore();
      }
    }
    if (key == 'b') {
      for (int i=0; i<myParticles.size(); i++) {
        Particle p = (Particle) myParticles.get(i);
        p.back();
      }
    }
  } else if (mode==1) {
    if (key=='0') {
      textKeyIn=0;
    } else if (key=='1') {
      textKeyIn=1;
    } else if (key=='2') {
      textKeyIn=2;
    } else if (key=='3') {
      textKeyIn=3;
    } 

    if (key=='1' || key=='2' || key=='3' || key=='0'|| key=='9') {
      stage=0;
      explore= !explore;
      if (explore==true) {    
        for (int i = stars.size() - 1; i >= 0; i--) {
          OneStar show = stars.get(i);
          show.setDead();
        }
      }
    }
    if (key=='l') {
      stage=1;
      explore= !explore;
      if (explore==true) {
        for (int i = stars.size() - 1; i >= 0; i--) {
          OneStar show = stars.get(i);
          show.setDead();
        }
      }
    }
  }

  if (key=='b') {//切換背景
    bkCh= !bkCh;
    l1.reset();
    if (bkCh==true) {
      videId=(videId+1)%3;
    }
  }

  if (key=='l') {//出現logo動畫
    ss=random(2)+0.5;
    radLogo=int(random(7));
    videId=int(random(3));
    if (radLogo>3) {
      radLogo=4;
    }
    println(radLogo);
    ro=int(random(4))*90;
  }


  if (key=='p') {//mode0
    readParticle();
    showPartocle=true;
  } else if (key=='o') {//mode1
    readAgent();
    showFontAgent=true;
  }
}

void drawText() {
  pg.beginDraw();
  pg.background(255);
  pg.textFont(myFont);  
  pg.textSize(60);
  pg.textAlign(CENTER, CENTER);
  pg.fill(PGRAPHICS_COLOR);
  if (word[textKeyIn] !=null) {
    pg.text(word[textKeyIn], pg.width/2, pg.height/2);
  }
  pg.endDraw();
}

void drawLogo() {
  pg.beginDraw();
  pg.background(255);
  pg.imageMode(CENTER);
  pg.image(logo, 360, 204); 
  pg.endDraw();
}

void drawFrameRate() {
  fill(255);
  textSize(32);
  text("frame:"+int(frameRate), 50, 50);
}

void oscEvent(OscMessage msg) {
  /* print the address pattern and the typetag of the received OscMessage */
  //print("### received an osc message.");
  //print(" addrpattern: " + msg.addrPattern());
  //println(" typetag: " + msg.typetag());

  if (msg.timetag()==1) {
    bang=true;
  };
}

void readAgent() {
  myAgents = new ArrayList();
  for (int i=0; i<points.length; i++) {
    myAgents.add(new FontAgent(points[i].x, points[i].y));
  }
}


void readParticle() {
  myParticles = new ArrayList();
  for (int i=0; i<points.length; i++) {
    myParticles.add(new Particle(points[i].x, points[i].y));
  }
}


void drawParticle() {
  blendMode(ADD);
  fill(255, 100);
  strokeWeight(0.3);
  stroke(0, 255, 255, 100);

  for (int i=0; i<myParticles.size(); i++) {
    Particle p = (Particle) myParticles.get(i);
    p.draw();

    float dpart=0;
    for (int j =0; j<myParticles.size(); j++) {

      Particle pj = (Particle)myParticles.get(j);
      dpart = p.distance(pj);

      if (dpart <= distMin) {
        strokeWeight(map(dpart, 0, distMin, 4, 2));
        stroke(255, map(dpart, 0, distMin, 255, 0));
        line(p.rx, p.ry, pj.rx, pj.ry);
      }
    }
  }

  for (int i = myParticles.size() - 1; i >= 0; i--) {
    Particle p = (Particle) myParticles.get(i);
    if (p.life==false) {
      myParticles.remove(i);
    }
  }
}


void drawFontAgent() {
  for (int i = 0; i < myAgents.size(); i++) {
    FontAgent p = (FontAgent) myAgents.get(i);
    p.draw();
  }
  for (int i = myAgents.size() - 1; i >= 0; i--) {
    FontAgent p = (FontAgent) myAgents.get(i);
    if (p.life==false) {
      myAgents.remove(i);
    }
  }
}