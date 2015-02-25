var funk = [
  [8,2,1/8], [1/8,1,1], [1,8,40], [8,1,8],
  [4,2,15], [1/8,1,1], [4,4,20], [4,4,20]
];
var melody = [ 40, 60, 50, 0, 50, 50, 0 ];
var d = snare();

return function (t) {
  var p = funk[Math.floor(t*4)%funk.length];
  var m = melody[Math.floor(t)%melody.length];
  var n = melody[Math.floor(t/4)%melody.length];
  var x = melody[Math.floor(t*8)%melody.length];
  return 0
    + saw(x * 16 + saw(x*m*10)/4) * (1-sq(16*(m)))/2
        * (sq(1/16) > 0 ? 0 : 1) * 0.1
    + (0
      + saw(x * 2 + saw(x*x)/2) * (1-saw(4*x))/2 * (1+sq(2+m))/2 * 0.2
      + sq(
        + (tri(1800) * 5 + tri(9000) * 4) * sq(3) * sq(4)
      ) * sq_(tri(1/4),400+(t%2>1?tri(x*2+100):tri(8))) * 0.2
      + clip(d(t % (1/p[0]/4)))
    ) * (sq(1/16)>0?1:0)
    
    + clip(d(t % (1/p[0]) * p[1]) * sq(p[2]*100)) * 0.3
    + saw(m) * (1-saw(4))/2 * (1+sq(2))/2 * 0.3
    + saw(m + 1/8) * (1-saw(4))/2 * (1+sq(2))/2 * 0.3
    + saw(4*m) * (1-saw(4))/2 * (1-sq(2))/2 * 0.3
    + saw(4*m - 1/8) * (1-saw(4))/2 * (1-sq(2))/2 * 0.3
    + tri(2*m + 0.13 + tri(400)) * (1-sq(8))/2 * 0.1 * (1-sq(1/4))/2
    + saw(2*m + tri(1800)) * (1-sq(8))/2 * 0.1 * (1+sq(1/4))/2
    + (
        saw(n*8) * 0.2
        + saw(n*8 + 1/16) * 0.2
        + saw(n * 4) * 0.2
        + saw(n * 16 - 1/24) * 0.2
        + tri(n + tri(n * 4 + 100)) * 0.2
    ) * (1-saw(4)) / 2 * (1+sq(1/4))/2 * 0.3
  ;
  function tri (x) { return Math.abs(1 - t % (1/x) * x * 2) * 2 - 1}
  function tri_ (t,x) { return Math.abs(1 - t % (1/x) * x * 2) * 2 - 1}
  function saw (x) { return t%(1/x)*x*2-1 }
  function sin (x) { return Math.sin(2 * Math.PI * t * x) }
  function sq (x) { return t*x % 1 < 0.5 ? -1 : 1 }
  function sq_ (t,x) { return t*x % 1 < 0.5 ? -1 : 1 }
  function clip (x) {
    if (x === Infinity || x === -Infinity || isNaN(x)) return 0;
    return Math.min(1, Math.max(-1, x));
  }
};

function snare () {
  var low0 = lowpass(800);
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
