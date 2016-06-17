var riff = [ [200,10], [600,200], [800,10], [100,800] ];
var melody = [
  1, -5, 2,
  -20, -22, -19,
  5, 2, 13, 10, 11, 19,
  -20, -22, -19,
  17, 10, 5, 14,
  -20, -22, -19
];

return function (t) {
  var r = riff[Math.floor(t) % riff.length];
  var g = riff[Math.floor(t/4) % riff.length];
  var m = melody[Math.floor(t*2) % melody.length];
  var n = melody[Math.floor(t*8) % melody.length];
  var xm = Math.pow(2,m/12) * 441;
  var xn = Math.pow(2,n/12) * 441;
  return 0
    + clamp(sin_(sin_(1,sin(4)+1),t%1+4)
     * ((1-saw(2))/2 + (1-saw(8))/2)) * 0.6 * (t%128>16)
    + clamp(sin_(sin_(1/8,sin(256)+2),t%1+4+sin(r[0]/20)*r[1]/20)
     * (1-saw(2))/2 * (1-saw(8))/2) * 0.8 * (t%128>32)
    + clamp(sin_(sin_(1,sin(g[0])+sin(r[0]/g[0])+r[1]),t%1+g[0]/800)
     * ((1-saw(2))/2 + (1-saw(2))/2)) * 0.4 * (t%128>48)
    + clamp(saw(xm + sin(n/8)/64)) * 0.4 * (t%40>24)
    + clamp(saw(xn + sin(m/8)/64)) * 0.4 * (t%40>16)
    + saw(xn*4) * (1-saw(2))/2 * 0.4 * (t%40>8 && t%40<24)
    + saw(xm*8) * (1-saw(8))/2 * 0.4 * (t%40>4 && t%40<20)
    + saw(xm) * (1-saw(4))/2 * 0.4
    + saw(r[0]) * (1-saw(8))/2*0.4
    + saw(g[0]) * (1-saw(8))/2*0.4
  ;
  function tri (x) { return Math.abs(1 - t % (1/x) * x * 2) * 2 - 1}
  function saw (x) { return t%(1/x)*x*2-1 }
  function saw_ (x,t) { return t%(1/x)*x*2-1 }
  function sin (x) { return Math.sin(2 * Math.PI * t * x) }
  function sin_ (x,t) { return Math.sin(2 * Math.PI * t * x) }
  function sq (x) { return t*x % 1 < 0.5 ? -1 : 1 }
  function clamp (x) { return Math.max(-1,Math.min(1,x)) }
}
