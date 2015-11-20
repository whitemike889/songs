var ms = [2,4,-3,5,1,7]
var ns = [11,13,-4,15,7,-2,3,11]
var rates = [[1,4],[1/2,8],[1,4],[2,8],[1/4,1/2],[1/2,8],[16,1/2]]
var xs = [7,11,6,4,13,9]
var ps = [[1,0],[1,0],[1,1],[0,1],[1,1]]

return function (t) {
  t *= 72/60
  var r = rates[Math.floor(t/16) % rates.length]
  var v = rates[Math.floor(t/16*2) % rates.length]
  var m = ms[Math.floor(t/2*r[0])%ms.length]
  var xm = Math.pow(2,m/12)
  var n = ns[Math.floor(t*2*v[1])%ns.length]
  var p = ps[Math.floor(t/8)%ps.length]
  var xn = Math.pow(2,n/12)
  var x = Math.pow(2,xs[Math.floor(t*r[0])%xs.length]/12)
  var cj = sin_(sin(2000)*240,t%2+1)
    * Math.pow((t%1<.5?(1-saw_(2,t*2))/2:(1+sin(t%4>3?2:8))/2),4)
  return 0
    + saw_(xn*300+tri(1)/4+sin(8)/8,t%1+4)*(1-saw(8))/2
      * sin_(400*xn + sin(1/2)/4,t%1+4) * (1-sin(1/2))/2 * 0.4
      * (t > 4 && t % 16 < 12)
    + clamp(saw_(sin_(200*xm+sin(xm*50),t%4/4+1/2),t%(1/4)+2/3)
      * (1-saw(4))/2 * (1-saw(8))/2 * (1-saw(2))/2 * 4)*0.4
      * (t > 8 && t % 32 < 28)
    + (p[0] && t > 32 && t % 16 < 12 ? clamp(
      saw(x*100-0.32) * 0.3
      + saw(x*100+0.51) * 0.3
      + saw(x*400-0.13) * 0.3
      + saw(x*400+0.26) * 0.3
      + saw(x*200-0.12) * 0.3
      + saw_(x*200 + sin(r[1])/8/4,t%1+4)*0.75
    ) : 0) * 0.4
    + (p[1] && t > 32 && t % 16 < 12 ? clamp(
      saw_(r[1]*x+sin(100*x*r[1])/8,t%1+4)) : 0) * 0.3
    + cj * 0.5
  ;
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