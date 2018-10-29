const classNamePicker = (price, openPrice) => {
    if (price < openPrice) return 'less-than-op'
    if (price > openPrice) return 'greater-than-op'
    return 'equal-to-op'
}

export default classNamePicker
