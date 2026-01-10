from database import SessionLocal
from models import Champions, Traits

db = SessionLocal()

# ============ TRAITS ============
# Origins
bilgewater = Traits(name="Bilgewater", trait_type="origin", breakpoints="3,5,7,10", description="Earn Silver Serpents each round for the Black Market.")
demacia = Traits(name="Demacia", trait_type="origin", breakpoints="3,5,7,11", description="Demacians Rally when team loses health, reducing ability costs.")
freljord = Traits(name="Freljord", trait_type="origin", breakpoints="3,5,7", description="Summon Frozen Towers that grant Health and Damage Amp.")
ionia = Traits(name="Ionia", trait_type="origin", breakpoints="3,5,7", description="Ionians gain Shield, Attack Damage, and Ability Power.")
ixtal = Traits(name="Ixtal", trait_type="origin", breakpoints="3,5,7", description="Complete Quests to earn Sunshards for loot.")
noxus = Traits(name="Noxus", trait_type="origin", breakpoints="3,5,7,10", description="Summon Atakhan after enemies lose 15% Health.")
piltover = Traits(name="Piltover", trait_type="origin", breakpoints="2,4,6", description="Build inventions that activate after 8 seconds.")
shadow_isles = Traits(name="Shadow Isles", trait_type="origin", breakpoints="2,3,4,5", description="Gain Souls when champions die, empowering abilities.")
shurima = Traits(name="Shurima", trait_type="origin", breakpoints="2,3,4", description="Shurimans gain Attack Speed and restore Health each second.")
targon = Traits(name="Targon", trait_type="origin", breakpoints="", description="Targonians are traitless but stronger than average.")
void = Traits(name="Void", trait_type="origin", breakpoints="2,4,6,9", description="Gain Mutations that only Void champions can use.")
yordle = Traits(name="Yordle", trait_type="origin", breakpoints="2,4,6,8", description="Yordles gain Health and Attack Speed per unique Yordle.")
zaun = Traits(name="Zaun", trait_type="origin", breakpoints="3,5,7", description="Zaunites become Shimmer-Fused, gaining Durability and Attack Speed.")

# Classes
arcanist = Traits(name="Arcanist", trait_type="class", breakpoints="2,4,6", description="Team gains Ability Power, Arcanists gain more.")
bruiser = Traits(name="Bruiser", trait_type="class", breakpoints="2,4,6", description="Team gains max Health, Bruisers gain more.")
defender = Traits(name="Defender", trait_type="class", breakpoints="2,4,6", description="Team gains Armor and Magic Resist, Defenders gain more.")
disruptor = Traits(name="Disruptor", trait_type="class", breakpoints="2,4", description="Abilities Dazzle enemies, dealing bonus damage to them.")
gunslinger = Traits(name="Gunslinger", trait_type="class", breakpoints="2,4", description="Gunslingers gain AD, every 4th attack deals bonus damage.")
invoker = Traits(name="Invoker", trait_type="class", breakpoints="2,4", description="Team gains Mana Regen, Invokers gain more Mana from all sources.")
juggernaut = Traits(name="Juggernaut", trait_type="class", breakpoints="2,4,6", description="Juggernauts gain Durability, increased while above 50% health.")
longshot = Traits(name="Longshot", trait_type="class", breakpoints="2,3,4,5", description="Longshots gain Damage Amp, more damage to farther targets.")
quickstriker = Traits(name="Quickstriker", trait_type="class", breakpoints="2,3,4,5", description="Team gains Attack Speed, Quickstrikers gain more based on target's missing Health.")
slayer = Traits(name="Slayer", trait_type="class", breakpoints="2,4,6", description="Slayers gain Omnivamp and Attack Damage.")
vanquisher = Traits(name="Vanquisher", trait_type="class", breakpoints="2,3,4,5", description="Abilities can crit, gain Crit Chance and Crit Damage.")
warden = Traits(name="Warden", trait_type="class", breakpoints="2,3,4,5", description="Wardens gain Shield when dropping below 75% and 25% Health.")

# Unique traits
ascendant = Traits(name="Ascendant", trait_type="unique", breakpoints="1", description="Ascendant Charms appear in shop after combat.")
assimilator = Traits(name="Assimilator", trait_type="unique", breakpoints="1", description="Kai'Sa ability changes based on higher stat.")
blacksmith = Traits(name="Blacksmith", trait_type="unique", breakpoints="1", description="Ornn forges Artifact items after combat.")
caretaker = Traits(name="Caretaker", trait_type="unique", breakpoints="1", description="Win: gain random unit. Lose: gain free rerolls.")
chainbreaker = Traits(name="Chainbreaker", trait_type="unique", breakpoints="1", description="Sylas rotates between 3 abilities.")
chronokeeper = Traits(name="Chronokeeper", trait_type="unique", breakpoints="1", description="Stores XP every 2 casts, transfers when enough to level.")
dark_child = Traits(name="Dark Child", trait_type="unique", breakpoints="1", description="Annie summons Tibbers on bench.")
darkin = Traits(name="Darkin", trait_type="unique", breakpoints="1,2,3", description="Darkin gain Omnivamp.")
dragonborn = Traits(name="Dragonborn", trait_type="unique", breakpoints="1", description="Shyvana transforms, allies take less ability damage.")
emperor = Traits(name="Emperor", trait_type="unique", breakpoints="1", description="Azir deploys two Guards.")
eternal = Traits(name="Eternal", trait_type="unique", breakpoints="1", description="Every 3rd attack on same enemy deals 350% damage.")
glutton = Traits(name="Glutton", trait_type="unique", breakpoints="1", description="Feed Tahm Kench champions for permanent stats.")
harvester = Traits(name="Harvester", trait_type="unique", breakpoints="1", description="Gain Mana on enemy death, abilities don't consume Mana.")
heroic = Traits(name="Heroic", trait_type="unique", breakpoints="1", description="Galio joins from bench when Demacians Rally.")
hexmech = Traits(name="HexMech", trait_type="unique", breakpoints="1", description="Pilot jumps into T-Hex, gaining stats.")
huntress = Traits(name="Huntress", trait_type="unique", breakpoints="1", description="While Neeko alive, Nidalee can't be targeted by attacks.")
immortal = Traits(name="Immortal", trait_type="unique", breakpoints="1", description="Zaahen gains traits without Xin Zhao, can revive.")
riftscourge = Traits(name="Riftscourge", trait_type="unique", breakpoints="1", description="Baron Nashor creates Void Rift after 8 seconds.")
rune_mage = Traits(name="Rune Mage", trait_type="unique", breakpoints="1", description="Ryze benefits from all Region traits.")
soulbound = Traits(name="Soulbound", trait_type="unique", breakpoints="1", description="Lucian and Senna swap when casting.")
star_forger = Traits(name="Star Forger", trait_type="unique", breakpoints="1", description="Aurelion Sol gains Stardust per Targonian.")
the_boss = Traits(name="The Boss", trait_type="unique", breakpoints="1", description="Sett does sit-ups at low health, returns Pumped Up.")
world_ender = Traits(name="World Ender", trait_type="unique", breakpoints="1", description="Aatrox gains AD from Omnivamp, revives on first death.")

# Add all traits
all_traits = [
    bilgewater, demacia, freljord, ionia, ixtal, noxus, piltover, shadow_isles, 
    shurima, targon, void, yordle, zaun, arcanist, bruiser, defender, disruptor, 
    gunslinger, invoker, juggernaut, longshot, quickstriker, slayer, vanquisher, 
    warden, ascendant, assimilator, blacksmith, caretaker, chainbreaker, chronokeeper,
    dark_child, darkin, dragonborn, emperor, eternal, glutton, harvester, heroic,
    hexmech, huntress, immortal, riftscourge, rune_mage, soulbound, star_forger,
    the_boss, world_ender
]

for trait in all_traits:
    db.add(trait)
db.commit()

# ============ CHAMPIONS ============
# 1-cost champions (not unlockable)
anivia = Champions(name="Anivia", cost=1, image_id="Anivia")
anivia.traits.extend([freljord, invoker])

blitzcrank = Champions(name="Blitzcrank", cost=1, image_id="Blitzcrank")
blitzcrank.traits.extend([zaun, juggernaut])

briar = Champions(name="Briar", cost=1, image_id="Briar")
briar.traits.extend([noxus, slayer, juggernaut])

caitlyn = Champions(name="Caitlyn", cost=1, image_id="Caitlyn")
caitlyn.traits.extend([piltover, longshot])

illaoi = Champions(name="Illaoi", cost=1, image_id="Illaoi")
illaoi.traits.extend([bilgewater, bruiser])

jarvan_iv = Champions(name="Jarvan IV", cost=1, image_id="JarvanIV")
jarvan_iv.traits.extend([demacia, defender])

jhin = Champions(name="Jhin", cost=1, image_id="Jhin")
jhin.traits.extend([ionia, gunslinger])

kogmaw = Champions(name="Kog'Maw", cost=1, image_id="KogMaw")
kogmaw.traits.extend([void, arcanist, longshot])

lulu = Champions(name="Lulu", cost=1, image_id="Lulu")
lulu.traits.extend([yordle, arcanist])

qiyana = Champions(name="Qiyana", cost=1, image_id="Qiyana")
qiyana.traits.extend([ixtal, slayer])

rumble = Champions(name="Rumble", cost=1, image_id="Rumble")
rumble.traits.extend([yordle, defender])

shen = Champions(name="Shen", cost=1, image_id="Shen")
shen.traits.extend([ionia, bruiser])

sona = Champions(name="Sona", cost=1, image_id="Sona")
sona.traits.extend([demacia, invoker])

viego = Champions(name="Viego", cost=1, image_id="Viego")
viego.traits.extend([shadow_isles, quickstriker])

# 2-cost champions
aphelios = Champions(name="Aphelios", cost=2, image_id="Aphelios")
aphelios.traits.extend([targon])

ashe = Champions(name="Ashe", cost=2, image_id="Ashe")
ashe.traits.extend([freljord, quickstriker])

bard = Champions(name="Bard", cost=2, is_unlockable=True, unlock_requirement="Reroll 4 times before Stage 2 Carousel", image_id="Bard")
bard.traits.extend([caretaker])

chogath = Champions(name="Cho'Gath", cost=2, image_id="Chogath")
chogath.traits.extend([void, juggernaut])

ekko = Champions(name="Ekko", cost=2, image_id="Ekko")
ekko.traits.extend([zaun, disruptor])

graves = Champions(name="Graves", cost=2, is_unlockable=True, unlock_requirement="Twisted Fate with 2 items equipped", image_id="Graves")
graves.traits.extend([bilgewater, gunslinger])

neeko = Champions(name="Neeko", cost=2, image_id="Neeko")
neeko.traits.extend([ixtal, arcanist, defender])

orianna = Champions(name="Orianna", cost=2, is_unlockable=True, unlock_requirement="2 unique Piltover units", image_id="Orianna")
orianna.traits.extend([piltover, invoker])

poppy = Champions(name="Poppy", cost=2, is_unlockable=True, unlock_requirement="Demacian or Yordle with 2 items equipped", image_id="Poppy")
poppy.traits.extend([demacia, yordle, juggernaut])

reksai = Champions(name="Rek'Sai", cost=2, image_id="RekSai")
reksai.traits.extend([void, vanquisher])

sion = Champions(name="Sion", cost=2, image_id="Sion")
sion.traits.extend([noxus, bruiser])

teemo = Champions(name="Teemo", cost=2, image_id="Teemo")
teemo.traits.extend([yordle, longshot])

tristana = Champions(name="Tristana", cost=2, image_id="Tristana")
tristana.traits.extend([yordle, gunslinger])

tryndamere = Champions(name="Tryndamere", cost=2, is_unlockable=True, unlock_requirement="Ashe with 2 items equipped", image_id="Tryndamere")
tryndamere.traits.extend([freljord, slayer])

twisted_fate = Champions(name="Twisted Fate", cost=2, image_id="TwistedFate")
twisted_fate.traits.extend([bilgewater, quickstriker])

vi = Champions(name="Vi", cost=2, image_id="Vi")
vi.traits.extend([piltover, zaun, defender])

xin_zhao = Champions(name="Xin Zhao", cost=2, image_id="XinZhao")
xin_zhao.traits.extend([demacia, ionia, warden])

yasuo = Champions(name="Yasuo", cost=2, image_id="Yasuo")
yasuo.traits.extend([ionia, slayer])

yorick = Champions(name="Yorick", cost=2, is_unlockable=True, unlock_requirement="2-star Viego with 1 item equipped", image_id="Yorick")
yorick.traits.extend([shadow_isles, warden])

# 3-cost champions
ahri = Champions(name="Ahri", cost=3, image_id="Ahri")
ahri.traits.extend([ionia, arcanist])

darius = Champions(name="Darius", cost=3, is_unlockable=True, unlock_requirement="Have Draven drop 1 gold", image_id="Darius")
darius.traits.extend([noxus, defender])

draven = Champions(name="Draven", cost=3, image_id="Draven")
draven.traits.extend([noxus, quickstriker])

dr_mundo = Champions(name="Dr. Mundo", cost=3, image_id="DrMundo")
dr_mundo.traits.extend([zaun, bruiser])

gangplank = Champions(name="Gangplank", cost=3, image_id="Gangplank")
gangplank.traits.extend([bilgewater, slayer, vanquisher])

gwen = Champions(name="Gwen", cost=3, is_unlockable=True, unlock_requirement="Collect 20 Shadow Isles Souls", image_id="Gwen")
gwen.traits.extend([shadow_isles, disruptor])

jinx = Champions(name="Jinx", cost=3, image_id="Jinx")
jinx.traits.extend([zaun, gunslinger])

kennen = Champions(name="Kennen", cost=3, is_unlockable=True, unlock_requirement="8 star levels of Ionia, Yordle, or Defender", image_id="Kennen")
kennen.traits.extend([ionia, yordle, defender])

kobuko_yuumi = Champions(name="Kobuko & Yuumi", cost=3, is_unlockable=True, unlock_requirement="Level 7 + 6 star levels of Yordle, Bruiser, or Invoker", image_id="Yuumi")
kobuko_yuumi.traits.extend([yordle, bruiser, invoker])

leblanc = Champions(name="LeBlanc", cost=3, is_unlockable=True, unlock_requirement="Sion with 2 items equipped", image_id="Leblanc")
leblanc.traits.extend([noxus, invoker])

leona = Champions(name="Leona", cost=3, image_id="Leona")
leona.traits.extend([targon])

loris = Champions(name="Loris", cost=3, image_id="Loris")
loris.traits.extend([piltover, warden])

malzahar = Champions(name="Malzahar", cost=3, image_id="Malzahar")
malzahar.traits.extend([void, disruptor])

milio = Champions(name="Milio", cost=3, image_id="Milio")
milio.traits.extend([ixtal, invoker])

nautilus = Champions(name="Nautilus", cost=3, image_id="Nautilus")
nautilus.traits.extend([bilgewater, juggernaut, warden])

sejuani = Champions(name="Sejuani", cost=3, image_id="Sejuani")
sejuani.traits.extend([freljord, defender])

vayne = Champions(name="Vayne", cost=3, image_id="Vayne")
vayne.traits.extend([demacia, longshot])

zoe = Champions(name="Zoe", cost=3, image_id="Zoe")
zoe.traits.extend([targon])

# 4-cost champions
ambessa = Champions(name="Ambessa", cost=4, image_id="Ambessa")
ambessa.traits.extend([noxus, vanquisher])

belveth = Champions(name="Bel'Veth", cost=4, image_id="Belveth")
belveth.traits.extend([void, slayer])

braum = Champions(name="Braum", cost=4, image_id="Braum")
braum.traits.extend([freljord, warden])

diana = Champions(name="Diana", cost=4, is_unlockable=True, unlock_requirement="Level 6 + 2-star Leona with 3 items equipped", image_id="Diana")
diana.traits.extend([targon])

fizz = Champions(name="Fizz", cost=4, is_unlockable=True, unlock_requirement="Level 7 + 5 unique Yordles or Bilgewater units", image_id="Fizz")
fizz.traits.extend([bilgewater, yordle])

garen = Champions(name="Garen", cost=4, image_id="Garen")
garen.traits.extend([demacia, defender])

kaisa = Champions(name="Kai'Sa", cost=4, is_unlockable=True, unlock_requirement="Level 7 + Longshot with 3 items equipped", image_id="Kaisa")
kaisa.traits.extend([assimilator, void, longshot])

kalista = Champions(name="Kalista", cost=4, is_unlockable=True, unlock_requirement="Collect 70 Shadow Isles Souls", image_id="Kalista")
kalista.traits.extend([shadow_isles, vanquisher])

lissandra = Champions(name="Lissandra", cost=4, image_id="Lissandra")
lissandra.traits.extend([freljord, invoker])

lux = Champions(name="Lux", cost=4, image_id="Lux")
lux.traits.extend([demacia, arcanist])

miss_fortune = Champions(name="Miss Fortune", cost=4, image_id="MissFortune")
miss_fortune.traits.extend([bilgewater, gunslinger])

nasus = Champions(name="Nasus", cost=4, is_unlockable=True, unlock_requirement="Lose 2 combats in a row with Azir", image_id="Nasus")
nasus.traits.extend([shurima])

nidalee = Champions(name="Nidalee", cost=4, is_unlockable=True, unlock_requirement="Two 2-star Neekos", image_id="Nidalee")
nidalee.traits.extend([ixtal, huntress])

renekton = Champions(name="Renekton", cost=4, is_unlockable=True, unlock_requirement="Win 2 combats in a row with Azir", image_id="Renekton")
renekton.traits.extend([shurima])

rift_herald = Champions(name="Rift Herald", cost=4, is_unlockable=True, unlock_requirement="Have Void active for 8 player combats", image_id="RiftHerald")
rift_herald.traits.extend([void, bruiser])

seraphine = Champions(name="Seraphine", cost=4, image_id="Seraphine")
seraphine.traits.extend([piltover, disruptor])

singed = Champions(name="Singed", cost=4, is_unlockable=True, unlock_requirement="4 unique Zaunites or Juggernauts + Lose 35 Player Health", image_id="Singed")
singed.traits.extend([zaun, juggernaut])

skarner = Champions(name="Skarner", cost=4, is_unlockable=True, unlock_requirement="Level 7 + Non-Tank with Gargoyle's Stoneplate equipped", image_id="Skarner")
skarner.traits.extend([ixtal])

swain = Champions(name="Swain", cost=4, image_id="Swain")
swain.traits.extend([noxus, arcanist, juggernaut])

taric = Champions(name="Taric", cost=4, image_id="Taric")
taric.traits.extend([targon])

veigar = Champions(name="Veigar", cost=4, is_unlockable=True, unlock_requirement="Level 7 + Unit with 2 Rabadon's Deathcaps equipped", image_id="Veigar")
veigar.traits.extend([yordle, arcanist])

warwick = Champions(name="Warwick", cost=4, is_unlockable=True, unlock_requirement="Level 7 + Have Jinx and Vi on board", image_id="Warwick")
warwick.traits.extend([zaun, quickstriker])

wukong = Champions(name="Wukong", cost=4, image_id="MonkeyKing")
wukong.traits.extend([ionia, bruiser])

yone = Champions(name="Yone", cost=4, is_unlockable=True, unlock_requirement="3-star Yasuo", image_id="Yone")
yone.traits.extend([ionia, slayer])

yunara = Champions(name="Yunara", cost=4, image_id="Yunara")
yunara.traits.extend([ionia, quickstriker])

# 5-cost champions
aatrox = Champions(name="Aatrox", cost=5, is_unlockable=True, unlock_requirement="Level 8 + Champion with 40% Omnivamp at combat start", image_id="Aatrox")
aatrox.traits.extend([darkin, world_ender, slayer])

annie = Champions(name="Annie", cost=5, image_id="Annie")
annie.traits.extend([dark_child, arcanist])

azir = Champions(name="Azir", cost=5, image_id="Azir")
azir.traits.extend([shurima, emperor, disruptor])

fiddlesticks = Champions(name="Fiddlesticks", cost=5, image_id="Fiddlesticks")
fiddlesticks.traits.extend([harvester, vanquisher])

galio = Champions(name="Galio", cost=5, is_unlockable=True, unlock_requirement="12 star levels of Demacia", image_id="Galio")
galio.traits.extend([demacia, heroic])

kindred = Champions(name="Kindred", cost=5, image_id="Kindred")
kindred.traits.extend([eternal, quickstriker])

lucian_senna = Champions(name="Lucian & Senna", cost=5, image_id="Lucian")
lucian_senna.traits.extend([soulbound, gunslinger])

mel = Champions(name="Mel", cost=5, is_unlockable=True, unlock_requirement="2-star Ambessa with item dies in combat", image_id="Mel")
mel.traits.extend([noxus, disruptor])

ornn = Champions(name="Ornn", cost=5, image_id="Ornn")
ornn.traits.extend([blacksmith, warden])

sett = Champions(name="Sett", cost=5, is_unlockable=True, unlock_requirement="Level 8 + Only 1 unit in front two rows", image_id="Sett")
sett.traits.extend([ionia, the_boss])

shyvana = Champions(name="Shyvana", cost=5, image_id="Shyvana")
shyvana.traits.extend([dragonborn, juggernaut])

tahm_kench = Champions(name="Tahm Kench", cost=5, is_unlockable=True, unlock_requirement="Spend 500 Bilgewater Silver Serpents", image_id="TahmKench")
tahm_kench.traits.extend([bilgewater, glutton, bruiser])

thex = Champions(name="T-Hex", cost=5, is_unlockable=True, unlock_requirement="9 star levels of Piltover", image_id="THex")
thex.traits.extend([hexmech, piltover, gunslinger])

thresh = Champions(name="Thresh", cost=5, is_unlockable=True, unlock_requirement="Collect 175 Shadow Isles Souls", image_id="Thresh")
thresh.traits.extend([shadow_isles, warden])

tibbers = Champions(name="Tibbers", cost=5, image_id="Tibbers")
tibbers.traits.extend([arcanist])

volibear = Champions(name="Volibear", cost=5, is_unlockable=True, unlock_requirement="Level 8 + Unit with 3800 Health at combat start", image_id="Volibear")
volibear.traits.extend([freljord, bruiser])

xerath = Champions(name="Xerath", cost=5, is_unlockable=True, unlock_requirement="Alternate win/lose for 3 combats with Azir", image_id="Xerath")
xerath.traits.extend([shurima, ascendant])

ziggs = Champions(name="Ziggs", cost=5, is_unlockable=True, unlock_requirement="Level 9 + Yordle or Zaunite with 3 items equipped", image_id="Ziggs")
ziggs.traits.extend([zaun, yordle, longshot])

zilean = Champions(name="Zilean", cost=5, image_id="Zilean")
zilean.traits.extend([chronokeeper, invoker])

# 7-cost champions
aurelion_sol = Champions(name="Aurelion Sol", cost=7, is_unlockable=True, unlock_requirement="5 unique Targonians", image_id="AurelionSol")
aurelion_sol.traits.extend([star_forger, targon])

baron_nashor = Champions(name="Baron Nashor", cost=7, is_unlockable=True, unlock_requirement="Level 10 + Field 7 unique Void units", image_id="BaronNashor")
baron_nashor.traits.extend([void, riftscourge])

brock = Champions(name="Brock", cost=7, is_unlockable=True, unlock_requirement="Collect 500 Ixtal Sunshards over the game", image_id="Brock")
brock.traits.extend([ixtal])

ryze = Champions(name="Ryze", cost=7, is_unlockable=True, unlock_requirement="Level 9 + 4 Region Traits together", image_id="Ryze")
ryze.traits.extend([rune_mage])

sylas = Champions(name="Sylas", cost=7, is_unlockable=True, unlock_requirement="Sell 2-star Jarvan IV, Garen, and Lux", image_id="Sylas")
sylas.traits.extend([chainbreaker, arcanist, defender])

zaahen = Champions(name="Zaahen", cost=7, is_unlockable=True, unlock_requirement="Trials of Twilight Augment + 3-star Xin Zhao for 5 combats", image_id="Zaahen")
zaahen.traits.extend([darkin, immortal])

# Add all champions
all_champions = [
    # 1-cost
    anivia, blitzcrank, briar, caitlyn, illaoi, jarvan_iv, jhin, kogmaw, lulu, 
    qiyana, rumble, shen, sona, viego,
    # 2-cost
    aphelios, ashe, bard, chogath, ekko, graves, neeko, orianna, poppy, reksai,
    sion, teemo, tristana, tryndamere, twisted_fate, vi, xin_zhao, yasuo, yorick,
    # 3-cost
    ahri, darius, draven, dr_mundo, gangplank, gwen, jinx, kennen, kobuko_yuumi,
    leblanc, leona, loris, malzahar, milio, nautilus, sejuani, vayne, zoe,
    # 4-cost
    ambessa, belveth, braum, diana, fizz, garen, kaisa, kalista, lissandra, lux,
    miss_fortune, nasus, nidalee, renekton, rift_herald, seraphine, singed, skarner,
    swain, taric, veigar, warwick, wukong, yone, yunara,
    # 5-cost
    aatrox, annie, azir, fiddlesticks, galio, kindred, lucian_senna, mel, ornn,
    sett, shyvana, tahm_kench, thex, thresh, tibbers, volibear, xerath, ziggs, zilean,
    # 7-cost
    aurelion_sol, baron_nashor, brock, ryze, sylas, zaahen
]

for champion in all_champions:
    db.add(champion)

db.commit()
db.close()
print("Seeded all Set 16 champions and traits with image IDs!")