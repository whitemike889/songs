var melody = [ 1, -1, 3, -2, 5 ];
var alt = [ 9, 4, -1, 2, -3 ];
var sn = snare();

return function (t) {
  if (t % 32 < 8) return intro(t)
  else if (t % 32 < 9) {
    var d = (t % 32 - 8) / (9 - 8);
    return intro(t) * (1 - d) + main(t) * d;
  }
  else return main(t)
};

function intro (t) {
  var tb = t % 10 + 2000;
  var i = Math.floor(t / 10 % 4);
  var x = [
    120,
    4.8 * (tb % 1 + 1) / ((tb%(1/4)+60) % 100),
    150,
    3.8 * (tb % (1/4) + 1) / ((tb%1+90) % 100)
  ][i];
  var y = Math.pow(2, melody[Math.floor(t % melody.length)] / 12);
  var m = x * y;
  var a = Math.pow(2, alt[Math.floor(t) % alt.length]/12);
  var b = x * a;
  
  var chorus = (saw(m) * 0.1
    + saw(2 * m - 1) * 0.2
    + saw(3 * m + 1) * 0.6
    + saw(4 * m) * 0.2
    + saw(5 * m + 2) * 0.15
    + saw(6 * m - 1) * 0.1
    + saw(7 * m + 1) * 0.03
    + saw(8 * m + 5) * 0.03
    + saw(9 * m + 4) * 0.05
    + saw(10 * m + 1) * 0.1
   ) * 0.3 * sin(1/16)
   + (
    + saw(b) * 0.5
    + saw(b*2) * 0.2
    + saw(b*3 + 1) * 0.5
    + saw(b*4 - 1/2) * 0.2
    + saw(b*5) * 0.1
    + saw(b*7 + 1) * 0.05
    ) * 0.3 * sin(1/8)
  ;
  return chorus
    + (t * 4 * 4 % 4 > 3 ? sin(a + sin(350)) * 0.25 : 0) * 2
    + (t % 8 / 8 > 7/8 ? sn(t % (1/2)) : 0)
  ;
  function saw (x) { return tb % (1/x) * x * 2 - 1 }
  function sin (x) { return Math.sin(2 * Math.PI * (t%8) * x) }
}

function main (t) {
  var tb = t % 100 + 2000;
  var i = Math.floor(t / 4 % 4);
  var x = [
    120,
    4.8 * (tb % 1 + 1) / ((tb%(1/4)+60) % 100),
    150,
    3.8 * (tb % (1/4) + 1) / ((tb%1+90) % 100)
  ][i];
  var y = Math.pow(2, melody[Math.floor(t % melody.length)] / 12);
  var m = x * y;
  var a = Math.pow(2, alt[Math.floor(t) % alt.length]/12);
  var b = x * a;
  
  var chorus = 0;
  var discord = t % 13 < 4
    ? sin(Math.floor(t * 4 % 11) / 32)
    : Math.floor(t / 4 % 3)
  ;
  if (t % 32 > 16) {
    chorus = saw(a * 40) * 0.4
      + saw(a * 40 + 1 + discord) * 0.4
      + saw(a * 40 * 3 + x/30 * discord) * 0.25
      + saw((a * 160 + x/20 * discord)) * 0.25
      + saw(a * 40 * 8 + 1 + discord) * 0.25
      + saw(a * 40 * 64) * 0.125
      + saw(a * 40 * 64 + 1 + discord) * 0.125
    ;
  }
  else {
    chorus = (saw(m) * 0.1
      + saw(2 * m + 1) * 0.2
      + saw(3 * m + 1 + discord) * 0.6
      + saw(4 * m) * 0.2
      + saw(5 * m + discord) * 0.06
      + saw(5 * m + 1 + discord) * 0.06
      + saw(6 * m + discord) * 0.05
      + saw(6 * m + 1 + discord) * 0.05
      + saw(7 * m + discord) * 0.02
      + saw(7 * m + 1 + discord) * 0.02
      + saw(8 * m + discord * 5) * 0.03
     + saw(9 * m + discord * 4) * 0.05
      + saw(10 * m + discord) * 0.1
     ) * 0.3
    ;
  }
  return chorus * (1-saw(4))
    + (t % 8 / 8 > 0 ? sn(t % (1/2)) : 0) * (t % 1 > 1/4 ? 1 : sin(8000))
  ;
  function saw (x) { return tb % (1/x) * x * 2 - 1 }
  function sin (x) { return Math.sin(2 * Math.PI * (t%8) * x) }
}

function snare () {
  var low0 = lowpass(80);
  return function (t) {
    return low0(snare(25, t)) * 40;
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