class Team {
  constructor(color) {
    this.color = color;
    this.monsters = [];
  }
}

class MonsterSet {
  constructor(ctx) {
    this.teams = [];
    for (let i = 0; i < config.teamCount; i++) {
      const team = new Team(config.colors[i]);
      team.monsters.push(new Monster(ctx, team));
      this.teams.push(team);
    }    
  }
  
  step() {
    this.teams.forEach(t => t.monsters.forEach(m => m.step()));

    this.kill();
    this.breed();
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
    
            if (distance(m1.loc, m2.loc) > Math.max(m1.size, m2.size)) {
              // Too far from each other.
              continue;
            }
    
            let firstWins = m1.size / (m1.size + m2.size) > Math.random();
            const won = firstWins ? m1 : m2;
            const lost = firstWins ? m2 : m1;
            dead.add(lost);
            won.size += lost.size * 0.25;
            if (!firstWins) {
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
