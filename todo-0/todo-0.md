## Todo-0

Dit is de eerste versie van de AJAX/REST-implementatie van de todo-list. We proberen uit te vinden wat handige stappen zijn om deze web-app te ontwikkelen.

### Authenticatie

Een nieuw probleem bij deze implementatie is de manier waarop we authenticatie kunnen doen. We kunnen een veiliger implementatie gebruiken, door de wachtwoorden te versleutelen. (Dat lukt alleen bij het inloggen - bij het opgeven van een nieuw wachtwoord lukt dat niet. Een alternatief is dan om een nieuw wachtwoord langs een andere weg te verspreiden, bijvoorbeeld via e-mail.) Bij deze versleuteling gebruiken we dan een "salt" waarde vanuit de server om ervoor te zorgen dat een versleuteld wachtwoord niet opnieuw gebruikt kan worden.

> Deze aanpak is niet compleet veilig: het is altijd beter om https te gebruiken. Maar het is aanzienlijk veiliger dan het weglaten van deze versleuteling.

Een eventuele afluisteraar kan weten met welke codes het wachtwoord versleuteld is; en, welke methode gebruikt wordt voor het versleutelen. Het wachtwoord kan dan gekraakt worden door allerlei wachtwoorden te proberen, en te zien of dit eenzelfde versleutelde waarde geeft. 

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

| URL | reqest | resultaat |

Voor al deze opdrachten is het resultaat in JSON-representatie.

(De enige niet-JSON representatie is voor de hele toepassing.)

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

