var tempos2 = [2, 4, 8, 32]
var tempos = [2, 2, 4, 8, 16, 24]
var tiem
var sn = snare()
var _t
return function (t) {

  _t = t

  t % 16 > 11 ? tiem = tempos2 : tiem = tempos
  t /= tiem[Math.floor(Math.abs(sin(1/4, t) * tiem.length))]/(t%16 < 11 ? 8 : tempos2[Math.floor(Math.abs(sin(1/32, t) * tempos2.length))])
  var phase = t % 8 < 4 ? 4000 : 7000
  if (t % 8 > 6) phase = 20000
  var ph = t % 16 > 4/2
   ? 1 * (1+sin_(1/50000,t%8+phase))/2 
   : phase 
  ;
  return 0
    + (0
      + sin_(3,sin_(saw_(140+sin(5)/4096/(t%1),t%1+ph)/16/4,t%(1/4)+16))
        * (1-saw(8))/2
        * (1-saw(2))/2
        * 0.75
      + sin_(190,saw_(
          saw(8)/8/8*(1-sin(100+200*Math.floor(t*16%3+1))),
          t%1*sin(400)/8*(1-saw(8))/2+1/8
      )) * 0.5
        * (1-saw(8))/2
        * (1-saw(4))/2
      ) + sn((_t % 72 < 44 ? _t : _t*2+.5)%1/tiem[1])
  ;
  function tri (x) { return Math.abs(1 - t % (1/x) * x * 2) * 2 - 1}
  function tri_ (x,t) { return Math.abs(1 - t % (1/x) * x * 2) * 2 - 1}
  function saw (x) { return t%(1/x)*x*2-1 }
  function saw_ (x,t) { return t%(1/x)*x*2-1 }
  function sin (x) { return Math.sin(2 * Math.PI * t * x) }
  function sin_ (x,t) { return Math.sin(2 * Math.PI * t * x) }
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
