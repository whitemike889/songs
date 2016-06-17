var pattern = [4,8,2,4,4,1,1/2]
var melody = [4,-3,7,11,5]
var xms = [2930,2930,2930,470,2930,3402,2930,879]
var yms = [2114,2114,850,2114,3150,880,2114]
var rs = [ 100, 300, 100, 80, 500, 100 ]

return function (t) {
  t *= 72/60
  var p = pattern[Math.floor(t*2)%pattern.length]
  var m = Math.pow(2,melody[Math.floor(t*2)%melody.length]/12)
  var sp = (1-saw(p))/2
  var xm = xms[Math.floor(t/8)%xms.length]
  var ym = yms[Math.floor(t/8)%yms.length]
  var r = rs[Math.floor(t/4)%rs.length]
  var a = saw_(sin_(sin(400*m),t%.125+8)*8,t%1/8+.5)
    * sp * sp * sp * (1-saw(p+2))/2 * 0.4
  var b = (saw_(m*200+tri(xm*m)*4,t%.5+.25)*0.2
    + saw_(401.21*m+tri(ym*m)*8,t%.5+0.25)) * sp * 0.2
  var c = tri_(tri_(tri(40*m)*2,t%.25+.5),t*2%1+.2)
    * sp * sp * 0.2
  var d = saw_(sin_(sin(r)+tri(4*p)*p*8,t%.125+.4),t%1/2+.65)
    * (1-saw(8)*0.7-saw_(2,t+0.1)*0.3)/2 * 0.1
  var e = saw_(sin_(sin(100)+tri(r/2)*2,t%.125+.4),t%1/2+.65)
    * (1-saw(8)*0.7-saw_(2,t+0.1)*0.3)/2 * 0.1
  if (t < 4) return b*2
  if (t < 12) return b*2 + (1+saw_(1/8,t+4))/2*a
  if (t < 32) return clamp(a*b*8+b*2) * 0.8 + c*0.5
  if (t%16>12) return clamp(a*b*8+b*2) * 0.8 + c*0.5 + d
  return a + b + c + e

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