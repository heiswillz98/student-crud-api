install:
	@echo "Installing dependencies..."
	npm install

dev:
	@echo "Starting the server..."
	. .env && npm run dev

stop:
	@echo "Stopping the server..."
	# You could manually stop the server (Ctrl+C) in your terminal if needed

clean:
	@echo "Cleaning up node_modules..."
	rm -rf node_modules/

migration:
	@echo "Migrating ..."
	psql -U myuser -d studentdb -f migrations/001_create_students.sql

test:
	@echo "Testing ..."
	npm run test