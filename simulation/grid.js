
class MonsterGrid {
    grid = {}
  
    constructor(squareSize) {
      this.squareSize = squareSize;
    }
  
    key(cell) {
      const [x, y] = cell;
      return `${x}:${y}`;
    }
    cell(loc) {
      return [Math.floor(loc.x / this.squareSize), Math.floor(loc.y / this.squareSize)];
    }
  
    add(monster) {
      const key = this.key(this.cell(monster.loc));
      this.grid[key] = this.grid[key] || [];
      this.grid[key].push(monster);
    }
  
    *reachable(monster) {
      const [centerRow, centerCol] = this.cell(monster.loc);
      const diameter = 2 * Math.ceil(monster.size / this.squareSize);
      for (let i = -diameter; i <= diameter; i++) {
        for (let j = -diameter; j <= diameter; j++) {
          const key = this.key([centerRow + i, centerCol + j]);
          for (let another of this.grid[key] || []) {
            if (monster !== another) {
              yield another;
            }
          }
        }
      }
    }
  }
  