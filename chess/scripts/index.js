const chessboard = document.getElementById('chessboard');

// Danh sách quân cờ
const pieces = {
  white: {
    rook: 'images/wr.png',
    knight: 'images/wk.png',
    bishop: 'images/wb.png',
    queen: 'images/wq.png',
    king: 'images/wk.png',
    pawn: 'images/wp.png',
  },
  black: {
    rook: 'images/br.png',
    knight: 'images/bk.png',
    bishop: 'images/bb.png',
    queen: 'images/bq.png',
    king: 'images/bk.png',
    pawn: 'images/bp.png',
  }
};

// Khởi tạo bàn cờ
function createChessboard() {
  for (let i = 0; i < 64; i++) {
    const square = document.createElement('div');
    square.classList.add('square');

    // Đặt quân cờ ở đúng vị trí
    if (i < 16) {
      if (i < 8) square.appendChild(createPiece('white', 'pawn'));
      else if (i < 16) square.appendChild(createPiece('white', getPieceType(i)));
    } else if (i >= 48) {
      if (i < 56) square.appendChild(createPiece('black', 'pawn'));
      else if (i < 64) square.appendChild(createPiece('black', getPieceType(i)));
    }

    chessboard.appendChild(square);
  }
}

// Xác định quân cờ dựa trên chỉ số
function getPieceType(index) {
  const row = Math.floor(index / 8);
  const col = index % 8;
  console.log(index,row,col)
  if (row === 0 || row === 7) {
    if (col === 0 || col === 7) return 'rook';
    if (col === 1 || col === 6) return 'knight';
    if (col === 2 || col === 5) return 'bishop';
    if (col === 3) return 'queen';
    return 'king';
  }
  return 'empty';
}

// Tạo quân cờ
function createPiece(color, type) {
  if (type === 'empty') return document.createElement('div');
  const img = document.createElement('img');
  img.src = pieces[color][type];
  return img;
}

// Khởi tạo bàn cờ
createChessboard();
