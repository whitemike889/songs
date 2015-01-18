var melody = [ 0, 12, -12, 32 ];
var speed = [ 1, 40, 20, 10, 80, 10];

return function (t) {
  t += 1000;
  var sp = speed[Math.floor(t*4) % speed.length];
  var m0 = Math.pow(2,melody[Math.floor(t*2) % melody.length]/12);
  var m1 = Math.pow(2,melody[Math.floor(t) % melody.length]/12);
  var xm0 = Math.round(m0*240*80)/80;
  var xm1 = Math.round(m1*240*80)/80;
  
  return 0
   + tri(200 + tri(xm0)*8) * 0.3 * tri(1/24)
   + tri(200.01 + tri(xm1)) * 0.2 * tri(1/41)
   + tri(199.31 + tri(xm0)*50) * 0.2 * tri(1/31)
   + tri(199.31 + tri(xm1)*200) * 0.2 * tri(1/23)

   + tri(240.01 + saw(8000.1)*80*tri_(1/10000,tri(1/2)+120)) * 0.4
   + tri(40.01 + tri(9.5)*10.05) * 0.2 * tri(1/37)
   + tri(110.01 + tri(5)*29.4) * 0.3 * tri(1/45)
   + tri(130.01 + tri(10.9)*41.2) * 0.2 * tri(1/82)

   + tri(3000.01 + tri(10.9)*4) * 0.2 * tri(1/10)

   + tri(240.01 + saw(8000.1)*80*tri_(1/10000,tri(1/2)+120))*0.3
     * sin(sp*8) * tri(1/16)
  
   + tri(240.01 + saw(8000.1)*80*tri_(1/10000,tri(1/2)+120))*0.4
     * sin(20 + tri(sp*8)*4)
  ;
  function tri (x) { return Math.abs(1 - t % (1/x) * x * 2) * 2 - 1}
  function tri_ (x,t) { return Math.abs(1 - t % (1/x) * x * 2) * 2 - 1}
  function saw (x) { return t%(1/x)*x*2-1 }
  function sin (x) { return Math.sin(2 * Math.PI * t * x) }
}