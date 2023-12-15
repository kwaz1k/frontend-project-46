install:
		npm ci
publish:
		npm publish --dry-run
lint:
		npx eslint .
lint-fix:
		npx eslint --fix .
run:
		node bin/gendiff.js __fixtures__/file1.json __fixtures__/file2.json
test:
		NODE_OPTIONS=--experimental-vm-modules npx jest
test-coverage:
		npx jest --coverage