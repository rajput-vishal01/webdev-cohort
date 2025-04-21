let seconds = 0;
    let minutes = 0;
    let hours = 0;
    let intervalID;

    // Function to increment time
    function time(){
      seconds++;
      if(seconds === 60){
        seconds = 0;
        minutes++;
        if(minutes === 60){
          minutes = 0;
          hours++;
        }
      }
      displayTime();
    }

    // Function to display time
    function displayTime(){
      let formattedHours = (hours < 10) ? "0" + hours : hours;
      let formattedMinutes = (minutes < 10) ? "0" + minutes : minutes;
      let formattedSeconds = (seconds < 10) ? "0" + seconds : seconds;

      document.querySelector('.js-display').innerHTML = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }

    // Function to start the timer
    function start(){
      intervalID = setInterval(function startTime(){
        time();
      }, 1000);
      // Disable start button and enable stop button
      document.querySelector('.js-start').disabled = true;
      document.querySelector('.js-stop').disabled = false;
    }

    // Function to stop the timer
    function stop(){
      clearInterval(intervalID);
      // Enable start button and disable stop button
      document.querySelector('.js-start').disabled = false; 
      document.querySelector('.js-stop').disabled = true;
    }

    // Function to reset the timer
    function reset(){
      seconds = 0;
      minutes = 0;
      hours = 0;
      displayTime();
      // Enable both start and stop buttons
      document.querySelector('.js-start').disabled = false; 
      document.querySelector('.js-stop').disabled = false;
    }