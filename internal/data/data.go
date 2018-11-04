package main

import "time"

type Match struct {
	Players     []Player
	TimeStarted time.Time
	TimeEnded   time.Time
	Levels      map[Player]int
}

type Player struct {
	Name string
}

func (match Match) Duration() time.Duration {
	return match.TimeEnded.Sub(match.TimeStarted)
}
