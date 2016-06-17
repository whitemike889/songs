var melody = [ 90, 90, 85, 85, 70, 70, 60, 85, 85, 120, 120, 60, 60, 40, 40, 40 ];

return function (t) {
  var power = 1000 * (t % 32 > 24 && t % 32 < 28 ? 4 : 1);
  var m = melody[Math.floor(t*4+1/3)%melody.length];
  return 0
    + sinm(1/128/((t-1/3)*8%2+0.18))*0.3 * (t % 16 < 12)
    + sinm(1/128/(t*Math.floor((t-1/8)%2*2+1)%1+0.13))*0.3 * (t % 24 > 4)
    + sinm(1/64/((t-1/3)*3%3+0.1))*0.3 * (t % 8 < 7)
    + (0
      + sawm(m + sin(8)/1024/64) * (t % 24 > 4)
      + saw(m+0.13) * 0.75 * (t % 16 < 4)
      + saw(m*3+0.31) * 0.5 * (t % 16 < 5)
      + saw(m*8+0.31) * 0.5 * (t % 16 < 6)
      + sawm(m*8+1/8/((t-1/3)*64%8)) * 0.8 * (t % 64 > 16)
      + sawm(m*8+1/4/((t-1/3)*8%4)) * 1.4 * (t % 32 > 8)
    ) * 0.15
  ;
  function sinm (x) { return Math.sin(2 * Math.PI * (t%8+power) * x) }
  function tri (x) { return Math.abs(1 - t % (1/x) * x * 2) * 2 - 1}
  function saw (x) { return t%(1/x)*x*2-1 }
  function sawm (x) { return (t%8+power)%(1/x)*x*2-1 }
  function sin (x) { return Math.sin(2 * Math.PI * t * x) }
  function sq (x) { return t*x % 1 < 0.5 ? -1 : 1 }
}