var fn = funky();
var melodies = [
  [ 4, -3, -2, -5, 2, -4, -6, 2, 4, -10, -14, -12, -10, -10 ],
  [ 4, -5, -10, -5, -3, -2, -4, -1, 0, -10, -12, -11, -14, -13 ],
];
var distort = [800,200,10000,40,20000,1200,30];

return function (t) {
  var melody = melodies[Math.floor(t*8/14)%melodies.length];
  var d = distort[Math.floor(t/8)%distort.length];
  var sp = Math.pow(2,Math.floor(t/16)%3-1);
  var m = 100*Math.pow(2,melody[Math.floor(t*sp) % melody.length]/12);
  return 0
    + fn(t) * 0.5
    + Math.min(1, t/15) * (0
      + saw(m*2)*0.2
      + saw(m*2.03)*0.1
      + saw(m*3-0.21)*0.1
      + saw(m*3.02)*0.2
    ) * (1+sq(1/8))/2 * 0.4
    + Math.min(1, t/30) * (0
     + tri(m/4 +tri(d)*2)*0.2
     + saw(m*2) * 0.2
     + saw(m*2.4) * 0.2
    )* (1-sq(1/8))/2 * 0.4
  ;
  
  function tri (x) { return Math.abs(1 - t % (1/x) * x * 2) * 2 - 1}
  function saw (x) { return t%(1/x)*x*2-1 }
  function sin (x) { return Math.sin(2 * Math.PI * t * x) }
  function sq (x) { return t*x % 1 < 0.5 ? -1 : 1 }
}

function funky () {
  var funk = [
    [8,2,1/8], [1/8,1,1], [1,8,40], [8,1,8],
    [4,2,15], [1/8,1,1], [4,4,20], [4,4,20]
  ];
  var melody = [ 40, 60, 50, 0, 50, 50, 0 ];
  var pitch = [ 1, 1, 4, 1, 1, 8 ];
  var d = snare();
  
  return function (t) {
    var p = funk[Math.floor(t*4)%funk.length];
    var pm = pitch[Math.floor(t/4)%pitch.length];
    var m = melody[Math.floor(t)%melody.length]*pm;
    var n = melody[Math.floor(t/4)%melody.length]*pm;
    return 0
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
    function saw (x) { return t%(1/x)*x*2-1 }
    function sin (x) { return Math.sin(2 * Math.PI * t * x) }
    function sq (x) { return t*x % 1 < 0.5 ? -1 : 1 }
    function clip (x) {
      if (x === Infinity || x === -Infinity || isNaN(x)) return 0;
      return Math.min(1, Math.max(-1, x));
    }
  };
}

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