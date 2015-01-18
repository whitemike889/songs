var melody = [ 5, 7, 3, 5, 1, 7, 2 ];
var side = [ 90.125, 180.25 ];
var pace = [ 4, 12, 8, 4 ];
var sn = snare();

return function (t) {
  var m = melody[Math.floor(t*2) % melody.length];
  var p = pace[Math.floor(t/8) % pace.length];
  var s = side[Math.floor(t*p) % side.length];
  var x = Math.pow(2, Math.floor(t%2)*m/12);
  var b0 = Math.floor(t / 4 % 4);
  var b1 = Math.floor(t / 4 % 8);
  return saw(s * x / 2) * 0.25 * (b0 === 1 ? 8 : 1) * sin(4)
    + saw(s * x * 2) * 0.5 * sin(2)
    + saw(s * x * 3 + 1/p) * 0.125 * (b0 === 2 ? 4 : 1)
    + saw(s * x * 6) * 0.125 * sin(4)
    + saw(s * x * 8 + 1/p) * 0.2
    + saw(225 * x + 1/2) / sin(900 * x + 1/8)
      * (b1 === 3 || b1 === 5 ? 1 : 0) / 8
    + (t % 1 >= 3/4 ? sn(t%(1/8)) : sn(t%(1/2))) * 4
  ;
  function sin (x) { return Math.sin(2 * Math.PI * t * x) }
  function saw (x) { return t%(1/x)*x*2-1 }
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