var ms = [ 400, 500, 900, 800, 600, 700, 1000 ]

return function (t) {
  var m = ms[Math.floor(t/4)%ms.length]
  return 0
    + sin_(sin(40)/8+sin(200)/8/8+sin(1/8)/8/4,sin(1)/8/8/2+40)
      * (0.3+(1+sin(1/4))/2*0.7)*sin(2)*0.2
    + sin(200+sin(1/8)/8/2+sin(200)/8/8/8/2)*0.2
    + sin_(sin(8),(sin(1/2)+sin(4))*4+8) * 0.1
    + sin(4*m*(1+sin(1)/8/8/8/8)/2
      + sin(8)/8/8/2 + sin(1/4)/8/8)*sin(8)*0.1
    + sin_(sin_(sin(m),t%1+2),t%1+8)
      * (1-sin(1/2)*0.5+sin(8)*0.5)*0.2

  function sin_ (x,t) { return Math.sin(2 * Math.PI * t * x) }
  function sin (x) { return sin_(x,t) }
}