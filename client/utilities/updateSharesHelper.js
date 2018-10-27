const updateSharesHelper = (prevState, target) => {
  const stateCopy = prevState.slice()
  const targetIdx = stateCopy.findIndex(element => target.id === element.id)
  if (targetIdx > -1) stateCopy[targetIdx] = target
  else stateCopy[stateCopy.length] = target

  return stateCopy
}

export default updateSharesHelper
