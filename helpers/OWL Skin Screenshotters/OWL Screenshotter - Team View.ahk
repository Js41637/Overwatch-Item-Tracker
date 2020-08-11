#n::

InputBox, teamName, Team Name, Enter the team name, , 375, 189
Sleep 500

heroesArray := ["ana", "ashe", "baptiste", "bastion", "brigitte", "dva", "doomfist", "echo", "genji", "hanzo", "junkrat", "lucio", "mccree", "mei", "mercy", "moira", "orisa", "pharah", "reaper", "reinhardt", "roadhog", "sigma", "soldier-76", "sombra", "symmetra", "torbjorn", "tracer", "widowmaker", "winston", "wrecking-ball", "zarya", "zenyatta"]

; If you already own some of the skins, change the order accordingly:
; heroesArray := ["pharah", "ana", "ashe", "baptiste", "bastion", "brigitte", "dva", "doomfist", "echo", "genji", "hanzo", "junkrat", "lucio", "mccree", "mei", "mercy", "moira", "orisa", "reaper", "reinhardt", "roadhog", "sigma", "soldier-76", "sombra", "symmetra", "torbjorn", "tracer", "widowmaker", "winston", "wrecking-ball", "zarya", "zenyatta"]

Loop % heroesArray.Length()
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
	fileName := heroesArray[A_index] . "-" . teamName . ".png"
	
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
}

Esc::Reload 
