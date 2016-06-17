var ms = [ 3, -2, 5, 0, 2, 0, -2, 4, 5, 7, 13, 22, 17, 18, -2, 0 ]
var qs = [ 1, 8, 1, 20, 1, 1/8, 1, 1/800, 1, 5000 ]
var vs = [ 1, 1, 8, 1, 1, 1, 20, 1, 1, 1/2, 1, 1/8, 400, 1, 8 ]

return function (t) {
  var fr = t % 32 > 32-8 ? 4 : 1
  var tr = t * fr
  var q = qs[Math.floor(t/8)%qs.length]
  var m = Math.pow(2,ms[Math.floor(tr)%ms.length]/12)
  var z = sin(m*300*q + sin(4)/8/800)*0.25
  var v = vs[Math.floor(t/4)%vs.length]
  var b = t % 32 > 32-8
    ? beat(saw(1/2)/2+800,v)
    : beat(t/8 % 4 < 3 ? t%8+800 : saw(2)/2+800,v)
  var zb = t % 16 < 15 ? b : sin(b/400)*sin(800*m)
  var sm = t % 16 < 8 ? 1 : (sin(800*m)+sin(400*m))/2
  return 0
    + b*0.6
    + (saw(m*100)+saw(m*100+fr/4))/2*(1-saw(fr))/2 * sm * 0.5
    + clamp(zb*z*4+z*0.3)*sin(8)*0.5

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

function beat (t,v) {
  var m = Math.pow(2,ms[Math.floor(t*16)%ms.length]/12)
  var n = Math.floor(t*2 % 4)
  var tz = (saw(Math.floor(t*2%4+2000)*4)*m*4+1)
    * (t*2 % 2 < 1 ? 1 : (1-saw(Math.floor(t%4)*50+1))/2)
  return saw_(m*100*v+4*saw_(2,tz),saw_(1/2,t%(1/2))+n)
    * (1-saw(4))/2 * (1-saw(4))/2 * (1-saw(2))/2
  ;
  function saw_ (x,t) { return t%(1/x)*x*2-1 }
  function saw (x) { return saw_(x,t) }
}
