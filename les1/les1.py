import web
import time
import json

urls = (
    '/','Index',
    '/echo', 'Echo',
    '/scripts/([a-z][a-z0-9]*.js)', 'Script',
    '/style/([a-z][a-z0-9]*.css)', 'Style'
)

app = web.application(urls,globals())

render = web.template.render('templates/')

class Echo:
    def GET(self):
        web.header('Content-Type', 'application/json')
        data = web.input()
        data["method"] = "GET"
        return json.dumps(data)

    def POST(self):
        web.header('Content-Type', 'application/json')
        data = web.input()
        data["method"] = "POST"
        return json.dumps(data)

    def PUT(self):
        web.header('Content-Type', 'application/json')
        data = web.input()
        data["method"] = "PUT"
        return json.dumps(data)

    def DELETE(self):
        web.header('Content-Type', 'application/json')
        return json.dumps(web.input())

def startSession(userid):
    sessionid = db.sessions.insert_one({
            "userid": userid,
            "startTime": int(time.time()) # secs since Epoch
        }).inserted_id
    return sessionid

class Script:
    def GET(self, file):
        try:
            f = open('scripts/' + file, 'r')
            return f.read()
        except:
            return '404' # you can send an 404 error here if you want

class Style:
    def GET(self, file):
        try:
            f = open('style/' + file, 'r')
            return f.read
        except:
            return '404' # you can send an 404 error here if you want

class Index:
    def GET(self):
        return render.index()

if __name__=='__main__':
    app.run()
