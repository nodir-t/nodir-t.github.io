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
  maxMonstersPerTeam: 50,

  initialMaxSize: () => new Interval(10, 30).random_norm(),
  speedFactor: () => new Interval(0.5, 2).random_norm(),
  speed: (speedFactor, size) => speedFactor / Math.pow(size, 0.2),
  circleColor: "white",
  centerRadius: 2,
  centerColor: "red",
  interval: 10,
  maxTurnDegrees: () => new Interval(2, 20).random_norm(),
  breedInterval: () => new Interval(0, 5000).random_norm(),
  regenerationInterval: () => new Interval(200, 1000).random_norm(),

  colors: [
    "red",
    "orange",
    "yellow",
    "blue",
    "purple",
  ]
};
