# PROGRESS — FretMaster (żywy dziennik)

> Plik aktualizowany **po każdym znaczącym kroku** (zasada: HANDOFF.md §1A).
> Repo = jedyne źródło prawdy. Wersja 0 powstała w „czacie przed przeniesieniem" (2026-09-10).

## Bieżący stan
- **v1 zakończona i przetestowana** (29/29 smoke testów). Pliki: `index.html`
  (cała apka, ~52 KB), `smoke-test.js`, `README.md`.
- Dane CAGED **zweryfikowane matematycznie** (2340 kombinacji, 0 błędów) —
  nie ruszać bez testów.
- **Krok 0 wykonany**: kod JEST w repo (commit „FretMaster v1 — przeniesienie
  projektu"). Nowy czat (2026-09-10) zweryfikował stan: pliki w repo,
  29/29 testów OK, drzewo robocze czyste.
- Makieta UI v2: `makieta-v2.html` — **zaakceptowana przez użytkownika (2026-09-10)**.
- **PWA (krok 1 planu) — pliki gotowe (2026-09-10)**: `manifest.webmanifest`,
  `sw.js` (offline, cache-first dla zasobów, network-first dla nawigacji),
  ikony `icons/` (192/512 + maskable + apple-touch + favicon; generator:
  `tools/make-icons.sh`, ImageMagick, paleta z `:root`). Rejestracja SW tylko
  przy https/localhost — **`file://` nadal działa normalnie** (wymóg z HANDOFF 5.5).
  Testy po zmianach: 29/29 OK.
- **Sesja 2026-09-16 (chat `arena/01a0a9be-fretmaster`)**: zweryfikowano stan
  startowy — PR #2 scalony (`main` = c5e877f), `node smoke-test.js` → **109 OK,
  0 FAIL**, drzewo czyste. Na prośbę użytkownika dopisano do `HANDOFF.md`
  **dział 1B „Jak działa praca w Arenie (cykl sesji)”** + pułapki tutaj
  (podgląd bez mikrofonu; scalenie PR-a = zamknięcie sesji → nowy czat z
  podpiętym repo). Kodu apki nie ruszano.
- **Krok 1 ZAMKNIĘTY W CAŁOŚCI (2026-09-11)**: GitHub Pages DZIAŁA pod
  https://marzarski.github.io/FretMaster/ — repo publiczne, PR #1 scalony,
  apka zainstalowana na telefonie użytkownika.
- **Rytm pracy (ustalony, obowiązuje)**: jedna sesja = jedna paczka kilku zmian;
  scalamy dopiero po kilku iteracjach poprawek (jeden PR na końcu paczki),
  NIE po każdej zmianie. Testy na żywo w podglądzie w czacie (dźwięki apki
  działają; mikrofon w podglądzie może być zablokowany przez iframe — wtedy
  test mikrofonu robimy na wersji scalonej na Pages).
- **Paczka v2 GOTOWA (PR #2, 16 commitów, 109/109, 2026-09-11)** — wszystko poniżej zrobione, przetestowane na żywo i zaakceptowane. Scalenie: użytkownik scala PR #2 na github.com → Pages buduje się ~2 min → telefon dostaje aktualizację (otworzyć apkę, ewentualnie 2×).:
  - [x] master-mute (przycisk w nagłówku, 37/37 testów)
  - [x] usunięcie stopki z aplikacji (2026-09-11, na prośbę użytkownika)
  - [x] białe nazwy trybów treningu (2026-09-11: `button{color:inherit}` +
    jawny kolor `.mode-card .t`; przyczyna: <button> nie dziedziczy koloru)
  - [x] puste struny (próg 0, 2026-09-11): klik na strunę przed siodełkiem
    (eksplorator + trening: pytania, odpowiedzi, kropki); nazwy strun
    podświetlane wg skali/akordu/CAGED; zakres treningu 0–N; testy → 59 OK
  - [x] klikalna legenda CAGED (2026-09-11): klik w kształt pokazuje/ukrywa go
    (`cagedHidden[]` w localStorage); kropki z wieloma literami aktualizowane
  - [x] ukryte nazwy strun w treningu (2026-09-11: pusty sname + neutralny
    title; nazwy zdradzałyby odpowiedź)
  - [x] metronom: tryb zwykły (2026-09-11): BPM 20–300, metrum 2–16, kropki
    z mutowaniem, akcent na 1, scheduler lookahead (25 ms / 150 ms), gra w tle
    zakładek (migotanie), zapis w localStorage
  - [x] metronom: rampa (2026-09-11): przyrost liniowy od bazy (%/BPM),
    max (hold/stop/restart), wizualizacja, czysta maszynka faz.
    Iteracja 2 (feedback): rezygnacja z przygotowania; cykl START (s taktów,
    dzwonek, złote kropki) → TRENING (n) w tym samym tempie → START wyżej…
  - [x] metronom: presety (2026-09-11): zapis pod nazwą, pełna konfiguracja,
    wczytywanie, usuwanie na 2 kliki, kolejność strzałki + drag&drop;
    fix: DnD tylko za uchwyt ⋮⋮ (wiersz zjadał kliki), rozbrojenie 5 s;
    testy → 109 OK. **Zaakceptowane przez użytkownika — metronom KOMPLETNY.**
  - [x] lepszy dźwięk gitary (HANDOFF §5.3, 2026-09-11): poprawny KS,
    rezonans pudła, stereo, kompresor; 8 testów DSP (37→45 OK).
    Iteracja 2 (feedback: bardziej gitarowo, góra cichsza, dłużej): drugi
    rezonans 430 Hz +2 dB, trzask kostki 5 ms, T60 1.5+250/f, bufor 2 s,
    S 0.38, lowpass 9.5 kHz + presence +2.5 dB, kompensacja góry do +25%. Dźwięk zaakceptowany przez użytkownika.
- **Krok 2 master-mute ZROBIONY (2026-09-11)**: przycisk 🔊/🔇 w nagłówku
  (po prawej od zakładek, jak w makiecie); flaga `settings.muted` (domyślnie
  false) zapisywana w localStorage; helper `soundOn()` (= sound && !muted)
  bramkuje `pluck()` i `beep()`; `aria-pressed` dla czytników. Testy: 37/37 OK
  (8 nowych: ikona, zapis, klik, niezależność od „Dźwięki”, stary zapis bez
  `muted`). `CACHE_VERSION` w sw.js podniesiony na 2026-09-11.
- **Stan na koniec czatu (2026-09-11)**: paczka v2 kompletna (12 pozycji,
  109/109 testów, wszystko zaakceptowane na żywo). PR #2 gotowy do scalenia.
  Po scaleniu: Pages = v1 + paczka v2. Następny krok: 5. Mikrofon.

## Decyzje (zatwierdzone przez użytkownika)
1. **Forma: A — PWA** (telefon/tablet/komputer, offline). Natywne (Electron/APK)
   odrzucone na teraz. Repo: `fretmaster` (private, puste na starcie).
   Inne repo użytkownika (inna apka, inny czat) — **nie dotykać**.
   (Aktualizacja 2026-09-11: repo nazywa się `FretMaster`, jest PUBLICZNE, Pages działa.)
2. **Workspace**: z podpiętym GitHubem użytkownik zapisuje pliki **TYLKO do repo**
   (brak standardowego workspace). Wszystkie pliki projektu żyją w repo.
3. **Metronom** (jak ZBUDOWANO 2026-09-11 — zmiana względem HANDOFF 5.1!):
   tryb zwykły: BPM 20–300, metrum 2–16, kropki + mutowanie, akcent na 1;
   rampa: cykl **START (s taktów, dzwonek, złote kropki) → TRENING (n) w tym
   samym tempie → START wyżej** o krok liniowo od bazy (%/BPM); max: hold
   (domyślnie) / stop / restart; wizualizacja przebiegu; **presety: nazwane,
   kolejność (strzałki + drag za uchwyt), zapis w localStorage**; usuwanie
   presetu na 2 kliki (bez modali).
4. **Mikrofon — znajdź nutę (5.6)**: apka pokazuje nazwę → gracz odgrywa na
   gitarze → mikrofon (pitch detection) → OK = następna nuta;
   **liczba nut w sesji = konkretna liczba do wpisania**;
   **przy pomyłce: opcja w ustawieniach modułu** — „powtórz tę samą nutę"
   (domyślnie) / „idź od razu do następnej"; tolerancja (centy) konfigurowalna;
   przycisk „Test mikrofonu".
5. **Mikrofon — słuch (5.7)**: apka odtwarza dźwięk → gracz odgrywa ten sam →
   OK → następna. Wspólny silnik detekcji i wspólne ustawienia z 4.
6. **Transpozycja akordów (5.8)**: pole 1 = sekwencja (np. `C A D G`; akordy z
   jakościami `Cm D7 Bb9`; nazwy EN i PL: H=B naturalny, B=Bb); pole 2:
   **puste → ± półtony (góra/dół)**; **wpisany jeden akord → sekwencja zaczyna
   się od niego** (C A D G + F → `F D G Bb`, +5 półtonów); wynik + info o
   przesunięciu + kopiowanie; opcjonalnie odsłuch akordów.
7. **Master-mute**: przycisk w nagłówku, zapamiętywany. Zatwierdzone.
8. **PWA**: manifest + ikony, offline, **GitHub Pages** (https = warunek dla
   mikrofonu; z `file://` bywa blokowany) → etap 2 planu (priorytet).
9. **Mikrofon wymaga https** — konsekwencja: Pages przed modułami mikrofonowymi.
10. **Puste struny (próg 0, 2026-09-11)**: klik na strunę przed siodełkiem
    (eksplorator + trening: pytania/odpowiedzi/kropki); nazwy strun
    podświetlane wg skali/akordu/CAGED; zakres treningu 0–N; w treningu
    nazwy ukryte (ściąga zdradzałaby odpowiedź).
11. **Legenda CAGED klikalna** (2026-09-11): pokazuje/ukrywa kształty
    (`cagedHidden[]` w localStorage).
12. **Stopka usunięta** z aplikacji (2026-09-11, na prośbę użytkownika).
13. **Tuner (pomysł użytkownika, krok 5b)**: strojenie przez mikrofon, pasek
    czerwony→niebieski→**zielony (środek)**→niebieski→czerwony; budowa
    po silniku pitch z kroku 5 (spec: PROGRESS „Tuner — spec”).

## Do potwierdzenia przez użytkownika — WSZYSTKO POTWIERDZONE (2026-09-10)
1. **Dźwięk gitary: ulepszona synteza** (harmoniki, rezonans pudła, tłumienie
   struny, delikatne stereo). Próbki CC0 = plan B, jeśli synteza nie zadowoli.
2. **Poradnik: średni poziom z teorią** (poradniki + teoria z przykładami +
   gotowe rutyny ćwiczeń).
3. **Metronom na limicie tempa: trzymaj max** (gra dalej w tempie maksymalnym).
4. **Layout `makieta-v2.html` zaakceptowany** — podążać za makieta przy budowie UI.
5. **Dźwięki metronomu i gitary zaakceptowane na żywo (2026-09-11)** — klik,
   dzwonek Start, synteza v2 (iteracja 2). Bez zastrzeżeń.

## Problemy / rozwiązania / pułapki
- **PWA — smoke test**: test wyciąga **pierwszy** blok `<script>` — kod rejestracji
  SW dodany jako **drugi, ostatni** blok na końcu `<body>` (testy go nie ruszają).
- **PWA — ikony**: wybrana wersja rysowana skryptem (deterministyczna, paleta apki);
  optymalizacja `-strip -depth 8` (16-bit dawał 5× większe pliki).
- **PWA — aktualizacje apki wymagają podniesienia `CACHE_VERSION` w `sw.js`**
  (format: data wydania) — inaczej użytkownicy mogą dostać starą wersję z cache.
- **CAGED**: dwa pierwsze warianty danych miały błędy (3. struna w kształcie C;
  kotwice G/E o +7 zamiast +12 od progu toniki) → poprawione; reguła:
  kształtów CAGED NIE poprawiać „na oko" — zawsze weryfikacja testami.
- **Smoke testy**: własny stub DOM; w stubie `dataset` trzyma liczby
  (w przeglądarce — stringi); przejścia między pytaniami w aplikacji biegną
  przez `setTimeout` — w teście symulowane ręcznie (funkcja `advance()`).
- **Audio**: `AudioContext` tylko po pierwszym geście (autoplay policy);
  synteza v2 (od 2026-09-11): poprawny KS (T60 1.5+250/f, kostka, trzask),
  rezonans pudła (260 + 430 Hz), stereo, kompresor; strojenie DOKŁADNE
  (bez detune — apka treningowa!). Metronom: klik/dzwonek (sine).
- **GitHub (kontekst użytkownika)**: użytkownik jest początkujący — każdy krok
  po polsku, pojedynczo, z potwierdzeniem. Podpięty GitHub = brak workspace
   Arena (zapis tylko do repo).
- **PWA (znaną ograniczenia)**: iOS — dźwięk przy zablokowanym ekranie
  ograniczony; Android — mitygacja „cichą pętlą audio", jeśli testy pokażą
  zamrażanie renderera.

- **Synteza (pułapka)**: pętla KS musi startować od `N+1`, bo `d[i-N-1]`
  dla `i=N` to `d[-1]` = undefined → NaN w całym buforze. Stary kod miał
  wadliwy człon `(d[i-N]+d[(i-1)%N])*0.5` — stąd „chuda” barwa v1.
- **CACHE_VERSION**: w trakcie paczki (przed scaleniem) NIE podbijamy co
  commit — wystarczy, że różni się od wersji na Pages (2026-09-10).
- **Rampa: tempa zaokrąglane do 0.1** (`metroRampTempo`) — inaczej float daje
  80.80000001; fazy liczone na granicach taktów (`metroOnBar`), a dźwięki
  planowane na granicy uderzeń (lookahead) — dwa poziomy planowania.
- **Modale w iframe**: `prompt`/`confirm` mogą być blokowane w podglądzie —
  preset: nazwa przez input, usuwanie na 2 kliki (arm), bez modali.
- **Arena: podgląd (LIVE PREVIEW) nie daje mikrofonu** — serwer w sandboxie jest
  pokazany w iframe na obcej domenie (`https://{port}-{sandboxId}.e2b.app`);
  `python3 -m http.server` nie wysyła `cross-origin-embedder-policy: allow-iframe`,
  więc `getUserMedia` jest blokowane (polityka iframe + brak secure context po
  stronie apki). To ograniczenie platformy, nie bug — moduły mikrofonowe testujemy
  na `localhost:8000` u użytkownika albo na Pages (https) po scaleniu.
- **Arena: scalenie PR-a ZAMYKA sesję** — po merge w tym czacie nie da się dalej
  pracować ani zapisywać w repo; użytkownik zakłada nowy czat z podpiętym repo
  i pisze „przeczytaj plik instrukcja”. Wniosek: PR dopiero na końcu paczki,
  a przed jego otwarciem trzeba użytkownika uprzedzić (pełny opis: HANDOFF §1B,
  dodany 2026-09-16 na prośbę użytkownika).
- **DnD zjada kliki**: `draggable` na całym wierszu pożera kliknięcia w jego
  przyciski (zwłaszcza Firefox i dotyk) — przeciąganie tylko za uchwyt.

## Błędy z testów na żywo (podgląd w czacie)
- 2026-09-11, mute: użytkownik widzi przycisk, ikona zmienia się 🔊/🔇 (tak),
  dźwięki apki słychać (tak). Weryfikacja wyciszenia: kliknąć 🔇, potem nutę
  na gryfie — ma być cisza. Status: ZWERYFIKOWANE — użytkownik potwierdził działanie (2026-09-11).

- **Pułapka: równoległe edycje tego samego pliku** — kilka wywołań edit_file
  do jednego pliku w jednym bloku nadpisuje się (zapisuje się tylko jedna).
  Wiele zmian w jednym pliku = jeden skrypt python albo po kolei.
- **Pułapka: `gh pr edit` nie działa** (błąd GraphQL `projectCards`) —
  tytuł/opis PR-a zmieniać przez REST: `gh api -X PATCH
  repos/marzarski/FretMaster/pulls/N -f title="..." -f body="..."`.
- **Git: lokalny ref brancha może zgubić historię między turami** (pliki
  zostają, HEAD wraca do bazy; zdarzyło się 2×) — wtedy NIE commitować na
  starym HEAD (robi się rozjazd). Recepta: `git fetch origin <branch>` →
  `git reset --soft FETCH_HEAD` (drzewo zostaje, HEAD na remote) → **KONIECZNIE
  `git add -A`** (indeks bywa niepełny — commit bez tego spina śmieci i kasuje
  pliki na remote!) → sprawdzić, że `git diff --cached` to TYLKO bieżąca
  zmiana (mały diff!) → commit → push. Awaryjnie (zły commit już na remote):
  naprawić lokalnie i `git push --force-with-lease=<branch>:<SHA z ls-remote>`.
  Dlatego: **push po każdej turze ze zmianami** (remote = prawda).

## Tuner — spec (pomysł użytkownika 2026-09-11; budowa po kroku 5)
- Strojenie gitary przez mikrofon telefonu/tabletu; **wspólny silnik
  detekcji pitch** z modułami mikrofonowymi (5.6/5.7) — budujemy raz,
  używamy w 3 miejscach.
- Wizualizacja: poziomy pasek, **środek = idealnie nastrojone**; kolor od
  odchyłki: czerwony → niebieski → **zielony (środek)** → niebieski →
  czerwony (symetrycznie w obie strony).
- Pokazuje: najbliższą nutę, odchyłkę w centach, kierunek (za nisko / za wysoko).
- Start: tryb chromatyczny (dowolna nuta) + podpowiedź struny; wybór
  konkretnej struny jako opcja (do decyzji przy budowie).

## TODO (plan — pełna wersja: HANDOFF §6)
> **NASTĘPNY CZAT — zacznij tutaj**: ① sprawdź, czy PR #2 jest scalony
> (main zawiera paczkę v2: mute, dźwięk v2, puste struny, CAGED-legenda,
> metronom kompletny; testy 109/109); ② zweryfikuj Pages na telefonie
> użytkownika (nowa wersja ~2 min po scaleniu; apkę otworzyć, ewent. 2×);
> ③ ruszaj z krokiem **5. Mikrofon**: najpierw silnik pitch + „Test
> mikrofonu”, potem „znajdź nutę”, potem „słuch”. Uwaga: mic może być
> zablokowany w podglądzie-iframe — wtedy test na scalonej wersji na Pages.
> Rytm: jedna sesja = jedna paczka (patrz „Rytm pracy” wyżej).
> Cykl sesji w Arenie (branch sesji, podgląd LIVE, mikrofon, scalenie = koniec
> sesji → nowy czat): **HANDOFF §1B** — zapisane 2026-09-16, żeby nie tłumaczyć
> tego od nowa w każdym czacie.
- [x] 0. Przeniesienie: repo `fretmaster` + wgranie v1 + PROGRESS.md + makieta ✓
- [x] 1. PWA: manifest, ikony, **GitHub Pages** ✓ (działa: marzarski.github.io/FretMaster/)
- [x] 2. Master-mute ✓
- [x] 3. Lepszy dźwięk gitary ✓ (zaakceptowany przez użytkownika)
- [x] 4. Metronom ✓ (zwykły + rampa + presety, 2026-09-11)
- [ ] 5. Mikrofon: silnik pitch + „Test mikrofonu" → „znajdź nutę" → „słuch"
- [ ] 5b. 🎚️ Tuner do strojenia gitary (pomysł użytkownika 2026-09-11 —
  po silniku pitch z kroku 5; spec: PROGRESS „Tuner — spec”)
- [ ] 6. Transpozycja akordów
- [ ] 7. Poradnik (samouczki + teoria, uwzględnia nowe moduły)
- [ ] 8. Testy końcowe (smoke + ręcznie z użytkownikiem, na telefonie)
