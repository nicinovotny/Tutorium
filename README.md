# 🎓 Face-Tracking Filter Webapp - Dokumentation

## Projektübersicht

Diese Webapp ist ein interaktives Face-Tracking-System, das mithilfe von MediaPipe Face Mesh verschiedene Filter (Hut, Brille, Rahmen) in Echtzeit auf erkannte Gesichter anwendet. Das Projekt wurde im Rahmen des Online Marketing 2 Kurses entwickelt und demonstriert moderne Webtechnologien für AR-ähnliche Anwendungen.

## 🚀 Features

- **Echtzeit-Gesichtserkennung** mit MediaPipe Face Mesh
- **3 verschiedene Filter**: Studentenhut, Sonnenbrille, Rahmen
- **Intelligente Positionierung** je nach Filtertyp
- **Kopfbewegungen-Tracking** mit Rotation und Tiefeneffekt
- **Responsive Design** für verschiedene Bildschirmgrößen
- **Professionelle UI** mit Ladeanimation und Statusanzeige

## 📁 Projektstruktur

```
Tutorium/
├── face_tracker_complete.html    # Hauptanwendung (vollständig)
├── template.html                 # Basis-Template (einfache Version)
├── tracker.js                    # Einfache JavaScript-Logik
├── hut.png                       # Studentenhut-Filter
├── Brille.png                    # Sonnenbrille-Filter
├── Rahmen.png                    # Rahmen-Filter
├── alex.png                      # Zusätzliche Assets
├── biber.png                     # Zusätzliche Assets
├── crown.png                     # Zusätzliche Assets
└── README.md                     # Diese Dokumentation
```

## 🛠️ Technologien

- **HTML5 Canvas** für Rendering
- **MediaPipe Face Mesh** für Gesichtserkennung
- **JavaScript ES6+** für Logik
- **CSS3** für Styling und Animationen
- **WebRTC** für Kamerazugriff

## 🎯 Filter-Konfiguration

### Studentenhut (hut.png)
```javascript
// Position: 38% zwischen Stirn und Augen (etwas tiefer)
// Größe: 5.346 × Kopfbreite (kompakt)
// Tiefeneffekt: Maximal 1.0 (nie größer als Kopf)
```

### Sonnenbrille (Brille.png)
```javascript
// Position: 15% oberhalb der Augenhöhe
// Größe: 2.25 × Kopfbreite, 0.6 × Breite Höhe
// Tiefeneffekt: Standard 1.5
```

### Rahmen (Rahmen.png)
```javascript
// Position: 15% unterhalb des Kinns
// Größe: 5.6 × Kopfbreite, 5.2 × Kopfhöhe
// Tiefeneffekt: Maximal 1.2 (kontrolliert)
```

## 🔧 Entwicklung

### Lokale Installation
1. Projekt-Ordner herunterladen
2. `face_tracker_complete.html` in modernem Browser öffnen
3. Kamerazugriff erlauben
4. Filter testen

### Wichtige Dateien

**face_tracker_complete.html** - Hauptanwendung
- Vollständige Filter-Implementierung
- Professionelle UI mit Ladescreen
- Fehlerbehandlung und Statusanzeige

**template.html** - Einfache Version
- Basis-Implementation nur für Hut
- Gut für Verständnis der Grundlagen

**tracker.js** - JavaScript-Logik
- Separate Datei für einfache Version
- Zeigt Grundprinzipien der Gesichtserkennung

## 🎨 Filter hinzufügen

### 1. Neues PNG-Bild hinzufügen
```bash
# Bild in Projektordner kopieren
Neuer_Filter.png
```

### 2. Button hinzufügen
```html
<button class="filter-btn" onclick="changeFilter('Neuer_Filter.png', this)">
    🎭 Neuer Filter
</button>
```

### 3. Konfiguration erweitern
```javascript
case 'Neuer_Filter.png':
    return {
        anchorPoint: { x: anchorX, y: anchorY },
        width: headWidth * FAKTOR,
        height: headHeight * FAKTOR,
        offsetY: -height * OFFSET,
        maxDepthFactor: 1.2 // Optional
    };
```

## 📊 Landmark-Punkte (MediaPipe)

```javascript
// Wichtige Gesichtspunkte
const forehead = landmarks[10];        // Stirnmitte
const leftTemple = landmarks[234];     // Linke Schläfe
const rightTemple = landmarks[454];    // Rechte Schläfe
const leftEyeCenter = landmarks[468];  // Linkes Augenzentrum
const rightEyeCenter = landmarks[473]; // Rechtes Augenzentrum
const noseTip = landmarks[1];          // Nasenspitze
const chin = landmarks[152];           // Kinn
```

## 🔄 Positionierungslogik

### Ankerpunkt-Berechnung
```javascript
// Hut: Zwischen Stirn und Augen
const hatAnchorY = forehead.y + (eyeCenterY - forehead.y) * 0.38;

// Brille: Oberhalb der Augen
const glassesAnchorY = eyeCenterY - (headHeight * 0.15 / canvasHeight);

// Rahmen: Unterhalb des Kinns
const frameAnchorY = chin.y + (headHeight * 0.15 / canvasHeight);
```

### Tiefeneffekt
```javascript
// Basis-Skalierung nach Kopfentfernung
const baseFactor = Math.max(0.5, Math.min(1.5, headHeight / 200));

// Filter-spezifische Begrenzung
const maxFactor = filterConfig.maxDepthFactor || 1.5;
const depthFactor = Math.min(baseFactor, maxFactor);
```

## 🎯 Kalibrierung

### Filter-Größe anpassen
```javascript
// 10% größer machen
width: headWidth * (AKTUELLER_FAKTOR * 1.1)

// 10% kleiner machen
width: headWidth * (AKTUELLER_FAKTOR * 0.9)
```

### Position anpassen
```javascript
// 5% höher (nach oben)
anchorY: baseY - (headHeight * 0.05 / canvasHeight)

// 5% tiefer (nach unten)
anchorY: baseY + (headHeight * 0.05 / canvasHeight)
```

## 🐛 Häufige Probleme

### Kamera funktioniert nicht
- HTTPS oder localhost verwenden
- Kameraberechtigung erteilen
- Anderen Browser testen

### Filter zu groß/klein
- `maxDepthFactor` anpassen
- Basis-Skalierungsfaktor ändern

### Filter schlecht positioniert
- Ankerpunkt-Berechnung überprüfen
- `offsetY` Wert anpassen

## 🔄 Entwicklungsworkflow

1. **Testen**: `face_tracker_complete.html` öffnen
2. **Anpassen**: Filter-Konfiguration in `getFilterConfiguration()` ändern
3. **Debuggen**: `if (false)` auf `if (true)` setzen für Debug-Anzeige
4. **Optimieren**: Werte schrittweise anpassen

## 📝 Code-Struktur

```javascript
// Hauptkomponenten
├── DOM-Elemente & Initialisierung
├── Filter-Verwaltung (changeFilter)
├── MediaPipe-Konfiguration
├── Hilfsfunktionen (calculateAngle, calculateDistance)
├── Filter-Konfiguration (getFilterConfiguration)
├── Haupt-Rendering-Loop (faceMesh.onResults)
└── Kamera-Initialisierung
```

## 🎓 Lernziele

- **WebRTC** für Kamerazugriff
- **Canvas API** für Rendering
- **MediaPipe** für ML-basierte Gesichtserkennung
- **JavaScript** für Echtzeit-Verarbeitung
- **Responsive Design** für verschiedene Geräte

## 📚 Weiterführende Ressourcen

- [MediaPipe Face Mesh Dokumentation](https://developers.google.com/ml-kit/vision/face-mesh-detection?hl=de)
- [Canvas API Referenz](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [WebRTC getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)

## 🤝 Beitragen

1. Code verstehen und testen
2. Neue Filter oder Features entwickeln
3. Dokumentation erweitern
4. Bugs melden und beheben

---

**Viel Erfolg beim Entwickeln!** 🚀

*Erstellt für Online Medien Management Tutorium von Nici, Jan und Hanna*
