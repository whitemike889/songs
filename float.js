var rhythm = [ 1, 8, 2, 1/8, 1, 1/20 ];
var melody = [ 300, 500, 250 ];

return function (t) {
  var r = rhythm[Math.floor(t*8) % rhythm.length];
  var m = melody[Math.floor(t) % melody.length];
  return 0
    + tri(4/m * tri(m + tri(r/40/m) + tri(r*16/m)))
      * sq(m/8 + m*saw(1/8000)/10)
      * tri(m/10 + tri(m/400)/40 * tri(20/m)/m*2000)
      * 0.2 * tri(1/26) * (1-tri(1/52))
    + tri(m/20)
      * sq(2*m + m*saw(1/200))
      * tri(m/80 + tri(1/2) + tri(100/m))
      * 0.1 * (1-tri(1/26)) * (1-tri(1/52))
    + tri(m*40)
      * sq(200*m + m*saw(1/2000))
      * tri(m/80 + tri(1/4) + tri(100/m))
      * 0.4 * tri(1/52)
  ;
  
  function tri (x) { return Math.abs(1 - t % (1/x) * x * 2) * 2 - 1}
  function saw (x) { return t%(1/x)*x*2-1 }
  function sin (x) { return Math.sin(2 * Math.PI * t * x) }
  function sq (x) { return t*x % 1 < 0.5 ? -1 : 1 }
}