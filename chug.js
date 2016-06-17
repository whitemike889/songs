var gss = [
  [[100,6000],[120,4000],[100,500],[80,500]],
  [[100,800],[180,400],[160,4000],[120,5000]]
]
var rs=[[30,4],[100,10],[1,40]]
return function (t) {
  var r = rs[Math.floor(t) % rs.length]
  var gs = gss[Math.floor(t/2/4/2)%gss.length]
  var g = gs[Math.floor(t/2)%gs.length]
  var saw2 = (1-saw(2))/2, saw8 = (1-saw(8))/2
  var p = t%32>24 ? Math.sin(Math.floor(t*8))*8 : 1
  var a = clamp(sin_(sin_(1,sin(4)+1),t%1+4)
     * (saw2 + (1-saw(8))/2)) * sin(200+sin(8)/64/4) * 1.0;
  var b = clamp(sin_(sin_(1/8,sin(256)+2),t%1+4+sin(r[0]/20)*r[1]/20)
     * saw2 * (1-saw(8))/2);
  var c = clamp(sin_(sin_(1,sin(g[0])+sin(r[0]/g[1])+r[1]),t%1+g[0]/800)
     * (saw2 + saw2)) * 0.4;
  var d = clamp(sin_(
     sin_(1,sin(g[0]*p)+sin(r[0]/g[1]/4)+r[1]),
     t%1+g[0]/800
  ) * (saw2 + saw2)) * 0.4;
  var e = clamp(sin_(
     sin_(1,sin(g[0]*p*2+r[0]/r[1])+sin(r[0]/g[1]/4)+r[1]),
     t%1+g[0]/800
  ) * (saw2 + saw2)) * 0.4;
  var base = 0
    + (t % 64 > 8 ? a * b : a*0.5+b*0.7)
    + a * b * 1.0
    + c * (1-saw(4))/2 * (1-saw(16))/2 * 1.2
    + clamp(d * (1+sq(1/8))/2 * saw2 * saw8 * (t % 64 > 16 && t % 64 < 24) * 2)
    + clamp(e * (1-sq(1/8))/2 * saw8 * (t % 64 > 24 && t % 64 < 32) * 2)
  ;
  if (t % 32 > 11 && t % 32 < 13) {
    return clamp(base)*0.5 + d*2 * saw2 * saw8
  }
  else if (t % 32 > 17 && t % 32 < 22) {
    return clamp(base)*0.5 + c*2 * saw2 * saw8
  }
  return base;
  function tri (x) { return Math.abs(1 - t % (1/x) * x * 2) * 2 - 1}
  function saw (x) { return saw_(x,t) }
  function saw_ (x,t) { return t%(1/x)*x*2-1 }
  function sin (x) { return sin_(x,t) }
  function sin_ (x,t) { return Math.sin(2 * Math.PI * t * x) }
  function sq (x) { return t*x % 1 < 0.5 ? -1 : 1 }
  function clamp (x) { return Math.max(-1,Math.min(1,x)) }
}