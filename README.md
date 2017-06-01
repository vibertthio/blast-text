# Blast-Text-System

If there is no node_modules in the current folder,
use npm to install the dependencies.
There is an example code of processing, receiving OSC message on localhost with port 12000.

![alt tag](https://github.com/vibertthio/blast-text/blob/master/demo.png)

## Installation

```
git clone https://github.com/vibertthio/blast-text.git
cd [the folder of the project]
npm install
cd client
npm install
npm run build
cd ..
```

## Usage

**Tou have to add the .mov file back to p5 by yourself, because I can't upload file of that size to github**

```
npm run start
processing-java --sketch=<current directory>/p5-example --run
openbrower http://localhost:3001
```

## OSC format
1.   "/logo 0" for close logo
2.   "/logo 1" for open logo
3.   "/logo 2" for change logo
4.   "/effect [index]" for change of text effect to the index (index is 0~2)
5.   "/bg [index]" for change of background to the index (index is 0~2)
6.   "/text [index]" for sending of text (index is 0~4)
7.   "/auto 0" for close auto play texts
8.   "/auto 1" for open auto play texts
9.   "/speed [value]" value (0 ~ 1000) for the speed of auto play
10.   "/rgba [r] [g] [b] [a]"  r(0 ~ 255), g(0 ~ 255), b(0 ~ 255), a(0 ~ 1) for the color of text display
11.   "/size [value]" value (0 ~ 1000) for the size of text display


You can find the definition in the file ./routes/api.js .

## Default Text
Default text is stored in the file ./default.txt.
Every time you (re)load the page, it will load the text file.
You can modify the content as long as the number of lines is still 5(or it will use the first five lines).

## Update
2017.3.20 # Merge the osc message sending into this app.
2017.5.26 # Use React to build client side.
