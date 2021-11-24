const Calculate = require("./calculate");

test('should calc properly', () => {
    const calc = Calculate(5)
    expect(calc).toEqual(6)
})