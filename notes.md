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
    * asynchrone interactie; event handling; promises?
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

* maak een workspace aan door middel van "clone from git", van je eigen fork die je hierboven aangemaakt hebt. Gebruik als URL de ssh/git-URL (e.g., `git@github.com:eelcodijkstra/html3-rest.git`) Zet hiervoor eventueel de clone-URL in GitHub op SSH, in plaats van op HTTPS.
* configureer MongoDB
* installeer web.py (web server) en pymongo (Python library voor MongoDB).

Maakt het uit op welke manier je een workspace maakt vanuit een GitHub repo? Via ssh (git url) of via https (https url)?

> Ja: als je ssh gebruikt, dan wordt je ssh-key gebruikt die je opgegeven hebt voor de verbinding van Cloud 9 naar GitHub. Je hoeft dan niet steeds een wachtwoord op te geven bij een push-opdracht. Dit maakt het leven veel gemakkelijker.

(Zie de readme.md van https://github.com/infvo/nosql.)

### push naar GitHub

(Als je als URL de ssh/git-URL gebruikt hebt, dan kun je de git push-opdracht gebruiken zonder dat er steeds om een wachtwoord gevraagd wordt. Als je de https-URL gebruikt hebt, dan wordt steeds om je wachtwoord gevraagd.)

### header voor ajax POST requests

Volgens de documentatie op MDN is het url-encoded type default - maar dat blijkt in mijn geval niet zo te zijn: daar is het text-type default. Dat wordt door web.py niet herkend als input-parameters (web.input).

## Links

* [NativeScript voorbeeld](https://www.nativescript.org/blog/nativescript-open-source-sample---tasks)

