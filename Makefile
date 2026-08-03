.PHONY: serve build clean

# Local dev server with drafts, http://localhost:1313
serve:
	hugo server --buildDrafts

# Production build into ./public
build:
	hugo --gc --minify

clean:
	rm -rf public resources .hugo_build.lock
