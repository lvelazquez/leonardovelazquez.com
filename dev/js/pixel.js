var PixelFX = function () {
    this.video = document.getElementById('site-player');
    this.canvas = document.getElementById('canvas-background');
    this.ctx = this.canvas.getContext('2d');
    this.ctx.mozImageSmoothingEnabled = false;
    this.ctx.webkitImageSmoothingEnabled = false;
    this.ctx.msImageSmoothingEnabled = false;
    this.ctx.imageSmoothingEnabled = false;
};

PixelFX.prototype.pixelate = function (v) {
    var size = v * 0.01, self= this;
   // self.canvas.width = window.innerWidth;
   // self.canvas.height = window.innerHeight;
    var w = self.canvas.width * size, h = self.canvas.height * size;
    self.ctx.drawImage(self.video, 0, 0, w, h);
    self.ctx.drawImage(self.canvas, 0, 0, w, h, 0, 0, self.canvas.width, self.canvas.height);
};