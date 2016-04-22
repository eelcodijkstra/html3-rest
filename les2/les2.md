## Les 2: REST

Door het gebruik van AJAX kun je de verantwoordelijkheden tussen de client en de server anders verdelen. Je hebt veel meer vrijheid in het ontwerp van de "API" van het server-deel van de toepassing.

Veel web-APIs zijn tegenwoordig ontworpen volgens de REST principes ("Representational State Transfer"). In REST stelt een URL een "resource" voor; meestal is dit een collectie (verzameling) of een afzonderlijk object. Je gebruikt de http-methods GET, POST, PUT en DELETE om CRUD-opdrachten uit te voegen: Create, Read, Update, en Delete. Deze CRUD opdrachten zijn meestal direct gekoppeld aan database-opdrachten bij de server.

Als je website opgebouwd is volgens deze REST-principes, is dit voor anderen gemakkelijk te begrijpen. Je hebt minder risico op misverstanden, en je hoeft vaak ook minder te documenteren.

> De URLs in en REST API vormen de "zelfstandige naamwoorden"; de http-methods vormen de "werkwoorden". Er zijn ook (niet-REST) interfaces waarbij de URLs de rol van werkwoorden (functies, opdrachten) vervullen.

NB: karakter van http-methods.

## Voorbeeld: webwinkel

Hoe zou een REST-API voor een webwinkel eruit kunnen zien?

## Voorbeeld: Trello

De Trello API is een goed voorbeeld van een REST API.

* hoe maak je een kaart aan, op een board?
    * 

## REST voor todo

We gebruiken hier de 