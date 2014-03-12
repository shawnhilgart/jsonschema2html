test:
	npm test

coverage: clean lib-cov test-cov

test-cov:
	SCHEMA2HTML_COV=1 mocha -R html-cov > coverage/coverage.html

lib-cov:
	jscoverage lib lib-cov

clean:
	rm -rf lib-cov

bench:
	node ./benchmark/benchmark.js

compile:
	handlebars ./lib/templates/* -f ./lib/templates/templates.js -e .hbs

suite: test bench coverage

.PHONY: test
