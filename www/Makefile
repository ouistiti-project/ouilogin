HTDOCS?=htdocs/apps/

data-y+=$(HTDOCS)signin.html
data-y+=$(HTDOCS)list.html
data-y+=$(HTDOCS)profile.html
data-y+=$(HTDOCS)filter.html
$(HTDOCS)signin.html_ALIAS-$(HTINDEX)+=$(HTDOCS)index.html
data-y+=$(HTDOCS)js/profile.js
data-y+=$(HTDOCS)js/auth.js
data-y+=$(HTDOCS)js/filter.js

BOOTSTRAP_DOCS?=htdocs/trust
JQUERY_DOCS?=htdocs/trust
export BOOTSTRAP_DOCS JQUERY_DOCS
subdir-y+=bootstrap.mk
subdir-y+=jquery.mk
