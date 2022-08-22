
function distance(a, b) {
  return Math.sqrt(
    Math.pow(Math.abs(a.x - b.x), 2) + 
    Math.pow(Math.abs(a.y - b.y), 2));
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
    this.kill();
  }

  kill() {
    // TODO: this is O(N^2). Instead use KD-tree.

    // Walk from the end because we will be removing elements.
    const dead = new Set();
    for (let i = 0; i < this.monsters.length; i++) {
      const m1 = this.monsters[i];
      if (dead.has(m1)) {
        continue;
      }

      for (let j = i + 1; j < this.monsters.length; j++) {
        const m2 = this.monsters[j];
        if (dead.has(m2)) {
          continue;
        }        

        if (distance(m1.loc, m2.loc) > config.radius) {
          continue;
        }

        const killFirst = m1.level / (m1.level + m2.level) < Math.random();
        dead.add(killFirst ? m1 : m2);
        (killFirst ? m2 : m1).level++;
        if (killFirst) {
          break;
        }
      }
    }

    this.monsters = this.monsters.filter(m => !dead.has(m));
  }
}
