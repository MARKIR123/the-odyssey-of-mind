import re

with open("src/data/culturalEchoes.ts", "r", encoding="utf-8") as f:
    text = f.read()

ids = re.findall(r"id:\s*'([^']+)'", text)
print("Total existing echoes:", len(ids))
print("Echo IDs:", ids)

with open("src/data/theories.ts", "r", encoding="utf-8") as f:
    t_text = f.read()

c_matches = re.findall(r"culturalEchoIds:\s*\[(.*?)\]", t_text, re.DOTALL)
all_theory_echoes = []
for m in c_matches:
    e_in_t = re.findall(r"'([^']+)'", m)
    all_theory_echoes.extend(e_in_t)
unique_theory_echoes = sorted(list(set(all_theory_echoes)))
print("\nUnique cultural echo IDs in theories:", unique_theory_echoes)
missing_echoes = [eid for eid in unique_theory_echoes if eid not in ids]
print(f"Missing echoes ({len(missing_echoes)}):", missing_echoes)
