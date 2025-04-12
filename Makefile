install:
	@echo "Installing dependencies..."
	npm install

# Run the API server
dev:
	@echo "Starting the server..."
	. .env && npm run dev

# Stop the server (optional)
stop:
	@echo "Stopping the server..."
	# You could manually stop the server (Ctrl+C) in your terminal if needed

# Clean up node_modules (optional)
clean:
	@echo "Cleaning up node_modules..."
	rm -rf node_modules/
