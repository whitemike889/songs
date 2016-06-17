var ms = [1,3,-5,2,1,-2,4,5]
var rs = [1,3,1/3,1,2,3,1/2,3,1]
var ws = [200,800,1000,100,400,2000,800,4000]

return function (t) {
  t *= 72/60
  var m = Math.pow(2,ms[Math.floor(t*2)%ms.length]/12)
  var r = rs[Math.floor(t/2)%rs.length]
  var w0 = ws[Math.floor(t/8)%ws.length]
  var w1 = ws[Math.floor(t/12)%ws.length]
  var a = sin_(sin(80)*1000,t%4+2)
    * Math.pow((t%1<.5?(1-saw_(2,t))/2:(1+sin(t%4<1?8:4))/2),4)
  var b = sin_(sin(2000)*240,t%2+1)
    * Math.pow((t%1<.5?(1-saw_(2,t*(t%4<3?1:2)+0.4))/2:(1+sin(4))/2),4)
  if (t % 32 < 2) return a + b
  if (t % 32 > 24 && t % 2 < 1) {
    return a + b + tri_(tri_(tri(1),t%2+8),
      t%2+80+saw_(80*m+sin(1/4),t%1+2))*0.75
  }
  return a * 0.8 + b * 0.8
    + clamp(tri_(tri_(tri(4)/8/r,t%.5+1),t%2+(2+saw(w0*m)))
      * (1-saw(1))/2) * 0.7
    + sin_(tri_(tri(1),t%1+8),t%1+4+(2+saw(w1*m)))
      * (1-saw(4))/2 * 0.6

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