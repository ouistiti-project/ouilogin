sysconf-y+=ouistiti.d/ouilogin.conf

sysconf-y+=passwd.db

passwd.db: passwd.conf
	@echo "  CREATE passwd.db"; cat $< | sqlite3 $@

.passwd.ready: passwd.anonymous.conf passwd.db
	@echo "  UPDATE passwd.db"; cat  $< | sqlite3 $(destdir)$(sysconfdir)/passwd.db

hook-install-y+=.passwd.ready
