package structs

// Message object with PlayerName and Message properties
type Message struct {
	PlayerName string `json:"playerName"`
	Message    string `json:"message"`
}

// PlayersList object with Players property
type PlayersList struct {
	Players []string `json:"players"`
}

// Game object holds game data
type Game struct {
	Players    PlayersList `json:"players"`
	InProgress bool        `json:"inProgress"`
}
