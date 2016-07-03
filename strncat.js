var xs = [0,0,2,0,4,-1,0,-8,0,0,2,0,4,0]
var ys = [1,3,1,8,9,1,1,2,3,7]
var ms = [0,-2,5,6,2, 0,-2,5,7,2, 0,-2,5,-5,2, 0,-2,5,-3,2]

return function (t) {
  var w2 = (1-saw(2))/2
  var w3 = (1-saw(3))/2
  var w4 = (1-saw(4))/2
  var w5 = (1-saw(5))/2
  var w6 = (1-saw(6))/2
  var x = xs[Math.floor(t/2)%xs.length]
  var y = ys[Math.floor(t/3)%ys.length]
  var m = Math.pow(2,ms[Math.floor(t*6*2)%ms.length]/12)
  var n = Math.pow(2,ms[Math.floor(t*2)%ms.length]/12)
  return 0
    + clamp(sin_(sin(400*m),sin(1/4)/4+t*4%1/2+sin(1/2)/4)
      * w4*w3*w6 * 4)*0.2
    + clamp(sin_(sin(200*n)+tri(101*n),t*2%1/4+.5)
      * (1-sin(1))/2 * 1.5) * 0.3
    + clamp(sin_(sin(50)+sin(1)/8/2+sin(1/2)/8,sin(150/2+x)+sin(150*3+y)/2)
      * w4*w3*w6 * ((1+sin(7))/2 + w2*w2) * 2) * 0.3
    + clamp(sin_(sin(100*n)+tri(50*n)/2,t%1+sin(1/3)/2+.4)) * 0.2

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