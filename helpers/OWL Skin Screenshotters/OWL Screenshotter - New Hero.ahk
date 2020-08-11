#n::

InputBox, heroName, Hero Name, Enter the hero name, , 375, 189
Sleep 500

teamsArray := ["atlanta-reign", "atlanta-reign-away", "boston-uprising", "boston-uprising-away", "chengdu-hunters", "chengdu-hunters-away", "dallas-fuel", "dallas-fuel-away", "florida-mayhem-2020", "florida-mayhem-2020-away", "guangzhou-charge", "guangzhou-charge-away", "hangzhou-spark", "hangzhou-spark-away", "houston-outlaws", "houston-outlaws-away", "london-spitfire", "london-spitfire-away", "los-angeles-gladiators", "los-angeles-gladiators-away", "los-angeles-valiant-2020", "los-angeles-valiant-2020-away", "new-york-excelsior", "new-york-excelsior-away", "paris-eternal", "paris-eternal-away", "philadelphia-fusion", "philadelphia-fusion-away", "san-francisco-shock-2020", "san-francisco-shock-2020-away", "seoul-dynasty", "seoul-dynasty-away", "shanghai-dragons", "shanghai-dragons-away", "toronto-defiant", "toronto-defiant-away", "vancouver-titans", "vancouver-titans-away", "washington-justice", "washington-justice-away"]

; If the hero has 2018 team skins:
; teamsArray := ["atlanta-reign", "atlanta-reign-away", "boston-uprising", "boston-uprising-away", "chengdu-hunters", "chengdu-hunters-away", "dallas-fuel", "dallas-fuel-away", "florida-mayhem-2020", "florida-mayhem", "florida-mayhem-2020-away", "florida-mayhem-away", "guangzhou-charge", "guangzhou-charge-away", "hangzhou-spark", "hangzhou-spark-away", "houston-outlaws", "houston-outlaws-away", "london-spitfire", "london-spitfire-away", "los-angeles-gladiators", "los-angeles-gladiators-away", "los-angeles-valiant-2020", "los-angeles-valiant", "los-angeles-valiant-away-2020", "los-angeles-valiant-away", "new-york-excelsior", "new-york-excelsior-away", "paris-eternal", "paris-eternal-away", "philadelphia-fusion", "philadelphia-fusion-away", "san-francisco-shock-2020", "san-francisco-shock", "san-francisco-shock-2020-away", "san-francisco-shock-away", "seoul-dynasty", "seoul-dynasty-away", "shanghai-dragons", "shanghai-dragons-away", "toronto-defiant", "toronto-defiant-away", "vancouver-titans", "vancouver-titans-away", "washington-justice", "washington-justice-away"]

Loop % teamsArray.Length()
{
	; Select OW window
	WinActivate, Overwatch
	Sleep 500
	
	; Hide UI via Alt+Z
	Send !z
	Sleep 500
	
	; Greenshot
	Send ^+5
	Sleep 1000
	; Save photo as
	; Send {Down}
	Send s
	Sleep 500
	Send {Enter}
	
	Sleep 1000

	; Enter file name
	fileName := heroName . "-" . teamsArray[A_index] . ".png"
	
	; Save file
	Send %fileName%
	Sleep 500
	Send {Enter}
	Sleep 500
	
	; Select OW window
	WinActivate, Overwatch
	Sleep 500
	
	; Unhide UI
	Send !z
	Sleep 500
	
	; Go to next hero's skin
	Send {Down}
	Sleep 500
	; MsgBox % "Next skin is " . teamsArray[A_index+1]
}

Esc::Reload 
