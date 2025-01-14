const util = require("util");
const generator = require("crypto");
const token = generator.randomBytes(64).toString("hex");

function copyToClipboard(data) {
  console.log(process.platform);

  const childProcess = require("child_process");

  if (process.platform === "win32") {
    const clipboardContent = childProcess
      .spawn("clip")
      .stdin.end(util.inspect(data));

    return;
  }

  var proc = childProcess.spawn("pbcopy");

  proc.stdin.write(data);
  proc.stdin.end();
}

copyToClipboard(token);

console.log("Token copied to your clipboard!");
