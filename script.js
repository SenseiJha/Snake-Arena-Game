var fruitImage = document.createElement("img");
fruitImage.src = "fruit.png";
var trophyImage = document.createElement("img");
trophyImage.src = "trophy.png";
function init() {
    var canvas = document.getElementById('myCanvas');
    w = h = canvas.height = canvas.weight = 1000;
    pen = canvas.getContext('2d');
    fruit = randomFruitGenerator();
    gameTerminate = false;
    score = 0;
    cs = 66;

    snake = {
        in_length: 3,
        color: "black",
        cells: [],
        direction: "right",

        createSnake: function () {
            for (var i = this.in_length; i >= 0; i--) {
                this.cells.push({ x: i, y: 0 });
            }
        },

        drawSnake: function () {
            for (var i = 0; i < this.cells.length; i++) {
                pen.fillRect(this.cells[i].x, this.cells[i].y * cs, cs - 2, cs - 2);
            }
        },
        updateSnake: function () {
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;
            if (headX == this.fruit.x && headY == this.fruit.y) {
                fruit = randomFruitGenerator();
                score++;
            }
            else {
                this.cells.pop();
            }

            var nextX, nextY;

            if (this.direction == 'right') {
                nextX = headX + 1;
                nextY = headY;
            }
            else if (this.direction == 'left') {
                nextX = headX - 1;
                nextY = headY;
            }
            else if (this.direction == 'up') {
                nextX = headX;
                nextY = headY + 1;
            }
            else if (this.direction == 'down') {
                nextX = headX;
                nextY = headY - 1;
            }
            this.cells.unshift({ x: nextX, y: nextY });

            var lastX = Math.round(w / cs);
            var lastY = Math.round(h / cs);

            if (this.cells[0].x < 0 || this.cells[0].y < 0 ||
                this.cells[0].x > lastX || this.cells[0].y > lastY) {
                gameTerminate = true;
            }
        }
    };

    function keyPressed(e) {
        if (e.key == "ArrowRight") {
            snake.direction = "right";
        }
        else if (e.key == "ArrowLeft") {
            snake.direction = "left";
        }
        else if (e.key == "ArrowUp") {
            snake.direction = "up";
        }
        else if (e.key == "ArrowDown") {
            snake.direction = "down";
        }
    }
    document.addEventListener('keydown', keyPressed);
    snake.createSnake();
}

function randomFruitGenerator() {
    var fruitX = Math.round(Math.random() * (w - cs)/cs);
    var fruitY = Math.round(Math.random() * (h - cs)/cs);

    var fruit =     {
        x: fruitX,
        y: fruitY,
        color: "red"
    };

    return fruit;
}

function update() {
    snake.updateSnake();
}

function draw() {
    pen.clearRect(0,0,w,h);
    snake.drawSnake();
    pen.fillStyle = pen.color;
    pen.drawImage(fruitImage, fruit.x * cs, fruit.y * cs, cs, cs);
    pen.drawImage(trophyImage, 18, 20, cs, cs);
    pen.fillStyle = "blue";
    pen.font = "20px Roboto";
    pen.fillText(score, 50, 50);
}

function gameLoop() {
    if(gameTerminate){
        clearInterval(f);
        alert("Game Over!!!");
        alert(score);
    }
    draw();
    update();
}

init();
var f = setInterval(gameLoop,100);