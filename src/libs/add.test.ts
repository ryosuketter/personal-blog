import { add } from './add'

test('adds 1 + 2 to equal 3', () => {
  expect(add(1, 2)).toBe(3)
  expect(add(10, -5)).toBe(5)
  expect(add(0.1, 0.2)).toBeCloseTo(0.3, 5) // 小数の場合はtoBeCloseToを使う
})
