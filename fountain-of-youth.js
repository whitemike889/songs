var melody = [ 180, 240, 150, 200 ]
var mod = [ 4, 5, 2, 6, 4, 8, 2 ]
var sp = [[1,2],[1/2,2],[1,2],[8,2],[1,1/2],[1,4],[1/2,1]]

return function (t) {
  t *= 72/60/4
  var z = sp[Math.floor(t/16)%sp.length]
  var m = melody[Math.floor(t*z[0])%melody.length]
  var p = mod[Math.floor(t*z[1])%mod.length]
  return 0
    + saw_(m+tri(m)*8+sin(1)/2,t%.125+0.015)
      * (2-saw(1)-saw(2))/4 * 0.7
    + saw_(m*p+sin(4)/8,t%1+1)
      * (1-sq_(p,t-0.25))/2
      * 0.5
    + clamp(sin_(tri_(tri(p*m),t%.5+.25),t%2+.5)
      * (1-saw(1))/2
      * (1-saw(2))/2 * 2) * 0.5
   + saw_(m*8 + sin(z[0])*2,t%1) * 0.5
      * (1-saw(1/2))/2
   + tri_(tri_(tri(3*m)/8/4,t%1+1),t%1+1)
      * (1-saw(2))/2 * 0.7
   + tri_(tri_(tri(m)/8/4,t%1+2),t%1+7)
      * (1-saw(1/2))/2 * 0.7

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