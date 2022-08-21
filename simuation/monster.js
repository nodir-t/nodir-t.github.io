class Monster {
  constructor(ctx, color) {
    this.ctx = ctx;
    this.color = color;
    this.direction = Math.PI * 2 * (0.5 - Math.random());
    this.loc = {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    };
  }

  move() {
    const maxWidth = window.innerWidth;
    const maxHeight = window.innerHeight;

    for (
      let degreeStep = config.rotationStepDegrees;
      degreeStep <= 180;
      degreeStep++
    ) {
      const direction =
        this.direction +
        ((Math.PI * 2) / 360) * degreeStep * (0.5 - Math.random());

      const loc = {
        x: Math.max(
          0,
          Math.min(maxWidth, this.loc.x + Math.cos(direction) * config.stepSize)
        ),
        y: Math.max(
          0,
          Math.min(
            maxHeight,
            this.loc.y + Math.sin(direction) * config.stepSize
          )
        )
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
    this.fillCircle(config.radius, this.color);
    this.fillCircle(config.centerRadius, config.centerColor);
  }

  step() {
    this.move();
    this.drawMonster();
  }
}

class MonsterSet {
  constructor(ctx) {
    this.monsters = [];
    for (let i = 0; i < config.monsterCount; i++) {
      this.monsters.push(new Monster(ctx, config.colors[i]));
    }    
  }
  
  step() {
      this.monsters.forEach((m) => m.step());
  }
}

