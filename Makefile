install:
		npm ci
lint:
		npx eslint .
lint-fix:
		npx eslint --fix .
run:
		node bin/gendiff __fixtures__/file1.json __fixtures__/file2.json
test:
		npm test
test-coverage:
		npx jest --coverage