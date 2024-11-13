// server.mjs
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const filename = path.join('app');
const PORT = 3000;  // Ensure this port is free for Node.js, while Nginx listens on port 80 or 443

const server = createServer(async (req, res) => {
  const reqPath = decodeURIComponent(req.url || '');
  console.log(`Request received: ${reqPath}`);

  try {
    if (reqPath === '/wcp') {
      const html_data = await readFile(path.join(filename, 'page', 'main.html'));
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html_data);
      console.log('Served /wcp');
    } else if (reqPath === '/about') {
      const html_data = await readFile(path.join(filename, 'page', 'about.html'));
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html_data);
      console.log('Served /about');
    } else if (reqPath === '/team') {
      const html_data = await readFile(path.join(filename, 'page', 'team.html'));
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html_data);
      console.log('Served /team');
    } 
    // Serve CSS files
    else if (reqPath.startsWith('/style')) {
      const cssPath = await readFile(path.join(filename, reqPath));
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.end(cssPath);
      console.log(`Served CSS file at ${reqPath}`);
    } 
    // Serve Image files
    else if (reqPath.startsWith('/image')) {
      const ext = path.extname(reqPath).toLowerCase();
      const mimeType = ext === '.png' ? 'image/png' : ext === '.jpg' ? 'image/jpeg' : 'application/octet-stream';
      const imgPath = await readFile(path.join(filename, reqPath));
      res.writeHead(200, { 'Content-Type': mimeType });
      res.end(imgPath);
      console.log(`Served image file at ${reqPath}`);
    } else {
      const date = new Date();
      console.log(`Build finish ${date.toISOString()}`);
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Page Not Found');
    }
  } catch (error) {
    console.error(`Error loading file for ${reqPath}:`, error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  }
});

// Listen on port 3000 for local requests
server.listen(PORT, '127.0.0.1', () => {
  console.log(`Server is running locally on http://localhost:${PORT}/wcp`);
});
