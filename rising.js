var melody = [ 5, 5, 5, 2, 3, -2, -20, -25, -21, -25 ];

return function (t) {
    var m = Math.pow(2, Math.floor(t*4)*3*Math.sqrt(2)/12 % 144);
    var n = Math.pow(2, 144 - Math.floor(t*8)/12 % 144);
    var x = Math.pow(2, melody[Math.floor(t * 4) % melody.length]/12);
    var w = sin(1/8) / 800;
    
    return 0
        + saw(40 * m) * 0.1 * (1 - tri(1/14)) * tri(1/48)
        + saw(120 * m * tri(m * n) * 4) * 0.1 * (1 - tri(1/24)) * tri(1/48)
        + saw(80 * n + tri(n/2)) * 0.1 * tri(1/24) * tri(1/48)
        + (0
            + saw(200 * x + w) * 0.3
            + saw(200.41 * x + w) * 0.25
            + saw(399.89 * x) * 0.1
            + saw(800.11 * x - w) * 0.2
        ) * 0.5 * (1 - tri(1/48))
    ;
    
    function sin (x) { return Math.sin(2 * Math.PI * t * x) }
    function saw (x) { return (t % 10 + 2000) % (1/x) * x * 2 - 1 }
    function tri (x) { return Math.abs(1 - t % (1/x) * x * 2) * 2 - 1}
    function sq (x) { return t*x % 1 < 0.5 ? -1 : 1 }
};
