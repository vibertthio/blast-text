
class pdLine {
  boolean bang;
  float duration;
  int time;
  int dd;
  int delay;
  float o;

  pdLine(int delay, float duration) {
    this.delay=delay;
    this.duration=duration;
    time=0;
  }

  void reset() {
    time=millis();
    dd=time+delay;
    bang=true;
  }

  void update() {
    
    if (bang==true) {
      if (workTime>dd) {
        if (workTime-dd<=duration+delay) {  
          o=(float(workTime-dd)/(duration+delay));
        } else {
          bang=false;
          o=1;
        }
      } else {
        o=0;
      }
    }
  }
}


class pdDelay {
  boolean bang;
  int time;
  int dd;
  int delay;
  boolean b;

  pdDelay(int delay) {
    this.delay=delay;
    time=0;
    bang=false;
  }

  void reset() {
    time=millis();
    dd=time+delay;
    bang=true;
    b=false;
  }

  void update() {

    if (bang==true) {
      if (workTime>dd) {
        b=true;
      }
    }
  }
}