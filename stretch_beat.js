return function (t) {
  var phase = t % 14 < 4 ? 4000 : 7000
  if (t % 8 > 6) phase = 20000

  var ph = t % 16 > 100
   ? 20000 * (1+sin_(1/50000,t%4+phase))/2
   : phase
  ;
  return 0
    + (0
      + sin_(3,sin_(saw_(140+sin(5)/4096/(t%1),t%1+ph)/16/4,t%(1/4)+16))
        * (1-saw(8))/2
        * (1-saw(2))/2
        * 0.75
      + sin_(190,saw_(
          saw(8)/8/8*(1-sin(100+200*Math.floor(t*16%3+1))),
          t%1*sin(400)/8*(1-saw(8))/2+1/8
      )) * 0.5
        * (1-saw(8))/2
        * (1-saw(4))/2
    )
  ;
  function tri (x) { return Math.abs(1 - t % (1/x) * x * 2) * 2 - 1}
  function tri_ (x,t) { return Math.abs(1 - t % (1/x) * x * 2) * 2 - 1}
  function saw (x) { return t%(1/x)*x*2-1 }
  function saw_ (x,t) { return t%(1/x)*x*2-1 }
  function sin (x) { return Math.sin(2 * Math.PI * t * x) }
  function sin_ (x,t) { return Math.sin(2 * Math.PI * t * x) }
  function sq (x) { return t*x % 1 < 0.5 ? -1 : 1 }
}