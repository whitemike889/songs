var rs = [2,4,2,8,2,12,2,4,2,4]
var ms = [8,8,8,8, 5,5,3,2, 0,0,0,0, 9,2,5,10, 0,4,10,9]
var qs = [0,0,0,0, 1,0,2,0,4, 1,3,7, 0,5,6,0, 7,4,7,7 ]
var ns = [2,-4,8,7, -2,5,3,1, 2,-5,9,5, -2,4,7,1]
var hs = [1,2/3,3/2,5/3,4/3]

return function (t) {
  var r0 = rs[Math.floor(t*4)%rs.length]
  var m0 = ms[Math.floor(t*8)%ms.length]
  var q0 = qs[Math.floor(t/4)%qs.length]
  var m1 = Math.pow(2,ns[Math.floor(t)%ns.length]/12)
  var h0 = hs[Math.floor(t/8)%hs.length]
  var z0 = (1-sq(1/16))*0.5
  return 0
    + saw_(sin(8),saw(1)*0.1+25)*0.2
      * Math.pow((1-saw_(r0,t)*0.5-saw(8)*0.5)*0.5,8)
    + sin_(saw(m0)+saw(5+m0),saw(.5)+15)*0.2
      * Math.pow((1-saw_(r0,t+.25))*0.5,r0)
    + (0
        + sin(50*m0*h0*((q0&1)>>0))
        + sin(101*m0*h0*((q0&2)>>1))
        + sin(150*m0*h0*((q0&4)>>2))
      )/3 * Math.pow((1-saw(1))*0.5,4)
      * (1-z0)
    + saw_(saw(50*m1*h0)+saw(100*m1*h0+1),sin(.25)*0.5+2)*0.1
      * Math.pow((1-saw_(1,t+.5))*0.5,4)
      * z0
    + sin_(sin(50*h0)+sin(101*h0),sin(r0+z0*4)*.1+.4)*0.1
      * (z0*0.6+0.4)

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