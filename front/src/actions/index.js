export const CHANGE_TEMP_CP = 'CHANGE_TEMP_CP';
export const S_SET_TOWER_X = 'S_SET_TOWER_X';
export const S_SET_TOWER_Y = 'S_SET_TOWER_Y';
export const S_TOWER_CTR = 'S_TOWER_CTR';

//actions
export function setProcessorTemp(temp) {
  return {
    type: CHANGE_TEMP_CP,
    temp
  };
}

export function setTowerX(degree) {
  return {
    type: S_SET_TOWER_X,
    degree
  };
}

export function setTowerY(degree) {
  return {
    type: S_SET_TOWER_Y,
    degree
  };
}

export function toggleTowerControl(enabled) {
  return { type: S_TOWER_CTR, enabled };
}

