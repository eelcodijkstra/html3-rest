# html3-REST

In deze module maken we een web-toepassing met JavaScript en Python. JavaScript gebruiken we in de browser ("client side") voor de interactie met de gebruiker en voor de interactie met de server(s). Python gebruiken we in de server voor de afhandeling van verzoeken vanuit de browser.

Het interface van de server is opgebouwd volgens de REST-principes: Representational State Transfer. Zie o.a.:

* [Wikipedia: REST](https://en.wikipedia.org/wiki/Representational_state_transfer)
* [Fielding Ph.D. thesis](http://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm)
* 

We beschrijven elders deze principes in het kort.

Deze module bouwt voor op de eerdere module: HTML-JS, waarin we JavaScript in de browser introduceren, en HTML-1-Python, waarin we server-side scripting met Python introduceren.

De volgende aspecten zijn nieuw of uitgebreider dan in deze voorafgaande modules:

* REST principes
* AJAX - asynchrone interactie tussen browser en server, met JSON als formaat;
* JSON formaat van data
* Authenticatie
* 

## Cloud 9 workspace 

### Cloud9

* maak een nieuwe Cloud9-workspace aan, via "clone from git", met de URL van dit repository: `https://github.com/infvo/nosql.git`
* geef deze readme weer als preview: selecteer `readme.md`, en selecteer via het dropdown-menu "preview". (Of, open `readme.md`, en selecteer in het menu bovenin "Preview".)

#### MongoDB

MongoDB is standaard geïnstalleerd op Cloud9. Op de volgende manier activeer je mongodb:

* zie: https://docs.c9.io/docs/setting-up-mongodb
* open een nieuw terminal-venster (onderaan), en voer daarin de onderstaande opdrachten één voor één uit:

```shell
$ mkdir data
$ echo 'mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"' > mongod
$ chmod a+x mongod
$ mongod
```

* houd het programma `mongod` actief in dit venster; gebruik voor andere opdrachten een ander terminal-venster.
* in dit terminal-venster krijg je de mededelingen van de database-driver.

Je kunt database-opdrachten uitvoeren via de mongodb-shell. Open hiervoor een nieuw terminal-venster, en start daarin de mongodb-shell via het commando: 

* `$ mongo`

Daarn kun je mongodb-shell opdrachten geven, bijvoorbeeld: 

* `> show databases`

### Python

We hebben de volgende python-onderdelen nodig:

* `pymongo`: de library om vanuit Python MongoDB aan te sturen ("driver").
* `web.py`: een eenvoudig framework voor het maken van websites vanuit Python

Deze onderdelen kun je installeren door middel van de volgende shell-opdrachten:

```shell
$ sudo pip install pymongo
$ sudo pip install web.py
```

Je kunt de werking van `web.py` controleren via:

```
$ python webdemo.py
```