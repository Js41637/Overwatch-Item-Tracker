import json
import os

teamsList = ['Atlanta Reign', 'Boston Uprising', 'Chengdu Hunters', 'Dallas Fuel', 'Florida Mayhem', 'Guangzhou Charge', 'Hangzhou Spark', 'Houston Outlaws', 'London Spitfire', 'Los Angeles Gladiators', 'Los Angeles Valiant', 'New York Excelsior', 'Paris Eternal', 'Philadelphia Fusion', 'San Francisco Shock', 'Seoul Dynasty', 'Shanghai Dragons', 'Toronto Defiant', 'Vancouver Titans', 'Washington Justice']
heroesList = []

inputFile = open('master.json', 'r', encoding='utf8')
masterData = json.load(inputFile)
inputFile.close()

for hero in masterData['heroes']:
	if(hero != 'all'): 
		heroesList.append(hero)
		
		# if(hero == 'mercy'):
			# extraSkins =  {
				# "name": "2019 Atlantic All-Stars",
				# "id": hero + "-2019-atlantic-all-stars",
				# "url": "/owlskins/" + hero + "-2019-atlantic-all-stars.jpg",
				# "quality": "legendary",
				# "achievement": "owl"
			# }
		
		# if(hero == 'lucio'):
			# extraSkins =  {
				# "name": "2019 Pacific All-Stars",
				# "id": hero + "-2019-pacific-all-stars",
				# "url": "/owlskins/" + hero + "-2019-pacific-all-stars.jpg",
				# "quality": "legendary",
				# "achievement": "owl"
			# }
		
		# if(hero == 'tracer'):
			# extraSkins =  {
				# "name": "2018 Atlantic All-Stars",
				# "id": hero + "-2018-atlantic-all-stars",
				# "url": "/owlskins/" + hero + "-2018-atlantic-all-stars.jpg",
				# "quality": "legendary",
				# "achievement": "owl"
			# }
		
		# if(hero == 'genji'):
			# extraSkins =  {
				# "name": "2018 Pacific All-Stars",
				# "id": hero + "-2018-pacific-all-stars",
				# "url": "/owlskins/" + hero + "-2018-pacific-all-stars.jpg",
				# "quality": "legendary",
				# "achievement": "owl"
			# }
			
		if(hero == 'winston'):
			extraSkins =  {
				"name": "Flying Ace",
				"id": hero + "-flying-ace",
				"url": "/owlskins/" + hero + "-flying-ace.jpg",
				"quality": "legendary",
				"achievement": "owl"
			}
		
		if(hero == 'zenyatta'):
			extraSkins =  {
				"name": "Zen-Nakji",
				"id": hero + "-zen-nakji",
				"url": "/owlskins/" + hero + "-zen-nakji.jpg",
				"quality": "legendary",
				"achievement": "owl"
			}
		
		owlSkinsData = [
			{
				"name": "Overwatch League Gray",
				"id": hero + "-overwatch-league-gray",
				"url": "/owlskins/" + hero + "-overwatch-league-gray.jpg",
				"quality": "epic",
				"achievement": "owl"
			},
			{
				"name": "Overwatch League White",
				"id": hero + "-overwatch-league-white",
				"url": "/owlskins/" + hero + "-overwatch-league-white.jpg",
				"quality": "epic",
				"achievement": "owl"
			}]
		
		for team in teamsList:
			homeSkin = {
				"name": team + " Home",
				"id": (hero + "-" + team.replace(" ","-")).lower(),
				"url": "/owlskins/" + (hero + "-" + team.replace(" ","-")).lower() + ".jpg",
				"quality": "epic",
				"achievement": "owl"
			}
			awaySkin = {
				"name": team + " Away",
				"id": (hero + "-" + team.replace(" ","-") + "-away").lower(),
				"url": "/owlskins/" + (hero + "-" + team.replace(" ","-") + "-away").lower() + ".jpg",
				"quality": "epic",
				"achievement": "owl"
			}				
			owlSkinsData.append(homeSkin)
			owlSkinsData.append(awaySkin)
		
		try:
			owlSkinsData.insert(0, extraSkins)
			del extraSkins
			print('Extras exist for ' + hero)
		except NameError:
			print('No extras for ' + hero)
		
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