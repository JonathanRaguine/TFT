# backend/seed_from_api.py
"""
USAGE:
  python seed_from_api.py

  Or with Docker:
  docker exec -it tft-backend-1 python seed_from_api.py
=============================================================================
"""

import requests  # Library for making HTTP requests (like a browser visiting a URL)
import json
from database import SessionLocal
from models import Champions, Traits


SET_NUMBER = "17"


CDRAGON_URL = "https://raw.communitydragon.org/pbe/cdragon/tft/en_us.json"



print(f"📡 Fetching TFT data from CommunityDragon (Set {SET_NUMBER})...")
print(f"   URL: {CDRAGON_URL}")
print(f"   (This file is ~20MB, may take a few seconds...)\n")

try:
    response = requests.get(CDRAGON_URL, timeout=30)
    
    response.raise_for_status()
except requests.exceptions.RequestException as e:
    
    print(f"❌ Failed to fetch data: {e}")
    print("   Check your internet connection and that the URL is correct.")
    exit(1)  


data = response.json()
print(f"✅ Downloaded successfully! Parsing Set {SET_NUMBER} data...\n")

if "sets" not in data:
    if "setData" in data:
        set_data = None
        for s in data["setData"]:
            if str(s.get("number")) == SET_NUMBER:
                set_data = s
                break
        if not set_data:
            print(f"❌ Could not find Set {SET_NUMBER} in setData array")
            exit(1)
    else:
        print("❌ JSON structure unexpected — neither 'sets' nor 'setData' found")
        print(f"   Top-level keys: {list(data.keys())}")
        exit(1)
else:
    if SET_NUMBER not in data["sets"]:
        print(f"❌ Set {SET_NUMBER} not found. Available sets: {list(data['sets'].keys())}")
        exit(1)
    set_data = data["sets"][SET_NUMBER]

raw_champions = set_data["champions"]
raw_traits = set_data["traits"]

print(f"📊 Found {len(raw_champions)} raw champion entries")
print(f"📊 Found {len(raw_traits)} trait entries\n")


set_prefix = f"TFT{SET_NUMBER}_"

playable_champions = [
    champ for champ in raw_champions
    if champ.get("apiName", "").startswith(set_prefix)
    and "TFT_Set17" in (champ.get("tileIcon") or "")
]

print(f"🧹 After filtering non-playable entries:")
print(f"   {len(raw_champions)} raw → {len(playable_champions)} playable champions")
print(f"   (Removed {len(raw_champions) - len(playable_champions)} system objects)\n")



db = SessionLocal()

print("🗑️  Clearing old data from database...")

from models import champion_trait
db.execute(champion_trait.delete())
db.query(Champions).delete()
db.query(Traits).delete()
db.commit()

print("🌱 Seeding traits...")
trait_map = {} 

for raw_trait in raw_traits:
    name = raw_trait.get("name", "Unknown")
    
    if not name or name == "Unknown":
        continue

    if name in trait_map:
        continue
  
    description = raw_trait.get("desc", "")
 
    effects = raw_trait.get("effects", {})
    
    trait_type = raw_trait.get("type", "origin")
    
    breakpoints_list = []
    if "conditionalTraitSets" in raw_trait:
        for condition in raw_trait["conditionalTraitSets"]:
            if "minUnits" in condition:
                breakpoints_list.append(str(condition["minUnits"]))
    

    if not breakpoints_list and effects:
        pass
    
    breakpoints_str = ",".join(breakpoints_list)
    
    trait = Traits(
        name=name,
        trait_type=trait_type,
        breakpoints=breakpoints_str,
        description=description
    )
    
    db.add(trait)
    trait_map[name] = trait
db.flush()
print(f"   ✅ Created {len(trait_map)} traits")

print("🌱 Seeding champions...")
champion_count = 0
skipped_traits = set()

for raw_champ in playable_champions:
    name = raw_champ.get("name", "Unknown")
    cost = raw_champ.get("cost", 1)
    api_name = raw_champ.get("apiName", "")

    raw_icon = raw_champ.get("tileIcon", "")
    if raw_icon:
        image_id = "game/" + raw_icon.lower().replace(".tex", ".png")
    else:
        image_id = api_name.replace(set_prefix, "") if api_name.startswith(set_prefix) else name
    

    champion = Champions(
        name=name,
        cost=cost,
        image_id=image_id,
        is_unlockable=False,
        unlock_requirement=None
    )
 
    trait_names = raw_champ.get("traits", [])
    matched_traits = []
    
    for trait_name in trait_names:
        if trait_name in trait_map:
            matched_traits.append(trait_map[trait_name])
        else:
            skipped_traits.add(trait_name)
    
    champion.traits.extend(matched_traits)
    db.add(champion)
    champion_count += 1

if skipped_traits:
    print(f"   ⚠️  Some trait names on champions didn't match the traits list:")
    print(f"      {skipped_traits}")
    print(f"      (These might be unique/hidden traits not in the main traits array)")

db.commit()
db.close()

print(f"\n{'='*60}")
print(f"✅ DATABASE SEEDED SUCCESSFULLY!")
print(f"{'='*60}")
print(f"   Set:        {SET_NUMBER}")
print(f"   Traits:     {len(trait_map)}")
print(f"   Champions:  {champion_count}")
print(f"{'='*60}")
print(f"\n💡 Next steps:")
print(f"   1. Update your frontend image URLs for Set 17 (tft_set17 paths)")
print(f"   2. Test with: curl http://localhost:8000/champions")
print(f"   3. When Set 18 drops, just change SET_NUMBER to '18'!")