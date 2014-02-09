import tornado.ioloop
import tornado.web
from tornado.web import StaticFileHandler
from tornado.options import define, options
import json

define("port", default=8888, help="run on the given port", type=int)

class RootHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('app/index.html')

def main():
    tornado.options.parse_command_line()
    app = tornado.web.Application([
        (r"/", RootHandler),
        (r"/(.+)", StaticFileHandler, dict(path='app')),
    ])
    app.listen(options.port)

    print "Application ready and listening @ %i" % (options.port)
    tornado.ioloop.IOLoop.instance().start()

if __name__ == "__main__":
    main()
