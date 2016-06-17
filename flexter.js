var ms = [ 100, 300, 200, 100, 400 ]

return function (t) {
  t = t * 72/60
  var tt = t % 4 + 8
  var m = ms[Math.floor(t)%ms.length]
  var n = ms[Math.floor(t*3)%ms.length]
  return 0
    + saw_(m + sin_(1+sin(1/2)/4,tt),tt)
      * (1-saw(7))/2
      * (1-saw(6))/2
      * 0.6 * (t%12<6?1:0)
    + clamp(tri_(tri(8)/4+sin_(tri(40),tt/8/2+1)/2,tt/8+2)
      * (1-saw(3))/2
      * (1-saw(6/4))/2
      * sin(n)
    ) * 0.3
    + saw_(saw_(n,tt),tt+sin(1/3)*4)
      * (1-saw(1/6))/2 * 0.2 * (t % 16 > 10)

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