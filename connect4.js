/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
class Game {
  constructor(p1, p2, HEIGHT = 6, WIDTH = 7) {
    this.players = [p1, p2];
    this.WIDTH = WIDTH;
    this.HEIGHT = HEIGHT;
    this.currPlayer = p1;
    this.makeBoard();
    this.makeHtmlBoard();
    this.gameOver = false;
  }

  makeBoard() {
    this.board = [];
    for (let y = 0; y < this.HEIGHT; y++) {
      this.board.push(Array.from({ length: this.WIDTH }));
    }
  }

  makeHtmlBoard() {
    const board = document.getElementById("board");
    board.innerHTML = "";

    // make column tops (clickable area for adding a piece to that column)
    const top = document.createElement("tr");
    top.setAttribute("id", "column-top");

    this.handleGameClick = this.handleClick.bind(this);

    top.addEventListener("click", this.handleGameClick);

    for (let x = 0; x < this.WIDTH; x++) {
      const headCell = document.createElement("td");
      headCell.setAttribute("id", x);
      top.append(headCell);
    }

    board.append(top);

    // make main part of board
    for (let y = 0; y < this.HEIGHT; y++) {
      const row = document.createElement("tr");

      for (let x = 0; x < this.WIDTH; x++) {
        const cell = document.createElement("td");
        cell.setAttribute("id", `${y}-${x}`);
        row.append(cell);
      }

      board.append(row);
    }
  }

  findSpotForCol(x) {
    for (let y = this.HEIGHT - 1; y >= 0; y--) {
      if (!this.board[y][x]) {
        return y;
      }
    }
    return null;
  }

  placeInTable(y, x) {
    const piece = document.createElement("div");
    piece.classList.add("piece");
    piece.style.backgroundColor = this.currPlayer.color;
    piece.style.top = -50 * (y + 2);

    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }

  endGame(msg) {
    const alertButton = document.querySelector(".custom-alert-button");
    const customAlert = document.querySelector(".custom-alert");
    const customAlertBody = document.querySelector(".custom-alert-body");
    const parentElement = document.querySelector("body");
    const overlay = document.createElement("div");

    // show the alert
    const myTimer = setTimeout(() => {
      customAlert.style.display = "block";
      customAlert.style.zIndex = 2;
      customAlertBody.innerText = msg.toUpperCase();
      parentElement.append(overlay);
      this.makeConffeti();
    }, 500);

    overlay.style.position = "fixed";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
    overlay.style.zIndex = 1;

    // hide the alert when the button is clicked
    alertButton.addEventListener("click", function () {
      customAlert.style.display = "none";
      parentElement.removeChild(overlay);
      clearTimeout(myTimer);
    });
  }

  handleClick(evt) {
    // get x from ID of clicked cell
    const x = +evt.target.id;

    // get next spot in column (if none, ignore click)
    const y = this.findSpotForCol(x);
    if (y === null) {
      return;
    }

    // place piece in board and add to HTML table
    this.board[y][x] = this.currPlayer;
    this.placeInTable(y, x);

    // check for tie
    if (this.board.every((row) => row.every((cell) => cell))) {
      return this.endGame("Tie!");
    }

    // check for win
    if (this.checkForWin()) {
      this.gameOver = true;
      return this.endGame(`The ${this.currPlayer.color} player won!`);
    }

    const playerTurn = document.getElementById("player-turn");

    this.currPlayer === this.players[1]
      ? (this.currPlayer = this.players[0])
      : (this.currPlayer = this.players[1]);

    if (this.players[0] === this.currPlayer) {
      playerTurn.innerText = `YOUR TURN ${this.currPlayer.color.toUpperCase()} PLAYER`;
      playerTurn.style.borderColor = this.currPlayer.color;
      playerTurn.style.boxShadow = `0px 0px 10px -3px ${this.currPlayer.color}`;
    }
    if (this.players[1] === this.currPlayer) {
      playerTurn.innerText = `YOUR TURN ${this.currPlayer.color.toUpperCase()} PLAYER`;
      playerTurn.style.borderColor = this.currPlayer.color;
      playerTurn.style.boxShadow = `${this.currPlayer.color} 0px 0px 10px -3px`;
    }
  }

  // Michael Beckius CODEPEN
  // Michael Beckius CODEPEN
  // Michael Beckius CODEPEN
  // Michael Beckius CODEPEN
  // https://codepen.io/bananascript/pen/EyZeWm
  makeConffeti() {
    // Globals
    var random = Math.random,
      cos = Math.cos,
      sin = Math.sin,
      PI = Math.PI,
      PI2 = PI * 2,
      timer = undefined,
      frame = undefined,
      confetti = [];

    var particles = 10,
      spread = 40,
      sizeMin = 3,
      sizeMax = 12 - sizeMin,
      eccentricity = 10,
      deviation = 100,
      dxThetaMin = -0.1,
      dxThetaMax = -dxThetaMin - dxThetaMin,
      dyMin = 0.13,
      dyMax = 0.18,
      dThetaMin = 0.4,
      dThetaMax = 0.7 - dThetaMin;

    var colorThemes = [
      function () {
        return color(
          (200 * random()) | 0,
          (200 * random()) | 0,
          (200 * random()) | 0
        );
      },
      function () {
        var black = (200 * random()) | 0;
        return color(200, black, black);
      },
      function () {
        var black = (200 * random()) | 0;
        return color(black, 200, black);
      },
      function () {
        var black = (200 * random()) | 0;
        return color(black, black, 200);
      },
      function () {
        return color(200, 100, (200 * random()) | 0);
      },
      function () {
        return color((200 * random()) | 0, 200, 200);
      },
      function () {
        var black = (256 * random()) | 0;
        return color(black, black, black);
      },
      function () {
        return colorThemes[random() < 0.5 ? 1 : 2]();
      },
      function () {
        return colorThemes[random() < 0.5 ? 3 : 5]();
      },
      function () {
        return colorThemes[random() < 0.5 ? 2 : 4]();
      },
    ];
    function color(r, g, b) {
      return "rgb(" + r + "," + g + "," + b + ")";
    }

    // Cosine interpolation
    function interpolation(a, b, t) {
      return ((1 - cos(PI * t)) / 2) * (b - a) + a;
    }

    // Create a 1D Maximal Poisson Disc over [0, 1]
    var radius = 1 / eccentricity,
      radius2 = radius + radius;
    function createPoisson() {
      // domain is the set of points which are still available to pick from
      // D = union{ [d_i, d_i+1] | i is even }
      var domain = [radius, 1 - radius],
        measure = 1 - radius2,
        spline = [0, 1];
      while (measure) {
        var dart = measure * random(),
          i,
          l,
          interval,
          a,
          b,
          c,
          d;

        // Find where dart lies
        for (i = 0, l = domain.length, measure = 0; i < l; i += 2) {
          (a = domain[i]), (b = domain[i + 1]), (interval = b - a);
          if (dart < measure + interval) {
            spline.push((dart += a - measure));
            break;
          }
          measure += interval;
        }
        (c = dart - radius), (d = dart + radius);

        // Update the domain
        for (i = domain.length - 1; i > 0; i -= 2) {
          (l = i - 1), (a = domain[l]), (b = domain[i]);
          // c---d          c---d  Do nothing
          //   c-----d  c-----d    Move interior
          //   c--------------d    Delete interval
          //         c--d          Split interval
          //       a------b
          if (a >= c && a < d)
            if (b > d) domain[l] = d; // Move interior (Left case)
            else domain.splice(l, 2);
          // Delete interval
          else if (a < c && b > c)
            if (b <= d) domain[i] = c; // Move interior (Right case)
            else domain.splice(i, 0, c, d); // Split interval
        }

        // Re-measure the domain
        for (i = 0, l = domain.length, measure = 0; i < l; i += 2)
          measure += domain[i + 1] - domain[i];
      }

      return spline.sort();
    }

    // Create the overarching container
    var container = document.createElement("div");
    container.style.position = "fixed";
    container.style.top = "0";
    container.style.left = "0";
    container.style.width = "100%";
    container.style.height = "0";
    container.style.overflow = "visible";
    container.style.zIndex = "9999";

    // Confetto constructor
    function Confetto(theme) {
      this.frame = 0;
      this.outer = document.createElement("div");
      this.inner = document.createElement("div");
      this.outer.appendChild(this.inner);

      var outerStyle = this.outer.style,
        innerStyle = this.inner.style;
      outerStyle.position = "absolute";
      outerStyle.width = sizeMin + sizeMax * random() + "px";
      outerStyle.height = sizeMin + sizeMax * random() + "px";
      innerStyle.width = "100%";
      innerStyle.height = "100%";
      innerStyle.backgroundColor = theme();

      outerStyle.perspective = "50px";
      outerStyle.transform = "rotate(" + 360 * random() + "deg)";
      this.axis =
        "rotate3D(" + cos(360 * random()) + "," + cos(360 * random()) + ",0,";
      this.theta = 360 * random();
      this.dTheta = dThetaMin + dThetaMax * random();
      innerStyle.transform = this.axis + this.theta + "deg)";

      this.x = window.innerWidth * random();
      this.y = -deviation;
      this.dx = sin(dxThetaMin + dxThetaMax * random());
      this.dy = dyMin + dyMax * random();
      outerStyle.left = this.x + "px";
      outerStyle.top = this.y + "px";

      // Create the periodic spline
      this.splineX = createPoisson();
      this.splineY = [];
      for (var i = 1, l = this.splineX.length - 1; i < l; ++i)
        this.splineY[i] = deviation * random();
      this.splineY[0] = this.splineY[l] = deviation * random();

      this.update = function (height, delta) {
        this.frame += delta;
        this.x += this.dx * delta;
        this.y += this.dy * delta;
        this.theta += this.dTheta * delta;

        // Compute spline and convert to polar
        var phi = (this.frame % 7777) / 7777,
          i = 0,
          j = 1;
        while (phi >= this.splineX[j]) i = j++;
        var rho = interpolation(
          this.splineY[i],
          this.splineY[j],
          (phi - this.splineX[i]) / (this.splineX[j] - this.splineX[i])
        );
        phi *= PI2;

        outerStyle.left = this.x + rho * cos(phi) + "px";
        outerStyle.top = this.y + rho * sin(phi) + "px";
        innerStyle.transform = this.axis + this.theta + "deg)";
        return this.y > height + deviation;
      };
    }

    function poof() {
      if (!frame) {
        // Append the container
        document.body.appendChild(container);

        // Add confetti
        var theme = colorThemes[0],
          count = 0;
        (function addConfetto() {
          var confetto = new Confetto(theme);
          confetti.push(confetto);
          container.appendChild(confetto.outer);
          count++;
          if (count >= 60) {
            // 60 is an arbitrary number that represents 2 seconds at 30 frames per second
            clearTimeout(timer);
            return;
          }
          timer = setTimeout(addConfetto, spread * random());
        })();

        // Start the loop
        var prev = undefined;
        requestAnimationFrame(function loop(timestamp) {
          var delta = prev ? timestamp - prev : 0;
          prev = timestamp;
          var height = window.innerHeight;

          for (var i = confetti.length - 1; i >= 0; --i) {
            if (confetti[i].update(height, delta)) {
              container.removeChild(confetti[i].outer);
              confetti.splice(i, 1);
            }
          }

          if (timer || confetti.length)
            return (frame = requestAnimationFrame(loop));

          // Cleanup
          document.body.removeChild(container);
          frame = undefined;
        });
      }
    }

    poof();
  }

  checkForWin() {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer
    const _win = (cells) =>
      cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.HEIGHT &&
          x >= 0 &&
          x < this.WIDTH &&
          this.board[y][x] === this.currPlayer
      );

    for (let y = 0; y < this.HEIGHT; y++) {
      for (let x = 0; x < this.WIDTH; x++) {
        // get "check list" of 4 cells (starting here) for each of the different
        // ways to win
        const horiz = [
          [y, x],
          [y, x + 1],
          [y, x + 2],
          [y, x + 3],
        ];
        const vert = [
          [y, x],
          [y + 1, x],
          [y + 2, x],
          [y + 3, x],
        ];
        const diagDR = [
          [y, x],
          [y + 1, x + 1],
          [y + 2, x + 2],
          [y + 3, x + 3],
        ];
        const diagDL = [
          [y, x],
          [y + 1, x - 1],
          [y + 2, x - 2],
          [y + 3, x - 3],
        ];

        // find winner (only checking each win-possibility as needed)
        if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
          return true;
        }
      }
    }
  }
}

class Player {
  constructor(color) {
    this.color = color;
  }
}

document.getElementById("start-game").addEventListener("click", () => {
  let p1 = new Player(document.getElementById("p1-color").value);
  let p2 = new Player(document.getElementById("p2-color").value);
  const playerTurn = document.getElementById("player-turn");
  const game = document.getElementById("game");
  playerTurn.innerText = `YOUR TURN ${p1.color.toUpperCase()} PLAYER`;
  playerTurn.style.borderColor = p1.color;
  playerTurn.style.boxShadow = `0px 0px 10px -3px ${p1.color}`;
  game.style.display = "inherit";
  console.log(p1, p2);
  new Game(p1, p2);
});

/** makeBoard: create in-JS board structure:
 *   board = array of rows, each row is array of cells  (board[y][x])
 */

/** makeHtmlBoard: make HTML table and row of column tops. */

/** findSpotForCol: given column x, return top empty y (null if filled) */

/** placeInTable: update DOM to place piece into HTML table of board */

/** endGame: announce game end */

/** handleClick: handle click of column top to play piece */

/** checkForWin: check board cell-by-cell for "does a win start here?" */
