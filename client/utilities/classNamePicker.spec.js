import {expect} from 'chai'
import classNamePicker from './classNamePicker'

describe('classNamePicker', () => {
    it('returns a string', () => {
        expect(classNamePicker()).to.be.a('string')
    })
    it('returns `greater-than-op` if arg1 is greater than arg2', () => {
        const price1 = 40.05
        const openPrice1 = 40.04
        expect(classNamePicker(price1, openPrice1)).to.equal('greater-than-op')
    })
    it('returns `less-than-op` if arg1 is less than arg2', () => {
        const price2 = 40.04
        const openPrice2 = 40.05
        expect(classNamePicker(price2, openPrice2)).to.equal('less-than-op')
    })
    it('returns `equal-to-op` if arg1 and arg2 are equal', () => {
        const price3 = 40.04
        const openPrice3 = 40.04
        expect(classNamePicker(price3, openPrice3)).to.equal('equal-to-op')
    })
})
