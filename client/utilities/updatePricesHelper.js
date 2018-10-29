const updatePricesHelper = (prevState, target) => {
    const stateCopy = prevState.slice()
    const targetIdx = stateCopy.findIndex(element => target.symbol === element.symbol)
    if (targetIdx > -1) stateCopy[targetIdx] = target
    else stateCopy[stateCopy.length] = target
    return stateCopy
}

export default updatePricesHelper
