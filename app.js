const http = require('http');
const sleep = require('sleep');
const hostname = '127.0.0.1';
const port = 3000;
var server = http.createServer();
server.on('request', doRequest);

 
// リクエストの処理
function doRequest(req, response) {
   
  var Response = {
    "200":function(file, filename){
        var extname = path.extname(filename);
        var header = {
            "Access-Control-Allow-Origin":"*",
            "Pragma": "no-cache",
            "Cache-Control" : "no-cache"       
        }
        response.writeHead(200, header);
        response.write(file, "OK");
        response.end();
    },
    "404":function(){
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not Found\n");
        response.end();

    },
    "408":function(){
      response.writeHead(408, {"Content-Type": "text/plain"});
      response.write("408 Timeout\n");
      response.end();

    },
    "500":function(){
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write("500 Internal Server Error \n");
        response.end();
    }
  }
  
  console.log(req.url);
  if(req.url=='/j_hotel/?display_f=sp' || req.url=='/') {
    sleep.sleep(301);
    Response["404"]();
  } else if(req.url=='/j_air/?display_f=sp') {
    sleep.sleep(60);
    Response["500"]();
  } else if(req.url=='/j_tour/?display_f=sp') {
    Response["408"]();
  } else {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write("ok");
    response.end();
  }
    
}
 
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});