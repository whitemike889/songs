var d0 = snare(), d1 = snare(), d2 = snare();
var melody = [ 3, 3, 1, 1, -2, -3, 4, 5, 0, 5, 4, 2 ];
var st0 = [ 2, 2, 2, 4, 2, 2, 8, 2, 2, 1, 1/2, 2, 2, 2 ];

var xtra = [ [tri_,100], 0, [tri_,400], 0, 0, [saw_,100], 0, 0,
  [saw_,4], [sin_,1], 0, 0, [tri_,8], 0 ];

return function (t) {
  var m = melody[Math.floor(t * 8 % melody.length)];
  var xm = Math.pow(2, m/12);
  var ph = Math.floor(t*8/melody.length);
  var fr = Math.pow(2, ph%8/2) * 100;
  var tg = Math.pow(3,ph*2%8)%4/5 + Math.pow(2,ph*4%11)%3/3;
  var s0 = st0[Math.floor(t) % st0.length];
  var s1 = st0[Math.floor(t/4) % st0.length];
  var xt = xtra[Math.floor(t / melody.length) % xtra.length];
  if (xt) xt = xt[0](xt[1],t);
  return 0
    + saw(xm*tg*fr + xt) * 0.15
      * (saw(s0)-1)/2
    + saw(xm*fr + tri(m*Math.pow(2,ph%8))/(ph%2+1)/4) * 0.15
      * (1-saw(s1/2))/2
    + d0(t*(Math.floor(t)%2+1) % 1) * 0.5
    + d1((t-1/8) % 2) * sin(100 + sin(1/4)*200) * 0.5
    + d2((t+1/8)*(Math.floor(t*2)%2+1) % (1/(t%8<7.5?4:8)))
      * sin(sin(1/2)/2 + sin(1/8)*2) * 0.5
  ;
  function tri (x) { return tri_(x,t) }
  function saw (x) { return saw_(x,t) }
  function sin (x) { return sin_(x,t) }
  function sq (x) { return sq_(x,t) }
};

function tri_ (x,t) { return Math.abs(1 - t % (1/x) * x * 2) * 2 - 1}
function saw_ (x,t) { return t%(1/x)*x*2-1 }
function sin_ (x,t) { return Math.sin(2 * Math.PI * (t%32+1000) * x) }
function sq_ (x,t) { return t*x % 1 < 0.5 ? -1 : 1 }

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