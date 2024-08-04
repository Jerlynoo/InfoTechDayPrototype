export class Code {
  constructor(stageHeight, startX, startY, words, xGap, order) {
    this.x = startX;
    this.maxY = stageHeight;
    this.speed = 15;
    this.count = 1;
    this.fontSize = xGap;
    this.order = order;

    this.words = words;
    this.len = this.words.length;
    this.y = [];
    for (let i = 0; i < this.len; i++) {
      this.y[i] = startY;
    }
  }
  draw(ctx, n) {
    if (this.order <= n) {
      if (this.y[this.count - 1] - this.y[this.count] > this.fontSize - 1) {
        if (this.count < this.len) {
          this.count += 1;
        }
      }

      ctx.fillStyle = "#48DA72";
      ctx.font = `italic bold ${this.fontSize}px Arial, sans-serif`;
      ctx.shadowColor = "green";
      ctx.shadowBlur = 70;
      for (let i = 0; i < this.count; i++) {
        if (this.y[i] < this.maxY) {
          const word =
            this.words[i] === "."
              ? this.words[Math.floor(Math.random() * this.len)]
              : this.words[i];
          this.y[i] += this.speed;
          ctx.strokeText(word, this.x, this.y[i]);
          ctx.fillText(word, this.x, this.y[i]);
        }
      }
    }
  }
}
