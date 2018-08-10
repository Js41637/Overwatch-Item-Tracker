import json
import os

teamsList = ['Boston Uprising', 'Dallas Fuel', 'Florida Mayhem', 'Houston Outlaws', 'London Spitfire', 'Los Angeles Gladiators', 'Los Angeles Valiant', 'New York Excelsior', 'Philadelphia Fusion', 'San Francisco Shock', 'Seoul Dynasty', 'Shanghai Dragons']
heroesList = []

inputFile = open('master.json', 'r', encoding='utf8')
masterData = json.load(inputFile)
inputFile.close()

for hero in masterData['heroes']:
	if(hero != 'all'): 
		heroesList.append(hero)
		owlSkinsData = [
			{
				"name": "Overwatch League Gray",
				"id": hero + "-overwatch-league-gray",
				"quality": "epic",
				"achievement": "owl"
			},
			{
				"name": "Overwatch League White",
				"id": hero + "-overwatch-league-white",
				"quality": "epic",
				"achievement": "owl"
			}]
		
		for team in teamsList:
			homeSkin = {
				"name": team + " Home",
				"id": (hero + "-" + team.replace(" ","-")).lower(),
				"quality": "epic",
				"achievement": "owl"
			}
			awaySkin = {
				"name": team + " Away",
				"id": (hero + "-" + team.replace(" ","-") + "-away").lower(),
				"quality": "epic",
				"achievement": "owl"
			}
			owlSkinsData.append(homeSkin)
			owlSkinsData.append(awaySkin)
		
		masterData['heroes'][hero]['items']['owlskins'] = owlSkinsData

os.rename('master.json', 'master.json.original')
		
with open('master.json', 'w', encoding='utf-8') as f:
	json.dump(masterData, f, ensure_ascii=False)

		# "owlskins": [
		  # {
            # "name": "Overwatch League Gray",
            # "id": "mccree-overwatch-league-gray",
            # "quality": "epic",
            # "achievement": "owl"
          # },
		  # {
            # "name": "Overwatch League White",
			# "id": "mccree-overwatch-league-white",
            # "quality": "epic",
            # "achievement": "owl"
          # },
		  # {
            # "name": "Boston Uprising",
            # "id": "mccree-boston-uprising",
            # "quality": "epic",
            # "achievement": "owl"
          # },