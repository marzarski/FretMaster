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
- Makieta UI v2: `makieta-v2.html` (layout nowych modułów; czeka na akceptację
  użytkownika — drobne korekty możliwe).

## Decyzje (zatwierdzone przez użytkownika)
1. **Forma: A — PWA** (telefon/tablet/komputer, offline). Natywne (Electron/APK)
   odrzucone na teraz. Repo: `fretmaster` (private, puste na starcie).
   Inne repo użytkownika (inna apka, inny czat) — **nie dotykać**.
2. **Workspace**: z podpiętym GitHubem użytkownik zapisuje pliki **TYLKO do repo**
   (brak standardowego workspace). Wszystkie pliki projektu żyją w repo.
3. **Metronom** (specyfikacja 5.1): metrum jako wartość do wpisania (2–16),
   kliknięcia jako kropki, mutowanie dowolnej kropki (oba tryby); rampa:
   n taktów treningowych (dom. 4) + p przygotowawczych (dom. 4, w nowym tempie,
   cichsza barwa; **ostatni = charakterystyczny dzwonek = start**); przyrost
   % lub BPM, **zawsze od temapa bazowego (liniowo)**; tempo maks. + zachowanie
   na limicie (domyślnie: trzymaj — do potwierdzenia); **presety: nazwane,
   zmiana kolejności (strzałki + drag), zapis w localStorage**.
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

## Do potwierdzenia przez użytkownika — WSZYSTKO POTWIERDZONE (2026-09-10)
1. **Dźwięk gitary: ulepszona synteza** (harmoniki, rezonans pudła, tłumienie
   struny, delikatne stereo). Próbki CC0 = plan B, jeśli synteza nie zadowoli.
2. **Poradnik: średni poziom z teorią** (poradniki + teoria z przykładami +
   gotowe rutyny ćwiczeń).
3. **Metronom na limicie tempa: trzymaj max** (gra dalej w tempie maksymalnym).
4. **Layout `makieta-v2.html` zaakceptowany** — podążać za makieta przy budowie UI.

## Problemy / rozwiązania / pułapki
- **CAGED**: dwa pierwsze warianty danych miały błędy (3. struna w kształcie C;
  kotwice G/E o +7 zamiast +12 od progu toniki) → poprawione; reguła:
  kształtów CAGED NIE poprawiać „na oko" — zawsze weryfikacja testami.
- **Smoke testy**: własny stub DOM; w stubie `dataset` trzyma liczby
  (w przeglądarce — stringi); przejścia między pytaniami w aplikacji biegną
  przez `setTimeout` — w teście symulowane ręcznie (funkcja `advance()`).
- **Audio**: `AudioContext` tylko po pierwszym geście (autoplay policy);
  syntez = Karplus-Strong (delay line + tłumienie 0.996) — w v2 ma być
  wzbogacona (harmoniki, rezonans pudła).
- **GitHub (kontekst użytkownika)**: użytkownik jest początkujący — każdy krok
  po polsku, pojedynczo, z potwierdzeniem. Podpięty GitHub = brak workspace
   Arena (zapis tylko do repo).
- **PWA (znaną ograniczenia)**: iOS — dźwięk przy zablokowanym ekranie
  ograniczony; Android — mitygacja „cichą pętlą audio", jeśli testy pokażą
  zamrażanie renderera.

## TODO (plan — pełna wersja: HANDOFF §6)
- [x] 0. Przeniesienie: repo `fretmaster` + wgranie v1 + PROGRESS.md + makieta ✓
- [ ] 1. PWA: manifest, ikony, **GitHub Pages**, test na telefonie (priorytet!)
- [ ] 2. Master-mute
- [ ] 3. Lepszy dźwięk gitary (wg decyzji)
- [ ] 4. Metronom: zwykły (metrum, kropki, mutowanie) → rampa → presety
- [ ] 5. Mikrofon: silnik pitch + „Test mikrofonu" → „znajdź nutę" → „słuch"
- [ ] 6. Transpozycja akordów
- [ ] 7. Poradnik (samouczki + teoria, uwzględnia nowe moduły)
- [ ] 8. Testy końcowe (smoke + ręcznie z użytkownikiem, na telefonie)
