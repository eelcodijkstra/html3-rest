## Lessen bij Ajax-REST

Met behulp van AJAX kun je interactieve en "responsive" websites maken, die snel reageren op 

Een nadeel van de traditionele aanpak voor de interactie met de server, met behulp van formulieren, is dat je als gebruiker regelmatig moet wachten totdat er een nieuwe pagina geladen is. Tijdens dit wachten is interactie met de gebruiker niet mogelijk. Een ander nadeel is dat steeds een complete pagina opgestuurd wordt vanuit de server, terwijl het vaak gaat om kleine hoeveelheden data.

De AJAX-aanpak maakt het mogelijk om "responsieve" websites en web-apps te maken, die blijven reageren op de interactie van de gebruiker - ook als er een interactie met de server gaande is.

Deze aanpak berust op de volgende elementen:

* **A**synchroon: de browser wacht niet totdat de respons van de server compleet is, voordat deze verder gaat. In het bijzonder blijft interactie met de gebruiker daardoor mogelijk;
* **JA**vaScript: de interactie met de server verloopt niet via formulieren met "POST" of "GET" acties. De http-verzoeken worden vanuit JavaScript verstuurd; dit kunnen ook "PUT" en "DELETE"-verzoeken zijn, waardoor er meer soorten interactie met de server mogelijk zijn;
* **X**: de respons van de server is geen complete HTML-pagina, maar data in een semi-gestructureerd formaat, bijvoorbeeld XML of JSON. (Oorspronkelijk werd XML gebruikt, vandaar de "X"; tegenwoordig is het JSON-formaat gebruikelijk.)



In deze lessen behandelen we de volgende onderwerpen:

* asynchrone afhandeling van externe gebeurtenissen (zoals: interactie van een gebruiker, response van een server; maar ook: lezen van een lokaal bestand of uitvoeren van een database-query);
* REST: een "API" van een server kan georganiseerd zijn volgens de REST-architectuur-principes; een onderdeel hiervan is de manier waarop URLs en http-verzoeken samenhangen met CRUD-operaties: create, read, update, delete.

## Asynchrone afhandeling van events

Een event is een externe gebeurtenis: het initiatief voor deze event ligt buiten het systeem.

De bron van een event kan bijvoorbeeld de gebruiker zijn, of de server.

> Ook het filesysteem of een database kan de bron van een event zijn.

Je kunt ook op een andere manier naar events kijken: het tijdstip waarop de event plaatsvindt is niet te voorspellen. 

Een verschil tussen de event-handling bij gebruikersinterfaces en events in het geval van AJAX is dat in het laatste geval de relatie veel dynamischer is. Vanuit het systeem wordt een externe gebeurtenis geïnitieerd die op een bepaald (onzeker) moment in de toekomst kan(!) optreden. (Dit laatste is onzeker, omdat bijvoorbeeld de server niet kan reageren.)

### Waarom asynchroon?

De normale manier van werken in JavaScript of Python is dat de uitvoering van een opdracht afgerond is voordat de volgende opdracht uitgevoerd wordt. In `opdracht1; opdracht2` begint de uitvoering van `opdracht2` nadat `opdracht1` klaar is. Deze manier van werken heet `synchroon`.

> Dit is een andere betekenis van synchroon dan gebruikelijk voor digitale hardware: in een synchrone schakeling stuurt een centraal kloksignaal de verschillende onderdelen aan.

Deze synchrone manier van werken levert een probleem als de uitvoering van een opdracht vooral bestaat uit wachten: soms is er ander werk te doen dat dan onnodig blijft liggen. Bovendien is een computer die wacht "doof" voor de interactie van de gebruiker.

Wanneer is dit wachten een probleem? Het gaat dan vooral om de verhouding tussen de wachttijd en de snelheid van de computer. Enkele voorbeelden:

| Operatie         | Wachttijd (typisch) | # instructies |
| :---             | :---                | :---          |
| schijf-operatie  | 10msec              | 10.000.000    |
| server-request   | 500 - 5000msec      | 500.000.000 - 5.000.000.000 |
| dabatase-query   | 100 -1000msec       | 100.000.000 - 1.000.000.000 |

De kolom met het aantal instructies geeft aan hoeveel instructies een redelijk normale processor (een enkele CPU van ca. 1GHz) in de wachtperiode kan uitvoeren. Moderne processoren hebben vaak meerdere CPUs, en ook een iets hogere kloksnelheid: het aantal instructies in de wachtperiode wordt dan nog veel groter.

Uit deze tabel blijkt dat de wachttijd zinvol gebruikt kan worden voor andere opdrachten. Bovendien is de wachttijd soms zo groot dat dit niet alleen de computer, maar ook de gebruiker opvalt: een vertraging van 100 msec (0,1 s) is voor mensen al duidelijk (en soms hinderlijk) waarneembaar.

In sommige gevallen, zoals bij een database-transactie of bij een server-request, is het mogelijk dat de opdracht niet normaal afgerond kan worden: de uitvoering mislukt, of duurt te lang (time-out).

Bij een asynchrone opdracht wordt een begin gemaakt met de uitvoering, totdat de wachtperiode begint: dan wordt de volgende opdracht uitgevoerd. Het afronden van de uitvoering van de asynchrone opdracht is een soort *event*: deze resulteert in de aanroep van de *handler*.

```
function startAsynch(pars, cont) {
  var req = new Request();
  req.completedHandler = cont;
  ...
  req.send();
}

function handleResponse(result) {
  ...process result...
}

startAsynch(..., handleResponse);
opdracht2;

```

Dergelijke asynchrone opdrachten komen soms in een reeks (volgorde, sequentie) voor: je stuurt eerst een verzoek naar de server; bij de verwerking van het antwoord (response) is een volgend verzoek naar de server nodig, enz. Een dergelijke reeks kan erg onoverzichtelijk worden als je deze op de "normale" manier programmeert, met een functie-parameter voor de vervolgactie.

Vaak hebben we te maken met een uitgebreider interface, met meerdere functies: een functie voor het geval de opdracht normaal afgerond is, en één of meer functies voor abnormale situaties.

In de handler-functie hebben we de informatie nodig van het resultaat van de voorafgaande bewerking - bijvoorbeeld het resultaat verkregen van de server, en informatie uit de omgeving waarin de opdracht geactiveerd is. Dit laatste is vaak lastig te organiseren. Hiervoor kunnen we de volgende constructies gebruiken:

* een object met deze omgevings-informatie;
    * we kunnen daarvoor in het geval van AJAX mogelijk het XmlHttpRequest-object voor gebruiken: dit is de `this` bij de aanroep van de handler voor de verschillende soorten AJAX-events.
* een *closure*-functie: de functie bevat zelf de betreffende informatie, als onderdeel van de context.

Voorbeeld?

* in de todo-list opdrachten hebben we te maken met lokale gegevens, zoals de `userid`, en gegevens vanuit de server. Voor de `userid` kunnen we een globale variabele gebruiken: deze is uniek en verandert niet tussen de verschillende verzoeken. Maar soms hebben we met een meer veranderlijke context te maken, of met verschillende contexten (denk bijvoorbeeld aan een tabel van todo-lijsten).


### Oefenen?

Op welke manier kun je oefenen met deze concepten? Welke misconcepties kunnen hierbij bestaan? Welke fouten kun je maken?

Regels:

* de afhandeling van een synchrone opdracht mag geen wachttijd bevatten. (En eigenlijk ook geen zwaar rekenwerk.)
* 

### Opmerkingen

We hebben soms te maken met een keten van asynchrone opdrachten. Dit komt niet alleen in web-apps voor: ook in het geval van Arduino's hebben we met een dergelijke situatie te maken. Kunnen we daar een eenvoudige vorm van promises vormgeven?

Bij Arduino's hebben we ook expliciete wachttijd, meestal om de timing van een output goed te krijgen.

In de server-software kun je ook verzoeken naar andere servers sturen; dat is zelfs niet ongebruikelijk. Daarbij loop je het risico dat je de tijdslimiet van de afhandeling van een request (in de server) overschrijdt. Je moet dan niet teveel van dergelijke requests in een keten hebben.

Waar in de informatica (of daarbuiten) kom je soortgelijke problemen tegen? Op welke manieren wordt het probleem daar opgelost?

> In de wereld van de concurrency (en van de protocollen) kom je soortgelijke situaties tegen. Als er sprake is van meerdere onafhankelijke agents moet je er altijd rekening mee houden dan een externe agent geblokkeerd raakt (of dat er geen bericht overkomt).

In NetLogo heb je ook te maken met verschillende agents die in zekere zin autonoom zijn.

De eenvoudigste vorm van "reactieve software" is IFTTT: als er een bepaald soort event plaatsvindt, voer dan deze actie uit. (Dit gaat altijd om een event - niet om een conditie; een conditie is niet altijd eenvoudig waarneembaar, een event is in principe waarneembaar.)

Bij de server heb je ook te maken met een event-systeem: elk request is eigelijk een asynchrone event. De requests zijn onderling (grotendeels) onafhankelijk. (Bovendien is er geen gemeenschappelijke toestand - anders dan via persiste data zoals een bestand of een database.)

## REST

Bij het ontwerp van een website moet je ook nadenken over de structuur van de URLs. Voor onze web-app gebruiken we een API dat gebaseerd is op de REST-principes (Representational State Transfer).

> Omdat we alle interacties met de server via AJAX doen, kunnen we de structuur van de toepassing (de pagina's zoals de gebruiker deze ziet) loskoppelen van de structuur van de API.

In een REST-API hangen de URLS en de http-verzoeken op een afgesproken manier samen met de CRUD-operaties (Create, Read, Update, Delete) zoals je die bijvoorbeeld ook bij een database tegenkomt. Voor ons voorbeeld hebben we te maken met een collectie van todo-items, en met een enkel todo-item:

| URL       | request | effect      | resultaat     |
| :---      | :---    | :---        | :---          |
| /todos    | GET     | read list   | todo-list     |
| /todos    | POST    | create item | todo item 42  |
| /todos/42 | GET     | read        | todo-item 42  |
| /todos/42 | PUT     | update      | todo-item(?)  |
| /todos/42 | DELETE  | delete      | (?)           |
| /todos/42 | PUT     | update      | (?)           |
| /todos    | GET     | read list   | todo-docs     |

Hierin is `42` de identificatie van het betreffende item; dit zal in veel gevallen een getal zijn. (Vaak gebruiken we hiervoor een groot "random" getal, zoals de identificatie van een MongoDB-document.)

Naast de todo-lijsten (collecties) hebben we ook te maken met een collectie van gebruikers. Deze kunnen we op dezelfde manier behandelen.

In sommige gevallen willen we benadrukken dat we met de todo-lijst van een bepaalde gebruiker te maken hebben. We kunnen dit uitdrukken door een URL: `/users/id/todos`. Op eenzelfde manier kunnen we spe

### Opmerkingen

Veel webdiensten gebruiken een REST-API. Hierdoor is het voor een gebruiker van een dergelijke webdienst vaak snel duidelijk hoe dit API gebruikt moet worden: dat vraagt minder documentatie, en levert minder misverstanden op.

Er zijn ook hulpmiddelen voor het ontwerpen van een dergelijk API.

Voor het testen van een dergelijke API zijn ook de nodige hulpmiddelen beschikbaar. (Je kunt een REST-API niet testen vanuit het URL-venster van de browser, omdat dit alleen GET-verzoeken kan genereren.)

Je kunt in een web-app gebruik maken van de APIs van je eigen server, maar ook van de APIs van andere diensten. Dit kan vanuit de client (browser), via AJAX; het kan ook vanuit de server. Bij het gebruik van APIs vanuit de browser heb je te maken met extra security-problemen zoals "cross site scripting" (XSS). De browsers controleren daarop, en staan (tegenwoordig) alleen cross-site verzoeken toe die aan de CORS-regels voldoen. (CORS: Cross Origin Resource Sharing, zie bijv. [Wikipedia-CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)).

### Andere onderwerpen

* gebruik van functies voor het representeren van de state (voorbeeld: selectiefuncties). Dit is ook een voorbeeld van het gebruik van functies voor het uitstellen van bewerkingen.
* verschillende representaties van het model: in de server (Python; MongoDB - niet noodzakelijk gelijk); in de API (JSON, parameters); in de client (JS, JSON - localStorage). We moeten rekening houden met de eisen van de verschillende omgevingen, bijvoorbeeld voor de representatie van getallen, id's en booleans; en we moeten deze verschillende representaties op de geschikte plaatsen omzetten.
* controleren van invoer van de gebruiker (valideren, en eventueel filteren i.v.m. security).
* gebruik van `data` attribuut in HTML/DOM. Wij gebruiken dit vooral voor het koppelen van een html-element aan het betreffende model-element.
* gebruik van APIs van derden; vanuit de browser; en vanuit de server.
* CORS, bij het gebruik van APIs van derden vanuit de browser. (NB: dit kan ook van belang zijn voor de server, als je je diensten aan andere web-apps wilt aanbieden.)
* begrip "architectuur", als de manier waarop de verschillende onderdelen samenhangen - zowel in een systeem als in een "ecosysteem". (Een systeem heeft een enkele eigenaar/verantwoordelijke; in een ecosysteem heb je met heel veel verschillende partners te maken - die zich niet noodzakelijk altijd netjes gedragen.)
* testen van de verschillende onderdelen: testen (en test-driven development) is al een lastig thema voor beginners; dit wordt niet eenvoudiger in een client-server situatie, waarin bovendien er niet altijd sprake is van een sterke koppeling tussen de client en de server. Daarnaast hebben we ook nog te maken met het database-interface.
* reactive systems. (Zie bijvoorbeeld: https://en.wikipedia.org/wiki/Reactive_system.) Wat is het verschil met het asynchrone patroon dat we eerder beschreven hebben bij AJAX?
    * hoe kun je een reactive dienst aanbieden - die gebruik maakt van services elders? Je moet dan ook op het niveau van de service met een continuation werken?
    * asynchrone communicatie is een voorbeeld van *decoupling* - n.l. wat de tijd (volgorde?) betreft.
    * hoe zit dat met *promises* van services die andere services gebruiken? Moet je die andere service buiten de promise laten?

#### Verschillende representaties

* in JSON is de representatie van booleans: `true` en `false`, zonder string-quotes. Er is dus een verschil tussen de boolean waarde `true` en de string-waarde `"true"`.
* in de parameters van een HTTP-request (GET of POST) kun je alleen maar string-waardes opnemen, net zoals in een HTML-formulier (value="true"). Je kunt hierin geen verschil maken tussen boolean waarden en strings.
* een checkbox kun je zien als de representatie van een boolean waarde. Deze waarde wordt in HTML (c.q. DOM) weergegeven als de *aanwezigheid* of *afwezigheid* van het attribuut `checked`, waarbij de waarde van dit attribuut niet van belang is. Bij de overgang van en naar deze HTML-representatie moeten we zorgen voor de juiste vorm (representatie).
