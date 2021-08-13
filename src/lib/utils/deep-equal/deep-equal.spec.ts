import { deepEqual } from './deep-equal'

const object1 = { user: { name: 'Max', nickname: 'Maxi' } }
const object1Clone = { ...object1 }
const object2 = { user: { name: 'Max', age: 10 } }
const object3 = { user: { name: 'Max' } }

describe('deepEqual', () => {
  describe('simple values', () => {
    it('should be equal', () => {
      const check = deepEqual('test', 'test')
      expect(check).toEqual(true)
    })
    it('should be different', () => {
      const check = deepEqual('test', 'test_other')
      expect(check).toEqual(false)
    })
    it('should be different to object value', () => {
      const check = deepEqual('test', object1)
      expect(check).toEqual(false)
    })
  })

  describe('NaN', () => {
    it('should be equal', () => {
      const check = deepEqual(parseInt('Hallo'), parseInt('HalloTest'))
      expect(check).toEqual(true)
    })
  })

  describe('simple array values', () => {
    it('should be equal', () => {
      const check = deepEqual([1], [1])
      expect(check).toEqual(true)
    })

    it('should be different', () => {
      const check = deepEqual([1], [1, 2])
      expect(check).toEqual(false)
    })

    it('should be different to object value', () => {
      const check = deepEqual([1], object1)
      expect(check).toEqual(false)
    })
  })

  describe('date values', () => {
    it('should be equal', () => {
      const check = deepEqual(new Date('2019-01-01'), new Date('2019-01-01'))
      expect(check).toEqual(true)
    })

    it('should be different', () => {
      const check = deepEqual(new Date('2019-01-01'), new Date('2019-01-02'))
      expect(check).toEqual(false)
    })

    it('should be different to object value', () => {
      const check = deepEqual(new Date('2019-01-01'), object1)
      expect(check).toEqual(false)
    })
  })

  describe('regex values', () => {
    it('should be equal', () => {
      const check = deepEqual(/.*/, /.*/)
      expect(check).toEqual(true)
    })

    it('should be different', () => {
      const check = deepEqual(/.+/, /.*/)
      expect(check).toEqual(false)
    })

    it('should be different to object value', () => {
      const check = deepEqual(/.*/, object1)
      expect(check).toEqual(false)
    })
  })

  describe('advanced array values', () => {
    it('should be simple equal', () => {
      const check = deepEqual([1, 2, 3], [1, 2, 3])
      expect(check).toEqual(true)
    })

    it('should be equal', () => {
      const check = deepEqual([object1], [object1Clone])
      expect(check).toEqual(true)
    })

    it('should be different', () => {
      const check = deepEqual([object1], [object2])
      expect(check).toEqual(false)
    })
  })

  describe('object values', () => {
    it('should object array be equal', () => {
      const check = deepEqual(object1, object1Clone)
      expect(check).toEqual(true)
    })

    it('should object array be different', () => {
      const check = deepEqual(object1, object2)
      expect(check).toEqual(false)
    })

    it('should object array be different in length', () => {
      const check = deepEqual(object1, object3)
      expect(check).toEqual(false)
    })
  })
})
