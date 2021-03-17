inlets = 1;
outlets = 1;

var N = 4; // number of validated steps required to validate a N steps serie
var minTempo = 40; // bpm
var maxTempo = 220; // bpm
var minTimeStep = 272 ; // 60000.0 / minTempo; // minimum duration for 1 step (in millisecond)
var maxTimeStep = 1500 ; // 60000.0 / maxTempo; // maximum duration for 1 step (in millisecond)
stepTimes = []; // step time array collection (get the time of each steps)

function pushTap(bang) {
  // Get time of the current detected step
  var d = new Date();
  var t = d.getTime();
  stepTimes.push(t); // put the time into the step time array collection

  // Manage time array collection according to N
  if (stepTimes.length - N > 0) {
    // remove oldest data if N unchanged (i=0 removed)
    // remove from 0 to stepTimes.length - N + 1 if new N < old N
    for (i = 0; i < stepTimes.length - N + 1; i++) {
      stepTimes.splice(i, 1);
    }
  }

  if (stepTimes.length >= N) {
    var isRangeOk_ = true;
    for (i = 1; i < N; i++) {
      if (
        stepTimes[i] - stepTimes[i - 1] < minTimeStep ||
        stepTimes[i] - stepTimes[i - 1] > maxTimeStep
      ) {
        isRangeOk_ = false; // set to false if step not valide
        break; // leave for loop
      }
    }

    if (isRangeOk_) {
      var meanDuration_ = getMeanDifference(stepTimes);
      outlet(0, meanDuration_); // output average step duration
      // stepTimes = []; // reset
    }
  }
}

function getMeanDifference(array_) {
  if (array_.length > 2) {
	var diff_ = [];
	for(i = 1; i < array_.length; i++) {
		var last1_ = array_[array_.length - 1];
		var last2_ = array_[array_.length - 2];
		diff_.push(last1_ - last2_);
	}    

    // Compute steps and half steps duration
    var mean_ = 0.0;
    for (i = 0; i < diff_.length; i++) {
      mean_ += diff_[i];
    }
    mean_ /= diff_.length;
    return mean_;
  }
}
