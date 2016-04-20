## Les 1: AJAX

In deze les behandelen we AJAX: de Asynchrone afhandeling in JavaScript van http-interacties met de server met XML of JSON response-documenten.

Deze aanpak heeft gevolgen voor de server-scripts (hier: Python) en voor de client-scripts (JavaScript):
* in de server leveren we voor een AJAX-request een JSON-document op als resultaat, in plaats van een HTML-document;
* in de browser versturen we de verzoeken vanuit JavaScript, in plaats van de automatische "submit" van HTML-forms.

Voorkennis:

* JSON formaat, omzetting tussen JSON en JS object of Python object;
* http-requests: GET, POST (PUT, DELETE)
* notatie van parameters in URLs (als `...?naam1=waarde&naam2=waarde2`)

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


### Experimenteren in de browser

De eerste stap is om de afhandeling van GET te testen in de browser. We kunnen dit gewoon via het URL-venster doen, bijvoorbeeld:

`http://localhost:8080/echo?par1=val1&par2=val2`

Als het goed is krijg je een respons van de vorm:

`{"par2": "val2", "par1": "val1"}`

Controleer nu het netwerkverkeer: het GET-request en de respons daarop, via de browser-tools:

Voor deze experimenten gebruiken we de browsertools:

* in FireFox: "netwerk" tab. Hier kun je de http-request en -response bekijken; 
    * je kunt het request aanpassen: via de sub-tab "Headers" je kunt de method en de parameters aanpassen, en het verzoek nogmaals indienen.
* in Chrome: gebruik Postman (een extensie).
    * met Postman kun je ook een collectie opdrachten aanmaken, voor bijv. een testset.
    * hoe kun je met Postman andere manieren van parameteroverdracht (bijv. bij POST) aangeven?
    * je kunt ook een vergelijkbare extensie in FireFox gebruiken.
    
Voor het proberen van andere http-methods, zoals POST en PUT, voegen we aan de JSON-respons ook de naam van de method toe, zodat je weet of de juiste functie gebruikt is.

### Parameters; URL encoding

**Probleem**: hoe geef je een parameter-*waarde* van de vorm `a&b=c` weer? Dat kan aanleiding geven tot een URL van de vorm: `par1=a&b=c&par2=value2`: je krijgt dan ineens een extra parameter, en de waarde van `par1` is dan `a` !?!

> Dit probleem kom je op veel verschillende plaatsen in de ICT tegen. Meestal los je dit op een "escape" te gebruiken voor de tekens die je niet mag gebruiken.

Parameter-waarden die je meegeeft in een URL (GET), of als text-parameters (POST), kunnen maar een beperkte tekenset gebruiken: je kunt bijvoorbeeld geen spaties gebruiken, en geen tekens die in een URL een speciale betekenis hebben. Als je toch dergelijke tekens wilt gebruiken, moet je de parameter-waarde *coderen*. De codering die je hiervoor gebruikt heet *URLencoding* of *URIencoding*. Om een string op deze manier te coderen heb je in JavaScript een speciale functie: `encodeURIcomponent(str)`.

> Naast het begrip "URL" (uniform resource locator") wordt ook "URI" gebruikt ("uniform resource identification"). Een URL is een adres: hiermee kun je de resource vinden. Een URI is, strikt genomen, alleen een naam: hdit helpt je niet altijd om de resource te vinden. Wij gebruiken beide termen vaak door elkaar: de meeste URIs die wij gebruiken zijn ook URLs. De naam van de JavaScript-functie is `encodeURIcomponent`. De naam van een overenkomstig formaat is `application/x-www-form-urlencoded`.

> Er zijn nog enkele subtiele varianten hiervan; bijvoorbeeld bij `application/x-www-form-urlencoded` moeten spaties voorgesteld worden door `+` in plaats van door `%20`. (En hoe geef je de `+` dan weer?) (Ik vind het onbegrijpelijk dat hiervoor verschillende varianten zijn; en dat er geen standaardfuncties zijn die dit ondersteunen.)

Als je invoer-waarden afkomstig van een gebruiken als parameter-waarde gebruikt, dan is het zeker nodig om deze te coderen: anders loop je het risico dat de hele parameterlijst in de war raakt, door bijvoorbeeld een invoerwaarde als `a=b&c=d` (dus met dezelfde tekens die in een parameterlijst voorkomen).

Voorbeeld:

### Volgende stap: JavaScript en asynchrone verwerking

De volgende stap is om het http-verzoek te versturen vanuit JavaScript in de browser.

Dit betekent dat we een pagina moeten hebben die geladen in vanuit dezelfde "origin". Wij gebruiken daarvoor de "index" pagina.

> Later zullen we zien hoe je omgaat met cross-origin verzoeken.

Suggestie:

* voor elke aanvraag een button en een uitvoer-veld;
* eventueel een invoer-veld waarin de gebruiker een invoerwaarde kan opgeven.
* demonstreren van de noodzaak van URL-encoding.

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



