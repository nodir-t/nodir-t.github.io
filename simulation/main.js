function main() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  // Side effect: resets the canvas state.
  function updateDimensions() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  updateDimensions();

  const monsters = new MonsterSet(ctx);

  function step() {
    setTimeout(step, config.interval);
    monsters.step();
  }

  step();

  window.addEventListener("resize", () => {
    updateDimensions();
  });
}

window.addEventListener("load", main);

function random(min, max) {
  const range = (min instanceof Array) ? min : [min, max];
  return range[0] + (range[1] - range[0]) * Math.random();
}

function distance(a, b) {
  return Math.sqrt(
    Math.pow(Math.abs(a.x - b.x), 2) +
    Math.pow(Math.abs(a.y - b.y), 2));
}
