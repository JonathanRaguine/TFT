import requests
import json
from database import SessionLocal
from models import Champions, Traits

SET_NUMBER = "17"

CDRAGON_URL = "https://raw.communitydragon.org/pbe/cdragon/tft/en_us.json"

BREAKPOINT_FALLBACKS = {
    "Anima": "3,6",
    "Arbiter": "2,3",
    "Dark Star": "2,4,6,9",
    "Mecha": "2,4",
    "Meeple": "3,5,7,10",
    "N.O.V.A.": "2,3,5",
    "Primordian": "2,4,6",
    "Psionic": "2,4",
    "Space Groove": "1,3,5,7",
    "Stargazer": "3,5,7",
    "Timebreaker": "2,4,6",
    "Arcanist": "2,4,6",
    "Bastion": "2,4,6",
    "Brawler": "2,4,6",
    "Challenger": "2,3,4,5",
    "Channeler": "2,3,4,5",
    "Fateweaver": "2,4",
    "Marauder": "2,4,6",
    "Replicator": "2,4",
    "Rogue": "2,4,6",
    "Shepherd": "3,5,7",
    "Slayer": "2,4,6",
    "Sniper": "2,3,4,5",
    "Vanguard": "2,4,6",
    "Voyager": "2,4,6",
    "Bulwark": "1",
    "Commander": "1",
    "Dark Lady": "1",
    "Divine Duelist": "1",
    "Doomer": "1",
    "Eradicator": "1",
    "Factory New": "1",
    "Galaxy Hunter": "1",
    "Gun Goddess": "1",
    "Oracle": "1",
    "Party Animal": "1",
    "Reactor": "1",
}



try:
    response = requests.get(CDRAGON_URL, timeout=30)
    response.raise_for_status()
except requests.exceptions.RequestException as e:
    print(f"❌ Failed to fetch data: {e}")
    exit(1)

data = response.json()

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


db = SessionLocal()


from models import champion_trait
db.execute(champion_trait.delete())
db.query(Champions).delete()
db.query(Traits).delete()
db.commit()

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

    breakpoints_str = ",".join(breakpoints_list)

    if not breakpoints_str:
        breakpoints_str = BREAKPOINT_FALLBACKS.get(name, "")
        if breakpoints_str:
            print(f"   📋 Used fallback breakpoints for: {name}")

    trait = Traits(
        name=name,
        trait_type=trait_type,
        breakpoints=breakpoints_str,
        description=description
    )

    db.add(trait)
    trait_map[name] = trait
db.flush()

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

db.commit()
db.close()

print(f"\n{'='*60}")
print(f"✅ DATABASE SEEDED SUCCESSFULLY!")
print(f"{'='*60}")
print(f"   Set:        {SET_NUMBER}")
print(f"   Traits:     {len(trait_map)}")
print(f"   Champions:  {champion_count}")
print(f"{'='*60}")