class Gameboard {
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;
  }

  get rows() {
    return this.row;
  }

  get columns() {
    return this.columns;
  }

  get grid() {
    let arr = [];
    for (i = 0; i < this.row; i++) {
      for (j = 0; j < this.columns; j++) {
        arr.push([i][j]);
      }
    }
    return arr;
  }

  set rows(val) {
    this.row = val;
  }

  set columns(val) {
    this.columns = val;
  }
}
