inlets = 1;
outlets = 1;

var trackTempo = 120.0; // bpm
var rangeTempo = 5.0;   // bpm

function pushTempo(tempo_) {
    var absDiff_ = Math.abs(trackTempo - tempo_);
    var relDiff_ = 0; // likelyhood

    if(absDiff_ <= rangeTempo) {
        relDiff_ = absDiff_ / rangeTempo;
        relDiff_ = 1 - relDiff_;
    }

    outlet(0, relDiff_); // return likelyhood [0,1]
}

function setTrackTempo(tempo_) {
    trackTempo = tempo_;
}

function setRangeTempo(tempo_) {
    rangeTempo = tempo_;
}