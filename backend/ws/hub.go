// Copyright 2013 The Gorilla WebSocket Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package ws

import "fmt"

// Hub maintains the set of active clients and broadcasts messages to the
// clients.
type Hub struct {
	// Registered clients.
	clients map[*Client]bool

	clientMap map[string]*Client

	// Inbound messages from the clients.
	broadcast chan []byte

	// Register requests from the clients.
	register chan *Client

	// Unregister requests from clients.
	unregister chan *Client
}

func newHub() *Hub {
	return &Hub{
		broadcast:  make(chan []byte),
		register:   make(chan *Client),
		unregister: make(chan *Client),
		clients:    make(map[*Client]bool),
		clientMap:  make(map[string]*Client),
	}
}

func (h *Hub) publish(uuid string, msg string) {
	if c, ok := h.clientMap[uuid]; ok {
		fmt.Println(uuid, "Send okay")
		c.send <- []byte(msg)
	}
}

func (h *Hub) run() {
	for {
		select {
		case client := <-h.register:
			if orig, ok := h.clientMap[client.uuid]; ok {
				delete(h.clientMap, client.uuid)
				delete(h.clients, orig)
				close(orig.send)
			}
			h.clients[client] = true
			h.clientMap[client.uuid] = client
		case client := <-h.unregister:
			if _, ok := h.clients[client]; ok {
				delete(h.clients, client)
				delete(h.clientMap, client.uuid)
				close(client.send)
			}
		case message := <-h.broadcast:
			for client := range h.clients {
				select {
				case client.send <- message:
				default:
					close(client.send)
					delete(h.clientMap, client.uuid)
					delete(h.clients, client)
				}
			}
		}
	}
}
