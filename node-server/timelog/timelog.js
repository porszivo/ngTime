module.exports = {
  log: log
};

var type = ['Info', 'Warning', 'Error'];

function log(level, message) {
  console.log("[" + type[level] + "] " + Date() + ": " + message);
}