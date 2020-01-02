package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var clients = make(map[*websocket.Conn]bool)
var broadcast = make(chan Message)

var users = make([]string, 0, 8)

var upgrader = websocket.Upgrader{}

// Message object with username and message properties
type Message struct {
	Username string `json:"username"`
	Message  string `json:"message"`
}

func handleConnections(w http.ResponseWriter, r *http.Request) {

	upgrader.CheckOrigin = func(r *http.Request) bool {
		origin, ok := r.Header["Origin"]
		if ok && origin[0] == "http://localhost:4200" {
			return true
		}
		return false
	}

	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Fatal(err)
	}
	defer ws.Close()
	clients[ws] = true

	log.Println(clients)

	for {
		var msg Message
		err := ws.ReadJSON(&msg)
		if err != nil {
			log.Println("error: ", err)
			delete(clients, ws)
			break
		}
		if msg.Message == "connect" {
			users = append(users, msg.Username)
		}
		broadcast <- msg

	}
}

func handleMessages() {
	for {
		msg := <-broadcast
		log.Println("2", msg)
		for client := range clients {
			err := client.WriteJSON(msg)
			if err != nil {
				log.Printf("error: %v", err)
				client.Close()
				delete(clients, client)
			}
		}

	}
}

func main() {
	fmt.Println("working...")
	fs := http.FileServer(http.Dir("../dist"))
	http.Handle("/", fs)

	http.HandleFunc("/ws", handleConnections)

	go handleMessages()

	log.Println("server running on port 8000")
	err := http.ListenAndServe(":8000", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
