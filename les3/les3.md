## Les 3: combineren van AJAX en REST

In deze les laten we zien hoe je de AJAX- en REST-principes kunt combineren voor het maken van een eenvoudige toepassing: de todo-lijst.

We gebruiken twee verzamelingen (collections): gebruikers en todo-lijsten. Een gebruiker heeft 1 todo-lijst; via de gebruiker identificeer je de lijst. 

> Koppelen we deze lijst direct aan een gebruiker? Hebben we dan ook een vorm van authenticatie nodig?

> Hoe kunnen we het interface uitbreidbaar maken zodat we later meerdere todo-lijsten per gebruiker kunnen hebben?

## Gebruikers

* een gebruiker heeft een unieke naam;
* een gebruiker heeft een wachtwoord;
* een gebruiker heeft een (of meer) todo-lijst;
* een gebruiker heeft een unieke identificatie - deze wordt door het systeem toegewezen;

## Todo-lijsten

* een todo-lijst geeft een unieke identificatie - deze wordt door het systeem toegewezen;
* een todo-lijst bestaat uit o of meer todo-items;


* een todo-item heeft een unieke identificatie - deze wordt door het systeem toegewezen;
* een todo-item bevat een onderwerp en een status ("done").
    * beide kunnen veranderd worden (via de API).
    
## front-end architectuur

We moeten een manier hebben om de verschillende aspecten van het front-end bijeen te brengen:

* interactie met de gebruiker (input-elementen);
* display van de todo-lijsten (enz);
* interactie met de server (todo-lijsten, items, users);

De architectuur legt vast (in de vorm van een patroon) hoe deze onderdelen samenhangen.

We willen bij voorkeur een architectuur die uitbreidbaar is: als we met meerdere modellen te maken krijgen, moeten deze eenvoudig toegevoegd kunnen worden.

Bij voorkeur gebruiken we een *compositie* van onderdelen: we kunnen een onderdeel toevoegen zonder dat we daarvoor andere onderdelen hoeven te veranderen. Bovendien kunnen we profitere van de combinatie van deze onderdelen, en niet alleen van de "optelsom".

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

De beschrijving van jQuery `error` suggereert dat http-fouten ook door deze functie afgehandeld worden.



    