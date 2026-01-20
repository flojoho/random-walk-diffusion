const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let fps = 10;
let numberOfCrawlers = 3000;

let crawlers;

numberSlider.value = numberOfCrawlers;
numberSpan.innerText = numberOfCrawlers;
frameRateSlider.value = fps;
frameRateSpan.innerText = fps;

function reset() {
  crawlers = [];
  for(let i = 1; i <= numberOfCrawlers; i++) {
    crawlers.push({ x:0, y:0 });
  }
}

reset();

const animationLoop = function() {
  for(const crawler of crawlers) {
    switch(Math.floor(Math.random() * 5)) {
      case 0:
        crawler.x++;
        break;
      case 1:
        crawler.y++;
        break;
      case 2:
        crawler.x--;
        break;
      case 3:
        crawler.y--;
        break;
      case 4:
        // do nothing, stay in the same position
        break;
    }
  };

  const tileCounters = {};
  
  for(const crawler of crawlers) {
    const x = crawler.x;
    const y = crawler.y;

    if(typeof tileCounters[x] !== 'object') tileCounters[x] = {};
    if(typeof tileCounters[x][y] !== 'number') tileCounters[x][y] = 0;

    tileCounters[x][y]++;
  }
  
  // https://stackoverflow.com/questions/11144193/html5-translate-method-how-to-reset-to-default
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = 'hsl(0, 100%, 50%)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.scale(10, 10);

  for(const [x, row] of Object.entries(tileCounters)) {
    for(const [y, tileCount] of Object.entries(row)) {
      ctx.fillStyle = `hsl(${ tileCount * 10 }, 100%, 50%)`;
      ctx.fillRect(x, y, 1, 1);
    }
  }
}

let interval = setInterval(animationLoop, 1000/fps);

numberSlider.addEventListener('input', () => {
  numberOfCrawlers = parseInt(numberSlider.value);
  reset();

  numberSpan.innerText = numberOfCrawlers;
});

frameRateSlider.addEventListener('input', () => {
  fps = parseInt(frameRateSlider.value);
  
  clearInterval(interval);
  interval = setInterval(animationLoop, 1000/fps);

  frameRateSpan.innerText = fps;
});
