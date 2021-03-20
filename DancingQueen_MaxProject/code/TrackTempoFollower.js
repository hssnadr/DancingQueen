inlets = 1;
outlets = 1;

var trackTempo = 120.0; // bpm
var minRange = 30; // bpm

var tempoTracks = []; // ordered by user
var orderTempos = []; // ordered by tempo
var outputs = []; // outputs ordered for user

function pushCurTempo(tempo_) {
  if (tempoTracks.length > 0) {
    // Prepare variables
    tempo_ = constrain(tempo_, orderTempos[0], orderTempos[orderTempos.length - 1]);
    outputs = arrayZero(tempoTracks.length);

    // Set ratio output values
    for (var i = 0; i < orderTempos.length - 1; i++) {
      if (tempo_ >= orderTempos[i] && tempo_ <= orderTempos[i + 1]) {
        for (var j = 0; j < tempoTracks.length; j++) {
          // Lower tempo value
          if (tempoTracks[j] == orderTempos[i]) {
            outputs[j] = (tempo_ - orderTempos[i]) / (orderTempos[i + 1] - orderTempos[i]);
            outputs[j] = 1 - outputs[j];
          }

          // Upper tempo value
          if (tempoTracks[j] == orderTempos[i+1]) {
            outputs[j] = (orderTempos[i+1] - tempo_) / (orderTempos[i+1] - orderTempos[i]);
            outputs[j] = 1 - outputs[j];
          }
        }

        break;
      }
    }

    outlet(0, outputs); // return array of likelyhood
  }
}

function addTrackTempo(tempTracks_) {
  // Add tempo array
  tempoTracks.push(tempTracks_);

  // // Add to ordered tempo array
  orderTempos = [].concat(tempoTracks); // clone array
  orderTempos = uniq(orderTempos); // remove double value
  orderTempos.sort(function (a, b) { return a - b; }); // sort tempos min -> max
  orderTempos.splice(0, 0, orderTempos[0] - minRange); // insert min tempo
  orderTempos.push(orderTempos[orderTempos.length - 1] + minRange); // insert max tempo
}

////////////////////////////////
////////// UTILITIES ///////////
////////////////////////////////

function uniq(array_) {
  return array_.sort().filter(function (item, pos, ary) {
    return !pos || item != ary[pos - 1];
  });
}

function reset() {
  tempoTracks = [];
}

function arrayZero(length_) {
  var array_ = new Array(length_);
  for (var i = 0; i < length_; i++) {
    array_[i] = 0.0;
  }
  return array_;
}

function constrain(val, min, max) {
  return val < min ? min : (val > max ? max : val);
}

