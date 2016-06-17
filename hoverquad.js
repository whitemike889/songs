var melody = [ 200, 240, 200, 240, 200, 240, 200, 320, 280, 150, 150, 150, 150 ];
var alt = [
  100, 140, 100, 50, 80,
  100, 140, 100, 10, 120,
  100, 140, 100, 40, 45,
  100, 140, 100, 10, 100,
];

return function (t) {
  var m = melody[Math.floor(t)%melody.length];
  var a = alt[Math.floor(t*(t%16>12?2:4))%alt.length];
  return 0
   + saw_(m+Math.floor(t*4%4)/2,t)*0.3
     * (1-saw(4))/2 * (t % 32 > 8) * (1-saw(2))/2
   + saw_(m+Math.floor(t*16%8+1)/8,t%(1/Math.floor(t*4%4+1)))*0.3
     * (1-saw(8))/2 * (t % 64 > 12) * (1-saw(4))/2
   + saw_(a*8+saw(400)*8,t%(1/8))*0.15
     * (t % 128 > 24) * (1-saw(2))/2
   + sin_(sin_(sin_(sin(50+Math.floor(t/2%4+1)*5),tri(1/30)),tri(1/71)),tri(1/32))
     * (1-sin(180)*sin(140)*sin(Math.floor(1+sin(1/32)/8)))*sin(m)*0.3
   + saw_(200+tri(4)*8,t*16%(1/16))
     * sin(a*8)
     * (2-saw(8)-saw(4)*sin(8))/4*0.3
     * (1-saw(2))/2
     * (t % 8 > 2)
  ;
  function tri (x) { return tri_(x,t) }
  function tri_ (x,t) { return Math.abs(1 - t % (1/x) * x * 2) * 2 - 1 }
  function saw (x) { return saw_(x,t) }
  function saw_ (x,t) { return t%(1/x)*x*2-1 }
  function sin (x) { return sin_(x,t) }
  function sin_ (x,t) { return Math.sin(2 * Math.PI * t * x) }
  function sq (x) { return t*x % 1 < 0.5 ? -1 : 1 }
}