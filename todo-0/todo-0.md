## Todo-0

Dit is de eerste versie van de AJAX/REST-implementatie van de todo-list. We proberen uit te vinden wat handige stappen zijn om deze web-app te ontwikkelen.

### Authenticatie

Een nieuw probleem bij deze implementatie is de manier waarop we authenticatie kunnen doen. We kunnen een veiliger implementatie gebruiken, door de wachtwoorden te versleutelen. (Dat lukt alleen bij het inloggen - bij het opgeven van een nieuw wachtwoord lukt dat niet. Een alternatief is dan om een nieuw wachtwoord langs een andere weg te verspreiden, bijvoorbeeld via e-mail.) Bij deze versleuteling gebruiken we dan een "salt" waarde vanuit de server om ervoor te zorgen dat een versleuteld wachtwoord niet opnieuw gebruikt kan worden.

> Deze aanpak is niet compleet veilig: het is altijd beter om https te gebruiken. Maar het is aanzienlijk veiliger dan het weglaten van deze versleuteling.

Een eventuele afluisteraar kan weten met welke codes het wachtwoord versleuteld is; en, welke methode gebruikt wordt voor het versleutelen. Het wachtwoord kan dan gekraakt worden door allerlei wachtwoorden te proberen, en te zien of dit eenzelfde versleutelde waarde geeft. 

Voor de Trello-API moet de toepassing steeds de key oversturen naar de server. (Als je geen gebruik maakt van https, is die key kwetsbaar: deze kan zo afgeluisterd en gekopieerd worden.) Het Trello-API maakt wel altijd gebruik van https. (Er is eigenlijk alles voor te zeggen om voor dergelijke APIs, met gebruikers-data, https te gebruiken.)

#### OAuth

Nog verder uitzoeken: het gebruik van OAuth 2.0.

#### Gebruikers en sessies

* we slaan de gebruikersnaam op in de browser - in localStorage;
* we houden in de server een "session" bij. Deze session heeft een beperkte levensduur. De key van deze session moet bij elk request meegestuurd worden (in de URL? parameters? in een header?).
* bij het starten van een nieuwe sessie moet de gebruiker inloggen (authenticatie).

Vraag: kun je in de browser op een of andere manier een unieke identificatie van de computer opvragen? (Het IP-adres is niet echt bruikbaar, omdat het ip-adres van een computer kan veranderen, afhankelijk van de context. Eigenlijk is een MAC-adres beter - maar de server kan dit niet controleren.)

### Model

We gebruiken dezelfde aanpak als in Web-1 (JS in de browser), met enkele aanvullingen:

* een wijziging in het model moeten we synchroniseren met de server.

Een todo-lijst is erg klein (meestal). We kunnen dan de complete lijst, inclusief de inhoud van de elementen, bij elke synchronisatie oversturen.

Een alternatief is om de synchronisatie op hetzelfde niveau te doen als de updates op de lijst en op de elementen. Een CRUD-operatie op het model resulteert dan in een CRUD-operatie op de server.

Voor de identificatie van de elementen kunnen we de eenvoudige identificatie gebruiken, zoals tot nu toe gebruikt; of, we gebruiken een identificatie zoals in het geval van MongoDB: een hash-nummer (random nummer). We kunnen dan op verschillende computers verschillende elementen aanmaken, met een verwaarloosbare kans op conflicten.

### REST

Een REST-API is een vertaling van de CRUD-operaties in termen van HTTP-requests.

We moeten voor deze toepassing ook rekening houden met authenticatie (en authorisatie): bepaalde gegevens zijn alleen voor bepaalde gebruikers toegankelijk.

We gebruiken de volgende combinatie van requests en URLs:

| URL                | request | effect      | resultaat    |
| :---               | :---    | :---        | :---         |
| /users?username=nm | GET     | read        | user-doc     |
| /users?username=nm | POST    | create user | user-doc     |
| /users/id/todos    | GET     | read list   | todo-list    |
| /users/id/todos    | POST    | create item | item-id      |
| /users/id/todos/id | GET     | read        | todo-item    |
| /users/id/todos/id | PUT     | update      | todo-item(?) |
| /users/id/todos/id | DELETE  | delete      | (?)          |
| | | | |
| /todos/id          | PUT     | update      | (?)          |
| /todos             | GET     | read list   | todo-docs |

* user-doc: `{id, name}`

NB: er zijn geen afzonderlijke todo-lists: alle todo's van een gebruiker vormen samen één lijst. (Dat is een ontwerpkeuze; er zijn andere keuzes mogelijk.)

We hebben (nog) geen voorzieningen voor: het verwijderen van een gebruiker; het verwijderen van alle todo's van een gebruiker; ...



Voor al deze opdrachten is het resultaat in JSON-representatie.

(De enige niet-JSON representatie is voor de hele toepassing.)

NB: omdat we de requests vanuit JavaScript genereren, zijn we niet beperkt tot GET en POST: we kunnen ook de andere requests gebruiken.

### AJAX - Asynchroon

De eerste "A" in AJAX staat voor *asynchroon*. De "send" functie die het verzoek (request) verstuurt naar de server wacht niet tot het antwoord (response) ontvangen is. Het ontvangen van dit antwoord is een soort *event* waarvoor je een handler kunt (moet) definiëren. 

> Er zijn verschillende soorten events, voor de verschillende stadia van het versturen van het request, en van het ontvangen van de response. Deze verschillende stadia zijn: (progress, load, error, abort). Er kan ook iets mis gaan met het verzoek (error, abort). In het bijzonder kun je van een omvangrijke response (een groot bestand) nagaan welk deel al geladen is: daarmee kun je een "progress-indicator" voor de gebruiker maken.

Het gebruik van dergelijke asynchrone events leidt tot een speciale manier van programmeren.

#### Promises

Je kunt deze asynchrone manier van programmeren nog op een andere manier vormgeven, door middel van *promises*.

* http://www.html5rocks.com/en/tutorials/es6/promises/#toc-promisifying-xmlhttprequest

#### XMLHttpRequest

* wat is de volgorde: new/open/send - en bijv. het toevoegen van een handler (typisch: voor de new)? toevoegen van een header? 

Alleen bij POST geef je data als parameter van `send`. Dit kan bijv. met `FormData`, maar het kan ook een eenvoudige string zijn (vgl. de parameters bij GET).

### Opmerkingen en vragen

We kunnen het model goed scheiden van de views: voor het interface hiertussen hebben we de volgende functies:

* `renderTodos(todoList)` - hiermee signaleert het model de view(s);
    * aan de kant van de toepassing/views wordt hiervoor een actuele functie ingevuld.

Kunnen we het model ook scheiden van (a) de operaties op `localStorage`; (b) de interactie met de server?

#### localStorage

In sommige gevallen kan `localStorage.todoList` de waarde `"underfined"` krijgen (als string). Daar moeten we expliciet op controleren.

> Hoe komen we in een dergelijke situatie verzeild? Kunnen we dit ook voorkomen, bij het opslaan van de todoList in localStorage?

#### Types van attributen

De meeste attribuut-waarden zijn van type string - ook als deze een integer voorstellen. Dit betekent dat we bij het verwerken van een attribuut-waarde deze direct om moeten zetten naar een waarde van het juiste type.

> Ik kwam dit probleem op het spoor door het vervangen van de test `==` door `===`. In dit laatste geval vindt er geen automatische omzetting meer plaats van string naar int - en het resultaat was een `find` die niets vond, een index out of bounds - en uiteindelijk een type-fout (in `todoElt`).

#### nextId

Als we de lijst van Items bewaren, moeten we ook de `nextId` opslaan, om te voorkomen dat we een id dubbel gebruiken. (Of, we moeten nextId uitrekenen als de eerstvolgende id die groter is dan de max. id in de lijst...)

Een andere aanpak is om een random generator te gebruiken voor de identifiers. Als deze "random" genoeg is kunnen we deze ook gebruiken om identifiers te genereren die in gedistribueerd opzicht uniek zijn.

Als we de identifiers van MongoDB gebruiken dan hebben we dat min of meer automatisch.

#### sturing

De sturing (bijv. welke pagina/inhoud getoond wordt) vindt in dit geval voornamelijk plaats vanuit JavaScript: de server levert alleen de "kale data".

Een deel van de functionaliteit verschuift van de server (hier: Python) naar de browser (JavaScript):

* controle op de invoer van de gebruiker, bijvoorbeeld in het geval van een nieuw wachtwoord;
* sturing van de inhoud/pagina die getoond wordt;

### Testen

#### Testen van REST interfaces

* curl
* https://www.hurl.it
    * nb: dit kan alleen voor publieke website, niet voor lokale (localhost).
* https://www.runscope.com/oauth2_tool

### Meerdere pagina's?

Voor een toepassing kunnen we kiezen uit een enkele pagina met verschillende interface-onderdelen, of meerdere pagina's met per pagina een min of meer vast interface.

In een mobile-first toepassing gebruik je vaak meerdere pagina's, voor de verschillende soorten interactie. Programma's als Codiqa werken ook op deze manier. Het gebruikersinterface van een pagina is dan vast: dit wordt niet (of nauwelijks) beïnvloed door een "mode".

Als er meerdere pagina's zijn moet je ook een navigatie-systeem hebben.

Voor de todo-toepassing hebben we aan twee pagina's voldoende: de gebruikerspagina, en de todo-pagina.

### JSON resultaten

ALs we vanuit de server een JSON-resultaat willen terugsturen, dan moeten we dit ook in de header-informatie opgeven.

* `web.header('Content-Type', 'application/json')`

We kunnen in een JSON-resultaat eenvoudig een foutcode opnemen, bijvoorbeeld voor het geval dat er een nieuwe gebruiker aangemeld wordt terwijl de naam al in gebruik is.

### AJAX

* wat is de handigste "toestand" om een handler aan te koppelen? `load`?
* hoe controleer je het resultaat?
* welke handler(s) heb je nodig voor de afhandeling van fouten?

### Stappen

* [x] Uitproberen van AJAX, in browser (JS; asynchroon) en server (JSON resultaat).
* [ ] Inloggen van gebruiker, sessie-administratie via AJAX
* [ ] Opvragen (read) van de todo-list van de gebruiker via AJAX
* [ ] Creatie (create) van een todo-item via AJAX
* [ ] Aanpassen (update) van een todo-item via AJAX
* [ ] Verwijderen (delete) van een todo-item via AJAX