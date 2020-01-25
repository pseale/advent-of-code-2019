# Welcome! This is a transcript of how I sloppily solved Day 1. It's sloopy. It's messy. But no fuss!
# I didn't feel like solving the problem with all the rigamarole, so I just hacked out a solution and threw the answer back at them.
# I've also gone through my console history and annotated each line, probably not in 
# a helpful way, but I've annotated nonetheless. IN SPITE OF YOUR WISHES

function f($mass) { $mass / 3 - 2 } #wrong
f -mass 12
f -mass 14
function f($mass) { [int]($mass / 3) - 2 } #wrong, the [int] cast does rounding. whoops
f -mass 14
function f($mass) { [int][Math]::floor($mass / 3) - 2 } #correct!
f -mass 14
$a = (Get-Clipboard).split("`n") #uh if you're trying to reproduce the problem, copy the problem set to your clipboard BEFORE running this line. Note the all-important call to 'Get-Clipboard'
$a |% { f -mass $_ }
$a | ? {![string]::isnullorwhitespace($_)} |% { f -mass $_ } #incomplete - doesn't measure
$a | ? {![string]::isnullorwhitespace($_)} |% { f -mass $_ } |measure #wrong measure (count by default)
$a | ? {![string]::isnullorwhitespace($_)} |% { f -mass $_ } |measure -Sum #PART A ANSWER CALCULATED HERE
function recursivefuel($mass) { $fuel = (f $mass); return $fuel + recursivefuel -mass $fuel } #wrong - syntax error
function recursivefuel($mass) { $fuel = (f $mass); return $fuel + (recursivefuel -mass $fuel) } #wrong - infinite loop
$a | ? {![string]::isnullorwhitespace($_)} |% { recursivefuel -mass $_ } |measure -Sum
function recursivefuel($mass) { $fuel = (f $mass); if ($fuel -le 0) return $fuel; return $fuel + [math]::max(0, (recursivefuel -mass $fuel)) } #wrong - syntax error
function recursivefuel($mass) { $fuel = (f $mass); if ($fuel -le 0) { return 0; } return $fuel + [math]::max(0, (recursivefuel -mass $fuel)) } #correct! but ugly. Probably redundant code in there too
$a | ? {![string]::isnullorwhitespace($_)} |% { recursivefuel -mass $_ } |measure -Sum

history | select -ExpandProperty commandline | Set-Clipboard #this is how you got this file. also i cheated and manually typed this line in