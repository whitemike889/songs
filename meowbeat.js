var rs = [ 800, 3000, 2000, 4000 ]

return function (t) {
  var r = rs[Math.floor(t/4)%rs.length]
  var s8 = (1-saw(8))/2, s2 = (1-saw(2))/2, s1 = (1-saw(1))/2
  var s4 = (1-saw(4))/2
  var d = (2-saw(1)-saw(4))/4

  return 0
    + clamp(saw_(1+saw_(200+saw(r),saw(2)/4+4),saw(1/4)/8+4)
      * d*d*d*s8*s8
    * 4) * 0.5
    + saw(400)*s2*s2*s8*0.5
    + saw(r/4)*s2*s8*s4*0.5
    + saw_(100+saw(800)*s4/2,s4*s2*4+4)
      * s1*s2*s8*s4*0.75

  function saw_ (x,t) { return t%(1/x)*x*2-1 }
  function saw (x) { return saw_(x,t) }
  function clamp (x) { return Math.max(-1,Math.min(1,x)) }
}