var ms = [
  [[50,0.2],[150,0.3],[200,0.2],[500,0.3]],
  [[50,0.2],[450,0.3],[200,0.2],[500,0.3]],
  [[50,0.2],[450,0.2],[280,0.3],[500,0.3]],
  [[50,0.2],[150,0.2],[620,0.3],[120,0.4]],
  [[60,0.2],[300,0.2],[820,0.3],[420,0.4]],
  [[1250,0.2],[200,0.2],[250,0.3],[220,0.4]],
  [[50,0.4],[200,0.3],[120,0.3],[500,0.2]],
  [[50,0.3],[200,0.2],[80,0.4],[800,0.2]]
]
var o = [0.13,-0.22,0.05,0.18]
var dial = [800,1600,1200]
var rts = [1/4,1/8,1,1/4,1200,1/2,1/4,4,1,1/4,400]

return function (t) {
  var sum = 0
  var m0 = ms[Math.floor(t/2) % ms.length]
  var m1 = ms[Math.floor(t*2) % ms.length]
  var dx = dial[Math.floor(t/16) % dial.length]
  var r = rts[Math.floor(t/2)%rts.length]
  var tx = t*(dx/10)%5 + 20
  var d0 = t % 16 < 8
    ? (Math.sin(tx*tx + 2) + Math.sin(tx/30 + 100))
    : sin(dx)
  var d1 = t % 8 > 4
    ? sin_(8000,sin_(r,t%1+.8)/4)
    : sin(dx + sin_(r,t%(1/2)+1.6)*4)
  for (var i = 0; i < m0.length; i++) {
    var x = saw(m0[i][0] + o[i]) * m0[i][1]
    sum += x * d0 * (1-saw(1))/2 + x * 0.2 * (1+saw(1))/2
  }
  for (var i = 0; i < m1.length; i++) {
    var x = saw(m1[i][0] + o[(i+2)%o.length]) * m1[i][1]
    sum += x * d1 * (1+saw(1/4))/2 + x * 0.2 * (1-saw(1/4))/2
  }
  return sum;

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