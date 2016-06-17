var speeds = [[ 2, 4, 3 ],[ 10, 20, 12 ],[2,4,3],[50,1,20]];
var harmonics = [ 100, 200, 80, 120, 50 ];

return function (t) {
  var spd = speeds[Math.floor(t / 4 % speeds.length)];
  if (t % 30 < 4) spd = [1/2]
  else if (t % 30 < 8) spd = [2]
  var sp = spd[Math.floor(t*4 % spd.length)];
  var h = harmonics[Math.floor(t/8 % harmonics.length)];
  return 0
    + sin(100+Math.floor((saw(50+Math.floor(t*4%10+200))+1)*sp)) * 0.2
    + saw(h*10)*(1-saw(8))/2 * 0.2
    + saw(h*sp) * 0.15
    + saw(h*sp+0.23) * 0.15
    + tri(200+tri(sp)*20+tri(4)*4) * 0.15
  ;
  function tri (x) { return Math.abs(1 - t % (1/x) * x * 2) * 2 - 1}
  function saw (x) { return t%(1/x)*x*2-1 }
  function sin (x) { return Math.sin(2 * Math.PI * t * x) }
  function sq (x) { return t*x % 1 < 0.5 ? -1 : 1 }
}