var { generateMessage } = require("./message");

describe("generateMessage", () => {
  it("should generate correct message object", () => {
    var from = "Jen";
    var text = "Some message";
    var message = generateMessage(from, text);
    console.log(message);
    expect(message.from).toBe(from);
    expect(message.createdAt).toBeLessThan(new Date().getTime());
  });
});
