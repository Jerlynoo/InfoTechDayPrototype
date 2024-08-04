import { Code } from "./code.js";

class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);

    this.scale = 2;
    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    this.n = 0;
    const words =
      'ゃゅノハフこちヱアセシ仕ご大"ッ  ラね:8エホカ33引  ちはト28>主ロミナ秋そ49司コ ヱM日づワヘフエ点81Zンガンのグーリンダ  イのポン ポコピーのポン+コナーのシューリンガンのタセムリ:のひ0';
    this.length = 40;
    this.xGap = this.stageWidth / this.length;
    this.code = [];
    let startX = 0;
    for (let i = 0; i < this.length; i++) {
      const order = i === 20 ? 0 : Math.floor(Math.random() * 10 + 1);
      const startY =
        order < 6 ? 0 : Math.floor((Math.random() * this.stageHeight) / 2);
      const len = order < 7 ? 40 : 5;
      const randomWords = this.createWord(words, len);
      this.code[i] = new Code(
        this.stageHeight,
        startX,
        startY,
        randomWords,
        this.xGap,
        order
      );
      startX += this.xGap;
    }
    requestAnimationFrame(this.animate.bind(this));
    // let timerId = setInterval(this.animate.bind(this), 50);
    // setTimeout(() => {
    //   clearInterval(timerId);
    // }, 8000);
  }

  createWord(words, len) {
    let randomWords = [];
    for (let i = 0; i < len; i++) {
      const p = Math.random();
      if (p < 0.2) {
        randomWords[i] = ".";
      } else {
        randomWords[i] = words[Math.floor(Math.random() * len)];
      }
    }
    return randomWords;
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * 2;
    this.canvas.height = this.stageHeight * 2;

    this.ctx.scale(this.scale, this.scale);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    if (this.n > 9) {
      this.canvas.width = this.stageWidth * 2;
      this.canvas.height = this.stageHeight * 2;
      this.scale += 0.01;
      this.ctx.scale(this.scale, this.scale);
    }
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    for (let i = 0; i < this.length; i++) {
      this.code[i].draw(this.ctx, this.n);
    }
    this.n += 0.2;
  }
}

window.onload = () => {
  new App();
};
