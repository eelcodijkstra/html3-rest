## Todo-1

Dit is de implementatie van todo met behulp van jQuery.

We vervangen eerst de implementatie van de server-functies door jQuery calls. In een volgende stap kunnen we deze calls inline plaatsen: we hebben geen aparte functies meer nodig. NB: bij deze eerste stap moeten we er al rekening mee houden dat jQuery de transformatie van JSON-string naar JS object al voor zijn rekening neemt: de cont-functie heeft deze data als parameter, dus geen gedoe met `this.responseText`.

In de server moeten we rekening houden met de representatie van "done": de waarde `true` komt overeen met `done=true` als parameter (kleine letters!). De waarde false kan op twee manieren weergegeven worden: (i) de afwezigheid van `done` als parameter; een parameter `done=false`. De eerste vorm sluit aan bij de representatie van de checkbox in HTML, en van het formulier; de tweede vorm sluit beter aan bij een geprogrammeerd AJAX interface.
