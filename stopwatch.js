function stopwatch(elem) {
  var time = 0;
  var offset;
  var interval;

  function lapOn() {
    var lapTime = lap_box.appendChild(document.createElement("li"));
    lapTime.innerHTML = timeFormatter(time);
    lapTime.classList = "lapItem";
  }

  function lapOff() {
    return;
  }

  function update() {
    if (this.isOn) {
      time += delta();
      elem.textContent = timeFormatter(time);
    }
  }

  function delta() {
    var now = Date.now();
    var timePassed = now - offset;
    offset = now;
    return timePassed;
  }

  function timeFormatter(time) {
    var minutes = Math.floor(time / (60 * 1000)).toString();
    var seconds = Math.floor((time % (60 * 1000)) / 1000).toString();
    var milliseconds = (time % 1000).toString();

    if (minutes.length < 2) {
      minutes = "0" + minutes;
    }

    if (seconds.length < 2) {
      seconds = "0" + seconds;
    }

    while (milliseconds.length < 3) {
      milliseconds = "0" + milliseconds;
    }

    var result = minutes + ":" + seconds + ":" + milliseconds;
    return result;
  }

  this.start = function () {
    interval = setInterval(update.bind(this), 1);
    offset = Date.now();
    this.isOn = true;
  };

  this.stop = function () {
    clearInterval(interval);
    interval = null;
    this.isOn = false;
  };

  this.reset = function () {
    time = 0;
    lap_box.innerHTML = "";
    if (this.isOn) {
      offset = Date.now();
    }
    update();
    elem.textContent = timeFormatter(time);
  };

  this.lapOn = function () {
    lapOn();
  };

  this.lapOff = function () {
    lapOff();
  };

  this.isOn = false;
}
