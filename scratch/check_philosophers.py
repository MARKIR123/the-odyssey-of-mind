import re

with open("src/data/philosophers.ts", "r", encoding="utf-8") as f:
    text = f.read()

ids = re.findall(r"id:\s*'([^']+)'", text)
print("Total existing philosophers:", len(ids))
print("IDs:", ids)

with open("src/data/theories.ts", "r", encoding="utf-8") as f:
    t_text = f.read()

t_matches = re.findall(r"philosopherIds:\s*\[(.*?)\]", t_text, re.DOTALL)
all_theory_pids = []
for m in t_matches:
    p_in_t = re.findall(r"'([^']+)'", m)
    all_theory_pids.extend(p_in_t)

unique_theory_pids = sorted(list(set(all_theory_pids)))
print("\nTotal theory philosopher references:", len(unique_theory_pids))
missing = [pid for pid in unique_theory_pids if pid not in ids]
print(f"Missing ({len(missing)}):", missing)

c_matches = re.findall(r"culturalEchoIds:\s*\[(.*?)\]", t_text, re.DOTALL)
all_theory_echoes = []
for m in c_matches:
    e_in_t = re.findall(r"'([^']+)'", m)
    all_theory_echoes.extend(e_in_t)
print("\nUnique cultural echo IDs in theories:", sorted(list(set(all_theory_echoes))))
