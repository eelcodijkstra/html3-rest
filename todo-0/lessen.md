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