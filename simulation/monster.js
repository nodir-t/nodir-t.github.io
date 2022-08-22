class Monster {
  constructor(ctx, team) {
    this.ctx = ctx;
    this.team = team;
    this.direction = Math.PI * 2 * (0.5 - Math.random());
    this.loc = {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    };
    this.size = config.initialSize.random();
    this.speed = config.speed.random();
    this.resetBreedTime();
    this.initialTurnMax = config.maxTurnDegrees.random();
  }

  breed() {
    const child = new Monster(this.ctx, this.team);
    child.direction = this.direction;
    child.loc = {...this.loc};
    child.size = config.initialSize.random();
    return child;
  }

  breedTime() {
    return this.nextBreed < Date.now();
  }

  resetBreedTime() {
    this.nextBreed = Date.now() + config.breedInterval.random();
  }

  move() {
    const maxWidth = window.innerWidth;
    const maxHeight = window.innerHeight;

    for (let maxTurn = this.initialTurnMax; maxTurn <= 180; maxTurn++) {
      const direction = this.direction + Math.PI * 2 / 360 * maxTurn * (0.5 - Math.random());

      const loc = {
        x: Math.max(0, Math.min(maxWidth, 
                                this.loc.x + Math.cos(direction) * this.speed)),
        y: Math.max(0, Math.min(maxHeight,
                                this.loc.y + Math.sin(direction) * this.speed))
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
    this.fillCircle(this.size, this.team.color);
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
