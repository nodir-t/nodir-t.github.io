
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
    this.breed();
    this.kill();
  }

  breed() {
    const counts = {};
    this.monsters.forEach(m => {
      counts[m.color] = (counts[m.color] || 0) + 1;
    });

    this.monsters.forEach(m => {
      if (m.breedTime() && counts[m.color] < config.maxMonstersPerTeam) {
        this.monsters.push(m.breed());
        counts[m.color]++;
        m.resetBreedTime();
      }
    });
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
        if (m1.color == m2.color || dead.has(m2)) {
          continue;
        }        

        if (distance(m1.loc, m2.loc) > Math.max(m1.size, m2.size)) {
          // Too far from each other.
          continue;
        }

        let killFirst = m1.size / (m1.size + m2.size) < Math.random();
        const lost = killFirst ? m1 : m2;
        const won = killFirst ? m2 : m1;
        dead.add(lost);
        won.size += lost.size * config.growthFactor;
        if (killFirst) {
          break;
        }
      }
    }

    this.monsters = this.monsters.filter(m => !dead.has(m));
  }
}
