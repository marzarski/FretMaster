#!/usr/bin/env bash
# FretMaster — generator ikon PWA (icons/*.png)
# Wymaga: ImageMagick (convert). Uruchomienie: bash tools/make-icons.sh
# Paleta zgodna z index.html (:root) — zmiana kolorów apki = zmiana tutaj + re-generacja.
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p icons

# --- paleta (z :root w index.html) ---
BG='#0e1013'      # tło aplikacji
FRET='#39434f'    # progi (odcień --line)
STR='#97a3b0'     # struny (odcień --muted)
AMBER='#f0a832'   # --acc
RED='#ff5252'     # --root
BLUE='#4fc3f7'    # --chord

S=1024  # rozmiar bazowy

# Rysunek bazowy: ciemne tło (delikatny gradient radialny zbiegający dokładnie do $BG),
# 2 progi pionowe, 4 struny poziome (grubsza basowa), 3 świecące nuty (promień, kolor).
# Gradient na brzegu == kolor tła => po kompozycji (maskable) brak szwu.
convert -size ${S}x${S} radial-gradient:'#1c222b'-'#0e1013' \
  -stroke "$FRET" -strokewidth 12 -draw "line 341,0 341,${S}" \
  -stroke "$FRET" -strokewidth 12 -draw "line 682,0 682,${S}" \
  -stroke "$STR" -strokewidth 3 -draw "line 0,272 ${S},272" \
  -stroke "$STR" -strokewidth 5 -draw "line 0,448 ${S},448" \
  -stroke "$STR" -strokewidth 7 -draw "line 0,624 ${S},624" \
  -stroke "$STR" -strokewidth 9 -draw "line 0,800 ${S},800" \
  -fill 'rgba(255,82,82,0.10)'  -draw 'circle 170,272 170,112' \
  -fill 'rgba(255,82,82,0.16)'  -draw 'circle 170,272 170,142' \
  -fill 'rgba(255,82,82,0.24)'  -draw 'circle 170,272 170,172' \
  -fill 'rgba(79,195,247,0.10)' -draw 'circle 854,800 854,640' \
  -fill 'rgba(79,195,247,0.16)' -draw 'circle 854,800 854,670' \
  -fill 'rgba(79,195,247,0.24)' -draw 'circle 854,800 854,700' \
  -fill 'rgba(240,168,50,0.10)' -draw 'circle 512,624 512,424' \
  -fill 'rgba(240,168,50,0.16)' -draw 'circle 512,624 512,464' \
  -fill 'rgba(240,168,50,0.24)' -draw 'circle 512,624 512,514' \
  -stroke '#0e1013' -strokewidth 8 -fill "$RED"   -draw 'circle 170,272 170,214' \
  -stroke '#0e1013' -strokewidth 8 -fill "$BLUE"  -draw 'circle 854,800 854,742' \
  -stroke '#0e1013' -strokewidth 10 -fill "$AMBER" -draw 'circle 512,624 512,530' \
  -fill 'rgba(255,224,160,0.9)' -draw 'circle 486,596 486,578' \
  icons/_base.png

# Wersja "any" (zwykła): pełne kadrowanie, bez safe-zone
# (-strip -depth 8: mały plik, bez metadanych; 16-bit nie jest potrzebny dla płaskiej grafiki)
convert icons/_base.png -resize 512x512 -strip -depth 8 icons/icon-512.png
convert icons/_base.png -resize 192x192 -strip -depth 8 icons/icon-192.png
convert icons/_base.png -resize 180x180 -strip -depth 8 icons/apple-touch-icon.png
convert icons/_base.png -resize 32x32   -strip -depth 8 icons/icon-32.png

# Wersja maskable: grafika zmniejszona do 74% i wklejona na pełne tło
# (safe zone: nic ważnego w zewnętrznych ~20% — launcher może przycinać dowolny kształt)
convert -size ${S}x${S} canvas:'#0e1013' \
  \( icons/_base.png -resize 758x758 \) -gravity center -composite \
  -strip -depth 8 icons/_maskable.png
convert icons/_maskable.png -resize 512x512 -strip -depth 8 icons/icon-512-maskable.png
convert icons/_maskable.png -resize 192x192 -strip -depth 8 icons/icon-192-maskable.png

rm -f icons/_base.png icons/_maskable.png icons/_candidate-ai.png
echo "OK — ikony w icons/:"
ls -la icons/
