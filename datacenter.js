var d = snare();
var melody = [ 17, 5, -13, 14, 17, 5, -56, -80, 19 ];
var rhythm = [ 64, 32, 100, 1000 ];
var factors = [ 1, 4, 1, 1/4, 12800, 80, 1 ];
var warp = [ 1, 2000, 1/100 ];
var scratch = [ 4, 4, 4, 50, 1, 4, 4, 1, 40, 4, 4, 4 ];
var mults = [ 50, 800, 2000, 25, 15, 1 ];

return function (t) {
  var m = Math.pow(2,melody[Math.floor(t*4) % melody.length]/12);
  var f = factors[Math.floor(t/4) % factors.length];
  var r = Math.pow(2,rhythm[Math.floor(t*f) % rhythm.length]/12);
  var w = warp[Math.floor(t/2) % warp.length];
  var sc = scratch[Math.floor(t*4) % scratch.length];
  var mu = mults[Math.floor(t/8) % mults.length];
  var x = dub((t*m*mu+1+w)%0.5*Math.abs(Math.sin((t/r*w+10)%0.1*1000*m)/100));
  return (1-x)/2 + d(t%(1/2)) * 0.4 + d(t % 1/4) * 0.4 + d(t*8%1/sc) * 0.2;
};

function dub (t) {
  var m = sin(Math.pow(2,melody[Math.floor(t * 8) % melody.length]/12));
  return saw(850 * m + (Math.floor(sin(10)*18) % 5) * 10) * 0.7
    + saw(850 * 2 * m) * 0.2
    + saw(850 * 2 * m + 5) * 0.3
    + saw(851 * 5 * m - t%4) * 0.9
    + saw(85*80 * m) * (1-saw(8)) * (1 + saw(4))
  ;
  return noise(t/2) / 7
    + saw(800 + (Math.floor(sin(15)*18) % 8) * 10)
    + d((t + 1/2) % (1/2)) * 8 * saw(8) * sin(8000) * 2
    + d(((t+1/2)*4) % 1) * sin(4000) * 4
  ;
  function sin (x) { return Math.sin(2 * Math.PI * t * x) }
  function saw (x) { return 1 - t % (1/x) * x * 2 }
}
function noise (t) {
  return 0
    + saw(saw(40)) * sin(12000)
    + saw(40) + saw(41)
    + saw(80) + saw(81 + saw(1/3)) * sin(100)
  ;
  function sin (x) { return Math.sin(2 * Math.PI * t * x) }
  function saw (x) { return 1 - t % (1/x) * x * 2 }
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