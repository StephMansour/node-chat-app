var { generateMessage, generateLocationMessage } = require("./message");

describe("generateMessage", () => {
  it("should generate correct message object", () => {
    var from = "Jen";
    var text = "Some message";
    var message = generateMessage(from, text);
    expect(message.from).toBe(from);
    expect(message.createdAt).toBeLessThan(new Date().getTime());
  });
});

describe("generateLocationMessage", () => {
  it('should generate correct location object', () => {
    var from = "Admin";
    var longitude = 999
    var latitude = 111
    var message = generateLocationMessage(from, latitude, longitude);
    expect(message.from).toBe(from)
    expect(typeof message.url).toBe('string')
    expect(message.url).toEqual(`https://www.google.com/maps?q=${latitude},${longitude}`)
  })
})
