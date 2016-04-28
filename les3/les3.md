## Les 3: jQuery

In de vorige lessen hebben we "puur" JavaScript gebruikt in de browser. Een veelgebruikte JavaScript-library is jQuery. Door het gebruik van jQuery kun je veel voorkomende constructies vaak veel korter en handiger noteren dan wanneer je "ouur" JavaScript gebruikt.

In deze les introduceren we het gebruik van jQuery: we laten zien hoe de voorbeelden die we eerder gezien hebben, eenvoudiger genoteerd kunnen worden met behulp van jQuery.

> Het gebruik van dergelijke libraries loopt vaak vooruit op nieuwe mogelijkheden in de browser en in JavaScript.

Aspecten die aan de orde komen:

* selectie van DOM-onderdelen
* manipuleren van de DOM (o.a. in plaats van HTML)
* AJAX
* chaining in jQuery
* Promises
* chaining in Promises

Eventueel kunnen we in een aparte les ook de opmaak introduceren, bijvoorbeeld met Bootstrap.

> Er is een aparte jQeury-library voor het user-interface. (Deze is wat minder populair dan bijv. Bootstrap?)

## Het signaleren en afhandelen van fouten

We gebruiken de aanpak zoals we in de vorige les beschreven hebben:

* de http-code beschrijft of een operatie geslaagd is of niet:
    * 200 (en evt. 201): geslaagd;
    * 400: niet geslaagd, door foutief gebruik van de API;
    * 500: niet geslaagd, door interne server-problemen.
* bij het gebruik van AJAX geven we functies mee voor het afhandelen van de succes-situatie (200) en van de foutsituaties.

Vragen:

* handelt XMLHttpRequest http-errors (400, 500) af via de "error" event/functie?
    * ik vind de documentatie/specificatie hiervan ronduit slecht: ik kan dit nergens beschreven vinden: niet in de standaard, en niet in de jQuery-documentatie. (De web-specificaties zijn in het algemeen een orde slechter van kwaliteit dan de internet-specificaties.)
* kun je in het antwoord (document?) ook een beschrijving geven van de fout?
    * vgl. het gebruik van een speciale "404 page".
    * je kunt in plaats van een html-document ook een JSON-document als resultaat opleveren. (Zie les 2-code.)

Voorlopige antwoorden:

De "load" handler wordt aangeroepen ook in het geval van http-foutcodes. Je moet dan in deze handler controleren op de status van het resultaat.

De beschrijving van jQuery `error` suggereert dat http-fouten ook door deze functie afgehandeld worden. Uit de test blijkt dat dit inderdaad het geval is. (Dit is meer in overeenstemming met de manier waarop wij e.e.a. willen gebruiken.) In dit geval kun je via het xhr-object het response-document (bijv. in JSON-formaat) achterhalen.

De manier waarop jQuery met de resultaten van AJAX-requests omgaat is veranderd: in plaats van callback functions, wordt gebruik gemaakt van promises(?):

```js
$.ajax({
  url: "myurl",
  method: "GET"
}).done(function (data, status, xhr) {
}).fail(function (xhr, status, error) {
})

```

NB: dit is nog niet de promise-versie; in dat geval schrijf je:

```
$.ajax({
  url: "myurl",
  method: "GET"
}).then(function ok (data, status, xhr) {
}, function error(xhr, status, error) {
})
```

In dit geval zijn de functies *filters*: het functieresultaat is het resultaat van de then(?).

Een "probleem" in dit geval is dat deze constructie niet direct duidelijk is, in tegenstelling tot de notatie met de callbacks. Dit wordt dan een voorbeeld: zo moet je het schrijven, en dit betekent het... maar je hoeft niet te begrijpen hoe dit werkt... Zoiets vind ik in het algemeen minder bevredigend.

De notatie met `.done` en `.fail` is nog enigszins uit te leggen: het resultaat van `.ajax` is een object waarvan je verschillende onderdelen kunt invullen, ook nadat dit object als resultaat van `.ajax` is opgeleverd.

## Promises

Er zijn twee manieren om "flow" weer te geven: `a(); b();` - opeenvolgende opdrachten, en `f(g(x))` - samenstelling van functies. Voor synchrone procedures en functies kunnen we deze beide gebruiken. Voor *asynchrone* procedures en functies is eigenlijk alleen een variant van de eerste vorm mogelijk: je geeft een handler aan die aangeroepen wordt als de betreffende event optreedt.

Hoe kun je werken met functieresultaten, in het asynchrone geval?

* het eigenlijke resultaat is asynchroon beschikbaar;
* je kunt werken met een soort "lazy resultaat".
* het resultaat kan ook "failure" zijn: immers, deze asynchrone operaties hebben meestal te maken een interactie met externe agents die kan falen (doordat de communicatie faalt, of doordat de externe agent faalt).

Er is een verschil tussen de events die je aan een UI-element koppelt, en de events die optreden bij een asynchrone interactie zoals AJAX. In het eerste geval (i) treden er meerdere events op; (ii) is er geen sprake van failure; 

Met andere woorden: je wilt AJAX-events op een veel preciezere manier opvangen.

De functies die je meegeeft aan `then` hebben 1 argument - en kunnen in principe ook een resultaat opleveren. Dit resultaat wordt dan het argument van de overeenkomstige functie in de volgende `then`. (Dit is iets subtieler: het resultaat van een functie als `then`-argument moet weer een promise zijn.)

NB: de AJAX-functies in jQuery zijn niet helemaal vergelijkbaar met Promises, zie o.a. http://www.html5rocks.com/en/tutorials/es6/promises/. De functies die je meegeeft hebben meer dan 1 argument - en lenen zich daardoor niet goed voor "chaining". Het is in zekere zin bijzonder dat jQuery, waar chaining zo'n grote rol speelt in de architectuur/principes, dit aspect niet in dezelfde geest opgelost heeft.

> In de nieuwe versie van jQuery, 3.x (nu nog in Beta), zijn deze verschillen verdwenen: jQuery houdt zich aan de promises-A+ regels.

* [HTML5 Rocks](http://www.html5rocks.com/en/tutorials/es6/promises/)
* [MDN Promises](https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Global_Objects/Promise)
* [promisesjs.org](https://www.promisejs.org/)
* [Bluebird](http://bluebirdjs.com/docs/api-reference.html)
* [vasanthk](http://www.vasanthk.com/jquery-promises-and-deferred-objects/)