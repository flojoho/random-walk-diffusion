const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const fps = 10;
const numberOfCrawlers = 3000;

const crawlers = [];
for(let i = 0; i < numberOfCrawlers; i++) crawlers.push({x:0, y:0})

const gameLoop = function(){
  
  for(const crawler of crawlers){
    switch(Math.floor(Math.random()*5)){
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

  let tiles = {};
  
  for(const crawler of crawlers){
    const x = crawler.x;
    const y = crawler.y;

    if(tiles[x] === undefined) tiles[x] = {};
    if(tiles[x][y] === undefined) tiles[x][y] = 0;
    tiles[x][y] += 1;
  }

  
  ctx.fillStyle = 'hsl(0, 100%, 50%)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for(const x in tiles){
    for(const y in tiles[x]){
      if(tiles[x][y] !== undefined){
        ctx.fillStyle = `hsl(${tiles[x][y]*10}, 100%, 50%)`;
        ctx.fillRect(x * 10 + canvas.width/2, y * 10 + canvas.height/2, 10, 10);
      }
    }
  }
}

setInterval(gameLoop, 1000/fps);