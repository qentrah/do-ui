const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../dist');
const mime = {'.html':'text/html','.js':'application/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.ttf':'font/ttf','.svg':'image/svg+xml'};
http.createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  const relative = pathname === '/' ? 'index.html' : pathname.slice(1);
  const candidates = [relative, relative + '.html', path.join(relative, 'index.html')];
  const file = candidates.map(candidate => path.resolve(root, candidate)).find(candidate => candidate.startsWith(root + path.sep) && fs.existsSync(candidate) && fs.statSync(candidate).isFile());
  if (!file) { response.writeHead(404); response.end('Not found'); return; }
  response.writeHead(200, {'Content-Type':mime[path.extname(file)] ?? 'application/octet-stream'});
  fs.createReadStream(file).pipe(response);
}).listen(Number(process.env.PORT ?? 8091), '127.0.0.1', () => console.log(`Do UI docs: http://127.0.0.1:${process.env.PORT ?? 8091}`));
