<?php
// logger.php

// 1. Pfad und Name der Log-Datei festlegen
// Wichtig: Stelle sicher, dass der Ordner 'logs' existiert und der Server Schreibrechte dafür hat.
$logFile = __DIR__ . '/logs/visitors.log';

// 2. Zeitzone auf die lokale Zeit einstellen (z.B. Berlin)
date_default_timezone_set('Europe/Berlin');

// 3. Die Daten erfassen
$ipAddress = $_SERVER['REMOTE_ADDR'];
$dateTime = date('Y-m-d H:i:s');

// 4. Den Eintrag für die Log-Datei formatieren
// Jede Information wird durch " | " getrennt und am Ende wird ein Zeilenumbruch hinzugefügt.
$logEntry = $dateTime . " | IP: " . $ipAddress . PHP_EOL;

// 5. Den Eintrag in die Log-Datei schreiben
// FILE_APPEND sorgt dafür, dass neue Einträge hinzugefügt und alte nicht überschrieben werden.
// LOCK_EX verhindert, dass zwei Besucher gleichzeitig in die Datei schreiben.
file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX);
