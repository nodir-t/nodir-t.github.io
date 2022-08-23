class Interval {
  constructor(min, max) {
    this.min = min;
    this.max = max;
  }

  random() {
    return this.min + (this.max - this.min) * Math.random();
  }

  random_norm() {
    return this.min + (this.max - this.min) * randn_bm();
  }
}

const zeroToTwo = new Interval(0, 2);

const config = {
  maxMonstersPerTeam: 100,

  initialMaxSize: () => new Interval(10, 30).random_norm(),
  speed: (size) => 4 / Math.pow(size, 0.2),
  circleColor: "white",
  centerRadius: 2,
  centerColor: "red",
  interval: 10,
  maxTurnDegrees: () => new Interval(2, 20).random_norm(),
  ferility: (size) => Math.pow(size/10, 0.5),
  regenerationInterval: 1000,
  initialTurnMax: 7,

  colors: [
    "red",
    "orange",
    "yellow",
    "blue",
    "purple",
  ]
};
