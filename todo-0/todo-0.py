import web
import pymongo
from bson.objectid import ObjectId
import time

urls = (
    '/','Index',
    '/login', 'Login',
    '/logout', 'Logout',
    '/users','Users',
    '/users/([0-9a-f]+)/todos/([0-9a-f]+)', 'UserTodoElement',
    '/users/([0-9a-f]+)/todos', 'UserTodoList',
    '/scripts/([a-z][a-z0-9]*.js)', 'Script'
)

app = web.application(urls,globals())

render = web.template.render('templates/')

client = pymongo.MongoClient()
db = client["tododb"]

def startSession(userid):
    sessionid = db.sessions.insert_one({
            "userid": userid,
            "startTime": int(time.time()) # secs since Epoch
        }).inserted_id
    return sessionid

def endSession(sessionid):
    session = db.sessions.find_one({"_id": sessionid})
    return 0

class Script:
    def GET(self, file):
        try:
            f = open('scripts/' + file, 'r')
            return f.read()
        except:
            return '404' # you can send an 404 error here if you want

class Index:
    def GET(self):
        cookies = web.cookies(username="", sessionid="")
        sessionid = cookies.sessionid
        if sessionid == "":
            return render.index(username = "", userid = 0)
        print("sessionid:" + sessionid)
        session = db.sessions.find_one({"_id": ObjectId(sessionid)})
        print("session: " + str(session))
        user = db.users.find_one({"_id": session["userid"]})
        return render.index(username=user["username"], userid=user["_id"])

class Login:
    def GET(self):
        data = web.input()
        if not "username" in data.keys() or data.username == "" or \
           not "password" in data.keys() or data.password == "":
            return render.login()
        user = db.users.find_one({"username": data.username})
        if user == None or user["password"] != data.password:
            return render.login()
        sessionid = startSession(user["_id"])
        web.setcookie("sessionid", sessionid)
        return render.index(username=data.username, userid=user["_id"])

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
        data = web.input()
        if data.username == "":
            return render.index(username="", userid=0)
        else:
            web.setcookie("username", data.username)
            user = db.users.find_one({"username": data.username})
            if user == None:
                userid = db.users.insert_one(
                    {"username": data.username}).inserted_id
            else:
                userid = user["_id"]
            raise web.seeother("/users/" + str(userid) + "/todos")

    def POST(self):
        ## define new user
        data = web.input()
        if not "username" in data.keys() or data.username == "":
            raise web.seeother("/login")
        if not "password" in data.keys() or data.password == "":
            raise web.seeother("/login")
        if not "retype" in data.keys() or data.retype == "":
            raise web.seeother("/login")
        if data.password != data.retype:
            raise web.seeother("/login")
        user = db.users.find_one({"username": data.username})
        if user != None:
            raise web.seeother("/login")
        id = db.users.insert_one(
                {"username": data.username,
                 "password": data.password}).inserted_id
        return render.index(username = data.username, userid = id)

class UserTodoElement:
    def GET(self, userid, eltid):
        return "GET TodoElement " + "user=" + userid + "elt=" + eltid

    def POST(self, userid, eltid):
        data = web.input()
        db.todos.update_one(
            {"_id": ObjectId(eltid)},
            {"$set": {"description": data.descr,
                      "done": "done" in data.keys(),
                      "userid": userid}}
        )
        raise web.seeother("/users/" + userid + "/todos")

class UserTodoList:
    def GET(self, userid):
        todos = db.todos.find({"userid": userid})
        return render.usertodos(userid=userid, todolist=todos)

    def POST(self, userid):
        data = web.input()
        db.todos.insert_one(
            {"description": data.descr,
             "done": "done" in data.keys(),
             "userid": userid}
        )
        raise web.seeother("/users/" + userid + "/todos")

if __name__=='__main__':
    app.run()
