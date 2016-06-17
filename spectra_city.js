return function (t) {
  var sh = t % 64 < 12 ? t % 8 : Math.floor(10 + (1+sin(1/16))*20)
  var tone = sin(300 + tri(1/4)/8 + tri(1/8)/8/2) * 0.4
  var ph = sin_(sin(20)/8/4/(t/8%(2/8)+1/8),t%1+sh)
  var tt = t*4 % 4 + 40
  var beat = clamp(sin_(4+sin(400)/8/2/4+sin(4)/4/8/8+saw(40)/4/4,tt+80)
   * (1-saw(1/2))/2 * (3-sin(19))/2) * (2-saw(8)-saw(2))/6
  var melt = t % 32 > 24
    ? saw_(t%8/2+200,t%8+1000)*4
    : tri_(1/8,t%4+40)/4 + (1-sq(1/16))/2 * tri_(200,t%4+80)/4

  return 0
    + tone * ph * 0.5
    + (clamp(sin(1/64)*2)+1)/2 * beat * 0.2
    + saw_(200+saw(t%4<1?4:1)/4+melt,t%1+8)
      * (t % 32 > 24 ? 0.3 : 0.2)
      * clamp(sin(1/2)+sin(4))/2

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