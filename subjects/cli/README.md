# Command Line Introduction

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [TODO](#todo)
- [What is the Command Line Interface (CLI)](#what-is-the-command-line-interface-cli)
- [Why use it](#why-use-it)
- [How do I use this ?](#how-do-i-use-this-)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## TODO

* command-line interface (cli): what is a command line? why use it? unix emulation on Windows, installation
* copy-paste on Windows
* commands and arguments: pay attention to spaces (escaping)
* getting help (--help)
* avoid spaces and non-ascii characters in directory names
* navigating the filesystem (cd <path>, .., ~, /, auto-completion), Windows filesystem root (/c on Git Bash)
* creating directories with mkdir -p
* PATH, (export PATH="/path/to/bin:$PATH")
* interactive help in commands (press q to quit)
* interrupting running commands (ctrl-c)
* vim basics (some tools automatically open vim: do not panic, command vs insert mode, esc, i, :wq, :q!)

## What is the Command Line Interface (CLI)

The CLI is a tool that allows you to use your computer by writing what you want to do (i.e. **commands**), instead of clicking on things.

It's installed on computers (almost) since the beginnings of time, but it has evolved a little since then. It usually looks something like this:

<p class='center'><img src='images/cli.jpg' width='100%' /></p>

## Why use it

CLI is not very user-friendly or visually appealing but it has several advantages:

* Requires very **few resources**
* Can be easily **automated** through scripting
* Is ultimatly **more powerful and efficient** than any GUI

For these reasons, a lot of tools _(especially development tools)_ don't have any GUI and are only usable through a CLI.

**Thus, the CLI is a required tool for any nowadays developer.**

## How do I use this ?

**CLI are available in every actual OS.**

On **UNIX-like** systems _(like MacOS or Linux)_, it's called the **Terminal** and you can use it right away, as it's the _de-facto_ standard.

On **Windows**, the default CLI is called **Invite de commandes** or **cmd**. But it does not use the same syntax than UNIX-like CLI have _(plus, it's bad)_.

<!-- slide-column 30 -->

<p class='center'><img src='images/gitbashlogo.png' width='70%' /></p>

<!-- slide-column -->

To solve this problem, you're going to install **Git Bash**, an alternate CLI that emulates a UNIX-like terminal on Windows.

You can download the **Git Bash Installer** on the [Git for Windows website][gitbash], and install the software, leaving all default options.


[gitbash]: https://git-for-windows.github.io/