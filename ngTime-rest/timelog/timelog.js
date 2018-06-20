module.exports = {
  log: log
};

const type = ['Info', 'Warning', 'Error'];

function log(level, message) {
  console.log("[" + type[level] + "] " + Date() + ": " + message);
}