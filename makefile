default:
	@./node_modules/.bin/mocha \
		--ui bdd --reporter spec test/default.js

custom:
	@./node_modules/.bin/mocha \
		--ui bdd --reporter spec test/custom.js

test: default custom

.Phony: test