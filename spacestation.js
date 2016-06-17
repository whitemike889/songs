var d0 = snare();
var d1 = snare();

var flare = [ 2, 2, 2, 5, 2, 2, 2, 7, 2, 2, 2, 3, 2, 2, 2, 4, 2, 2, 2, 6 ];
var melody = [ 300, 500, 300, 700 ];
var base = [ [4,16], [64,128], [32,24] ];
var xp = [ 1, 1, 1, 2, 1, 1, 1, 3 ];
var phase = [[4,3],[8,6],[7,4],[7,6]];

return function (t) {
  var f = flare[Math.floor(t*3)%flare.length];
  var m = melody[Math.floor(t)%melody.length];
  var b = base[Math.floor(t/melody.length)%base.length];
  var x = xp[Math.floor(t*f)%xp.length];
  var ph0 = phase[Math.floor(t/8) % phase.length];
  var ph1 = phase[Math.floor(t) % phase.length];

  var e0 = t*Math.floor(t*3%ph0[0]/4+1)*Math.floor(t*x%f/4+1) % (1/x/ph0[1]);
  var e1 = t*Math.floor(t*4%ph1[0]/8+1)*Math.floor(t*x%f/2+1) % (1/x/ph1[1]);
  return 0
    + d0(e0) * (sin(x*400) + sin(400000/f))/2 * 0.3
    + d1(e1) * (sin(x*f*240) + sin(4000/f))/2 * 0.3
    + saw(m*100 + tri(b[0]) + tri(b[1]/8)) * 0.1
    + saw(m*400 + sin(1/b[1])*8) * 0.1
  ;
  function tri (x) { return Math.abs(1 - t % (1/x) * x * 2) * 2 - 1}
  function saw (x) { return t%(1/x)*x*2-1 }
  function sin (x) { return Math.sin(2 * Math.PI * t * x) }
  function sq (x) { return t*x % 1 < 0.5 ? -1 : 1 }
}

function snare () {
  var low0 = lowpass(30);
  var low1 = lowpass(80);
  var low2 = lowpass(20);
  return function (t) {
    return low0(snare(180, t))*5
      + low1(snare(40, t+1/60))*10
      + low2(snare(80, t+1/30))*5
    ;
    function snare (n, o) {
      var scalar = Math.max(0, 0.95 - (o * n) / ((o * n) + 1));
      return sin(sin(sin(137)*139)*4217) * scalar;
    }
    function sin (x) { return Math.sin(2 * Math.PI * t * x) }
  };
  function lowpass (n) {
    var value = 0;
    return function (x) { return value += (x - value) / n }
  }
}