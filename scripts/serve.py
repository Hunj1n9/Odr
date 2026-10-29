"""Web server tĩnh cho TIN314 Lab: như `python3 -m http.server` nhưng gửi Cache-Control: no-cache
để trình duyệt luôn kiểm tra lại file (không dùng bản cũ sau khi nội dung được cập nhật)."""
import functools
import http.server
import os
import sys


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-cache")
        super().end_headers()


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 5314
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    handler = functools.partial(NoCacheHandler, directory=root)
    print(f"TIN314 Lab: http://localhost:{port}")
    http.server.ThreadingHTTPServer(("", port), handler).serve_forever()
