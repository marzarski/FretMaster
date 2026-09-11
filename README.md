# 🎸 FretMaster — Trener i eksplorator gryfu

Samodzielna aplikacja webowa (zero zależności, działa offline).
Łączy najlepsze cechy: **Fretboard Trainer** (How to Sound Like Slash), **Fretmap**,
**Guitar Fretboard Note Trainer** (Justin Guitar), **Fretwiz** i **FretPro**.

Uruchomienie: otwórz `index.html` w przeglądarce (lub `python3 -m http.server`).

## 📲 Instalacja jako aplikacja (PWA)
Po opublikowaniu po **https** (np. GitHub Pages) apkę można zainstalować na telefonie,
tablecie i komputerze (Android/Chrome: przycisk „Zainstaluj”; iPhone/Safari: Udostępnij →
„Dodaj do ekranu głównego”). Zainstalowana działa **offline**.

- pliki: `manifest.webmanifest`, `sw.js` (service worker), ikony w `icons/`,
- po https/localhost service worker rejestruje się automatycznie; otwarta z `file://`
  apka działa normalnie, tylko bez offline i bez instalacji,
- **aktualizacje (dla developera)**: przy istotnej zmianie aplikacji podnieś
  `CACHE_VERSION` w `sw.js` — użytkownicy dostaną świeże pliki,
- ikony generuje `tools/make-icons.sh` (ImageMagick, paleta zgodna z `:root` w `index.html`).

## 🎸 Gryf (eksplorator)
- Interaktywny gryf: kliknij dowolną nutę → usłyszysz ją (syntez „struny" Karplus-Strong) i zobaczysz nazwę + interwał,
- Podświetlanie: **skala** (9 trybów: dur, minory, pentatoniki, blues, miksolidia, doria), **akord/arpeggio** (15 rodzajów), **interwały** (kolor wg stopnia), **CAGED — 5 kształtów** w dowolnym tonie (weryfikowane matematycznie),
- Strojenia: Standard, Drop D, Eb, DADGAD, Open G/D/E,
- Gitara (6 strun, 12/15/22 progi) i **bas** (4 struny, 12/15/20 progów),
- Orientacja praworęczna / leworęczna (LH/RH), wyłączanie strun,
- Nazwy nut: międzynarodowe (C, C#, D…) lub polskie/niemieckie (C, Cis, D, Des, H, B).
- Przycisk 🔊/🔇 w nagłówku wycisza całą apkę jednym kliknięciem (master-mute, zapamiętywany).

## 🎯 Trening (4 tryby)
| Tryb | Zasady |
|---|---|
| ❓ Nazwij nutę | na gryfie pojawia się nuta — podajesz nazwę (klawiatura: `C`, `C#`, `Ab`, `Cis`, `H`… lub przyciski) |
| 🎯 Znajdź nutę | podajemy nazwę + dźwięk — klikasz właściwe miejsce (każde trafienie liczy się!) |
| 🧠 Pamięć | 2 s na zapamiętanie położenia, potem odnajdujesz je na ślepo |
| ⚡ Sprint | „Battleships": losowe pytania z limitem czasu i serią; błąd = koniec gry; punktacja i rekord |

Opcje treningu: zakres progów (1–12/1–15/wszystkie), źródło nut (wszystkie / tylko skala / tylko akord),
limit czasu na pytanie, dźwięki włącz/wyłącz.

## 📊 Statystyki
Trafność i rekordy serii per tryb, rekord sprintu, czas sesji — zapisywane lokalnie (localStorage).

## 🧪 Testy
- `node smoke-test.js` — 37 testów smoke (init, CAGED, trening, sprint, ustawienia, master-mute, persystencja),
- poprawność kształtów CAGED weryfikowana: 2340 kombinacji (12 tonów × 5 kształtów × 3 długości gryfu) — 0 błędów.
