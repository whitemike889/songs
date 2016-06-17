var wahs = [ 0.5, 0.8, 0.5, 1.2, 0.75, 1.75 ]
return function (t) {
  var w = wahs[Math.floor(t) % wahs.length]
  return 0
    + clamp((0
      + tri_(200+tri(4)*2,tri(1)/4+2) * tri(4)*tri(1)
      + tri_(400+tri(4),tri(1/2)/4+8)
    )*4) * 0.4
    + tri_(2+tri(1)*tri(200),t%(1/4)+0.5+w)*0.2
    + tri_(2+tri(4)*tri(100),t%1+0.5+w)*0.4
    + tri_(tri_(tri(100)+tri(202)*tri(4)/8,t%(1/2)+w),t%4+4)
      * (tri(4) + tri(2))/2 * 0.1

  function tri_ (x,t) { return Math.abs(1 - t % (1/x) * x * 2) * 2 - 1 }
  function tri (x) { return tri_(x,t) }
  function clamp (x) { return Math.max(-1,Math.min(1,x)) }
}