const server = require("./api/server");
const { PORT } = require("./api/config/index");

server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
