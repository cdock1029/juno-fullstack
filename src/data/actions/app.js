/*
 * action types
 */
export const LOADING_START = 'LOADING_START'
export const LOADING_STOP = 'LOADING_STOP'

export function loadingStart() {
  return { type: LOADING_START }
}

export function loadingStop() {
  return { type: LOADING_STOP }
}
