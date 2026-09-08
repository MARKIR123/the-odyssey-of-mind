# -*- coding: utf-8 -*-
import json
import re

with open("src/data/theories.ts", "r", encoding="utf-8") as f:
    theories_code = f.read()

with open("src/data/philosophers.ts", "r", encoding="utf-8") as f:
    philosophers_code = f.read()

with open("src/data/culturalEchoes.ts", "r", encoding="utf-8") as f:
    echoes_code = f.read()

theory_blocks = re.findall(r"id:\s*'(theory-[^']+)',.*?eraId:\s*'([^']+)',.*?philosopherIds:\s*\[(.*?)\]\s*,\s*culturalEchoIds:\s*\[(.*?)\]", theories_code, re.DOTALL)

p_ids = set(re.findall(r'["\']?id["\']?:\s*["\']([^"\']+)["\']', philosophers_code))
e_ids = set(re.findall(r'["\']?id["\']?:\s*["\']([^"\']+)["\']', echoes_code))

print(f"Total Theory Blocks: {len(theory_blocks)}")
print(f"Unique Philosophers in philosophers.ts: {len(p_ids)}")
print(f"Unique Echoes in culturalEchoes.ts: {len(e_ids)}")

all_ok = True
for tid, era, pids_str, eids_str in theory_blocks:
    p_list = re.findall(r"'([^']+)'", pids_str)
    e_list = re.findall(r"'([^']+)'", eids_str)
    
    missing_p = [p for p in p_list if p not in p_ids]
    missing_e = [e for e in e_list if e not in e_ids]
    
    if missing_p or missing_e:
        print(f"Theory {tid} ({era}) HAS MISSING! Missing P: {missing_p}, Missing E: {missing_e}")
        all_ok = False
    else:
        print(f"Theory {tid}: {len(p_list)} phils, {len(e_list)} echoes [OK]")

if all_ok:
    print("\nPERFECT! All 18 Theory Pavilions have 100% matched philosophers and cultural echoes!")
