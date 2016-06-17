var baudio = require('baudio');
var A = 442;
var b = baudio(function (t) {
    var n = Math.floor(Math.floor(t * 4) * 8/3) % 4;
    return sin(A * Math.pow(2, n / 12));
    function sin (x) { return Math.sin(2 * Math.PI * t * x) }
});
b.play();
