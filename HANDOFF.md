# STATUS 2026-09-11 (czytaj najpierw!)

> Sesja-paczka z 2026-09-11 kończy się scaleniem **PR #2** („Paczka zmian”):
> mute, dźwięk v2, puste struny, CAGED-legenda, metronom kompletny
> (109/109 testów, wszystko zaakceptowane na żywo).
> **Najpierw SPRAWDŹ, czy PR #2 jest scalony** (main zawiera paczkę v2?).
> Jeśli tak — stan to **v1 + paczka v2 na main**, Pages działa — i od razu:
> wczytaj `PROGRESS.md` (sekcja „NASTĘPNY CZAT”) i ruszaj z krokiem **5.
> Mikrofon**. Procedura startowa z §2 (zakładanie repo) jest NIEAKTUALNA
> (repo `FretMaster` istnieje, publiczne, Pages działa). Specyfikacje §5
> i plan §6 nadal aktualne, z wyjątkami w PROGRESS (rampa v2:
> START→TRENING; nowy krok 5b: Tuner).

---

# HANDOFF — FretMaster: przeniesienie projektu do nowego czatu

> Ten dokument jest **pełnym podsumowaniem** wcześniejszej rozmowy (projekt prowadzony od 2026-09-10)
> i **instrukcją dla nowego czatu**. Przeczytaj całość, zanim cokolwiek zrobisz.
> Użytkownik komunikuje się po polsku — odpowiadaj po polsku.

---

## KIM JESTEŚ I CO MUSISZ ZROBIĆ NA STARCIE

Jesteś kontynuacją rozmowy o projekcie **FretMaster** — aplikacji webowej do ćwiczenia
i eksploracji gryfu gitary/basu (jeden plik HTML, zero zależności).

**Stan projektu: wersja 1 ZAKOŃCZONA i przetestowana (29/29 testów).**

Na starcie:
1. Sprawdź, czy użytkownik dołączył pliki: `HANDOFF.md` (ten dokument) oraz
   `fretmaster-files.zip` (zawiera: `index.html`, `smoke-test.js`, `README.md`,
   `PROGRESS.md`, `makieta-v2.html`). Jeśli nie — poproś o załączenie.
2. **Przenieś pliki do repozytorium GitHub** (Dział 2c) — to jedyne miejsce
   zapisu (patrz WAŻNE w Dziale 1: podpięty GitHub = brak standardowego workspace).
3. Testy: jeśli Twoje środowisko daje dostęp do plików z repo (np. kopia robocza) —
   uruchom `node smoke-test.js` (musi dać „WYNIK: 29 OK, 0 FAIL"). Jeśli nie masz
   możliwości uruchomienia — sprawdź ręcznie: otwórz `index.html` z repo w
   przeglądarce i przetestuj 2–3 funkcje (eksploator, jeden tryb treningu).
4. Przeprowadź użytkownika przez Dział 2 (GitHub, tryb „za rękę").
5. Zadaj 3 pytania z Działu 7, przedstaw plan (Dział 6) i zaczynaj robotę.

---

## 1. ZASADY PRACY Z UŻYTKOWNIKIEM (WAŻNE!)

- Użytkownik **nie jest biegły w GitHubie**. Ma już jedno repozytorium z zupełnie inną
  aplikacją (robioną w innym czacie) — **nie dotykaj tego repo**.
- Każda czynność na GitHubie:
  1. po polsku,
  2. **jeden krok naraz**,
  3. po każdym kroku — zapytaj o potwierdzenie („Zapisane? Co widzisz na ekranie?"),
  4. NIGDY nie wyrzucaj od razu całej listy kroków,
  5. błąd użytkownika = spokojna korekta + krótkie wyjaśnienie.
- Nie zakładaj uprawnień do repozytorium — najpierw sprawdź, co możesz (czytanie / pisanie).
- Po każdym dużym etapie pracy: **commit + push** z czytelnym, polskim komunikatem.
- **WAŻNE (workspace): gdy chat ma podpięty GitHub, użytkownik TRACI możliwość
  zapisywania czegokolwiek w standardowym workspace Areny — może wgrywać pliki
  TYLKO do repo. Zatem: (a) nie instruuj go do zapisywania plików w workspace,
  (b) wszystkie pliki projektu żyją w repo, (c) testy uruchamiasz w swoim
  środowisku, jeśli w ogóle masz do niego dostęp — inaczej sprawdzanie ręczne
  w przeglądarce.**

---

## 1A. CIĄGŁOŚĆ KONTEKSTU — ZAPIS NA BIEŻĄCO (PROGRESS.md)

Zasada nadrzędna, obowiązująca **wszystkie czaty** tego projektu: **zapisujemy
na bieżąco**. W repo żyje plik `PROGRESS.md` — żywy dziennik projektu:
- co jest zrobione (stan kodu, ostatnie commity),
- co jest do zrobienia (plan, TODO),
- **problematyczne decyzje i zastosowane rozwiązania** (np. „detekcja pitch:
  YIN, tolerancja ±40 centów — dlatego, że …"),
- poznane pułapki (czego NIE robić).

Obowiązki:
1. **Po każdym znaczącym kroku** (nowa funkcja, ważna decyzja, rozwiązanie
   problemu) → aktualizujesz `PROGRESS.md` i robisz commit (komunikat typu
   `log: …`). Zapis postępu jest priorytetem — także wtedy, gdy rozmowa
   wydaje się „zawisnąć": ostatni spójny zapis w PROGRESS.md to punkt
   wznowienia.
2. **Scenariusz nowego czatu**: użytkownik otwiera nowy czat z podpiętym repo
   i mówi cokolwiek w stylu **„przeczytaj plik instrukcja"** → natychmiast:
   wczytasz z repo `HANDOFF.md` + `PROGRESS.md`, streszczysz stan w 3–5
   linijkach, potwierdzisz plan i kontynuujesz.
3. Obecny (poprzedni) czat prowadził dziennik w `PROGRESS.md` w workspace —
   ten plik dociera do Ciebie w załączniku; po wgraniu do repo **repo jest
   jedynym źródłem prawdy**.

---

## 2. GITHUB — PROCEDURA NA STARCIE (tryb „prowadź za rękę")

### 2a. Czy repo istnieje i jest podpięte?
1. Zapytaj: *„Czy przy tworzeniu tego czatu podpiąłeś repozytorium **fretmaster**?"*
2. **Tak** → sprawdź dostęp (wypisz pliki repo — powinno być puste, bo tworzone bez README).
3. **Nie / nie wiem** → sprawdź, czy w ogóle możesz podłączyć repo z tego czatu.
   - Jeśli tak (platforma pozwala): przeprowadź użytkownika przez **Dział 0** poniżej,
     potem podłącz repo i wróć do punktu 2.
   - Jeśli nie: powiedz użytkownikowi jasno, że chat musi zostać uruchomiony z podpiętym
     repo (patrz Dział 0), i poczekaj.

### 2b. Dział 0 — do wykonania PRZED utworzeniem czatu / podłączeniem repo (4 kliknięcia)
Prowadź krok po kroku, pytając o potwierdzenie:
1. Zaloguj się na **github.com** (ma już konto).
2. Prawy górny róg: przycisk **„+”** → **„New repository"**.
3. Wypełnij:
   - *Repository name*: `fretmaster` (albo inna nazwa, którą wybierze — zapisz ją!),
   - **Private**,
   - **NIC nie zaznaczaj** (bez „Add a README", bez .gitignore, bez licencji) —
     puste repo ułatwia pierwsze wgranie plików.
4. Przycisk **„Create repository"**. Zapytaj: „Widzisz puste repo? Tak/Nie".

### 2c. Wgranie plików projektu do repo
Użytkownik ma 3 pliki: `index.html`, `smoke-test.js`, `README.md`.
- **Masz uprawnienia zapisu do podpiętego repo?** → zcommituj i wypchnij pliki
  (komunikat: `FretMaster v1 — baza projektu`). Potem sprawdź, czy widać je na github.com.
- **Nie masz?** → prowadź przez interfejs WWW:
  repo → zielony **„Add file"** → **„Upload files"** → przeciągnij 3 pliki
  (użytkownik pobierze je z mojego workspace / ma je w załączniku) →
  pole „Commit changes" → zielony przycisk. Potwierdź widoczność plików.

### 2d. GitHub Pages (potrzebny później dla PWA — teraz tylko zaplanuj)
Kiedyś (etap PWA) będzie potrzebny stały adres https:
repo → **Settings** → **Pages** → *Source*: **Deploy from a branch** → branch: `main`,
folder: `/ (root)` → **Save**. Prowadź wtedy za rękę i przetestuj adres
`https://<username>.github.io/fretmaster/` na telefonie użytkownika.
(Uwaga: Pages na prywatnym repo działa na darmowym planie GitHuba.)

---

## 3. CO JEST ZBUDOWANE (stan v1 — nie przegapisz, nie zepsuj)

**Pliki:**
| Plik | Rola |
|---|---|
| `index.html` (~52 KB) | CAŁA aplikacja: HTML+CSS+JS inline. Zero zależności, działa offline i z `file://` |
| `smoke-test.js` | 29 testów smoke (własny stub DOM). Uruchomienie: `node smoke-test.js` |
| `README.md` | Dokumentacja po polsku |
| `PROGRESS.md` | **żywy dziennik postępu i decyzji** (Dział 1A) — aktualizuj na bieżąco i commituj |
| `makieta-v2.html` | **Makieta UI v2** — referencyjny layout nowych modułów (metronom, 2× mikrofon, transpozycja, poradnik, master-mute). Podążaj za nią przy budowie UI; w razie rozbieżności ze specyfikacją — zapytaj użytkownika |

**Funkcje v1:**
- **Gryf (eksplorator)**: interaktywny gryf z dźwiękiem (synteza Karplus-Strong),
  9 skal, 15 akordów/arpeggiów, kolory interwałów, **CAGED (5 kształtów w dowolnym tonie)**,
  strojenia (Standard, Drop D, Eb, DADGAD, Open G/D/E), gitara 6-strunowa (12/15/22 progi)
  i bas 4-strunowy (12/15/20), orientacja RH/LH, wyłączanie strun, nazwy nut EN/PL
  (C, C#… / C, Cis, H, B…), klik w nutę = dźwięk + nazwa + interwał.
- **Trening**: 4 tryby — ❓ Nazwij nutę (klawiatura/przyciski), 🎯 Znajdź nutę (każde
  trafienie liczy się), 🧠 Pamięć (2 s pokaz, potem na ślepo), ⚡ Sprint („Battleships"
  z limitem czasu, serią i punktacją; błąd = koniec gry).
- **Ustawienia treningu**: zakres progów, źródło nut (wszystkie / skala / akord),
  limit czasu, dźwięki, język nazw.
- **Statystyki**: trafność i rekordy per tryb, rekord sprintu, czas sesji;
  zapis w `localStorage` pod kluczem `fretmaster.v1`.

**Kluczowe fakty techniczne:**
- Vanilla JS, UI po polsku, styl dark. Stan: `localStorage['fretmaster.v1']`.
- Audio: Web Audio API; `AudioContext` tworzony przy **pierwszym geście użytkownika**
  (polityka autoplay) — nie zmieniaj tego bezmyślnie.
- **DANE CAGED ZOSTAŁY WERYFIKOWANE MATEMATYCZNIE (2340 kombinacji: 12 tonów × 5
  kształtów × 3 długości gryfu, 0 błędów). Nie „poprawiaj" kształtów na oko —
  zawsze przejdź przez testy.**
- Testy są self-contained (stub DOM wewnątrz `smoke-test.js`); nie modyfikują `index.html`.
- Serwer podglądu (`python3 -m http.server`) był tylko narzędziem tymczasowym —
  nie jest częścią projektu.

---

## 4. DECYZJE ZATWIERDZONE PRZEZ UŻYTKOWNIKA

1. **Forma docelowa: A — PWA** (instalowalna apka webowa: Android, iPhone, tablet,
   Windows, Mac; offline; hostowana na GitHub Pages dla możliwości „Dodaj na ekran główny").
   Natywny desktop (Electron) i APK — odrzucone na ten moment.
2. **Logika sprintu / rampy tempa** — użytkownik potwierdził: *„bardzo dobrze mnie
   zrozumiałeś"*.
3. **Metronom** — specyfikacja z Działu 5.1 (w tym nowe pomysły użytkownika:
   metrum do wpisania, kropki, mutowanie kropek, presety z nazwą i kolejnością).
4. **Przeniesienie na GitHub** — cel: repo `fretmaster` (nowe, osobne, nie dotykać
   innego projektu użytkownika), potem Pages.

---

## 5. CO BUDOWAĆ (zgodzona specyfikacja nowości)

**Layout UI: referencją jest `makieta-v2.html`** (przeglądalna w przeglądarce;
elementy oznaczone NEW = nowości względem v1).

### 5.1 METRONOM (największa funkcja)

**Tryb zwykły:**
- **Metrum jako wartość do wpisania** (dowolna liczba uderzeń na takt, np. 2–16) —
  nie tylko gotowe 4/4.
- **Kliknięcia widoczne jako kropki**: rząd = takt; bieżąca zapala się przy biciu.
- **Mutowanie dowolnej kropki**: klik w kropkę = wyciszenie tego uderzenia w taktach
  (maska mutów działa w OBU trybach; np. 7/4 z wyciszonym 5. uderzeniem).

**Tryb rampy (automatyczne podkręcanie do przelotów):**
1. Start: **temper bazowe** (użytkownik wpisuje BPM, np. 80) = 100%.
2. **n taktów treningowych** (domyślnie 4, konfigurowalne) @ bieżącym tempie.
3. **p taktów przygotowawczych** (domyślnie 4, konfigurowalne) @ **NOWYM** tempie —
   inny, cichszy dźwięk.
4. **OSTATNI takt przygotowawczy = charakterystyczny dźwięk** (jasny „dzwonek",
   złote kropki) — wyraźny sygnał: od teraz ćwiczenie.
5. n taktów treningowych @ nowym tempie → powtórz 3–5.
6. **Przyrost: % LUB BPM** (wybór użytkownika), **zawsze liczony od temapa BAZOWEGO**
   (101%, 102%, 103%… — liniowo, NIE procent składany).
7. **Tempo maksymalne**: konfigurowalne; zachowanie na limicie: **domyślnie „trzymaj"**
   (moja rekomendacja — do potwierdzenia przez użytkownika).

**Presety (pomysł użytkownika, zatwierdzony):**
- Zapis bieżącego zestawu: (tryb zwykły/rampa, metrum, maska mutów, BPM bazowe,
  tryb przyrostu %/BPM, wartość przyrostu, n, p, tempo maks.) pod **nazwą**.
- Lista presetów: **zmiana kolejności wedle uznania** (strzałki góra/dół + drag),
  ładowanie, usuwanie, zapis w localStorage.

**Dźwięki (rekomendacja do potwierdzenia):**
- takt treningowy: klik; uderzenie 1. akcentowane;
- takty przygotowawcze: inna, cichsza barwa (np. „drewno");
- ostatni takt przygotowawczy: jasny dzwonek.

### 5.2 SAMOUCHKI — zakładka „Poradnik"
- Jak używać KAŻDEGO trybu (eksplorator, nazwij/znajdź/pamięć/sprint, metronom)
  + teoria za nimi: interwały, skale i tryby, dźwięki akordów, system CAGED,
  praca z tempem (wolne→dokładne→szybkie, metoda rampy).
- Głębokość: **rekomendacja: średni poziom** (poradniki + teoria z przykładami
  + gotowe rutyny ćwiczeń) — do potwierdzenia.

### 5.3 DŹWIĘK GITARY — bardziej „gitarowo"
- Obecnie: podstawowy Karplus-Strong (trochę „chudawy").
- **Rekomendacja: ulepszona synteza** (harmoniki, rezonans pudła ~200–400 Hz,
  tłumienie struny, delikatna „grubość" stereo) — zbliży się do czystej gitary;
  opcja „prawdziwe próbki CC0" zostaje jako plan B, jeśli synteza nie zadowoli.
- Do potwierdzenia przez użytkownika.

### 5.4 MASTER-MUTE
- Widoczny przycisk „dźwięk wł/wył" w nagłówku aplikacji (jedno kliknięcie),
  zapamiętywany; niezależny od pozostałych ustawień audio.

### 5.5 PWA-IZACJA (opcja A)
- `manifest.webmanifest` + ikony (wygeneruj; 192/512 px + maskable),
  `meta theme-color`, działający offline.
- **KRYTYCZNE: aplikacja musi dalej działać otwarta lokalnie z `file://`**
  (manifest/instalacja to bonus wymagający https z GitHub Pages).
- Po włączeniu Pages: test na telefonie użytkownika (otwórz URL → udostępnij →
  „Dodaj na ekran główny" / przycisk instalacji) i na komputerze.
- Zgłaszać użytkownikowi realne ograniczenia PWA: dźwięk przy zablokowanym ekranie
  na iPhonie jest ograniczony; na Androidzie pomaga „cicha pętla audio"
  (MediaElement z pętłą cichego buffera trzyma renderer przy życiu) —
  dodać, jeśli testy pokażą zamrażanie.

### 5.6 MODUŁ: „Mikrofon — znajdź nutę" (odnajdywanie dźwięku na gryfie)
- Aplikacja pokazuje nazwę nuty (np. „A") → użytkownik gra tę nutę na gitarze →
  mikrofon przechwytuje dźwięk → porównanie z nutą docelową:
  - **poprawnie** → krótki komunikat OK (zielony + dźwięk) → **następna nuta**,
  - **niepoprawnie** → czerwony komunikat (opcjonalnie: co apka wykryła) →
    zachowanie **do wyboru w ustawieniach modułu**: „powtórz tę samą nutę"
    (domyślnie) albo „idź od razu do następnej". Statystyki liczą próby
    w obu wariantach (trafienia od pierwszej próby).
- **Liczba testowanych nut: konkretna liczba wpisana przez użytkownika**
  (np. 10/20/50) → po jej wyczerpaniu podsumowanie (trafienia, próby, % od
  pierwszej próby).
- Ustawienia: źródło nut (wszystkie 12 / skala / akord), zakres progów/strun,
  **tolerancja** (surowa / normalna / luźna, w centach; domyślnie normalna
  ~±30–50 centów).
- Przycisk **„Test mikrofonu"**: użytkownik gra nutę, apka pokazuje, co
  wykryła (kalibracja przed sesją).
- Technologia: `getUserMedia` + detekcja wysokości (YIN/autokorelacja),
  monofonicznie. **KRYTYCZNE: mikrofon wymaga https (GitHub Pages) lub
  localhost — z `file://` bywa zablokowany** → stąd priorytet etapu PWA/Pages
  w planie. Pierwsze użycie = zgoda użytkownika na mikrofon (wyjaśnij to).

### 5.7 MODUŁ: „Mikrofon — słuch" (odgrywanie usłyszanej nuty)
- Aplikacja **odtwarza dźwięk** (synteza) → użytkownik gra taką samą nutę →
  mikrofon → poprawnie = OK + następna nuta; niepoprawnie = powtórka.
- Buduje i znajomość nut na gryfu, i **słuch muzyczny**.
- Wspólny silnik detekcji pitch z modułem 5.6; wspólne ustawienia
  (liczba nut, źródło, zakres, tolerancja).

### 5.8 MODUŁ: „Transpozycja akordów"
- Pole 1: sekwencja akordów, np. `C A D G` (spacje; akordy z jakościami też:
  `Cm D7 Bb9`; nazwy EN i PL — H = B naturalny, B = Bb).
- Pole 2 (cel transpozycji) — **dwa zachowania**:
  - **puste** → pokazane opcje: transpozycja o liczbę **półtonów w górę lub
    w dół** (np. przyciski/slider −12…+12),
  - **wpisany jeden akord** (np. `F`) → transpozacja tak, by **pierwszy akord
    sekwencji stał się nim** (odległość liczona z toniki: C→F = +5; cała
    sekwencja przesuwa się o +5 → `F D G Bb`).
- Wynik: nowa sekwencja + info o przesunięciu (np. „+5 pól"), przycisk
  kopiowania; opcjonalnie: klik w akord = odsłuchanie jego dźwięków (synteza).

---

## 6. PLAN PRACY (przedstaw użytkownikowi i potwierdź)

1. ✅ GitHub: repo + wgranie v1 (Dział 2)
2. PWA: manifest, ikony, **GitHub Pages**, test na telefonie
   (**priorytet: moduły mikrofonowe wymagają https — z `file://` mikrofon
   bywa zablokowany**)
3. Master-mute
4. Lepszy dźwięk gitary (wg decyzji)
5. Metronom: zwykły tryb → rampa → presety (każdy krok = commit)
6. Mikrofon: wspólny silnik detekcji pitch + przycisk „Test mikrofonu" →
   moduł 5.6 „znajdź nutę" → moduł 5.7 „słuch" (każdy krok = commit)
7. Moduł 5.8: transpozycja akordów
8. Poradnik (samouczki + teoria — uwzględnij metronom i moduły mikrofonowe!)
9. Testy końcowe (smoke + ręcznie, z użytkownikiem, na telefonie)

---

## 7. TRZY PYTANIA DO UŻYTKOWNIKA NA PIERWSZEJ WYMIANIE (po weryfikacji repo i plików)

1. **Dźwięk gitary**: ulepszona synteza (rekomenduję) czy od razu prawdziwe próbki CC0?
2. **Poradnik**: krótkie przewodniki / średni z teorią (rekomenduję) / pełny mini-kurs?
3. **Metronom na limicie tempa**: trzymaj max (rekomenduję) / stop + podsumowanie / restart od startu?

Po odpowiedziach — przedstaw Dział 6 i zacznij od punktu, który jest jeszcze
do zrobienia (GitHub albo PWA).

---

## 8. SŁOWNICZEK / KONTEKST Z ROZMOWY

- „przeloty" = szybkie przebiegi skalowe na gitarze (właśnie do nich służy rampa metronomu).
- „takt przygotowawczy" = takt nieliczony, w nowym tempie, przed włączeniem licznika.
- Projekt powstał na bazie analizy aplikacji: Fretboard Trainer (kurs
  „How to Sound Like Slash"), Fretmap, Justin Guitar Fretboard Note Trainer,
  Fretwiz, FretPro — FretMaster łączy ich najlepsze cechy.
- Użytkownik gra/ćwiczy (kontekst: nauka gryfu w stylu Slash); język interfejsu: polski.
