export const CHANGE_TEMP_CP = 'CHANGE_TEMP_CP';
export const CHANGE_TEMP_GP = 'CHANGE_TEMP_GP';
export const SET_TOWER_HORIZON = 'SET_TOWER_HORIZON';
export const SET_TOWER_VERTICAL = 'SET_TOWER_VERTICAL';

//actions
export function setProcessorTemp(temp) {
  return {
    type: CHANGE_TEMP_CP,
    temp
  };
}

export function setGraphicTemp(temp) {
  return {
    type: CHANGE_TEMP_GP,
    temp
  };
}

export function setTowerHorison(degree) {
  return {
    type: SET_TOWER_HORIZON,
    degree
  };
}

export function setTowerVertical(degree) {
  return {
    type: SET_TOWER_VERTICAL,
    degree
  };
}
