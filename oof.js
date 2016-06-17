var melodies = [
  [ 4, -5, 5, -2, 8 ],
  [ 11, 7 ],
  [ 4, -5, 5, -2, 8 ],
  [ 11, 5, 13, 2, 8 ],
];
var woosh = [ 4000, 1/4, 200, 4, 800, 8 ];
var powers = [[0,4],[1000,64],[300,64],[0,1/2],[2000,8]];

return function (t) {
  var power = powers[Math.floor(t/16)%powers.length];
  var tt = t%power[1]+power[0];
  var melody = melodies[Math.floor(t/melodies[0].length)%melodies.length];
  var m = melody[Math.floor(t*4)%melody.length];
  var n = melody[Math.floor(t/2)%melody.length];
  var xm = Math.pow(2,m/12);
  var xn = Math.pow(2,n/12);
  var fn = [[sin,1/8],[tri,64],[sin,1/20],[tri,8]][Math.floor(t)%4];
  var w = woosh[Math.floor(t/2)%woosh.length];
  return 0
    + saw(200*xn) * 0.2
      * (1-saw(2))/2
    + saw(400*xm) * 0.1
      * (1-saw(4))/2
    + saw(800*xm+0.13) * 0.1
      * (1-saw(4))/2
    + saw(400*xn+fn[0](Math.pow(2,m/12)*fn[1])) * 0.2
      * (1-saw(1))/2
    + sin(sin(sin(8)))*(3-saw(8-Math.floor(t%4))*2-sin(3)*5-saw(1))/6*(1-saw(4))/2
      * (1-saw(8))/2
      * 0.5
    + sin(40
        + (sin(8*xm)+sin(w*xn)+sin(1/2))/3*saw(60)/512
        + saw(4)*saw(2)/128
        + saw(50+sin(1)/256)/128
    )
      * (1-saw(8))/2
      * 0.3
  ;
  function tri (x) { return Math.abs(1 - tt % (1/x) * x * 2) * 2 - 1}
  function saw (x) { return tt%(1/x)*x*2-1 }
  function sin (x) { return Math.sin(2 * Math.PI * tt * x) }
  function sq (x) { return tt*x % 1 < 0.5 ? -1 : 1 }
}