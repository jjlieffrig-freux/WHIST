from http.server import HTTPServer, SimpleHTTPRequestHandler

httpd = HTTPServer(('localhost', 8080), SimpleHTTPRequestHandler)
httpd.serve_forever()
