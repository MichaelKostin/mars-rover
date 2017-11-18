export const CHANGE_TEMP_CP = 'CHANGE_TEMP_CP';
export const S_TOWER_CTR = 'S_TOWER_CTR';
export const S_T_XY = 'S_T_XY';
export const D_ANY = 'D_ANY';

//actions
export function setProcessorTemp(temp) {
  return {
    type: CHANGE_TEMP_CP,
    temp
  };
}

export function toggleTowerControl(enabled) {
  return { type: S_TOWER_CTR, enabled };
}

export function setTowerPosition(x, y) {
  return {  type: S_T_XY, x, y };
}

