export type ShipId = 'carrier' | 'battleship' | 'destroyer' | 'submarine' | 'patrol-boat';

export type ShipState = {
  id: ShipId;
  length: number;
  row: number | null;
  col: number | null;
  orientation: 'horizontal' | 'vertical';
};

export type Direction = 'up' | 'down' | 'left' | 'right';

export type AiState = {
  mode: 'hunting' | 'target';
  targetRow: number | null;
  targetCol: number | null;
  direction: Direction | null;
  triedDirection: Direction[];
};
