var melody = [ 5, 3, 1, 8, 4, 7, 0 ];
var speed = [ 4, 2, 8, 1 ];
var power = [ 200, 2000, 500, 2, 100, 20, 200, 400, 1, 100 ];

return function (t) {
  var m = melody[Math.floor(t*2) % melody.length];
  var sp = speed[Math.floor(t) % speed.length];
  var up = (Math.floor(t/8) % 4 + 1) * 8;
  var pow = power[Math.floor(t / 8) % power.length];
  var xm = Math.pow(2,m/12) * 50;
  var tm = t % (1/sp) + 1/8;
  return 0
    + saw_(xm + saw(xm)*4 + 0.21, t%(1/4) - 1)*0.2 * (1+sq(1/15))/2
    + saw_(xm + saw(xm*8*sp)*8, t%(1/4)*4)*0.2 * (1+sq(1/11))/2
    + saw_(xm + saw(xm*up) + 0.11, t%(1/2))*0.2 * (1+sq(1/4))/2
    + tri_(xm*4 + tri_(pow, tm)*xm/40, tm)*0.4 * tri_(sp*4, t/4%2)
  ;
  function tri (x) { return Math.abs(1 - t % (1/x) * x * 2) * 2 - 1}
  function saw (x) { return t%(1/x)*x*2-1 }
  function sin (x) { return Math.sin(2 * Math.PI * t * x) }
  function sq (x) { return t*x % 1 < 0.5 ? -1 : 1 }
  function tri_ (x, t) { return Math.abs(1 - t % (1/x) * x * 2) * 2 - 1}
  function saw_ (x, t) { return t%(1/x)*x*2-1 }
  function sin_ (x, t) { return Math.sin(2 * Math.PI * t * x) }
}