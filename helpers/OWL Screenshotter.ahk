#n::

InputBox, heroName, Hero Name, Enter the hero name, , 375, 189
Sleep 500

teamsArray := ["boston-uprising", "dallas-fuel", "florida-mayhem", "houston-outlaws", "london-spitfire", "los-angeles-gladiators", "los-angeles-valiant", "new-york-excelsior", "philadelphia-fusion", "san-francisco-shock", "seoul-dynasty", "shanghai-dragons"]

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
	Sleep 1000
}

