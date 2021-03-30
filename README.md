# User authentication website

## Introduction

Ouilogin is a website for Ouistiti. It allows to authenticate and manage the users.
A token is generated and another website, may use this token for an authentication.
This process take the same way as the OpenID specification.

## Installation

```bash
$ touch defconfig
$ make defconfig
$ make DESTDIR=$PWD/package datadir=/srv/www sysconfdir=/etc/ouistiti/ install
```
