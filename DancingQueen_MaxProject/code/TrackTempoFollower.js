inlets = 1;
outlets = 2;

var trackTempo = 120.0; // bpm
var rangeTempo = 5.0; // bpm

var minTempo = 40;
var maxTempo = 220;

var tempoTracks = []; // ordered by user
var orderTempos = [minTempo, maxTempo]; // ordered by tempo
var orderOutput = []; // outputs ordered by tempo
var outputs = []; // outputs ordered for user

function pushCurTempo(tempo_) {
    // for()

  for (var i = 0; i < orderTempos.length - 1; i++) {
    if (tempo_ >= orderTempos[i] && tempo_ < orderTempos[i + 1]) {

    }
  }

  outlet(0, outputs); // return array of likelyhood
}

function addTrackTempo(tempTracks_) {
  // Add tempo array
  tempoTracks.push(tempTracks_);

  // Add to ordered tempo array
  orderTempos = tempoTracks.sort(function (a, b) {
    return a - b;
  });
  orderTempos.splice(0, 0, minTempo); // insert min tempo
  orderTempos.push(maxTempo); // insert max tempo
//   orderTempos = [...new Set(orderTempos)]; // remove double value

  outlet(0, tempoTracks);
  outlet(1, orderTempos);
}

function resetsdf() {
    tempoTracks = [];
    orderTempos = [minTempo, maxTempo];
}