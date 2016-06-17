var melody = [3,3,-1,-1,8,9,5,5,5,5,6]
var phase = [.07,.11,.04,.08,.13,.03]
var base = [1,-5,2,8]

return function (t) {
  t *= 72/60
  var m = Math.pow(2,melody[Math.floor(t)%melody.length]/12)
  var n = Math.pow(2,melody[Math.floor(t/2)%melody.length]/12)
  var p = phase[Math.floor(t/8)%phase.length]
  var b = Math.pow(2,base[Math.floor(t)%base.length]/12)
  return 0
    + sin_(2000+sin(1/4)*8*(3+sin(1/8))/4,t%4/8+1)
      * (1-sq(6))/2 * sin_(240+sin(200),t%4/8+sin(400)/8/8/4)
      * (1-saw(4)*0.6-saw(2)*0.3-saw_(1,t-0.05)*0.4)/2 * 0.3
    + (sin_(200.41*m+tri(200.62*m)*4,t%1/8/4+p)
      * 0.4+saw(200.15*m)*0.1+saw(199.85*m)*0.1) * 0.6
    + tri_(tri_(tri(100*n)/8,t%1/8+.2),t*2%2/4+4)
      * (1-saw(2)*0.3-saw(1/2)*0.6)/2 * 0.8
    + tri_(tri_(tri(600.29*b)/8,t%2/4+.2),t%1/2+.6+p)
      * (1-saw(1/2))/2 * 0.4

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