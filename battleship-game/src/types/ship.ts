export type ShipId = 'carrier' | 'battleship' | 'destroyer' | 'submarine' | 'patrol-boat';

export type ShipState = {
  id: ShipId;
  length: number;
  row: number | null;
  col: number | null;
  orientation: 'horizontal' | 'vertical';
};
