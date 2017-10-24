document.addEventListener('DOMContentLoaded', function () { 

  // Fires any time the sequencer steps to the next column, in sequece mode. 
  // The event data is an array containing all values in the column, top first. 
  triangleSequencer.on('step',function(e) {
    for (let i=0; i<5; i++) {
      if (e[i]) {
        playTriangle(triangleSynthNotes[i]) 
      }
    }
  });

  sawtoothSequencer.on('step',function(e) {
    for (let i=0; i<3; i++) {
      if (e[i]) {
        playSaw(sawSynthNotes[i]) 
      }
    }
  });

  noiseSequencer.on('step',function(e) {
    for (let i=0; i<1; i++) {
      if (e[i]) {
        playNoise();
      }
    }
  });
  
  play.on('change',function(e) {
    if (e) {
      triangleSequencer.start();
      sawtoothSequencer.start();
      noiseSequencer.start(); 
    } else {
      triangleSequencer.stop();
      triangleSequencer.stepper.value = 15;
      sawtoothSequencer.stop();
      sawtoothSequencer.stepper.value = 7;
      noiseSequencer.stop();
      noiseSequencer.stepper.value = 15;
    }
  });

  clear.on('change', function(e) {
    clearSequencer();
  });

  function clearSequencer() {
    clearTriangleSequencer();
    clearSawtoothSequencer();
    clearNoiseSequencer();
  };

  function playTriangle(note, duration="16n") {
    triangleSynth.triggerAttackRelease(note, duration);
  };

  function playSaw(note, duration="8n") {
    sawSynth.triggerAttackRelease(note, duration);
  };

  function playNoise() {
    noiseSynth.triggerAttackRelease("16n");
  }

  function clearTriangleSequencer() {
    const matrix = triangleSequencer.matrix.pattern;
    for(let row=0; row<matrix.length; row++) {
      for(let col=0; col<matrix[row].length; col++) {
        if (matrix[row][col] === true) {
          triangleSequencer.matrix.toggle.cell(col, row); 
        }
      }
    }
  }

  function clearSawtoothSequencer() {
    const matrix = sawtoothSequencer.matrix.pattern;
    for(let row=0; row<matrix.length; row++) {
      for(let col=0; col<matrix[row].length; col++) {
        if (matrix[row][col] === true) {
          sawtoothSequencer.matrix.toggle.cell(col, row); 
        }
      }
    }
  }

  function clearNoiseSequencer() {
    const matrix = noiseSequencer.matrix.pattern;
    for(let row=0; row<matrix.length; row++) {
      for(let col=0; col<matrix[row].length; col++) {
        if (matrix[row][col] === true) {
          noiseSequencer.matrix.toggle.cell(col, row); 
        }
      }
    }
  }

  function loadAshesTune() {
    clearSequencer();

    triangleSequencer.matrix.toggle.cell(1,4);
    triangleSequencer.matrix.toggle.cell(4,4);
    triangleSequencer.matrix.toggle.cell(7,4);
    triangleSequencer.matrix.toggle.cell(10,4);
    triangleSequencer.matrix.toggle.cell(13,4);

    sawtoothSequencer.matrix.toggle.cell(0,0);
    sawtoothSequencer.matrix.toggle.cell(3,0);
    sawtoothSequencer.matrix.toggle.cell(1,1);
    sawtoothSequencer.matrix.toggle.cell(4,1);
    sawtoothSequencer.matrix.toggle.cell(6,1);
    sawtoothSequencer.matrix.toggle.cell(2,2);
    sawtoothSequencer.matrix.toggle.cell(5,2);
    sawtoothSequencer.matrix.toggle.cell(7,2);

    noiseSequencer.matrix.toggle.cell(2,0);
    noiseSequencer.matrix.toggle.cell(6,0);
    noiseSequencer.matrix.toggle.cell(10,0);
    noiseSequencer.matrix.toggle.cell(14,0);
  };

  loadAshesTune(); // toggle to load Ashe's song on page load 
  


});