var ms = [ 0,-2,4,8, 0,-1,5,8, 0,-2,7,3, 0,-4,4,1,
  0,-2,-3,8, 0,2,5,8, 0,-5,4,9 ]
var rs = [8,4,8,2,8,1,8,9,4,5,1,8,4,8,9,1,8,2,8,9,4,8]
var sp = [1,2,1,4,1,8,4,12,2,8,4,1,2]
var hs = [1,3/5,1,5/4,4/3,1]

return function (t) {
  t *= 80/60
  var m0 = Math.pow(2,ms[Math.floor(t*8)%ms.length]/12)
  var m1 = Math.pow(2,ms[Math.floor(t*4)%ms.length]/12)
  var h0 = hs[Math.floor(t*4/ms.length)%hs.length]
  var h1 = hs[Math.floor(t*8/ms.length)%hs.length]
  var s0 = sp[Math.floor(t/2)%sp.length]
  return (0
    + sin_(sin(806),t%1+800)
      * Math.pow((1-saw(2))*0.5,8)*0.2
    + sin_(sin(1206),t%1+150)
      * Math.pow((1-saw_(8,t+0.25))*0.5,8)*0.2
    + clamp(sin_(sin(80*m0)*.8+sin(40*m0)*.8+sin(120*m0)*.5,saw(1)*0.1+0.2)
      * Math.pow((2-saw_(8,t+0.25))*0.5,8)*4)
      * Math.pow((1+sin(1))*0.5,2) * 0.5
    + clamp(sin_(sin(80*m1*h0)+sin(40*m1*h0),saw(2)*sin(1)*.4+.5)*2)*0.2
    + sin_(sin(400.2*m0*h1)+2,(1-saw(s0))*0.5*0.2+.2)*0.2
  ) * 0.3

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
