return function (t) {
  return 0
    + dr(t%2+1)
    + dr(t%1+1)*0.4
    + dr(t%(t/2%2<1?4:1/8)+1000)*(1-saw(4))*0.3
  ;
  function saw (x) { return t%(1/x)*x*2-1 }
  function sin (x) { return Math.sin(2 * Math.PI * t * x) }
}

function dr (t) {
  return sin(sin(sin(8)))
    * (3-saw(8-Math.floor(t%1))*2-sin(2+Math.floor(t%(1/2))*2) * (6-saw(4)))/6
    * (1-saw(3))/2
    * (1-saw(8))/2
    * 0.5
  ;
  function saw (x) { return t%(1/x)*x*2-1 }
  function sin (x) { return Math.sin(2 * Math.PI * t * x) }
}