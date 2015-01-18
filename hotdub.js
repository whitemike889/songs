var melody = [ -2, -2, -1, -1, 0, 0, 3, 0, 3, 0 ];
var base = [ 12, 11 ];

var times = [ 16, 16, 16, 16 ];
var duration = times.reduce(function (sum, t) { return sum + t });
var offsets = times.reduce(function (acc, t) {
    return acc.concat((acc[acc.length-1] || 0) + t);
}, []);

return function (t) {
  var d = t % duration;
  if (d < offsets[0]) {
    return intro(t,1) * (t < 8 ? (1 - saw(1/8)) / 2 : 1)
      + (d > 11) * scrape(d > offsets[0]-1 ? 800 : 8)
    ;
  }
  else if (d < offsets[1]) {
    return intro(t + sin(t*2)/5000,1) + scrape(8);
  }
  else if (d < offsets[2]) {
    return intro(t + sin(t/8000)/40 + sin(t/80)/16000,1)
      + (d > offsets[2]-1 ? scrape(800) : 0) + scrape(8)
    ;
  }
  else { //if (d < offsets[3]) {
    return intro(t + sin(t/500)/1000 + sin(t*2)/5000,1)
      + (d > offsets[3]-1 ? scrape(800) : 0) + scrape(8)
    ;
  }
  
  function scrape (n) {
    return pre(((t%1)+10000-4)*6400,64000) * saw(n || 8) * 2
  }
  function sin (x) { return Math.sin(2 * Math.PI * t * x) }
  function saw (x, tt) { return 1 - (tt || t) % (1/x) * x * 2 }
};

function pre (t, n) {
  return intro(t / n % Math.floor(t * 4 % 16 + 1));
}

function intro (t, n) {
  var b = base[Math.floor(t/melody.length) % base.length];
  var m = Math.pow(2, melody[Math.floor(t*4) % melody.length]/b);
  return (synth(m) * 0.5 
    + synth(m * Math.floor(t % 4 + 1)) * 0.3
    + saw(m*60+1/2) * 0.3
    + synth(m*120 + sin(60)) * 0.25
  ) * (n === undefined ? (1 - saw(2)) : n);
  
  function sin (x) { return Math.sin(2 * Math.PI * t * x) }
  function saw (x) { return 1 - t % (1/x) * x * 2 }
  function synth (x) {
    var m = 120 * x;
    return sin(m) * 0.1
      + saw(m * 2) * 0.2
      + saw(m * 2 + 4) * 0.2
    ;
  }
}
