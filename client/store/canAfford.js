/**
 * ACTIONS
 */

const SET_CAN_AFFORD = 'SET_CAN_AFFORD'

/**
 * ACTION CREATORS
 */
export const setCanAfford = canAfford => ({
  type: SET_CAN_AFFORD,
  canAfford
})

/**
 * DEFAULT STATE
 */
const defaultState = true

/**
 * REDUCER
 */
export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_CAN_AFFORD:
      return action.canAfford
    default:
      return state
  }
}
