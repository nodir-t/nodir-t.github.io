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
