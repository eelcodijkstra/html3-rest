## Web 3: AJAX en REST

In deze module bouwen we voort op de vorige modules:

* Web 1: JavaScript in de browser, voor interactie met de gebruiker;
* Web 2: Python in de server, voor de afhandeling van browser-verzoeken.

Elke les bestaat uit een versie van de software, zowel de server- als de client-software.

De client-bestanden zijn te vinden in de subdirectories.

De todo-mappen zijn tijdelijk: deze zijn bedoeld voor het ontwikkelen van de toepassing, om deze later als onderdeel in de lessen op te nemen.

We behandelen in deze module de volgende concepten:

* REST (REST-API)
* JSON (en BSON)
* AJAX (met JSON als representatie)
* Authenticatie(?)
* synchronisatie van model?

* gebruik van frameworks: jQuery (voor DOM-interactie; AJAX);
* idem, voor opmaak?
* React?
* nodejs, als alternatief voor Python??

* templates vs. de React-aanpak

## Opbouw van de lessen

* herhaling JSON (eerder gebruikt voor het opslaan van het model, voor de todo-toepassing); omzetten van JSON in JavaScript-objecten, en omgekeerd; ook voor Python; JSON en MongoDB-BSON: (subtiele) verschillen.
* REST API (eerder deels behandeld in Web-2: server side scripting);
* 

## Opmerkingen

* voor het gebruik van React moet je het class-begrip van JS kunnen hanteren.
* kunnen we in de Web-1 module al vooruitlopen op het gebruik van React? Welke elementen en aspecten van React kunnen we daar gebruiken?
* 

## Werken met Cloud9 en GitHub (uiteindelijke versie)

* maak een eigen fork aan in GitHub van dit repository.
* je levert je werk in door middel van een pull-request (ten opzichte van het origineel?)
    * dit pull-request wordt niet uitgevoerd als daadwerkelijke pull, maar het vormt het handvat voor commentaar en feedback;
    * dit kan met een afzonderlijk pull-request voor elke les.

Gebruik van Cloud9:

* maak een workspace aan door middel van "clone from git", van je eigen fork die je hierboven aangemaakt hebt.
* configureer MongoDB
* installeer web.py (web server) en pymongo (Python library voor MongoDB).

Maakt het uit op welke manier je een workspace maakt vanuit een GitHub repo? Via ssh (git url) of via https (https url)?

(Zie de readme.md van https://github.com/infvo/nosql.)

### push naar GitHub

De push vanuit Cloud 9 naar GitHub is niet "soepel": je hebt altijd een wachtwoord nodig? (...terwijl Cloud 9 wel een speciale toegang heeft tot GitHub - via SSH?)
