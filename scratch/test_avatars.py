import os
import json

# Script to generate the comprehensive, production-grade src/data/philosophers.ts
# containing all 63 philosophers across the 18 theories and 6 eras.

out_file = "src/data/philosophers.ts"

header = """import { Philosopher } from '../types/philosophy';

export const PHILOSOPHERS_DATA: Philosopher[] = [
"""

# Let's verify how many images exist in public/assets/philosophers
local_avatars = set(os.listdir("public/assets/philosophers")) if os.path.exists("public/assets/philosophers") else set()

print(f"Current local avatars count: {len(local_avatars)}")
