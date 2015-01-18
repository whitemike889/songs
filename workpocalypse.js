var work = [ 100, 400, 200, 300 ];
var melody = [ 1, 2, 5, 1, 0, -2, 6 ];
var plucks = [ 1, 5/2, -2, 1/9, 1/3 ];
var times = [ 1, 1024, 64, 1, 1, 8064, 16, 256, 1, 32, 1024 ];

return function (t) {
  var w = work[Math.floor(t*4)%work.length];
  var tm = times[Math.floor(t/8)%times.length];
  var m = melody[Math.floor(t*tm)%melody.length];
  var x = Math.pow(2,m/12);
  var p = plucks[Math.floor(t/4)%plucks.length];
  return pluck(t%(1/2), x/p*w+sin(sin(1/40)/w), 4, sin(4)*4+1)
    + pluck(t%2,500*x,50,sin(1/4)*10+5)*2
    + pluck(t%2,100*x,15,sin(1/2)*4)*10
    + pluck(t%(1/Math.floor((t%2+1)*2))/2,w,5,sin(1/2)+1)*2
    + pluck(t%(1/2),w*(m*t%4)/2,4,sin(8+sin(1/8)*4)*2+1)*0.5
    + pluck(t%2,1200*x,8,sin(1/2)*4+5)
  ;
  function sin (x) { return Math.sin(2 * Math.PI * t * x) }
}

function pluck (t, freq, duration, steps) {
    var n = duration;
    var scalar = Math.max(0, 0.95 - (t * n) / ((t * n) + 1));
    var sum = 0;
    for (var i = 0; i < steps; i++) {
        sum += Math.sin(2 * Math.PI * t * (freq + i * freq));
    }
    return scalar * sum / 6;
}