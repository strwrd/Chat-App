// Local Modules
const {isRealString} = require('./../utils/validation');

describe('isRealString()', () => {
	test('Should return true if str is string', () => {
		const someString = 'This is a string';
		const result = isRealString(someString);
		expect(result).toBe(true);
	});

	test('Should return false if str is not str',() => {
		const someString = null;
		const result = isRealString(someString);
		expect(result).toBe(false);
	});

	test('Should return false if str is only whitespaces', () => {
		const someString = '     ';
		const result = isRealString(someString);
		expect(result).toBe(false);
	});
});
