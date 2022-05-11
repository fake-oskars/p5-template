import p5 from "p5";
import * as Tone from "tone";
import { eq } from "./eq";


export const Sketch = (p: p5) => {
  let w = window.innerWidth;
  let h = window.innerHeight;
  let step = 0; 
  let circleLow = [];

  const fft = new Tone.FFT();
  const mic = new Tone.UserMedia().connect(fft);

  p.windowResized = () => {
    w = window.innerWidth;
    h = window.innerHeight;
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
  };

  // p.draw = () => {
  //   p.background(0);
  //   p.fill([100, 210, 254]);
  //   p.circle(w / 2, h / 2, 50);
  //   p.fill([200, 210, 254]);
  //   p.circle(w / 2+100, h / 2, 50);
  //   p.fill([200, 210, 154]);
  //   p.circle(w / 2-100, h / 2, 50);
    

// pavairo apļus kodā
    // for (let solis = 0; solis<3; solis +=1 ){
    //   p.circle(w/2-100 + solis * 50, h/2+100, 50);
    // }
   
  // };


  p.mousePressed = () => {
    mic.open();
    Tone.context.resume();
  };

  p.draw = () => {
   // p.background(0);
    p.stroke([0,0,0])
    let levels = fft.getValue();

    const low = eq(levels, 0, 0.3);
    const mid = eq(levels, 0.3, 0.6);
    const high = eq(levels, 0.6, 1);

    

    circleLow.push(low * 4);
   

//p.rect(w/2+200,h/2+200, 100,100);

p.stroke([0,0,0])
    
    p.translate(w /2, h/2); 
   p.rotate(step/60);
    for (let i = 0; i < circleLow.length; i += 1){
 
p.circle(circleLow.length -i,0, circleLow[i] *2);
//p.circle(w/2- circleLow.length + i, h/2, circleLow[i] *2);


    }

//Aplīši trīs augstumu
/*     p.circle(step, h/2, low * 3);
    p.circle(step, h/2+100, mid * 3);
    p.circle(step, h/2+200, high * 3);
 */    step += 1;
    p.mouseMoved = (event: MouseEvent) => {
      //p.fill([200, 210, 154]);
     // p.circle(event.clientX, event.clientY, 50);
    //p.stroke([0,0,0])
      let levels = fft.getValue();
  
     // const low = eq(levels, 0, 0.3);
      const mid = eq(levels, 0.3, 0.6);
     // const high = eq(levels, 0.6, 1);


  //KURSORS
      p.circle(event.clientX, event.clientY, mid * 3);
     // p.circle(w / 2 + 40, h / 2, mid * 3);
     // p.circle(w / 2 + 80, h / 2, high * 3);
    }

    if (circleLow.length>500){
      circleLow.splice(0,1);
    }
  
  };

};
