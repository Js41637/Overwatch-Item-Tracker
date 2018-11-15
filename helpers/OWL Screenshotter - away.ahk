#n::

InputBox, heroName, Hero Name, Enter the hero name, , 375, 189
Sleep 500

teamsArray := ["boston-uprising-away", "dallas-fuel-away", "florida-mayhem-away", "houston-outlaws-away", "london-spitfire-away", "los-angeles-gladiators-away", "los-angeles-valiant-away", "new-york-excelsior-away", "philadelphia-fusion-away", "san-francisco-shock-away", "seoul-dynasty-away", "shanghai-dragons-away"]

Loop % teamsArray.Length()
{
	; Hide UI via Alt+Z
	Send !z
	
	; Greenshot
	Send ^+5
	Sleep 750
	; Save photo as
	Send {Down}
	Sleep 750
	Send {Enter}
	
	Sleep 1000

	; Each team's name
	fileName = 
	;fileName .= "lucio-" . teamsArray[A_index] . ".png"
	fileName .= heroName . "-" . teamsArray[A_index] . ".png"
	
	; Save file
	Send %fileName%
	Sleep 1000
	Send {Enter}
	Sleep 500
	
	; Unhide UI
	Send !z
	Sleep 250
	
	; Go to next team's skin
	Send {Down}
	Sleep 750
	Send {Down}
	Sleep 750
}