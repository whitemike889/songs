var melody = [1,-2,4,3,5]
var hs = [0.5,0.2,0.9,5,0.2,9]
var rs = [4,1,4,1,8,6,2,1]
var xs = [100,50,30,500,200,20]

return function (t) {
  t *= 40/60
  var r = rs[Math.floor(t*2)%rs.length]
  var h = hs[Math.floor(t/8)%hs.length]
  var m = Math.pow(2,melody[Math.floor(t/2)%melody.length]/12)
  var x = xs[Math.floor(t*2)%xs.length]
  return 0
    + tri_(tri_(tri(2),t/8%1+8),t/4%1+h)
     * (1-sin(4)*0.7+sin(1)*0.7)/2
     * (1-saw(2))/2 * 0.4
    + sin_(sin(100),t/4%1)*(1-saw(200))/2*(1-saw(1/2))/2
     * (1-sin(700*m))/2 * 0.3
    + sin_(sin_(sin(100*m)*sin(1/4),t%1/4+.5),t%1/4+.5)*0.2
    + clamp(sin_(sin(x)*(1-saw(r*4))/2,t%1))*(1-saw(r))/2*0.75
    + sin_(sin(400*m),t%1+20)*(1-saw(8))/2*0.2

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