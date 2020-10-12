.PHONY: all run build


run: run-debug

run-debug:
	@swag init
	@go run .

run-all:
	cp frontend/dist ./web

build:
	@go build .