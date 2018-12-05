# Unix Environment Variables

Learn how to manage Unix environment variables.

<!-- slide-include ../../BANNER.md -->

**You will need**

* A Unix CLI

**Recommended reading**

* [Unix Processes](../unix-processes/)

<!-- START doctoc -->
<!-- END doctoc -->



## Environment variables

<!-- slide-front-matter class: center, middle -->

Affecting processes since 1979.

### What is an environment variable?

An environment variable is a **named value that can affect the way running processes will behave** on a computer.

When a process runs on a Unix system, it may query variables such as:

* `HOME` - The home directory of the user running the process.
* `LANG` - The default locale.
* `TMP` - The directory in which to store temporary files.
* And more.

Another common example is the [`PATH`][path],
an environment variable that indicates in which directories to look for binaries to execute when typing commands in a shell.

### What are they for?

Environment variables can **affect the behavior of programs without modifying them**.

If a program bases some of its behavior on an environment variable,
you can simply change the value of the variable before running it,
allowing you to customize it without changing one line of code.

Environment variables can be used as a dynamic means of configuration,
an alternative to configuration files or hardcoded values.



## Managing environment variables

<!-- slide-front-matter class: center, middle -->

Getting them, listing them, setting them, deleting them.

### Getting an environment variable

TODO

### The `env` command

TODO



## References

* [Environment Variable][env-var]



[env-var]: https://en.wikipedia.org/wiki/Environment_variable
[path]: https://en.wikipedia.org/wiki/Path_(computing)
