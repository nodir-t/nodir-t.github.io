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

  initialMaxSize: new Interval(20, 100),
  speedFactor: new Interval(5, 10),
  circleColor: "white",
  centerRadius: 2,
  centerColor: "red",
  interval: 10,
  maxTurnDegrees: new Interval(5, 30),
  breedInterval: new Interval(0, 5000),
  regenerationInterval: new Interval(200, 1000),

  colors: [
    "red",
    "orange",
    "yellow",
    "blue",
    "purple",
  ]
};
