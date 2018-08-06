export const CHANGE_TEMP_CP = 'CHANGE_TEMP_CP';
export const S_TOWER_CTR = 'S_TOWER_CTR';
export const S_T_XY = 'S_T_XY';
export const D_ANY = 'D_ANY';
export const S_CHANGE_MOTORS = 'S_CHANGE_MOTORS';
export const S_CHANGE_DIR = 'S_CHANGE_DIR';
export const SOCKET_DISCONNECT = 'SOCKET_DISCONNECT';
export const SOCKET_RECONNECT = 'SOCKET_RECONNECT';
export const SOCKET_CONNECT = 'SOCKET_CONNECT';
export const IMU_UPDATE = 'IMU_UPDATE';
export const DISTANCE_NEW = 'DISTANCE_NEW';

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

export function changeMotors(left, right) {
  return { type: S_CHANGE_MOTORS, left, right};
}

export function changeDirection(direction) {
  return { type: S_CHANGE_DIR, direction }
}
