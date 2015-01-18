var melody = [ 800, 500, 450, 1600, 400, 400, 400 ];

return function (t) {
  var m = melody[Math.floor(t * 2) % melody.length];
  var r = t > 10 ? m / 400 : 1;
  return (sin(5+sin(100)) * 0.5
    + sin(5+sin(100.0001)) * 0.5
    + sin(t > 0 && t % (1/8) < 1/9 ? 50 * r : 0) * sin(200) * 2
    + sin(t > 2 && t % (1/8) < 1/9 ? 100 * r : 0) * sin(400) * 2
    + sin(t > 4 && t % (1/8) < 1/9 ? 200 * r : 0) * sin(800) * 2
    + sin(t > 6 && t % (1/8) < 1/9 ? 400 * r : 0) * sin(1600) * 2
  ) * (t % 16 > 12
    ? sin_(sin_(m * 4, t % 1) * 100, 1+tri(800)+tri(1/400))
    : 1
  );
  function sin (x) { return Math.sin(2 * Math.PI * t * x) }
  function sin_ (x, t) { return Math.sin(2 * Math.PI * t * x) }
  function tri (x) { return Math.abs(1 - t % (1/x) * x * 2) * 2 - 1}
}
