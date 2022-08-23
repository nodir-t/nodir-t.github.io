class Monster {
  constructor(ctx, team) {
    this.ctx = ctx;
    this.team = team;
    this.direction = Math.PI * 2 * (0.5 - Math.random());
    this.loc = {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    };
    this.maxSize = config.initialMaxSize();
    this.size = 5 * Math.random();
    this.speedFactor = zeroToTwo.random_norm();
    this.initialTurnMax = config.maxTurnDegrees();
    this.regenerationInterval = config.regenerationInterval();
    this.fertilityFactor = zeroToTwo.random_norm();
    this.resetBreedTime();
  }

  get speed() {
    return this.speedFactor * config.speed(this.size);
  }

  get fertility() {
    return this.fertilityFactor * config.ferility(this.size);
  }

  damage() {
    return new Interval(0, this.size).random();
  }

  breed() {
    const child = new Monster(this.ctx, this.team);
    child.direction = this.direction;
    child.loc = {...this.loc};
    return child;
  }

  breedTime() {
    return this.nextBreed < Date.now();
  }

  resetBreedTime() {
    this.nextBreed = Date.now() + 1000 / this.fertility;Date.now() + 10000;
  }

  move() {
    const maxWidth = window.innerWidth;
    const maxHeight = window.innerHeight;

    for (let maxTurn = this.initialTurnMax; maxTurn <= 180; maxTurn++) {
      const direction = this.direction + Math.PI * 2 / 360 * maxTurn * (1 - 2 * Math.random());

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

  drawBody() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.team.color;
    this.ctx.ellipse(this.loc.x, this.loc.y, this.size, this.size, 0, 0, Math.PI * 2);
    this.ctx.fill();
  }

  drawHealth() {
    const healthRadius = Math.min(this.size - 2, this.size * .9);
    if (healthRadius > 0) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = "black";
      this.ctx.arc(this.loc.x, this.loc.y, healthRadius, 0, 2 * Math.PI);
      this.ctx.stroke();
    }
  }

  step() {
    this.drawBody();
    this.move();
    this.drawBody();
    this.drawHealth();
  }
  
  heal() {
    if (!this.healTime) {
      this.healTime = Date.now();
    }

    if (Date.now() - this.healTime > this.regenerationInterval) {
      this.size = Math.min(this.maxSize, this.size + 1);
      this.healTime = Date.now();
    }
  }
}
