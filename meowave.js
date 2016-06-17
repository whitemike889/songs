var ms = [ 1, 2, -4, 1, 1, 6, 5, 1 ]
var ss = [ 1, 2, 1, 3, 1, 1/4 ]

return function (t) {
  t *= 72/60
  var m = ms[Math.floor(t)%ms.length]
  var s = ss[Math.floor(t/4)%ss.length]
  var xm = Math.pow(2,m/12)
  var j = sin_(sin(2000)*240,t%2+1)
  var c = Math.pow((t%1<.5?(1-saw_(2,t))/2:(1+sin(4))/2),8)
  var w = tri_(tri_(100*xm + sin(s)/8,t%4)/4,t%1+2)

  if (t % 16 > 8) return c*j + w*0.75
  return c*j + w*0.75 + sin_(w/8/8/4 * sin(1/2)/4,t%4+1) * 0.2

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