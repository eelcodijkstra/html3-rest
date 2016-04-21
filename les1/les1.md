## Les 1: AJAX

In deze les behandelen we AJAX: de Asynchrone afhandeling in JavaScript van http-interacties met de server met XML of JSON response-documenten.

Deze aanpak heeft gevolgen voor de server-scripts (hier: Python) en voor de client-scripts (JavaScript):
* in de server leveren we voor een AJAX-request een JSON-document op als resultaat, in plaats van een HTML-document;
* in de browser versturen we de verzoeken vanuit JavaScript, in plaats van de automatische "submit" van HTML-forms.

Voorkennis:

* JSON formaat, omzetting tussen JSON en JS object of Python object;
* http-requests: GET, POST (PUT, DELETE)
* notatie van parameters in URLs (als `...?naam1=waarde&naam2=waarde2`)
* gebruik van functie als variabele of als parameter; event-handling

### Server: echo-URL

Voor de experimenten zorgen we ervoor dat we een echo-url hebben: deze stuurt de data van het request terug als JSON-document.

We beginnen met de GET-opdracht:

```python
import json

urls = (
    '/echo', 'Echo', ...
    )
    
class Echo:
    def GET(self):
        web.header('Content-Type', 'application/json')
        return json.dumps(web.input())
```

Opmerkingen hierbij:

* om een JSON-document als resultaat op te leveren, moet je dit ook aangeven in de header van het antwoord. Het content-type voor JSON is `application/json`.
* je kunt een Python-object omzetten in json-vorm met behulp van de functie `json.dumps`. Je moet dan wel eerst de json-module importeren: `import json`. 

Op dezelfde manier kunnen we voor deze class Echo de functies definiëren voor het afhandelen van de `POST`, `PUT` en `DELETE` opdrachten. (zie `les1.py`)


### Testen van het JSON-interface

De eerste stap is om de afhandeling van GET te testen. We kunnen dit gewoon via het URL-venster van de browser doen, bijvoorbeeld:

`http://localhost:8080/echo?par1=val1&par2=val2`

Als het goed is krijg je een respons van de vorm:

`{"par2": "val2", "par1": "val1"}`

Controleer nu het netwerkverkeer: het GET-request en de respons daarop, via de developer tools in de browser. Hiermee kun je de verschillende onderdelen van het verzoek en van de respons bekijken, o.a. de headers en de inhoud.

Voor het testen van de andere http-"methods", zoals POST, PUT en DELETE, kunnen we dit het URL-venster van de browser niet gebruiken. We hebben dan andere hulpmiddelen nodig.

Voor deze experimenten gebruiken we de browsertools:

* in FireFox: "netwerk" tab. Hier kun je de http-request en -response bekijken; 
    * je kunt het request aanpassen: via de sub-tab "Headers" je kunt de method en de parameters aanpassen, en het verzoek nogmaals indienen.
    * een uitgebreider alternatief is de FireFox-extensie HttpRequester. (Er zijn meer van dergelijke extensies.)
* in Chrome: gebruik Postman (een extensie).
    * met Postman kun je ook een collectie opdrachten aanmaken, voor bijv. een testset.
    * hoe kun je met Postman andere manieren van parameteroverdracht (bijv. bij POST) aangeven?
    
Voor het proberen van andere http-methods, zoals POST en PUT, voegen we aan de JSON-respons ook de naam van de method toe, zodat je weet of de juiste functie gebruikt is.

### Volgende stap: JavaScript en asynchrone verwerking

De volgende stap is om het http-verzoek te versturen vanuit JavaScript in de browser.

Dit betekent dat we een pagina moeten hebben die geladen in vanuit dezelfde "origin". Wij gebruiken daarvoor de "index" pagina.

> Later zullen we zien hoe je omgaat met cross-origin verzoeken.

In deze pagina hebben we twee manieren om http-verzoeken naar de server te sturen gecombineerd: (i) de traditionele manier, met behulp van een formulier (form); (ii) de AJAX-aanpak. Je kunt dan via de developer-tools deze beide methodes vergelijken.

Voor de AJAX-aanpak van GET gebruiken we de volgende functie:

```js
function handleGet() {
  var par1 = par1Input.value;
  var par2 = par2Input.value;
  var req = new XMLHttpRequest();
  req.addEventListener("load", handleAjaxResponse);
  req.open("GET", "echo" + "?par1=" + par1 + "&par2=" + par2);
  req.send();
}
```

* de parameters voor de GET voegen we toe als onderdeel van de URL. We krijgen dan bijvoorbeeld een URL van de vorm: `echo?par1=hallo&par2=wereld`.
* een AJAX-request maakt gebruik van een `XMLHttpRequest`. In dit object wordt de hele administratie van het request bijgehouden. (i) eerst maak je een dergelijk object aan; (ii) vervolgens vul je de verschillende elementen in; (iii) tenslotte stuur je het verzoek naar de server (`send`).
* je vult in dit object o.a. in met welke functie de respons afgehandeld moet worden. Dit kun je zien als een handler voor de "load" event van deze respons.


Voor het afhandelen van de respons gebruiken we de volgende functie:

```js
function handleAjaxResponse() {
  alert(this.responseText);
}
```

Suggestie:

* voor elke aanvraag een button en een uitvoer-veld;
* eventueel een invoer-veld waarin de gebruiker een invoerwaarde kan opgeven.
* demonstreren van de noodzaak van URL-encoding.
* andere manieren om data (parameters) mee te geven, o.a. `FormData`.

### Parameters; URL encoding

**Probleem**: hoe geef je een parameter-*waarde* van de vorm `a&b=c` weer? Dat kan aanleiding geven tot een URL van de vorm: `par1=a&b=c&par2=value2`: je krijgt dan ineens een extra parameter, en de waarde van `par1` is dan `a` !?!

> Dit probleem kom je op veel verschillende plaatsen in de ICT tegen. Meestal los je dit op een "escape" te gebruiken voor de tekens die je niet mag gebruiken.

Parameter-waarden die je meegeeft in een URL (GET), of als text-parameters (POST), kunnen maar een beperkte tekenset gebruiken: je kunt bijvoorbeeld geen spaties gebruiken, en geen tekens die in een URL een speciale betekenis hebben. Als je toch dergelijke tekens wilt gebruiken, moet je de parameter-waarde *coderen*. De codering die je hiervoor gebruikt heet *URLencoding* of *URIencoding*. Om een string op deze manier te coderen heb je in JavaScript een speciale functie: `encodeURIcomponent(str)`.

> Naast het begrip "URL" (uniform resource locator") wordt ook "URI" gebruikt ("uniform resource identification"). Een URL is een adres: hiermee kun je de resource vinden. Een URI is, strikt genomen, alleen een naam: hdit helpt je niet altijd om de resource te vinden. Wij gebruiken beide termen vaak door elkaar: de meeste URIs die wij gebruiken zijn ook URLs. De naam van de JavaScript-functie is `encodeURIcomponent`. De naam van een overenkomstig formaat is `application/x-www-form-urlencoded`.

> Er zijn nog enkele subtiele varianten hiervan; bijvoorbeeld bij `application/x-www-form-urlencoded` moeten spaties voorgesteld worden door `+` in plaats van door `%20`. (En hoe geef je de `+` dan weer?) (Ik vind het onbegrijpelijk dat hiervoor verschillende varianten zijn; en dat er geen standaardfuncties zijn die dit ondersteunen.)

Als je invoer-waarden afkomstig van een gebruiken als parameter-waarde gebruikt, dan is het zeker nodig om deze te coderen: anders loop je het risico dat de hele parameterlijst in de war raakt, door bijvoorbeeld een invoerwaarde als `a=b&c=d` (dus met dezelfde tekens die in een parameterlijst voorkomen).

Voorbeeld:

### Volgende lessen:

* REST interfaces (server)
* de todo-toepassing in AJAX
* Authenticatie; users; sessions?
* jQuery (voor AJAX; DOM; ...)
* de todo-toepassing in AJAX met jQuery
* afhandeling van statische resources (in Python)?
* JSON/BSON? (of is dat voorkennis? herhaling?)

speciale constructies:

* event-handlers
* continuation functions
* promises
* asynchroons programmeren - vgl. ook database-queries in de browser



