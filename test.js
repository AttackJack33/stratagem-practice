function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const keyToArrowMap = {
  W: "&uarr;",
  A: "&larr;",
  S: "&darr;",
  D: "&rarr;",
};

let sequence = ["W", "A", "S", "D"];
let inputQueue = [];
let sequenceDisplay = document.getElementById("sequenceDisplay");
let arrowSpans;

function updateArrowStyles() {
  arrowSpans.forEach((span, index) => {
    if (index < inputQueue.length) {
      span.classList.remove("bold");
      span.classList.add("italic");
    } else if (index === inputQueue.length) {
      span.classList.add("bold");
      span.classList.remove("italic");
    } else {
      span.classList.remove("bold");
      span.classList.remove("italic");
    }
  });
}

function resetSequence() {
  sequence = shuffleArray(sequence);
  sequenceDisplay.innerHTML = sequence
    .map((key) => `<span>${keyToArrowMap[key]}</span>`)
    .join("");
  arrowSpans = sequenceDisplay.querySelectorAll("span");
  inputQueue = [];
  updateArrowStyles();
  console.log("New sequence:", sequence);
}

function increaseSequenceLength() {
  sequence.push(["W", "A", "S", "D"][Math.floor(Math.random() * 4)]);
  resetSequence();
}

function decreaseSequenceLength() {
  sequence.pop();
  resetSequence();
}

resetSequence();

window.addEventListener(
  "keydown",
  function (e) {
    const keyPressed = e.key.toUpperCase();

    if (keyPressed in keyToArrowMap) {
      inputQueue.push(keyPressed);
      updateArrowStyles();

      if (
        inputQueue.join(",") === sequence.slice(0, inputQueue.length).join(",")
      ) {
        if (inputQueue.length === sequence.length) {
          console.log("Correct sequence entered!");
          resetSequence();
        }
      } else {
        console.log("Incorrect sequence entered!");
        inputQueue = [];
        updateArrowStyles();
      }
    }
  },
  false
);
