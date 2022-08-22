class Monster {
  constructor(ctx, color, loc) {
    this.ctx = ctx;
    this.color = color;
    this.direction = Math.PI * 2 * (0.5 - Math.random());
    this.loc = {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    };
    this.size = config.initialSize;
    this.resetBreedTime();
  }

  breed() {
    const child = new Monster(this.ctx, this.color, this.loc);
    child.loc = {...this.loc};
    child.size = config.initialSize;
    return child;
  }

  breedTime() {
    return this.nextBreed < Date.now();
  }

  resetBreedTime() {
    this.nextBreed = Date.now() + config.breedInterval * (1 + Math.random());
  }

  move() {
    const maxWidth = window.innerWidth;
    const maxHeight = window.innerHeight;

    for (let degreeStep = config.rotationStepDegrees; degreeStep <= 180; degreeStep++) {
      const direction =
        this.direction +
        ((Math.PI * 2) / 360) * degreeStep * (0.5 - Math.random());

      const loc = {
        x: Math.max(0, Math.min(maxWidth, 
                                this.loc.x + Math.cos(direction) * config.stepSize)),
        y: Math.max(0, Math.min(maxHeight,
                                this.loc.y + Math.sin(direction) * config.stepSize))
      };

      if (loc.x <= 0 || loc.x >= maxWidth || loc.y <= 0 || loc.y >= maxHeight) {
        continue;
      }

      this.direction = direction;
      this.loc = loc;
      break;
    }
  }

  fillCircle(radius, color) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.ellipse(this.loc.x, this.loc.y, radius, radius, 0, 0, Math.PI * 2);
    this.ctx.fill();
  }

  drawMonster() {
    this.fillCircle(this.size, this.color);
    this.fillCircle(config.centerRadius, config.centerColor);

    this.ctx.beginPath();
    this.ctx.strokeStyle = "grey";
    this.ctx.arc(this.loc.x, this.loc.y, this.size, 0, 2 * Math.PI);
    this.ctx.stroke();    
  }

  step() {
    this.move();
    this.drawMonster();
  }
}
