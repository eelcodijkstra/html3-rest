## Todo-1

Dit is de implementatie van todo met behulp van jQuery.

We vervangen eerst de implementatie van de server-functies door jQuery calls. In een volgende stap kunnen we deze calls inline plaatsen: we hebben geen aparte functies meer nodig. NB: bij deze eerste stap moeten we er al rekening mee houden dat jQuery de transformatie van JSON-string naar JS object al voor zijn rekening neemt: de cont-functie heeft deze data als parameter, dus geen gedoe met `this.responseText`.

In de server moeten we rekening houden met de representatie van "done": de waarde `true` komt overeen met `done=true` als parameter (kleine letters!). De waarde false kan op twee manieren weergegeven worden: (i) de afwezigheid van `done` als parameter; een parameter `done=false`. De eerste vorm sluit aan bij de representatie van de checkbox in HTML, en van het formulier; de tweede vorm sluit beter aan bij een geprogrammeerd AJAX interface.

De omzetting van de http-parameters (POST, GET) in een Python boolean waarde ziet er dan als volgt uit: 

`done = "done" in data.keys() and data["done"] == "true"`

Een belangrijk onderscheid m.b.t. de DOM en de HTML-tekst is dat tussen *attributes* en *properties*. *attributes* horen bij de HTML-tekst, en zijn "statisch". *properties* horen bij de DOM, en zijn "dynamisch". 

> Zie de discussie over dit onderwerp bij jQuery: http://api.jquery.com/prop/.

(In de huidige versie van *todo* heb ik daar min of meer omheen geprogrammeerd, door steeds HTML-tekst te genereren, in plaats van het gebruik van de DOM.)

Voor de jQuery kunnen we gebruik maken van `$(elt).val()` - ook voor een checkbox.

jQuery biedt ook mogelijkheden om HTML-code aan te maken. Ik moet er echt mee experimenteren om te zien hoeveel eenvoudiger dat kan worden.

> Heeft jQuery ook mogelijkheden voor het manipuleren van de DOM, zonder het HTML-pad?

### Attributen, properties en values

* voor het opvragen en veranderen van de "value" van een input-element gebruik je `.val()` - in plaats van de property van het DOM-element.
    * dit levert consistentie-winst op, onder andere bij booleans (checkbox)
    * hoe werkt dit bij meervoudige keuzes?
*

### Event handlers: data

Je kunt in jQuery bij het koppelen (binding) van een handler aan een event(klasse) "data" meegeven die bij de actuele afhandeling beschikbaar is in het event-object dat aan de handler meegegeven wordt.

> Als dit een string is moet je een extra parameter (voor de selector) meegeven.

