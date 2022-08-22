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

function distance(a, b) {
  return Math.sqrt(
    Math.pow(Math.abs(a.x - b.x), 2) +
    Math.pow(Math.abs(a.y - b.y), 2));
}

// Standard Normal variate using Box-Muller transform.
// Returns a normal distribution from 
function randn_bm() {
  const u = 1 - Math.random();
  const v = 1 - Math.random();
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  num = num / 10.0 + 0.5; // Translate to 0 -> 1
  if (num > 1 || num < 0) return randn_bm() // resample between 0 and 1
  return num
}
