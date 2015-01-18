var pattern = [
  [1/9,12,1], [5,90,1/2],
  [1/10.1,20,1], [1,40,1/2],
  [1/8,15,1], [3,11,4096,1],
  [1/12,12,1], [2,18,1/2,1]
];
var rhythm = [ [ 3, 8 ], [ 1/5, 2 ], [ 1/2, 8 ], [ 1/2, 9 ] ];
var subr = [ 1, 1/2, 2, 1/4, 2, 1/2 ];
var wub = [ 200, 2000, 0, 400, 0 ];
var d = snare();
var f = snare();
var g = snare();
var h = snare();

var melody = [ 3, 7, -2, 1, 8, 4, 3, -1 ];

return function (t) {
  var p = pattern[Math.floor(t) % pattern.length];
  var r = rhythm[Math.floor(t*2) % rhythm.length];
  var m = melody[Math.floor(t / 2) % melody.length];
  var xm = 400 * Math.pow(2, m/12);
  var n = melody[Math.floor(t * 2) % melody.length];
  var xn = 800 * Math.pow(2, n/12);
  var w = wub[Math.floor(t / 32) % wub.length];
  var s = subr[Math.floor(t / 8) % subr.length];
  return 0
    + d((t+1/4/p[1])%(1/4/p[1])*p[0])
      * (w ? sin(w*p[0]*p[0]) : w)
      * (p[2] ? sin(p[2]) : 1) * 0.2 * (1+sq(1/16)) / 2
    + f(t%(1/s)) * 0.4
    + g((t+1/4)%(1/2/s) * 4) * sq(400) * 0.4 * sq(1-sq(1/32)) / 2 * (1-sq(1/4)) / 2
    + h((t+1/4/r[1]) % (1/4/r[1])*r[0]) * sin(200*r[0]*r[0]) * (1 + sq(1/32)) / 2 * 0.5
      * (1-sq(1/4)) / 2
    + synth(xm) * (1+sq(1/2))/2 * (1-tri(1/2)) * (1+sq(1/16))/2 * 0.5
    + synth(xn) * (1+sq(1))/2 * (1-tri(1)) * (1-sq(1/16))/2 * 0.25
  ;
  function sin (x) { return Math.sin(2 * Math.PI * t * x) }
  function saw (x) { return (t % 10 + 2000) % (1/x) * x * 2 - 1 }
  function tri (x) { return Math.abs(1 - t % (1/x) * x * 2) * 2 - 1}
  function sq (x) { return t*x % 1 < 0.5 ? -1 : 1 }
  function synth (x) {
    return 0
      + saw(x/8) * 0.1
      + saw(x/8 - 0.06) * 0.1
      + saw(x/4 + tri(2)*4) * 0.1
      + saw(x/4 + 0.1) * 0.1
      + saw(x/2 + 0.03) * 0.1
      + saw(x/2 - 0.04) * 0.1
      + saw(x + tri(2)*2) * 0.2
      + saw(x + 0.1) * 0.1
      + saw(x * 2 - 0.07) * 0.1
      + saw(x * 2 + 0.03) * 0.1
      + saw(x / 2 + tri(1)) * 0.1
      + saw(x / 2 + tri(x)) * 0.1
    ;
  }
}

function snare () {
  var low0 = lowpass(30);
  var low1 = lowpass(80);
  var low2 = lowpass(20);
  return function (t) {
    return low0(snare(80, t))*5
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
