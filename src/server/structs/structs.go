package structs

import "github.com/gorilla/websocket"

// Message object with PlayerName and Message properties
type Message struct {
	Answer  string   `json:"answer,omitempty"`
	Color   string   `json:"color,omitempty"`
	Name    string   `json:"name,omitempty"`
	Message string   `json:"message,omitempty"`
	Players []Player `json:"players,omitempty"`
	Time    int      `json:"time,omitempty"`
	Word    string   `json:"word,omitempty"`
}

// Code int `json:"code"`

// Player object with name, score, color
type Player struct {
	Name  string `json:"name"`
	Color string `json:"color"`
	Score int    `json:"score"`
}

// UpdateScore method on Player struct to increment player scores
func (p Player) UpdateScore(n int) Player {
	p.Score += n
	return p
}

// PlayersList object with Players property
// type PlayersList struct {
// 	Players []Player `json:"players"`
// }

// Game object holds game data
type Game struct {
	InProgress bool `json:"inProgress"`
}

// Answer to hold player and their answer for each round
type Answer struct {
	Answer string          `json:"answer"`
	Conn   *websocket.Conn `json:"conn"`
}
