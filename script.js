const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const fps = 10;
const numberOfCrawlers = 3000;

const crawlers = [];
for(let i = 1; i <= numberOfCrawlers; i++){
  crawlers.push({x:0, y:0});
}

const animationLoop = function(){
  
  for(const crawler of crawlers){
    switch(Math.floor(Math.random() * 5)){
      case 0:
        crawler.x += 1;
        break;
      case 1:
        crawler.y += 1;
        break;
      case 2:
        crawler.x -= 1;
        break;
      case 3:
        crawler.y -= 1;
        break;
    }
  };

  const tileCounters = {};
  
  for(const crawler of crawlers){
    const x = crawler.x;
    const y = crawler.y;

    if(tileCounters[x] === undefined) tileCounters[x] = {};
    if(tileCounters[x][y] === undefined) tileCounters[x][y] = 0;

    tileCounters[x][y] += 1;
  }

  
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = 'hsl(0, 100%, 50%)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.translate(canvas.width/2, canvas.height/2);
  ctx.scale(10, 10);

  for(const x in tileCounters){
    for(const y in tileCounters[x]){
      ctx.fillStyle = `hsl(${ tileCounters[x][y] * 10 }, 100%, 50%)`;
      ctx.fillRect(x, y, 1, 1);
    }
  }
}

setInterval(animationLoop, 1000/fps);