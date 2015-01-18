var melody = [ 80, 20, 30, 90, 80, 20, 30, 70 ];
var alt = [ 6, 20 ];
var bells = [ 1, 300, 1/8 ];
var freq = 100;
var n = 10;

var speed = [ 2, 0.25, 0.5, 0.15, 0.5, 0.25 ];

return function (t) {
  var tt0 = t % speed[Math.floor(t/16)%speed.length];
  var tt1 = (t + 0.1) % speed[Math.floor(t/20)%speed.length];
  var freq = 100;
  var n = 10;
  var m = melody[Math.floor(t) % melody.length];
  var a = alt[Math.floor(t/8) % alt.length];
  var b = bells[Math.floor(t/10) % bells.length];
  var ph0 = Math.max(0, 0.95 - (tt0 * n) / ((tt0 * n) + 1));
  var ph1 = Math.max(0, 0.95 - (tt1 * n) / ((tt1 * n) + 1));
  return (
    tri(freq/2+m/80)
    + tri(2*freq + 1)
    + sin(5*freq+3*m + tri(a+b*m)*800000)
    + tri(6*freq-8 + tri(b)/a) * 0.5
    + sin(8*freq*m/40)
    + saw(freq*2) * 0.2
  ) / 5 * ph0
    + (
      saw(freq * 2 + 1) * 0.1
      + saw(freq / 4 - 1/8) * 0.05
    ) * ph1
  ;
  function sin (x) { return Math.sin(3 * Math.PI * t * x) }
  function tri (x) { return Math.abs(1 - t % (1/x) * x * 2) * 2 - 1}
  function saw (x) { return t%(1/x)*x*2-1 }
}
