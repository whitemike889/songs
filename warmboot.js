var melody = [ 800, 500, 450, 1600, 400, 1100, 400 ];

return function (t) {
  var m0 = melody[Math.floor(t * 8) % melody.length];
  var m1 = melody[Math.floor(t/2) % melody.length];
  var m2 = melody[Math.floor(t/8) % melody.length];
  var fn = t % 10 < 4 ? sin : tri;
  var r = t % 20 > 10 ? m0 / 400 : 1;
  return (fn(5+fn(m2)) * 0.25
    + fn(5+fn(m2+0.0001)) * 0.25
    + fn(t%23 > 0 && t % (1/8) < 1/9 ? m1/2 * r : 0) * sin(200) * 0.2
    + fn(t%33 > 2 && t % (1/8) < 1/9 ? m1/4 * r : 0) * sin(400) * 0.4
    + fn(t%17 > 4 && t % (1/8) < 1/9 ? m1*m2/800 * r : 0) * sin(m2) * 0.4
    + fn(t%11 > 6 && t % (1/8) < 1/10 ? 100 * r : 0) * sin(m1) * 0.1
  );
  function sin (x) { return Math.sin(2 * Math.PI * t * x) }
  function tri (x) { return Math.abs(1 - t % (1/x) * x * 2) * 2 - 1}
  function saw (x) { return t%(1/x)*x*2-1 }
}