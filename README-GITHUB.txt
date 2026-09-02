INSTALLATION AUF GITHUB PAGES

1. index.html und update-calendars.mjs kommen in das Hauptverzeichnis des Repositorys.
2. Lege im Repository den Ordner .github/workflows an.
3. Lege update-calendars.yml in .github/workflows ab.
4. Öffne auf GitHub den Bereich Actions und starte "Kalender aktualisieren" einmal über "Run workflow".
5. Nach erfolgreichem Lauf entsteht automatisch der Ordner calendar-data mit elf ICS-Dateien.
6. Warte kurz auf die Aktualisierung von GitHub Pages und lade das Dashboard auf dem iPad neu.

Danach aktualisiert GitHub die Kalender automatisch alle 15 Minuten. Die Schaltfläche
"Aktualisieren" lädt den jeweils letzten von GitHub gespeicherten Stand sofort neu.

Falls GitHub beim Speichern eine Berechtigungsfehlermeldung zeigt:
Repository > Settings > Actions > General > Workflow permissions > Read and write permissions
auswählen und speichern.
