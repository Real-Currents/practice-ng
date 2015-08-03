Practice AngularJS
==================

####Learning AngularJS design and technique across multiple stacks:

	1) Mojolicious (Node-like)

	2) HTTP Server with CGI support (LAMP-like)

	3) IIS with ASP.NET (WISA)
...

####Querying multiple databases:

	1) JSON (flat-file)

	2) MongoDB (NoSQL)

	3) PostgreSQL (SQL)
...

These demos make use of webpack to assemble the various JavaScript files into a single source file.  After installing the local npm dependencies, build 'index.js' with:
```
$ webpack --watch
```
or:
```
$ grunt
```


####AngularJS runs on service objects and special purpose objects. 

#####Services:

	Constant
	Provider
	
	Value
	Factory
	Service


While *Constant* and *Provider* services can be accessed during the configuration phase of an Angular app, *Value*, *Factory* and *Service* services become available at run-time.

#####Special Purpose Objects:

	Controller
	Directive
	Filter
	Animation

