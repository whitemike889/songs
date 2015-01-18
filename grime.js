var n
//var melody = [ 0, -1, -3, -5,-7,-8,-10,-12 ]  // reverse DoSiLaSoFaMiReDo
//var melody = [ 0, 2, 4, 5,7,9,11,12 ]  //DoReMiFaSoLaSi
 var melody =[
     34, 4, n, 4, n, 0, 4, n, 7, n, n, n, -5, n, n, n,
     0,n,n,-5,n,n,-8,n,n,-3,n,-1,n,-2,-3,n,-5,4,n,7,9,n,5,7,n,4,n,0,2,-1,n,n,n,
     0,n,n,-5,n,n,-8,n,n,-3,n,-1,n,-2,-3,n,-5,4,n,7,9,n,5,7,n,4,n,0,2,-1,n,n,n,
     n,-5,7,6,5,3,n,4,n,-5,-3,0,0,-3,0,2,n,n,n,7,6,5,3,n,4,n,n,12,n,12,12,n,n,n,n,
     n,n,7,6,5,3,n,4,n,-5,-3,0,n,-3,0,2,n,n,3,n,n,2,n,n,0,n,n,-5,-5,n,-12,n,
     0,0,n,0,n,0,2,n,4,0,n,-3,-5,n,n,n,
     0,0,n,0,n,0,2,n,4,n,n,n,n,n,n,n,
     0,0,n,0,n,0,2,n,4,0,n,-3,-5,n,n,n
]
var interval = 9
var feq = 260
return function (t) {
    
    var m =note(t);
    return sin(m * feq)*2;
    function sin (x) { return Math.sin(2 * Math.PI * t * x) }
    
    function note(x) {
        var index =melody[Math.floor(x*interval) % melody.length];
        if (index == null) return
            return Math.pow(2, index / 12)
            }
    
}