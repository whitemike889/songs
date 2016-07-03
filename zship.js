var bs = [80,240,100,320]
var ms = [2,-1,7,5]
var xs = [200,100,300,800,100,500,400,200,100,150,200]

return function (t) {
  var w8 = (1-saw(8))/2
  var w4 = (1-saw(4))/2
  var w2 = (1-saw(2))/2
  var w1 = (1-saw(1))/2
  var b = bs[Math.floor(t/4)%bs.length]
  var m = Math.pow(2,ms[Math.floor(t/2)%ms.length]/12)
  var n = Math.pow(2,ms[Math.floor(t/4)%ms.length]/12)
  var x = xs[Math.floor(t)%xs.length]
  var z = saw_(1/8/8/8,80+Math.floor(t%8/4)*(t*4%1/8))
  return 0
    + clamp(tri_(sin(x),(1-sin(1/4))/2/4+.5)
      * w1*w2*w1)*0.25
    + clamp(sin_(sin(100*n),sin(4))*(1+sin(1))/2
      * w4)*0.3
    + clamp(sin_(sin(40),sin(b)))*0.2
    + clamp(sin_(sin(120*z),sin(m*80)*n)*w2*1.2)*0.2
    + clamp(sin_(200*z*m,sin(n*100)/8/8/8+sin(1/4)/2+sin(1/6)+1))*0.3

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