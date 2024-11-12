// server.mjs
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import path from "node:path";

const filename = path.join("app")

// html path
const server = createServer(async (req,res)=>{
  const reqPath = decodeURIComponent(req.url || '')
  if (reqPath === '/' || reqPath === '/index.html') {
    try {
      const html_data = await readFile(path.join(filename, 'page', 'main.html'));
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html_data);
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error loading HTML file');
    }
  }else if (reqPath === '/about' ) {
    try {
      const html_data = await readFile(path.join(filename, 'page', 'aboute.html'));
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html_data);
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error loading HTML file');
    }
  }else if (reqPath === '/team' ) {
    try {
      const html_data = await readFile(path.join(filename, 'page', 'team.html'));
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html_data);
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error loading HTML file');
    }
  }
// css path 
  else if(reqPath.startsWith("/style")){
    try {
      const cssPath = await readFile(path.join(filename,reqPath));
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.end(cssPath);
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error loading css file');
    }
  }

  else if(reqPath.startsWith("/image")){
    try {
      const imgPath = await readFile(path.join(filename,reqPath));
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.end(imgPath);
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error loading css file');
    }
  }else{
    const date = new Date();
    console.log(`"Build finish ${date.toISOString()}"`)
  }
})

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});

// run with `node server.mjs`
