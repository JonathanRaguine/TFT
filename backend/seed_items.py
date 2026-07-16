from database import SessionLocal
from models import Items

db = SessionLocal()

db.query(Items).delete()
db.commit()

components = [
    {"name": "B.F. Sword", "image_id": "TFT_Item_BFSword.png", "description": "+10% Attack Damage"},
    {"name": "Recurve Bow", "image_id": "TFT_Item_RecurveBow.png", "description": "+10% Attack Speed"},
    {"name": "Needlessly Large Rod", "image_id": "TFT_Item_NeedlesslyLargeRod.png", "description": "+10 Ability Power"},
    {"name": "Tear of the Goddess", "image_id": "TFT_Item_TearOfTheGoddess.png", "description": "+15 Mana"},
    {"name": "Chain Vest", "image_id": "TFT_Item_ChainVest.png", "description": "+20 Armor"},
    {"name": "Negatron Cloak", "image_id": "TFT_Item_NegatronCloak.png", "description": "+20 Magic Resist"},
    {"name": "Giant's Belt", "image_id": "TFT_Item_GiantsBelt.png", "description": "+150 Health"},
    {"name": "Sparring Gloves", "image_id": "TFT_Item_SparringGloves.png", "description": "+20% Crit Chance"},
    {"name": "Spatula", "image_id": "TFT_Item_Spatula.png", "description": "It must do something..."},
]

combined_items = [
    {"name": "Deathblade", "image_id": "TFT_Item_Deathblade.png",
     "component1": "B.F. Sword", "component2": "B.F. Sword",
     "description": "+55% Attack Damage"},

    {"name": "Giant Slayer", "image_id": "TFT_Item_MadredsBloodrazor.png",
     "component1": "B.F. Sword", "component2": "Recurve Bow",
     "description": "Deal bonus damage to high HP enemies"},

    {"name": "Hextech Gunblade", "image_id": "TFT_Item_HextechGunblade.png",
     "component1": "B.F. Sword", "component2": "Needlessly Large Rod",
     "description": "Heal for damage dealt, heal lowest ally"},

    {"name": "Spear of Shojin", "image_id": "TFT_Item_SpearOfShojin.png",
     "component1": "B.F. Sword", "component2": "Tear of the Goddess",
     "description": "Attacks grant bonus mana"},

    {"name": "Edge of Night", "image_id": "TFT_Item_GuardianAngel.png",
     "component1": "B.F. Sword", "component2": "Chain Vest",
     "description": "Stealth and Attack Speed when low HP"},

    {"name": "Bloodthirster", "image_id": "TFT_Item_Bloodthirster.png",
     "component1": "B.F. Sword", "component2": "Negatron Cloak",
     "description": "Omnivamp, shield when taking damage"},

    {"name": "Guardbreaker", "image_id": "TFT_Item_PowerGauntlet.png",
     "component1": "B.F. Sword", "component2": "Giant's Belt",
     "description": "Bonus damage after shield breaks"},

    {"name": "Infinity Edge", "image_id": "TFT_Item_InfinityEdge.png",
     "component1": "B.F. Sword", "component2": "Sparring Gloves",
     "description": "Bonus crit chance and crit damage"},

    {"name": "Rapid Firecannon", "image_id": "TFT_Item_RapidFireCannon.png",
     "component1": "Recurve Bow", "component2": "Recurve Bow",
     "description": "Extended range, attacks can't miss"},

    {"name": "Guinsoo's Rageblade", "image_id": "TFT_Item_GuinsoosRageblade.png",
     "component1": "Recurve Bow", "component2": "Needlessly Large Rod",
     "description": "Attacks grant stacking Attack Speed"},

    {"name": "Statikk Shiv", "image_id": "TFT_Item_StatikkShiv.png",
     "component1": "Recurve Bow", "component2": "Tear of the Goddess",
     "description": "Chain lightning on attack"},

    {"name": "Titan's Resolve", "image_id": "TFT_Item_TitansResolve.png",
     "component1": "Recurve Bow", "component2": "Chain Vest",
     "description": "Stack AD/AP when attacking or hit"},

    {"name": "Runaan's Hurricane", "image_id": "TFT_Item_RunaansHurricane.png",
     "component1": "Recurve Bow", "component2": "Negatron Cloak",
     "description": "Attacks hit additional enemies"},

    {"name": "Void Staff", "image_id": "TFT_Item_StatikkShiv.png",
     "component1": "Recurve Bow", "component2": "Giant's Belt",
     "description": "Magic damage penetration"},

    {"name": "Last Whisper", "image_id": "TFT_Item_LastWhisper.png",
     "component1": "Recurve Bow", "component2": "Sparring Gloves",
     "description": "Armor shred on crit"},

    {"name": "Rabadon's Deathcap", "image_id": "TFT_Item_RabadonsDeathcap.png",
     "component1": "Needlessly Large Rod", "component2": "Needlessly Large Rod",
     "description": "Bonus Ability Power"},

    {"name": "Archangel's Staff", "image_id": "TFT_Item_ArchangelsStaff.png",
     "component1": "Needlessly Large Rod", "component2": "Tear of the Goddess",
     "description": "Gain AP over combat duration"},

    {"name": "Ionic Spark", "image_id": "TFT_Item_IonicSpark.png",
     "component1": "Needlessly Large Rod", "component2": "Negatron Cloak",
     "description": "Shred MR, damage on enemy cast"},

    {"name": "Morellonomicon", "image_id": "TFT_Item_Morellonomicon.png",
     "component1": "Needlessly Large Rod", "component2": "Giant's Belt",
     "description": "Abilities burn enemies"},

    {"name": "Jeweled Gauntlet", "image_id": "TFT_Item_JeweledGauntlet.png",
     "component1": "Needlessly Large Rod", "component2": "Sparring Gloves",
     "description": "Abilities can critically strike"},

    {"name": "Blue Buff", "image_id": "TFT_Item_BlueBuff.png",
     "component1": "Tear of the Goddess", "component2": "Tear of the Goddess",
     "description": "Gain mana after casting"},

    {"name": "Protector's Vow", "image_id": "TFT_Item_FrozenHeart.png",
     "component1": "Tear of the Goddess", "component2": "Chain Vest",
     "description": "Shield when first taking damage"},

    {"name": "Redemption", "image_id": "TFT_Item_Redemption.png",
     "component1": "Tear of the Goddess", "component2": "Giant's Belt",
     "description": "Heal allies on death"},

    {"name": "Hand of Justice", "image_id": "TFT_Item_UnstableConcoction.png",
     "component1": "Tear of the Goddess", "component2": "Sparring Gloves",
     "description": "AD/AP and Omnivamp or extra damage"},

    {"name": "Bramble Vest", "image_id": "TFT_Item_BrambleVest.png",
     "component1": "Chain Vest", "component2": "Chain Vest",
     "description": "Reflect damage, reduce crits taken"},

    {"name": "Gargoyle Stoneplate", "image_id": "TFT_Item_GargoyleStoneplate.png",
     "component1": "Chain Vest", "component2": "Negatron Cloak",
     "description": "Armor/MR per enemy targeting"},

    {"name": "Sunfire Cape", "image_id": "TFT_Item_RedBuff.png",
     "component1": "Chain Vest", "component2": "Giant's Belt",
     "description": "Burn nearby enemies"},

    {"name": "Crownguard", "image_id": "TFT_Item_Crownguard.png",
     "component1": "Chain Vest", "component2": "Sparring Gloves",
     "description": "Shield and AP at combat start"},

    {"name": "Dragon's Claw", "image_id": "TFT_Item_DragonsClaw.png",
     "component1": "Negatron Cloak", "component2": "Negatron Cloak",
     "description": "Magic resist, reduce magic damage"},

    {"name": "Adaptive Helm", "image_id": "TFT_Item_AdaptiveHelm.png",
     "component1": "Negatron Cloak", "component2": "Giant's Belt",
     "description": "Bonus stats based on position"},

    {"name": "Quicksilver", "image_id": "TFT_Item_Quicksilver.png",
     "component1": "Negatron Cloak", "component2": "Sparring Gloves",
     "description": "Crowd control immunity"},

    {"name": "Warmog's Armor", "image_id": "TFT_Item_WarmogsArmor.png",
     "component1": "Giant's Belt", "component2": "Giant's Belt",
     "description": "Regenerate health each second"},

    {"name": "Sterak's Gage", "image_id": "TFT_Item_SteraksGage.png",
     "component1": "Giant's Belt", "component2": "Sparring Gloves",
     "description": "Shield when low HP, gain AD"},

    {"name": "Thief's Gloves", "image_id": "TFT_Item_ThiefsGloves.png",
     "component1": "Sparring Gloves", "component2": "Sparring Gloves",
     "description": "Equip 2 random items each round"},

    {"name": "Tactician's Crown", "image_id": "TFT_Item_ForceOfNature.png",
     "component1": "Spatula", "component2": "Spatula",
     "description": "Gain +1 team size"},
]

count = 0

for item_data in components:
    item = Items(
        name=item_data["name"],
        image_id=item_data["image_id"],
        is_component=True,
        description=item_data["description"],
        component1=None,
        component2=None
    )
    db.add(item)
    count += 1

for item_data in combined_items:
    item = Items(
        name=item_data["name"],
        image_id=item_data["image_id"],
        is_component=False,
        description=item_data["description"],
        component1=item_data["component1"],
        component2=item_data["component2"]
    )
    db.add(item)
    count += 1

db.commit()
db.close()

print(f"✅ Seeded {count} items!")
print(f"   - {len(components)} components")
print(f"   - {len(combined_items)} combined items")