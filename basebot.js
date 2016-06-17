var patterns = [ 4, 4, 4, 8, 8, 4, 2 ];
var base = [ 2, 1, 9, 7, 10, 3 ];
var ms = [ 1, 2, 8, 2, 20 ];
var basesp = [ 1, 8, 1/4, 1, 8 ];

return function (t) {
  var p = patterns[Math.floor(t*4) % patterns.length];
  var m = ms[Math.floor(t/4) % ms.length];
  var bsp = basesp[Math.floor(t/8) % basesp.length];
  var b = Math.pow(2,base[Math.floor(t*bsp) % base.length]/12);
  return (saw(100 * b) + saw(100 * b + 1)) * (1+sq(1/16))/2 * 0.3
    + saw(100 + saw(Math.floor(t*p*bsp%4)/8)) * 0.2
      * Math.pow(1-sin(1/16)*sin(1/15),2)
    + saw(100 + tri(2.5) + tri(4) + tri(p*b*m)) * (1+sq(1/20))/2 * 0.2
    + (tri(100 + saw(200) + saw(1/300)) * 0.5 * (1+sq(1/10))/2
      + saw(p*300 + saw(p*400)) * 0.2 * (1-sq(1/13))/2
    ) * ((1+sin(8))/2 + (1+sin(15))/2) * 0.3
    + (tri(120 + tri(4)) + tri(120.5))
      * (sin(7) * sin(5)) * (1+sq(1/2))/2 * 2
  ;
  function tri (x) { return Math.abs(1 - t % (1/x) * x * 2) * 2 - 1}
  function saw (x) { return t%(1/x)*x*2-1 }
  function sin (x) { return Math.sin(2 * Math.PI * t * x) }
  function sq (x) { return t*x % 1 < 0.5 ? -1 : 1 }
}