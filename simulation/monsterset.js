class Team {
  constructor(color) {
    this.color = color;
    this.monsters = [];
  }
}

class MonsterSet {
  constructor(ctx) {
    this.teams = [];
    for (const color of config.colors) {
      const team = new Team(color);
      team.monsters.push(new Monster(ctx, team));
      this.teams.push(team);
    }    
  }
  
  step() {
    this.teams.forEach(t => t.monsters.forEach(m => m.step()));
    this.kill();
    this.breed();
    this.teams.forEach(t => t.monsters.forEach(m => m.heal()));
  }

  breed() {
    for (const t of this.teams) {
      for (const m of t.monsters) {
        if (t.monsters.length >= config.maxMonstersPerTeam) {
          break;
        }

        if (!m.breedTime()) {
          continue;
        }

        m.resetBreedTime();
        t.monsters.push(m.breed());
      }
    }
  }

  kill() {
    // TODO: this is O(N^2). Instead use KD-tree.

    // Walk from the end because we will be removing elements.
    const dead = new Set();
    for (let i = 0; i < this.teams.length; i++) {
      const t1 = this.teams[i];
      for (const m1 of t1.monsters) {
        if (dead.has(m1)) {
          continue;
        }

        for (let j = i + 1; j < this.teams.length; j++) {
          const t2 = this.teams[j];

          for (const m2 of t2.monsters) {
            if (dead.has(m2)) {
              continue;
            }
    
            if (distance(m1.loc, m2.loc) > m1.size + m2.size) {
              // Too far from each other.
              continue;
            }
    
            // Who hits first?
            const [hitsFirst, hitsSecond] = m1.speed / (m1.speed + m2.speed) > Math.random()
              ? [m1, m2] : [m2, m1];
            let lost;
            let won;
            // Fight until death.
            while (true) {
              // First one hits.
              hitsSecond.size -= hitsFirst.damage();
              if (hitsSecond.size <= 0) {
                won = hitsFirst;
                lost = hitsSecond;
                break;
              }

              // Second one hits.
              hitsFirst.size -= hitsSecond.damage();
              if (hitsFirst.size <= 0) {
                won = hitsSecond;
                lost = hitsFirst;
                break;
              }
            }
 
            dead.add(lost);
            won.maxSize += lost.maxSize / 5;
            if (lost == m1) {
              break;
            }
          }

          if (dead.has(m1)) {
            break;
          }
        }
            
      }
    }

    for (const t of this.teams) {
      t.monsters = t.monsters.filter(m => !dead.has(m));
    }    
  }
}
