import os
import subprocess
import time
from PIL import Image

PHILOSOPHERS = {
    # Era 1: Axial
    'thales': 'https://upload.wikimedia.org/wikipedia/commons/c/c6/Illustrerad_Verldshistoria_band_I_s_107.jpg',
    'heraclitus': 'https://upload.wikimedia.org/wikipedia/commons/5/52/Heraclitus_Johannes_Moreelse.jpg',
    'democritus': 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Democritus2.jpg',
    'socrates': 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Socrates_Louvre.jpg',
    'plato': 'https://upload.wikimedia.org/wikipedia/commons/8/88/Plato_Silanion_Musei_Capitolini_MC1377.jpg',
    'aristotle': 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Aristotle_Altemps_Inv8575.jpg',
    'laozi': 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Laozi_hanging_scroll_crop.jpg',
    'confucius': 'https://upload.wikimedia.org/wikipedia/commons/5/54/Confucius_Tang_Dynasty.jpg',
    'zhuangzi': 'https://upload.wikimedia.org/wikipedia/commons/d/de/Zhuangzi01.jpg',

    # Era 2: Hellenistic & Medieval
    'seneca': 'https://upload.wikimedia.org/wikipedia/commons/8/89/Seneca_Prado.jpg',
    'marcus-aurelius': 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Marcus_Aurelius_Glyptothek_Munich.jpg',
    'epicurus': 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Epicurus_bust_British_Museum.jpg',
    'epictetus': 'https://upload.wikimedia.org/wikipedia/commons/9/91/Epicteti_Enchiridion_Latinis_versibus_adumbratum_%28page_8_crop%29.jpg',
    'augustine': 'https://upload.wikimedia.org/wikipedia/commons/0/05/Saint_Augustine_by_Philippe_de_Champaigne.jpg',
    'plotinus': 'https://upload.wikimedia.org/wikipedia/commons/6/63/Plotinus_in_Ostia_Museum.jpg',
    'thomas-aquinas': 'https://upload.wikimedia.org/wikipedia/commons/5/5d/St-thomas-aquinas.jpg',
    'william-ockham': 'https://upload.wikimedia.org/wikipedia/commons/7/7b/William_of_Ockham.png',

    # Era 3: Enlightenment
    'descartes': 'https://upload.wikimedia.org/wikipedia/commons/7/73/Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg',
    'spinoza': 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Spinoza.jpg',
    'leibniz': 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Gottfried_Wilhelm_von_Leibniz.jpg',
    'locke': 'https://upload.wikimedia.org/wikipedia/commons/b/b8/John_Locke.jpg',
    'berkeley': 'https://upload.wikimedia.org/wikipedia/commons/5/52/George_Berkeley_by_John_Smibert.jpg',
    'hume': 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Allan_Ramsay_-_David_Hume%2C_1711_-_1776._Historian_and_philosopher_-_Google_Art_Project.jpg',
    'hobbes': 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Thomas_Hobbes_%28portrait%29.jpg',
    'rousseau': 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Jean-Jacques_Rousseau_%28painted_portrait%29.jpg',
    'montesquieu': 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Montesquieu_1.png',

    # Era 4: 19th Century
    'kant': 'https://upload.wikimedia.org/wikipedia/commons/4/43/Immanuel_Kant_%28painted_portrait%29.jpg',
    'hegel': 'https://upload.wikimedia.org/wikipedia/commons/0/08/Hegel_portrait_by_Schlesinger_1831.jpg',
    'fichte': 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Johann_Gottlieb_Fichte_1808.jpg',
    'marx': 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Karl_Marx_001.jpg',
    'engels': 'https://upload.wikimedia.org/wikipedia/commons/2/21/Friedrich_Engels_portrait_%28cropped%29.jpg',
    'feuerbach': 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Ludwig_Feuerbach_1860.jpg',
    'schopenhauer': 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Arthur_Schopenhauer_1859.jpg',
    'nietzsche': 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Nietzsche187a.jpg',
    'kierkegaard': 'https://upload.wikimedia.org/wikipedia/commons/2/25/Kierkegaard.jpg',

    # Era 5: 20th Century
    'frege': 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Gottlob_Frege_1879.jpg',
    'russell': 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Bertrand_Russell_1957.jpg',
    'wittgenstein': 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Ludwig_Wittgenstein_1929.jpg',
    'popper': 'https://upload.wikimedia.org/wikipedia/commons/4/43/Karl_Popper.jpg',
    'husserl': 'https://upload.wikimedia.org/wikipedia/commons/3/36/Edmund_Husserl_1910s.jpg',
    'heidegger': 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Martin_Heidegger_%281960%29.jpg',
    'sartre': 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Sartre_1967_crop.jpg',
    'camus': 'https://upload.wikimedia.org/wikipedia/commons/0/08/Albert_Camus%2C_gagnant_au_prix_Nobel%2C_portrait_en_buste%2C_pos%C3%A9_au_bureau%2C_faisant_face_%C3%A0_gauche%2C_cigarette_%C3%A0_la_main.jpg',
    'adorno': 'https://upload.wikimedia.org/wikipedia/commons/2/27/Theodor_W_Adorno_1964.jpg',
    'horkheimer': 'https://upload.wikimedia.org/wikipedia/commons/7/74/Max_Horkheimer_1964.jpg',
    'marcuse': 'https://upload.wikimedia.org/wikipedia/commons/3/34/Herbert_Marcuse_1955.jpg',
    'benjamin': 'https://upload.wikimedia.org/wikipedia/commons/8/87/Walter_Benjamin_1928.jpg',

    # Era 6: Contemporary & Post-human
    'foucault': 'https://upload.wikimedia.org/wikipedia/commons/3/36/Michel_Foucault_1974.jpg',
    'derrida': 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Jacques_Derrida_1995.jpg',
    'baudrillard': 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Jean_Baudrillard_2004.jpg',
    'deleuze': 'https://upload.wikimedia.org/wikipedia/commons/3/36/Gilles_Deleuze_1975.jpg',
    'chalmers': 'https://upload.wikimedia.org/wikipedia/commons/c/c9/David_Chalmers_at_NYU.jpg',
    'searle': 'https://upload.wikimedia.org/wikipedia/commons/1/1d/John_Searle_at_UC_Berkeley_in_2005.jpg',
    'nagel': 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Thomas_Nagel_2008.jpg',
    'dennett': 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Daniel_Dennett_at_Aarhus_University_2008.jpg',
    'donna-haraway': 'https://upload.wikimedia.org/wikipedia/commons/0/07/Donna_Haraway_2006.jpg',
    'nick-bostrom': 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Nick_Bostrom_Ted_Talk_2015.jpg',
    'hans-jonas': 'https://upload.wikimedia.org/wikipedia/commons/9/91/Hans_Jonas_1987.jpg'
}

ECHOES = {
    'school-of-athens': 'https://upload.wikimedia.org/wikipedia/commons/4/49/%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg',
    'matrix': 'https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg',
    'incredulity-thomas': 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Caravaggio_-_The_Incredulity_of_Saint_Thomas.jpg',
    'seventh-seal': 'https://upload.wikimedia.org/wikipedia/en/8/81/The_Seventh_Seal_poster.jpg',
    'brothers-karamazov': 'https://upload.wikimedia.org/wikipedia/commons/7/77/Dostoevsky_1872_by_Perov.jpg',
    'wanderer-fog': 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg',
    'thinker-rodin': 'https://upload.wikimedia.org/wikipedia/commons/a/a5/The_Thinker%2C_Rodin.jpg',
    'nighthawks': 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Nighthawks_by_Edward_Hopper_1942.jpg',
    'solaris': 'https://upload.wikimedia.org/wikipedia/en/9/92/Solaris_%281972_film%29_poster.jpg',
    'space-odyssey': 'https://upload.wikimedia.org/wikipedia/en/1/11/2001_A_Space_Odyssey_%281968%29_theatrical_poster_variant.jpg',
    'blade-runner': 'https://upload.wikimedia.org/wikipedia/en/9/9f/Blade_Runner_%281982_poster%29.png',
    'ex-machina': 'https://upload.wikimedia.org/wikipedia/en/6/67/Ex-machina-uk-poster.jpg',
    'oppenheimer': 'https://upload.wikimedia.org/wikipedia/en/4/4a/Oppenheimer_%28film%29.jpg',
    'disco-elysium': 'https://upload.wikimedia.org/wikipedia/en/3/3b/Disco_Elysium_poster.jpg',
    'cyberpunk-2077': 'https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg',
    'her-movie': 'https://upload.wikimedia.org/wikipedia/en/4/44/Her2013Poster.jpg'
}

os.makedirs('public/assets/philosophers', exist_ok=True)
os.makedirs('public/assets/echoes', exist_ok=True)

def download_one(url, target_path, size=(400, 500)):
    if os.path.exists(target_path) and os.path.getsize(target_path) > 2000:
        print(f"Skipping {target_path} (exists)")
        return True
    
    tmp_path = target_path + ".tmp"
    cmd = [
        "curl.exe", "-sL",
        "-A", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        url,
        "-o", tmp_path
    ]
    try:
        res = subprocess.run(cmd, capture_output=True, timeout=15)
        if res.returncode == 0 and os.path.exists(tmp_path) and os.path.getsize(tmp_path) > 1000:
            try:
                with Image.open(tmp_path) as im:
                    im = im.convert('RGB')
                    im.thumbnail((size[0] * 2, size[1] * 2), Image.Resampling.LANCZOS)
                    im.save(target_path, 'JPEG', quality=88, optimize=True)
                os.remove(tmp_path)
                print(f"Successfully saved {target_path} ({os.path.getsize(target_path)} bytes)")
                return True
            except Exception as e:
                print(f"Image processing error for {target_path}: {e}")
                if os.path.exists(tmp_path):
                    os.remove(tmp_path)
                return False
        else:
            print(f"Failed to fetch {url} -> status {res.returncode}")
            if os.path.exists(tmp_path):
                os.remove(tmp_path)
            return False
    except Exception as e:
        print(f"Curl error for {url}: {e}")
        return False

print("Downloading Philosophers...")
for pid, url in PHILOSOPHERS.items():
    out = f"public/assets/philosophers/{pid}.jpg"
    download_one(url, out, (400, 500))
    time.sleep(0.3)

print("\nDownloading Cultural Echoes...")
for eid, url in ECHOES.items():
    out = f"public/assets/echoes/{eid}.jpg"
    download_one(url, out, (600, 400))
    time.sleep(0.3)

print("Batch download completed.")
