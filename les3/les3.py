import web
import time
import json

urls = (
    '/','Index',
    '/echo', 'Echo',
    '/login', 'Login',
    '/logout', 'Logout',
    '/users','Users',
    '/users/([0-9a-f]+)/todos/([0-9a-f]+)', 'UserTodoElement',
    '/users/([0-9a-f]+)/todos', 'UserTodoList',
    '/scripts/([a-z][a-z0-9]*.js)', 'Script',
    '/style/([a-z][a-z0-9]*.css)', 'Style'
)

app = web.application(urls,globals())

render = web.template.render('templates/')

class Script:
    def GET(self, file):
        try:
            f = open('scripts/' + file, 'r')
            return f.read()
        except:
            web.header('Content-Type', 'application/json')
            raise web.notfound(json.dumps({"msg": "File " + file + " not found"}))
            # return '404' # you can send an 404 error here if you want

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

class Echo:
    def GET(self):
        web.header('Content-Type', 'application/json')
        data = web.input()
        data["method"] = "GET"
        return json.dumps(data)

    def POST(self):
        web.header('Content-Type', 'application/json')
        data = web.input()
        data["json"] = json.loads(web.data())
        data["contentType"] = web.ctx.env["CONTENT_TYPE"]
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


class Login:
    def GET(self):
        data = web.input()
        web.header('Content-Type', 'application/json')
        if not "username" in data.keys() or data.username == "" or \
           not "password" in data.keys() or data.password == "":
            return json.dumps({"username": "", "userid": ""})
        user = db.users.find_one({"username": data.username})
        if user == None or user["password"] != data.password:
            return json.dumps({"username": "", "userid": ""})
        sessionid = startSession(user["_id"])
        web.setcookie("sessionid", sessionid)
        return json.dumps({"username": data.username,
                           "userid": str(user["_id"])})

class Logout:
    def GET(self):
        cookies = web.cookies(sessionid="")
        sessionid = cookies.sessionid
        if sessionid == "":
            return render.index(username="", userid=0)
        db.sessions.delete_one({"_id": ObjectId(sessionid)})
        web.setcookie("sessionid", "")
        return render.index(username="", userid=0)

class Users:
    def GET(self):
        data = web.input(username="")
        web.header('Content-Type', 'application/json')
        if data.username == "":
            return json.dumps({"username": "", "userid": ""})
        else:
            # web.setcookie("username", data.username)
            user = db.users.find_one({"username": data.username})
            if user == None:
                return json.dumps({"username": "", "userid": ""})
            else:
                return json.dumps({"username": data.username,
                                   "userid": str(user["_id"])})

    def POST(self):
        ## define new user
        data = web.input(username="", password="")
        web.header('Content-Type', 'application/json')
        if data.username == "" or data.password == "":
            return json.dumps({"username": "", "userid": ""})
        user = db.users.find_one({"username": data.username})
        if user != None:
            return json.dumps({"username": "", "userid": ""})
        id = db.users.insert_one(
                {"username": data.username,
                 "password": data.password}).inserted_id
        return json.dumps({"username": data.username,
                           "userid": str(id)})

class UserTodoElement:
    def GET(self, userid, eltid):
        return "GET TodoElement " + "user=" + userid + "elt=" + eltid

    def POST(self, userid, eltid):
        data = web.input()
        done = "done" in data.keys() and data["done"] == "true"
        db.todos.update_one(
            {"_id": ObjectId(eltid)},
            {"$set": {"description": data.descr,
                      "done": done,
                      "userid": userid}}
        )
        web.header('Content-Type', 'application/json')
        return json.dumps({"id": eltid, "done": done, "descr": data.descr})

    def DELETE(self, userid, eltid):
        res = db.todos.delete_one({"_id": ObjectId(eltid)})
        web.header('Content-Type', 'application/json')
        return json.dumps({"eltid": eltid, "deletedCount": res.deleted_count})

class UserTodoList:
    def GET(self, userid):
        todos = db.todos.find({"userid": userid})
        list = []
        for todo in todos:
            todo["_id"] = str(todo["_id"]) # necessary for JSONify
            list.append(todo)
        web.header('Content-Type', 'application/json')
        return json.dumps({"todos": list, "userid": userid})

    def POST(self, userid):
        data = web.input()
        done = "done" in data.keys() and data["done"] == "true"
        id = db.todos.insert_one({"description": data.descr,
                                  "done": done,
                                  "userid": userid}).inserted_id
        web.header('Content-Type', 'application/json')
        return json.dumps({"id": str(id), "done": done, "descr": data.descr})


if __name__=='__main__':
    app.run()
