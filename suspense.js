var waves = [], last = 0, lastw = 0;
var rates = [ 2, 4, 8, 2, 256 ];

return function (t) {
  var rate = rates[Math.floor(t / 8) % rates.length];
  if (t - lastw > 8) {
    waves = waves.slice(-2);
    lastw = t;
  }
  if (t - last > 1/rate) {
    waves.push(Math.random());
    last = t;
  }
  if (waves.length > 20) waves = waves.slice(-20)
  var sum = 0;
  for (var i = 0; i < waves.length; i++) {
    sum += saw(Math.pow(2,waves[i]*8)*10  + 40);
  }
  return sum / waves.length;
  function saw (x) { return 1 - t % (1/x) * x * 2 }
}