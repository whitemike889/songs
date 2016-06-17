var split = require('split2')
var baudio = require('webaudio')
var b = baudio(play)

var state = { delta: 0, data: {} }
process.stdin.pipe(split(JSON.parse)).on('data', function (msg) {
  state = msg
})

var str = null, vsum = 0, fn = null
var prevdt = null, mod = 0

b.play()

function play (t) {
  t *= 72/60
  mod = mod*0.99 + 0.01*((state.data[1] || [])[2] || 0)
  if (state.delta !== prevdt) {
    var keys = Object.keys(state.data || {})
    var str = 'return 0'
    vsum = 0
    for (var i = 0; i < keys.length; i++) {
      var k = Number(keys[i])
      if (k < 48 || k > 72) continue
      var d = state.data[k]
      var v = (d[0] - 128) / 16
      vsum += v
      str += '+synth(Math.pow(2,('+k+'-48)/12))*'+v
    }
    fn = Function(['synth'],str)
  }
  prevdt = state.delta
  return fn(synth)/Math.sqrt(vsum||1)
    + tri_(tri_(tri(50)*4,t%1/8+.75),t%(1/8)+.125)
      * (1-saw(8)-saw(4))/2 * (1-saw(1))/2 * 0.5

  function synth (x) {
    return 0
      + tri_(x*441/2+sin(441/4*x)/8,sin(mod/256)/8/8/4+2) * 0.5
      //+ tri_(sin(441/4*x)/2+tri_(tri(441*x/4)/8,sin(mod/64)/8/2),sin(2)/2/8+8)*0.1
  }
  function tri_ (x,t) { return Math.abs(1 - t % (1/x) * x * 2) * 2 - 1 }
  function tri (x) { return tri_(x,t) }
  function saw_ (x,t) { return t%(1/x)*x*2-1 }
  function saw (x) { return saw_(x,t) }
  function sin_ (x,t) { return Math.sin(2 * Math.PI * t * x) }
  function sin (x) { return sin_(x,t) }
  function sq_ (x,t) { return t*x % 1 < 0.5 ? -1 : 1 }
  function sq (x) { return sq_(x,t) }
  function clamp (x) { return Math.max(-1,Math.min(1,x)) }
}
