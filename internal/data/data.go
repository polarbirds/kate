package data

import "time"

type Match struct {
	TimeStarted  time.Time
	TimeEnded    time.Time
	Players      map[string]Player
	WinningLevel int
}

type Player struct {
	Level       int
	CombatBonus int
}

func (match Match) Duration() time.Duration {
	return match.TimeEnded.Sub(match.TimeStarted)
}
