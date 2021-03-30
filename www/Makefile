HTDOCS?=htdocs/apps/
TRUSTDOCS?=htdocs/trust/

data-y+=$(HTDOCS)signin.html
data-y+=$(HTDOCS)list.html
data-y+=$(HTDOCS)profile.html
data-y+=$(HTDOCS)filter.html
$(HTDOCS)signin.html_ALIAS-$(HTINDEX)+=$(HTDOCS)index.html
data-y+=$(HTDOCS)js/profile.js
data-y+=$(HTDOCS)js/auth.js
data-y+=$(HTDOCS)js/filter.js

data-y+=$(TRUSTDOCS)css/bootstrap.min.css
data-y+=$(TRUSTDOCS)css/bootstrap.min.css.map
data-y+=$(TRUSTDOCS)fonts/glyphicons-halflings-regular.woff2
data-y+=$(TRUSTDOCS)js/bootstrap.min.js
data-y+=$(TRUSTDOCS)js/jquery.min.js

BOOTSTRAP_VERSION=3.3.7
bootstrap-$(BOOTSTRAP_VERSION)-dist.zip:
	wget https://github.com/twbs/bootstrap/releases/download/v$(BOOTSTRAP_VERSION)/bootstrap-$(BOOTSTRAP_VERSION)-dist.zip

bootstrap-$(BOOTSTRAP_VERSION)-dist: bootstrap-$(BOOTSTRAP_VERSION)-dist.zip
	unzip bootstrap-$(BOOTSTRAP_VERSION)-dist.zip

$(TRUSTDOCS)js:
	mkdir -p $(TRUSTDOCS)css
	mkdir -p $(TRUSTDOCS)fonts
	mkdir -p $(TRUSTDOCS)js

$(TRUSTDOCS)css/bootstrap.min.css: bootstrap-$(BOOTSTRAP_VERSION)-dist $(TRUSTDOCS)js
	mv -f bootstrap-$(BOOTSTRAP_VERSION)-dist/css/* $(TRUSTDOCS)css/
	mv -f bootstrap-$(BOOTSTRAP_VERSION)-dist/js/* $(TRUSTDOCS)js/
	mv -f bootstrap-$(BOOTSTRAP_VERSION)-dist/fonts/* $(TRUSTDOCS)fonts/
	rm -rf bootstrap-$(BOOTSTRAP_VERSION)-dist

JQUERY_VERSION=3.3.1
jquery$(JQUERY_VERSION:%=-%).min.js:
	wget https://code.jquery.com/jquery$(JQUERY_VERSION:%=-%).min.js

$(TRUSTDOCS)js/jquery.min.js: jquery$(JQUERY_VERSION:%=-%).min.js $(TRUSTDOCS)js
	cp -f jquery$(JQUERY_VERSION:%=-%).min.js $(TRUSTDOCS)js/jquery.min.js
