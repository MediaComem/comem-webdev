# Command Line Introduction

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [What is the Command Line Interface (CLI)](#what-is-the-command-line-interface-cli)
- [Why use it](#why-use-it)
- [How do I use this ?](#how-do-i-use-this-)
- [Install Git Bash (Windows users only)](#install-git-bash-windows-users-only)
- [TODO](#todo)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## What is the Command Line Interface (CLI)

The CLI is a tool that allows you to use your computer by writing what you want to do (i.e. **commands**), instead of clicking on things.

It's installed on computers (almost) since the beginnings of time, but it has evolved a little since then. It usually looks something like this:

<p class='center'><img src='images/cli.jpg' width='100%' /></p>

### Why use it

CLI is not very user-friendly or visually appealing but it has several advantages:

* Requires very **few resources**
* Can be easily **automated** through scripting
* Is ultimatly **more powerful and efficient** than any GUI

For these reasons, a lot of tools _(especially development tools)_ don't have any GUI and are only usable through a CLI.

**Thus, the CLI is a required tool for any nowadays developer.**

### Open a CLI

**CLI are available in every actual OS.**

<!-- slide-column 50 -->

On **UNIX-like** systems _(like MacOS or Linux)_, it's called the **Terminal**.

You can use it right away, as it's the _de-facto_ standard.

<!-- slide-column -->

On **Windows**, the default CLI is called **Invite de commandes** or **cmd**.

But it does not use the same syntax than UNIX-like CLI have _(plus, it's bad)_.

> **You'll need to install an alternative.**

### Install Git Bash (Windows users only)

You're going to install **Git Bash**, an alternate CLI that emulates a UNIX-like terminal on Windows.

<!-- slide-column 30 -->

<p class='center'><img src='images/gitbashlogo.png' width='70%' /></p>

<!-- slide-column -->

You can download the **Git Bash Installer** on the [Git for Windows website][gitbash].

When it's done, install the software, without changing any default options.

Then, search and open the **Git Bash** software.

## How to use the CLI

When you open the CLI you should find a blank screen with something like this:

```bash
$>
```
These symbols represent **the prompt** and are used to indicate that you have the lead, that is the computer is waiting for you to type something for it to execute.

> Note : To stop any running work and force the CLI to give you back the lead, hit the `Ctrl + c` command.

**For consistency, we will always use the `$>` symbols to represent the prompt.**

<!-- slide-notes -->

Please note that, depending on your OS and your CLI, the prompt can be composed of different characters.

When the computer's working, the `$` disappear and you won't have the lead until the `$` reappear again.

### Writing commands

A command is a word that you have to type on the CLI, that will tell the computer what it have to do.

The syntax for using command could be resumed like this:

```bash
$> name [argument ...]
```

**Note the use of space to separate the differents elements of a command.**

* `name` represents the name of the command you want to execute
* `[argument ...]` represents additionnal information has to how the command must be executed, **each of them separeted by a space**.

<!-- slide-notes -->

A parameter is used to give additionel information to the computer has to how it must execute the command.

This is the only possible way to list parameters when typing a command.

### Command : `pwd`

When the CLI starts, it places you in your **personnal folder**.

From there you can navigate your filesystem to go to other folders.

But first, you might want to check **where** you currently are. To do this, use the `pwd` command:

```bash
$> pwd
/Users/Batman
```

> The `pwd` command, that means "print working directory", gives you the absolute path to the folder you're currently in.

### Command : `ls`

Now that you know where you are, you might want to know **what your current folder is containing**. To do this, use the `ls` command:

```bash
$> ls
[lots and lots of files]
```
> The `ls` command, that means "local storage", lists the files and folders that the current directory contains.

By default, `ls` doesn't list **hidden elements**.

For `ls` to do that, you need to pass it the argument `--all` (or `-a`):

```bash
$> ls -a
[lots and lots of files, including the hidden ones]
```

### Command : `cd` (1/2)

It's time to go out a little and move to another directory.

Suppose you have a _"Documents"_ folder in your personnal folder, that contains another folder, _"TopSecret"_, to which you want to go.

To do this, use the `cd` command, passing it as argument **the path to the folder** you want to go to.

```bash
# You can use relative path...
$> pwd
/Users/Batman
$> cd Documents/TopSecret

# ...or use absolute path
$> cd /Users/Batman/Documents/TopSecret
```
> While you type the name of folders or files, hit the `Tab` key after having entered some letters and your CLI can try and autocomplete the name.

<!-- slide-notes -->

```bash
$> cd /Us
# Hit the Tab key and the CLI completes the name
$> cd /Users
```
If there is more than one possible name with this letters, the CLI will do nothing. Hitting the `Tab` key a second time will list all the possibilities matching the letters you typed.

```bash
$> pwd
/Users/Batman
$> cd Do
# Hitting the Tab key will fail
$> cd Do
# Hitting it again list the possibilites
Documents/ Downloads/
```
### Command : `cd` (2/2)

At anytime and from anywhere, you can return to your **personnal folder** with the `cd` command, using the `~` shortcut as argument:

> To type the `~` character, use this combination:
> * `AltGr + ^` on **Windows**
> * `Alt + n` on **Mac**

```bash
$> cd ~
$> pwd
/Users/Batman
```
----
**For Windows Users**

To access your drives (`C:`, `D:`, etc), you can use either notation :

```bash
$> cd c:
# Or
$> cd /c
```
### Naming things when using CLI

You should avoid using (in folders et files name):

* **spaces** _(they're used to separate arguments in command)_
* **accentuated characters** 

They can cause **errors** in some scripts or tools, and will inevitably complicate using the CLI.

```bash
# Will not work
$> cd ./My Wonderful Folder/
```
This command will be interpreted as a call to the `cd` command with three arguments : `./My`, `Wonderful` and `Folder/`.

You **can** use names with space, but you have to **escape** them first, using **quotation marks** around:

```bash
# This will work
$> cd ./"My Wonderful Folder"/
```

## TODO

* copy-paste on Windows
* getting help (--help)
* navigating the filesystem (cd <path>, .., ~, /, auto-completion), Windows filesystem root (/c on Git Bash)
* creating directories with mkdir -p
* PATH, (export PATH="/path/to/bin:$PATH")
* interactive help in commands (press q to quit)
* interrupting running commands (ctrl-c)
* vim basics (some tools automatically open vim: do not panic, command vs insert mode, esc, i, :wq, :q!) 

[gitbash]: https://git-for-windows.github.io/