const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('src/json-server/db.json');

// You can use the one used by JSON Server
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});

// Use default router
server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
