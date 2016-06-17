var ms = [3,2,-1,5,3,7,2,-1]

return function (t) {
  var m4 = Math.pow(2,ms[Math.floor(t*4)%ms.length]/12)
  var m6 = Math.pow(2,ms[Math.floor(t*6)%ms.length]/12)
  return 0
    + saw_(m4*360+tri(200*m6)/8/4,t%1+60)*0.3
      * sin(4) * sin(3) * (1-saw(8))/2 * (t%12>8)
    + saw_(m6+saw(400*m4)+tri(400),t%0.25+(m4+m6)/2)*0.3
      * (1-saw(12))/2 * sin(t%2<.75?3:6) * (t%4>3||t%32>24)
    + saw_(sin(100)*8,t%1+4)
      * (1-saw(4))/2 * sin(6) * sin_(200+sin(200),t%2+1)
      * (t%8>2) * 0.25
    + (0
       + saw(m4*180-0.07)*0.3
       + saw(m4*180+0.23)*0.3
       + saw((t%16>8?m6:m4)*180*Math.floor(t%5)-0.13)*0.3
    )*0.4*(1-saw(1/6))/2

  function tri_ (x,t) { return Math.abs(1 - t % (1/x) * x * 2) * 2 - 1 }
  function tri (x) { return tri_(x,t) }
  function saw_ (x,t) { return t%(1/x)*x*2-1 }
  function saw (x) { return saw_(x,t) }
  function sin_ (x,t) { return Math.sin(2 * Math.PI * t * x) }
  function sin (x) { return sin_(x,t) }
  function sq_ (x,t) { return t*x % 1 < 0.5 ? -1 : 1 }
  function sq (x) { return sq_(x,t) }
  function clamp (x) { return Math.max(-1,Math.min(1,x)) }
}