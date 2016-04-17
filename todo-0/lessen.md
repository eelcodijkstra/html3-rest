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

function handleResponse() {
}

startAsynch(..., handleResponse);
opdracht2;

```

Dergelijke asynchrone opdrachten komen soms in een reeks (volgorde, sequentie) voor: je stuurt eerst een verzoek naar de server; bij de verwerking van het antwoord (response) is een volgend verzoek naar de server nodig, enz. Een dergelijke reeks kan erg onoverzichtelijk worden als je deze op de "normale" manier programmeert, met een functie-parameter voor de vervolgactie.

