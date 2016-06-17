var ms = [ 1, -3, 5, 2, 2, 2 ]

return function (t) {
  var tt = t % (t % 1 < .5 ? 1/2 : 1) + 5
  var m = Math.pow(2,ms[Math.floor(t*2)%ms.length]/12)
  return 0
    + sin_(sin_(tri_(1,tt),tt)*2,tt) * 0.4
      * (1-saw(1/2))/2 * (1-saw(2))/2
    + sin_(sin_(tri_(1,tt),tt)/4,tt) * 0.5 * (1-saw(4))/2
    + clamp(0
      + saw_(1 + tri(480*m), t % 1 + 20) * 0.6
      + saw_(sin_(960*m,tt) / tri(240*m), t % 1 + 10) * 0.4
      + saw_(m*280+sin(2)/64,tt) * 0.9
      + saw_(m*581+sin(1/2)/64,tt) * 0.9
    ) * 0.5
      * (1-saw(t % 2 < 1/2 ? 4 : 1))/2
      * (1-saw(t % 4 > 3 ? 1 : 4))/2
  ;
  function tri_ (x,t) { return Math.abs(1 - t % (1/x) * x * 2) * 2 - 1 }
  function tri (x) { return tri_(x,t) }
  function saw_ (x,t) { return t%(1/x)*x*2-1 }
  function saw (x) { return saw_(x,t) }
  function sin_ (x,t) { return Math.sin(2 * Math.PI * t * x) }
  function sin (x) { return sin_(x,t) }
  function sq_ (x,t) { return t*x % 1 < 0.5 ? -1 : 1 }
  function sq (x) { return sq_(x,t) }
  function clamp (x) { return Math.max(-1,Math.min(1,x)) }
}