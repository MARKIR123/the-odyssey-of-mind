# -*- coding: utf-8 -*-
import json
import os
import re
import sys

sys.path.append('scratch')

from era1_data import ERA1_PHILOSOPHERS
from era2_data import ERA2_PHILOSOPHERS
from era3_data import ERA3_PHILOSOPHERS
from era4_data import ERA4_PHILOSOPHERS
from era5_data import ERA5_PHILOSOPHERS
from era6_data import ERA6_PHILOSOPHERS

all_philosophers = (
    ERA1_PHILOSOPHERS +
    ERA2_PHILOSOPHERS +
    ERA3_PHILOSOPHERS +
    ERA4_PHILOSOPHERS +
    ERA5_PHILOSOPHERS +
    ERA6_PHILOSOPHERS
)

print(f"Total philosophers to write: {len(all_philosophers)}")

# Verify against theories.ts
with open("src/data/theories.ts", "r", encoding="utf-8") as f:
    t_text = f.read()

t_matches = re.findall(r"philosopherIds:\s*\[(.*?)\]", t_text, re.DOTALL)
all_theory_pids = []
for m in t_matches:
    p_in_t = re.findall(r"'([^']+)'", m)
    all_theory_pids.extend(p_in_t)
unique_theory_pids = sorted(list(set(all_theory_pids)))

p_ids = {p['id'] for p in all_philosophers}
missing = [pid for pid in unique_theory_pids if pid not in p_ids]
if missing:
    print(f"ERROR: Missing philosophers in theories: {missing}")
else:
    print("SUCCESS: All 58 philosophers from all 18 theories are accounted for!")

# Verify avatars against local assets
local_assets = set(os.listdir('public/assets/philosophers')) if os.path.exists('public/assets/philosophers') else set()

for p in all_philosophers:
    pid = p['id']
    local_file = f"{pid}.jpg"
    if local_file in local_assets and os.path.getsize(f"public/assets/philosophers/{local_file}") > 1000:
        p['avatar'] = f"/assets/philosophers/{local_file}"
    else:
        print(f"Note: local file not found or small for {pid}, keeping avatar: {p['avatar']}")
    
    # Remove deathYear if None so TS doesn't complain about null vs undefined
    if "deathYear" in p and p["deathYear"] is None:
        del p["deathYear"]

# Generate clean TypeScript file
lines = [
    "import { Philosopher } from '../types/philosophy';",
    "",
    "export const PHILOSOPHERS_DATA: Philosopher[] = ["
]

for idx, p in enumerate(all_philosophers):
    p_json = json.dumps(p, ensure_ascii=False, indent=2)
    indented = "\n".join("  " + l for l in p_json.split("\n"))
    comma = "," if idx < len(all_philosophers) - 1 else ""
    lines.append(f"{indented}{comma}")

lines.append("];")
lines.append("")

output_path = "src/data/philosophers.ts"
with open(output_path, "w", encoding="utf-8") as f:
    f.write("\n".join(lines))

print(f"Successfully generated {output_path} with {len(all_philosophers)} philosophers!")
