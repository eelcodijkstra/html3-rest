## Les 2: REST

Door het gebruik van AJAX kun je de verantwoordelijkheden tussen de client en de server anders verdelen. Je hebt veel meer vrijheid in het ontwerp van de "API" van het server-deel van de toepassing.

Veel web-APIs zijn tegenwoordig ontworpen volgens de REST principes ("Representational State Transfer"). In REST stelt een URL een "resource" voor; meestal is dit een collectie (verzameling) of een afzonderlijk object. Je gebruikt de http-methods GET, POST, PUT en DELETE om CRUD-opdrachten uit te voegen: Create, Read, Update, en Delete. Deze CRUD opdrachten zijn meestal direct gekoppeld aan database-opdrachten bij de server.

Als je website opgebouwd is volgens deze REST-principes, is dit voor anderen gemakkelijk te begrijpen. Je hebt minder risico op misverstanden, en je hoeft vaak ook minder te documenteren.

> De URLs in en REST API vormen de "zelfstandige naamwoorden"; de http-methods vormen de "werkwoorden". Er zijn ook (niet-REST) interfaces waarbij de URLs de rol van werkwoorden (functies, opdrachten) vervullen.

NB: karakter van http-methods: het effect van operaties als GET en PUT (en DELETE) is gelijk voor als deze 1 keer of vaker uitgevoerd worden: deze opdrachten zijn *idempotent*. Bij een POST is dat niet gegarandeerd.

> Dit is ook de reden dat een browser je vraagt bij een refresh van een (POST) formulier: wil je dit formulier nogmaals versturen? De refresh van een gewone pagina heeft geen extra effect: de browser verstuurt dit verzoek zondermeer.

## Voorbeeld: webwinkel

Hoe zou een REST-API voor een webwinkel eruit kunnen zien?

## Voorbeeld: Trello

De Trello API is een goed voorbeeld van een REST API.

* hoe maak je een kaart aan, op een board?
    * POST (binnen de collecion CARDS). (en associatie met een board?)

## REST voor todo

We gebruiken hier de todo web-app als voorbeeld voor een REST API. We hebben te maken met een todo-lijst (*collection*) en met todo-items. (Later kunnen we dit nog verfijnen door ook gebruikers toe te voegen. We kunnen dan spreken over de todo's van een gebruiker.)

Dit geeft de volgende API:

| URL       | request | effect      | resultaat     |
| :---      | :---    | :---        | :---          |
| /todos    | GET     | read list   | todo-list     |
| /todos    | POST    | create item | todo item 42  |
| /todos/42 | GET     | read        | todo-item 42  |
| /todos/42 | PUT     | update      | todo-item(?)  |
| /todos/42 | DELETE  | delete      | (?)           |
| /todos/42 | PUT     | update      | (?)           |
| /todos    | GET     | read list   | todo-docs     |

Hierin is `42` de identificatie van het voorbeeld-item; dit zal in veel gevallen een getal zijn. (Vaak gebruiken we hiervoor een groot "random" getal, zoals de identificatie van een MongoDB-document.)

Naast de todo-lijsten (collecties) hebben we ook te maken met een collectie van gebruikers. Deze kunnen we op dezelfde manier behandelen.

In sommige gevallen willen we benadrukken dat we met de todo-lijst van een bepaalde gebruiker te maken hebben. We kunnen dit uitdrukken door een URL: `/users/id/todos`. Op eenzelfde manier kunnen we spe
We kunnen deze API testen met behulp van de browser-hulpmiddelen of met speciale toepassingen zoals Postman (of hurl?). Je kunt een API ook uittesten via de commandoregel, met behulp van `curl`.

### Hoe beschrijf je properties (eigenschappen)?

* het lezen van een item door middel van `GET /todos/42` levert het item-object op in JSON-formaat;
* voor het schrijven van een item door middel van `POST /todos` of `PUT /todos/42` gebruiken we de parameters in URL-gecodeerd formaa.
    * kunnen we deze data ook versturen in JSON-formaat? Dat gaat veel beter om met bijvoorbeeld arrays, en met geneste objecten.

## REST-API en database-operaties

In de server is er vaak een direct verband tussen een REST-functie en een database-operatie.

## Omgaan met fouten

Een REST-operatie is niet altijd succesvol. Naast de "normale" fouten zoals een niet-bestaande URL, kun je ook opdrachten proberen uit te voeren die niet toegestaan zijn, of die geen betekenis hebben (gegevens de huidige toestand van de server of de database).

Gesuggereerde aanpak:

* gebruik http-codes om aan te geven of de operatie geslaagd is of niet;
    * 200: OK
    * 400-serie: fout in het gebruik van de API
    * 500: server error
* geef in het geval van fouten voldoende informatie om uit te zoeken wat er aan de hand is, en wat er aan gedaan kan worden.


* zie: http://apigee.com/about/blog/technology/restful-api-design-what-about-errors


## Opmerkingen

De normale verwerking van de input (`web.input()`) accepteert kennelijk geen JSON-formaat. Je kunt de JSON-data wel opvragen, met behulp van `web.data()`. Ik weet niet of er een manier is om de betreffende header met het Content-Type op te vragen. (Je kunt wel de header van de response zetten.)

> Je kunt alle informatie over de request krijgen via het object `web.ctx.env`.

In Postman kun je we data versturen in JSON-formaat: `Content-Type: application/json`.

We kunnen het versturen (en verwerken) van JSON-input als een opdracht toevoegen, nadat we het gebruik van de "gewone" parameters geïllustreerd hebben.

(Hoe zit dit bijvoorbeeld bij het verwerken van input door een andere Python web server? Door nodejs?)

### CORS

Vanuit de browser kun je niet zonder meer http-requests doen naar andere servers dan de "origin" van de website.

Je kunt vanuit een andere toepassing, vanuit een andere server, of vanaf de commandoregel willekeurige http-requests doen: hier ben je niet gebonden aan de CORS-beperkingen.

> Hierdoor is het mogelijk om toepassingen als *Postman* te maken. Maar dit kan niet een simpele web-app zijn: de verzoeken moeten of vanuit de server gedaan worden, of vanuit een niet-browser toepassing (bijvoorbeeld een Chrome Extension).

