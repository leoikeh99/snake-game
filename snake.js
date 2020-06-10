import {
  draw,
  isOpposite,
  isArrow,
  move,
  dead,
  genFood,
  eaten,
  colorWalls,
  pause,
} from "./snakeMethods.js";

window.onload = () => {
  var board = document.querySelectorAll("#board div");
  colorWalls(board);
  var snake = [35, 36]; //initial snake
  var dir = 39; //default direction (Right)
  var position = genFood(board, snake);
  var stop = false;
  var amount = 0;
  var score = document.querySelectorAll(".score");
  var count = 1;
  var end = document.querySelector(".end");
  var overlay = document.querySelector(".overlay");

  draw(board, snake);

  var press = document.addEventListener("keydown", (e) => {
    if (e.keyCode === 32) {
      count++;
    }
  });

  var press = document.addEventListener("keydown", (e) => {
    if (pause(count)) {
      stop = dead(board, snake, dir, end, overlay);
      if (!isOpposite(dir, e.keyCode) && isArrow(e.keyCode) && !stop) {
        dir = e.keyCode;
        move(board, snake, dir, false, position);
        stop = dead(board, snake, dir, end, overlay);
        var hasEaten = eaten(board, snake, position);
        if (hasEaten && !stop) {
          move(board, snake, dir, true, position);
          position = genFood(board, snake);
        }
        if (hasEaten) {
          amount += 10;
          score.forEach((element) => {
            element.textContent = `${amount}`;
          });
        }
        draw(board, snake);
      }
    }
  });

  setInterval(() => {
    if (dead(board, snake, dir, end, overlay)) {
      dead(board, snake, dir, end, overlay);
    }
  }, 1);

  var interval = setInterval(() => {
    if (pause(count)) {
      stop = dead(board, snake, dir, end, overlay);
      dead(board, snake, dir, end, overlay);
      if (!stop) {
        move(board, snake, dir, false, position);
        var hasEaten = eaten(board, snake, position);
        if (hasEaten && !stop) {
          move(board, snake, dir, true, position);
          position = genFood(board, snake);
        }
        if (hasEaten) {
          amount += 10;
          score.forEach((element) => {
            element.textContent = `${amount}`;
          });
        }
        draw(board, snake);
      }
      if (stop) {
        dead(board, snake, dir, end, overlay);
        clearInterval(interval);
      }
    }
  }, 120);

  document.getElementById("restart").addEventListener("click", () => {
    window.location.reload();
  });
};
