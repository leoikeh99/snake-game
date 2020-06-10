const draw = (board, snake) => {
  snake.forEach((array) => {
    board[array].classList.add("snake");
  });
};

const isOpposite = (dir, nextDir) => {
  if (dir === 39 && nextDir === 37) {
    return true;
  } else if (dir === 37 && nextDir === 39) {
    return true;
  } else if (dir === 40 && nextDir === 38) {
    return true;
  } else if (dir === 38 && nextDir === 40) {
    return true;
  } else {
    return false;
  }
};

const isArrow = (key) => {
  if (key === 38 || key === 39 || key === 38 || key === 37 || key === 40) {
    return true;
  } else {
    return false;
  }
};

var lastValue;
const move = (board, snake, dir, eaten, position) => {
  board[snake[0]].classList.remove("snake");
  var head = snake[snake.length - 1];
  if (!eaten) {
    snake.shift();
  }

  //directions
  if (dir === 39 && !eaten) {
    snake.push(head + 1);
    head = snake[snake.length - 1];
  } else if (dir === 37 && !eaten) {
    snake.push(head - 1);
    head = snake[snake.length - 1];
  } else if (dir === 40 && !eaten) {
    snake.push(head + 32);
    head = snake[snake.length - 1];
  } else if (dir === 38 && !eaten) {
    snake.push(head - 32);
    head = snake[snake.length - 1];
  }

  if (
    head === position + 1 ||
    head === position - 1 ||
    head === position + 32 ||
    head === position - 32
  ) {
    lastValue = snake[0];
  }

  if (dir === 39 && eaten) {
    snake.unshift(lastValue);
    head = snake[snake.length - 1];
  } else if (dir === 37 && eaten) {
    snake.unshift(lastValue);
    head = snake[snake.length - 1];
  } else if (dir === 40 && eaten) {
    snake.unshift(lastValue);
    head = snake[snake.length - 1];
  } else if (dir === 38 && eaten) {
    snake.unshift(lastValue);
    head = snake[snake.length - 1];
  }
};

var topWall = [];
for (var i = 0; i < 32; i++) {
  topWall[i] = i;
}
var bottomWall = [];
for (var i = 1; i < 32; i++) {
  bottomWall[0] = 992;
  bottomWall[i] = bottomWall[i - 1] + 1;
}
var leftWall = [];
for (var i = 1; i < 32; i++) {
  leftWall[0] = 0;
  leftWall[i] = leftWall[i - 1] + 32;
}
var rightWall = [];
for (var i = 1; i < 32; i++) {
  rightWall[0] = 31;
  rightWall[i] = rightWall[i - 1] + 32;
}

function dead(board, snake, dir, end, overlay) {
  var head = snake[snake.length - 1];
  var value = false;

  for (var i = 0; i < snake.length - 1; i++) {
    if (head === snake[i]) {
      value = true;
    }
  }

  for (var i = 0; i < 32; i++) {
    if (dir === 39 && head === rightWall[i]) {
      board[rightWall[i]].classList.remove("border");
      value = true;
    }
  }
  for (var i = 0; i < 32; i++) {
    if (dir === 37 && head === leftWall[i]) {
      board[leftWall[i]].classList.remove("border");
      value = true;
    }
  }

  for (var i = 0; i < 32; i++) {
    if (dir === 40 && head === bottomWall[i]) {
      board[bottomWall[i]].classList.remove("border");
      value = true;
    }
  }

  for (var i = 0; i < 32; i++) {
    if (dir === 38 && head === topWall[i]) {
      board[i].classList.remove("border");
      value = true;
    }
  }
  if (value) {
    end.style.animationName = "drop";
    overlay.style.display = "block";
  }
  return value;
}

const genFood = (board, snake) => {
  var array = [];
  for (var i = 0; i < 1024; i++) {
    array[i] = i;
  }

  snake.forEach((element) => {
    for (var i = 0; i < 1024; i++) {
      if (element == array[i]) {
        array.splice(i, 1);
      }
    }
  });
  topWall.forEach((element) => {
    for (var i = 0; i < 1024; i++) {
      if (element == array[i]) {
        array.splice(i, 1);
      }
    }
  });
  bottomWall.forEach((element) => {
    for (var i = 0; i < 1024; i++) {
      if (element == array[i]) {
        array.splice(i, 1);
      }
    }
  });
  leftWall.forEach((element) => {
    for (var i = 0; i < 1024; i++) {
      if (element == array[i]) {
        array.splice(i, 1);
      }
    }
  });
  rightWall.forEach((element) => {
    for (var i = 0; i < 1024; i++) {
      if (element == array[i]) {
        array.splice(i, 1);
      }
    }
  });

  var value = array[Math.floor(Math.random() * array.length)];
  board[value].classList.add("food");
  return value;
};

const eaten = (board, snake, position) => {
  var head = snake[snake.length - 1];
  if (head === position) {
    board[position].classList.remove("food");
    return true;
  } else {
    return false;
  }
};

const colorWalls = (board) => {
  topWall.forEach((element) => {
    board[element].classList.add("border");
  });
  bottomWall.forEach((element) => {
    board[element].classList.add("border");
  });
  leftWall.forEach((element) => {
    board[element].classList.add("border");
  });
  rightWall.forEach((element) => {
    board[element].classList.add("border");
  });
};
const pause = (count) => {
  if (count % 2 !== 1) {
    return true;
  } else {
    return false;
  }
};
export {
  draw,
  isOpposite,
  isArrow,
  move,
  dead,
  genFood,
  eaten,
  colorWalls,
  pause,
};
