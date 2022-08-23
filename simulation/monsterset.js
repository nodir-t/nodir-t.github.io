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
      team.monsters.push(new Monster(
        ctx, 
        team,
        {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        },
        Math.PI * 2 * (0.5 - Math.random())
      ));
      this.teams.push(team);
    }    
  }
  
  step() {
    this.teams.forEach(t => t.monsters.forEach(m => m.step()));
    this.kill();
    this.breed();
    this.teams.forEach(t => t.monsters.forEach(m => m.grow()));
  }

  breed() {
    for (const t of this.teams) {
      for (const m of t.monsters) {
        if (t.monsters.length >= config.maxMonstersPerTeam) {
          break;
        }

        const child = m.tryBreed();
        if (child != null) {
          t.monsters.push(child);
        }
      }
    }
  }

  kill() {
    const grid = new MonsterGrid(100);
    this.teams.forEach(t => t.monsters.forEach(m => grid.add(m)));

    const dead = new Set();
    this.teams.forEach(t => t.monsters.forEach(m1 => {
      if (dead.has(m1)) {
        return;
      }
      for (const m2 of grid.reachable(m1)) {
        if (dead.has(m2) || m1.team == m2.team || distance(m1.loc, m2.loc) > m1.size + m2.size) {
          // M2 is dead, or on the same team, or too far from m1.
          continue;
        }

        const [won, lost] = this.fight(m1, m2);
        dead.add(lost);
        won.maxSize += lost.maxSize / 5;
        if (lost == m1) {
          return;
        }
      }
    }));

    for (const t of this.teams) {
      t.monsters = t.monsters.filter(m => !dead.has(m));
    }
  }

  fight(m1, m2) {
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

    return [won, lost];
  }
}
