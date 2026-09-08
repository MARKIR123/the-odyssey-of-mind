import os
import json
import time
import subprocess
from PIL import Image

PHILOSOPHER_PAGES = {
    # Era 1
    'thales': 'Thales_of_Miletus',
    'heraclitus': 'Heraclitus',
    'democritus': 'Democritus',
    'socrates': 'Socrates',
    'plato': 'Plato',
    'aristotle': 'Aristotle',
    'laozi': 'Laozi',
    'confucius': 'Confucius',
    'zhuangzi': 'Zhuangzi_(philosopher)',

    # Era 2
    'seneca': 'Seneca_the_Younger',
    'marcus-aurelius': 'Marcus_Aurelius',
    'epicurus': 'Epicurus',
    'epictetus': 'Epictetus',
    'augustine': 'Augustine_of_Hippo',
    'plotinus': 'Plotinus',
    'thomas-aquinas': 'Thomas_Aquinas',
    'william-ockham': 'William_of_Ockham',

    # Era 3
    'descartes': 'René_Descartes',
    'spinoza': 'Baruch_Spinoza',
    'leibniz': 'Gottfried_Wilhelm_Leibniz',
    'locke': 'John_Locke',
    'berkeley': 'George_Berkeley',
    'hume': 'David_Hume',
    'hobbes': 'Thomas_Hobbes',
    'rousseau': 'Jean-Jacques_Rousseau',
    'montesquieu': 'Montesquieu',

    # Era 4
    'kant': 'Immanuel_Kant',
    'hegel': 'Georg_Wilhelm_Friedrich_Hegel',
    'fichte': 'Johann_Gottlieb_Fichte',
    'marx': 'Karl_Marx',
    'engels': 'Friedrich_Engels',
    'feuerbach': 'Ludwig_Feuerbach',
    'schopenhauer': 'Arthur_Schopenhauer',
    'nietzsche': 'Friedrich_Nietzsche',
    'kierkegaard': 'Søren_Kierkegaard',

    # Era 5
    'frege': 'Gottlob_Frege',
    'russell': 'Bertrand_Russell',
    'wittgenstein': 'Ludwig_Wittgenstein',
    'popper': 'Karl_Popper',
    'husserl': 'Edmund_Husserl',
    'heidegger': 'Martin_Heidegger',
    'sartre': 'Jean-Paul_Sartre',
    'camus': 'Albert_Camus',
    'adorno': 'Theodor_W._Adorno',
    'horkheimer': 'Max_Horkheimer',
    'marcuse': 'Herbert_Marcuse',
    'benjamin': 'Walter_Benjamin',

    # Era 6
    'foucault': 'Michel_Foucault',
    'derrida': 'Jacques_Derrida',
    'baudrillard': 'Jean_Baudrillard',
    'deleuze': 'Gilles_Deleuze',
    'chalmers': 'David_Chalmers',
    'searle': 'John_Searle',
    'nagel': 'Thomas_Nagel',
    'dennett': 'Daniel_Dennett',
    'donna-haraway': 'Donna_Haraway',
    'nick-bostrom': 'Nick_Bostrom',
    'hans-jonas': 'Hans_Jonas'
}

ECHO_PAGES = {
    'school-of-athens': 'The_School_of_Athens',
    'incredulity-thomas': 'The_Incredulity_of_Saint_Thomas_(Caravaggio)',
    'seventh-seal': 'The_Seventh_Seal',
    'brothers-karamazov': 'The_Brothers_Karamazov',
    'wanderer-fog': 'Wanderer_above_the_Sea_of_Fog',
    'thinker-rodin': 'The_Thinker',
    'nighthawks': 'Nighthawks_(Hopper)',
    'solaris': 'Solaris_(1972_film)',
    'space-odyssey': '2001:_A_Space_Odyssey',
    'blade-runner': 'Blade_Runner',
    'ex-machina': 'Ex_Machina_(film)',
    'oppenheimer': 'Oppenheimer_(film)',
    'matrix': 'The_Matrix',
    'her-movie': 'Her_(film)',
    'disco-elysium': 'Disco_Elysium',
    'cyberpunk-2077': 'Cyberpunk_2077'
}

os.makedirs('public/assets/philosophers', exist_ok=True)
os.makedirs('public/assets/echoes', exist_ok=True)

HEADERS = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"

def get_page_summary(page_title):
    url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{page_title}"
    cmd = ["curl.exe", "-s", "-A", "PhilosophyEduApp/1.0 (https://philosophysite.org)", url]
    try:
        res = subprocess.run(cmd, capture_output=True, timeout=10)
        if res.returncode == 0:
            return json.loads(res.stdout.decode('utf-8', errors='ignore'))
    except Exception as e:
        print(f"Error fetching summary for {page_title}: {e}")
    return None

def download_image(img_url, out_path, size=(400, 500)):
    if os.path.exists(out_path) and os.path.getsize(out_path) > 2000:
        print(f"Already exists: {out_path}")
        return True
    tmp_path = out_path + ".tmp"
    cmd = ["curl.exe", "-sL", "-A", HEADERS, img_url, "-o", tmp_path]
    try:
        res = subprocess.run(cmd, capture_output=True, timeout=15)
        if res.returncode == 0 and os.path.exists(tmp_path) and os.path.getsize(tmp_path) > 1000:
            try:
                with Image.open(tmp_path) as im:
                    im = im.convert('RGB')
                    im.thumbnail((size[0] * 2, size[1] * 2), Image.Resampling.LANCZOS)
                    im.save(out_path, 'JPEG', quality=88, optimize=True)
                os.remove(tmp_path)
                print(f"Saved: {out_path} ({os.path.getsize(out_path)} bytes)")
                return True
            except Exception as e:
                print(f"PIL error for {out_path}: {e}")
        else:
            print(f"Failed curl for {img_url}")
    except Exception as e:
        print(f"Curl error for {img_url}: {e}")
    if os.path.exists(tmp_path):
        try: os.remove(tmp_path)
        except: pass
    return False

wiki_metadata = {}

print("Fetching Philosophers...")
for pid, page in PHILOSOPHER_PAGES.items():
    out = f"public/assets/philosophers/{pid}.jpg"
    if os.path.exists(out) and os.path.getsize(out) > 2000:
        print(f"Philosopher {pid} already present.")
        continue
    data = get_page_summary(page)
    if data:
        wiki_metadata[pid] = {
            'extract': data.get('extract', ''),
            'description': data.get('description', '')
        }
        img_url = None
        if 'thumbnail' in data:
            img_url = data['thumbnail'].get('source')
        elif 'originalimage' in data:
            img_url = data['originalimage'].get('source')
        
        if img_url:
            print(f"Downloading {pid} from {img_url[:60]}...")
            download_image(img_url, out, (400, 500))
        else:
            print(f"No image in summary for {pid}")
    else:
        print(f"No summary for {page}")
    time.sleep(0.2)

print("\nFetching Echoes...")
for eid, page in ECHO_PAGES.items():
    out = f"public/assets/echoes/{eid}.jpg"
    if os.path.exists(out) and os.path.getsize(out) > 2000:
        print(f"Echo {eid} already present.")
        continue
    data = get_page_summary(page)
    if data:
        img_url = None
        if 'thumbnail' in data:
            img_url = data['thumbnail'].get('source')
        elif 'originalimage' in data:
            img_url = data['originalimage'].get('source')
        if img_url:
            print(f"Downloading {eid} from {img_url[:60]}...")
            download_image(img_url, out, (600, 400))
        else:
            print(f"No image in summary for {eid}")
    time.sleep(0.2)

with open('scratch/wiki_metadata.json', 'w', encoding='utf-8') as f:
    json.dump(wiki_metadata, f, ensure_ascii=False, indent=2)

print("Done! Metadata saved to scratch/wiki_metadata.json")
