inlets = 1;
outlets = 2;

var trackTempo = 120.0; // bpm
var rangeTempo = 5.0; // bpm

var minTempo = 40;
var maxTempo = 220;

var tempoTracks = []; // ordered by user
var orderTempos = []; // ordered by tempo
var outputs = []; // outputs ordered for user

function pushCurTempo(tempo_) {
  outputs = zeroArray(tempoTracks.length);

  // for (var i = 0; i < orderTempos.length - 1; i++) {
  //   if (tempo_ >= orderTempos[i] && tempo_ < orderTempos[i + 1]) {

  //   }
  // }
  outlet(0, outputs); // return array of likelyhood
}

function addTrackTempo(tempTracks_) {
  // Add tempo array
  tempoTracks.push(tempTracks_);

  // // Add to ordered tempo array
  orderTempos = [].concat(tempoTracks); // clone array and remove depedencies
  orderTempos.sort(function (a, b) {
    return a - b;
  });
  orderTempos = uniq(orderTempos); // remove double value
  orderTempos.splice(0, 0, minTempo); // insert min tempo
  orderTempos.push(maxTempo); // insert max tempo
  
  outlet(0, tempoTracks);
  outlet(1, orderTempos);
}

function uniq(a) {
  return a.sort().filter(function(item, pos, ary) {
      return !pos || item != ary[pos - 1];
  });
}

function reset() {
  tempoTracks = [];
}

function zeroArray(length_) {
  var array_ = new Array(length_);
  for(var i=0; i<length_; i++) {
    array_[i] = 0.0;
  }
  return array_ ;
}

