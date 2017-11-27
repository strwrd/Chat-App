// Local Module
const { generateMessage, generateLocationMessage } = require('./../utils/message');

describe('generateMessage()', () => {
  test('Should generate correct message object', () => {
    const from = 'Admin';
    const text = 'Test text';

    const result = generateMessage(from, text);

    expect(typeof result.createdAt).toBe('number');
    expect(result.text).toBe(text);
    expect(result.from).toBe(from);
  });
});

describe('generateLocationMessage', () => {
  test('Should generate correct location message object', () => {
    const from = 'admin';
    const lat = 123;
    const long = 321;

    const result = generateLocationMessage(from, lat, long);

    expect(typeof result.createdAt).toBe('number');
    expect(result.from).toBe(from);
    expect(result.url).toBe(`https://www.google.com/maps?q=${lat},${long}`);
  });
});
