var melody = [ 0,0,0,0, 15,11,8,10, 0,0,0,0, 6,5,4,13, 0,0,0,0,
  -5,3,6,-2 ]
var pairs = [[300,400],[300,500],[200,300],[700,400]]
var hoedown = [0,0,0,1,0,1/4,0,200,0,1/4,0,1]

return function (t) {
  t *= 60/60
  var m = Math.pow(2,melody[Math.floor(t)%melody.length]/12)
  var p = pairs[Math.floor(t/24)%pairs.length]
  var h = hoedown[Math.floor(t/8)%hoedown.length]
  return 0
    + tri_(tri(p[0]*m)*(1-sin(1))/2+sin(p[1]*m)*(1-sin(4))/2,t%1/8+1.5)
      * (1-saw(8))/2 * (1-saw(2))/2 * 0.2
    + saw_(tri(p[0]*m/2)+saw(m*p[1]/2),t%1+h)
      * (1-saw(4)*saw(2))/2 * (1-saw(1))/2 * 0.2
    + sin_(sin(p[0]*m)+saw(p[1]*m),t*2%1/4+0)
      * (1+saw(8)*saw(4))/2 * (1-saw(8))/2 * 0.2

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