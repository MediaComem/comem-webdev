# Command Line Introduction

Learn the basics of navigating your filesystem in a Unix command line interface.

<!-- slide-include ../../BANNER.md -->

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [What is a Command Line Interface (CLI)?](#what-is-a-command-line-interface-cli)
  - [Why use it](#why-use-it)
  - [Open a CLI](#open-a-cli)
  - [Install Git Bash (Windows users only)](#install-git-bash-windows-users-only)
- [How to use the CLI](#how-to-use-the-cli)
  - [Writing commands](#writing-commands)
  - [Options vs. arguments](#options-vs-arguments)
  - [Naming things when using CLI](#naming-things-when-using-cli)
  - [Auto-completion](#auto-completion)
  - [Getting help](#getting-help)
- [Using the filesystem](#using-the-filesystem)
  - [The `pwd` command](#the-pwd-command)
  - [The `ls` command](#the-ls-command)
  - [The `cd` command](#the-cd-command)
  - [The `mkdir` command](#the-mkdir-command)
  - [Windows users](#windows-users)
- [Vim](#vim)
  - [WHY?!](#why)
  - [How vim works](#how-vim-works)
  - [Normal mode](#normal-mode)
  - [Command mode](#command-mode)
- [The `PATH` variable](#the-path-variable)
  - [Using non-system commands](#using-non-system-commands)
  - [Updating the `PATH` variable](#updating-the-path-variable)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->



## A short history of computer interfaces

<!-- slide-front-matter class: center, middle -->

For old time's sake.

### ENIAC (1946)

At that time, there was no such thing as a stored computer program.
Programs were **physically hard-coded using 1200 ten way switches**, which took weeks.

<p class='center'><img class='w75' src='images/eniac.jpg' /></p>

### Punched cards for computers (1950)

<!-- slide-column -->

Many early general-purpose digital computers used [punched cards][punched-card] for data input, output and storage.

<!-- slide-column 40 -->

<img class='w100' src='images/punched-card.jpg' />

<!-- slide-container -->

<!-- slide-column -->

You had to use a keypunch machine to write your cards, then feed them to the computer.

This is what a program looked like:

<p class='center'><img class='w80' src='images/punched-cards-program.jpg' /></p>

<!-- slide-column 40 -->

<img class='w100' src='images/keypunch-machine.jpg' />

### TeleTYpewriter (1960s)

Teletypewriters (TTYs) became the most popular **computer terminals** in the 1960s.

This is when the first **command line interfaces (CLI)** were created.
As you typed commands, a program running on the computer would interpret that input,
and the output would be provided by printing it on physical paper.

<p class='center'><img class='w70' src='images/tty.jpg' /></p>

### Video terminals (1970s)

<!-- slide-column 40 -->

As available memory increased, **video terminals** such as the [VT100][vt100] replaced TTYs in the 1970s.

Initially they were fundamentally the same as TTYs: textual input/output device.

It's also in this period that the [Unix][unix] operating system was developed,
with a [**Unix shell**][unix-shell] as its command line interpreter
(the program that interprets the input and sends back the output).

<!-- slide-column -->

<img src='images/vt102.jpg' />

### Graphical User Interfaces (1980s)

<!-- slide-column -->

Eventually, [graphical user interfaces (GUIs)][gui] were introduced
in reaction to the perceived steep learning curve of command line interfaces.

They are the most common end user computer interface today.

<!-- slide-column 60 -->

<img class='w100' src='images/xerox-star.jpg' />



## What is a Command Line Interface (CLI)?

A CLI is a tool that allows you to use your computer by **writing** what you want to do (i.e. **commands**), instead of clicking on things.

It's been installed on computers for a long time, but it has evolved "a little" since then. It usually looks something like this:

<p class='center'><img src='images/cli.jpg' width='100%' /></p>



### Why use it?

A CLI is not very user-friendly or visually appealing but it has several advantages:

* It requires very **few resources**.
* It can be easily **automated** through scripting.
* Is is ultimately **more powerful and efficient** than any GUI for many computing tasks.

For these reasons, a lot of tools, **especially development tools**, don't have any GUI and are only usable through a CLI.

**Thus, using a CLI is a requirement for any developer today.**



### Open a CLI

**CLIs are available on every operating system.**

<!-- slide-column 50 -->

On **Unix-like** systems _(like macOS or Linux)_, it's called the **Terminal**.

You can use it right away, as it's the _de-facto_ standard.

<!-- slide-column -->

On **Windows**, the default CLI is called **cmd** (or **Invite de commandes** in French)

However, it does not use the same syntax as Unix-like CLIs _(plus, it's bad)_.

> **You'll need to install an alternative.**



### Install Git Bash (Windows users only)

You're going to install **Git Bash**, an alternative CLI that emulates a Unix-like CLI on Windows.

<!-- slide-column 30 -->

<p class='center'><img src='images/gitbashlogo.png' class='w80' /></p>

<!-- slide-column -->

You can download the **Git Bash Installer** on the [Git for Windows website][gitbash].

When it's done, install the software, without changing any default options.

Then, search and open the **Git Bash** software.

<!-- slide-container -->

> Installing **Git Bash** will also install **Git** and **Git GUI** _(see the [Git tutorial][slide-git] for more information)_.

As an alternative, you may also use the [Windows Subsystem for Linux][windows-subsystem-for-linux],
but it sometimes has issues when integrating with other programs not installed in that CLI.



## How to use the CLI

When you open the CLI you should find a blank screen with something like this:

```bash
$>
```

These symbols represent **the prompt** and are used to indicate that you have the lead, that is the computer is waiting for you to type something for it to execute.

> At anytime, hit the `Ctrl-C` command to stop any running task and get the lead back.

<!-- slide-column -->

The prompt is not always `$>`.
For example, by default on macOS, the prompt is `bash-3.2$`.

<!-- slide-column 30 -->

<p class='center'><img src='images/bash-prompt.png' width='100%' /></p>

<!-- slide-container -->

**For consistency, we will always use `$>` to represent the prompt.**

<!-- slide-notes -->

Please note that, depending on your OS and your CLI, **the prompt can be composed of different characters**.

When the computer's working, the prompt disappear and you won't have the lead until the prompt reappear again.



### Writing commands

A command is a **word** that you have to type in the CLI that will **tell the computer what to do**.

The syntax for using commands looks like this:

```bash
$> name arg1 arg2 arg3 ...
```
Note the use of **spaces** to separate the differents **arguments** of a command.

* `name` represents the **name of the command** you want to execute
* `arg1 arg2 arg3 ...` represent the **arguments of the command**, each of them **separated by a space**



### Options vs. arguments

There are two types of arguments to use with a command (if needed):

<!-- slide-column -->

**Options** usually specify **how** the command will behave
and are preceded by `-` or `--`:

```bash
$> ls `-l` `--all`
```

We use the `ls` command to list the content of the current directory. The options tell `ls` **how** it should do so:
* `--all` tells it to print all elements (including hidden ones)
* `-l` tells it to print elements in a list format, rather than on one line

<!-- slide-column -->

**Other arguments** not preceded by anything usually specify **what** will be used by the command:

```bash
$> cd `/Users/Batman`
```
Here, we use the `cd` command to move to another directory.

And the argument `/Users/Batman` tells the command **what** directory we want to move to.

<!-- slide-notes -->

In the **first example**, we use the `ls` command to list elements in the current directory. We also use options to tell `ls` how it should print elements:
* `--all` tells it to print all elements
* `-l` tells it to print elements in a list format, rather than on one line.

#### Options with values

Some options require a **value**:

```bash
tar -c -v `-f compressed.tar.gz` file-to-compress
```

`tar` is a command to bundle and compress files.
In this example, it takes **three options**:

* `-c` tells it to compress (instead of uncompressing)
* `-v` tells it to be verbose (print more information to the CLI)
* `-f` tells it where to store the compressed file;
  this is followed **immediately** by `compressed.tar.gz` which is the **value** of that option

It then takes **one argument**:

* `file-to-compress` is the file (or directory) to compress



### Naming things when using CLI

You should avoid the following characters in directories and file names you want to manipulate with the CLI:

* **spaces** _(they're used to separate arguments in command)_
* **accents** (e.g. `é`, `à`, `ç`, etc)

They can cause **errors** in some scripts or tools, and will inevitably complicate using the CLI.
If you have a `Why So Serious` directory, this **WILL NOT work**:

```bash
$> ls `Why` `So` `Serious`
```
This command will be interpreted as a call to the `cd` command with **three arguments**: `Why`, `So` and `Serious`.

You **can** use arguments containing spaces, but you have to **escape** them first, either with **quotation marks** or **backslashes**:

<!-- slide-column -->

```bash
$> ls `"Why So Serious"`
```

<!-- slide-column -->

```bash
$> ls `Why\ So\ Serious`
```



### Auto-completion

It's not fun to type directory names, especially when they have spaces you must escape in them,
so the CLI has **auto-completion**. Type the first few characters of the file or directory you
need, then hit the `Tab` key:

<!-- slide-column -->

<img src='images/auto-complete.png' width='100%' />

<!-- slide-column -->

<img src='images/auto-complete-tab.png' width='100%' />

<!-- slide-container -->

If there are multiple files or directories that begin with the **same characters**,
pressing `Tab` will not display anything.
You need hit `Tab` **a second time** to display the list of available choices:

<p class='center'><img src='images/auto-complete-multiple.png' width='50%' /></p>

You can type just enough characters so that the CLI can determine which one you want (in this case `c` or `w`),
then hit `Tab` again to get the full path.



### Getting help

You can get help on most advanced commands by executing them with the `--help` option.
As the option's name implies, it's designed to **give you some help** on how to use the command:

```bash
tar --help
```

Some commands don't respond to the `--help` option.
To try and get help, depending on what operating system you're on:

* On Linux or macOS, use `man ls` to display the **manual** for the `ls` command
* On Windows, use `help cd` to display help for the `cd` command;
  you can also type `help` to list available commands (only system commands)

<p class='center'><img src='images/tar-help.png' width='70%' /></p>

#### Interactive helps

Some helps or commands will take over the screen to display their content, hiding the prompt and previous interactions.

Usually, it means that these helps or commands have content that takes more than one screen to be shown.

You can "scroll" down line-by-line using the `Enter` key, each stroke printing one more line at the bottom of the screen.

To quit these helps or commands, use the `q` key.

<p class='center'><img src='images/interactive-help.png' width='80%' /></p>

#### Unix Command Syntax

When reading a command's manual or documentation,
you may find some strange syntax that make little sense to you, like:

```bash
cd [-L|[-P [-e]] [-@]] [dir]
```

Here are some explanations:

* `[]`: Whatever's inside is **optionnal** (ex: `[-e]`).
* `|`: You have to **chose between** options (ex: `-L|-P`).
* `...`: Whatever's before can be **repeated** (ex: `[options ...]`).

Depending on the documentation, you will also see symbols like this:

* `<value>`
* `--option=VALUE`

**DON'T WRITE `<value>` or `VALUE`**.
Replace it by an appropriate value for that option or argument.



## Using the filesystem

<!-- slide-front-matter class: center, middle -->



### The `pwd` command

When you open a CLI, it places you in your **home directory**.
From there you can navigate your filesystem to go to other directories _(more on that later)_.

But first, you might want to check **where** you currently are.
Use the `pwd` command:

```bash
$> pwd
/Users/Batman
```

> `pwd` means "print working directory": it gives you the absolute path to the directory you're currently in.



### The `ls` command

Now that you know where you are, you might want to know **what your current directory is containing**.

Use the `ls` command:

```bash
$> ls
(lots and lots of files)
```
> `ls` means "list": it lists the files and directories that the current directory contains.

By default, `ls` doesn't list **hidden elements** (i.e. elements that start with a `.`).

If you want it to do that, you need to pass the `--all` (or `-a`) option:

```bash
$> ls -a
(lots and lots of files, including the hidden ones)
```



### The `cd` command

It's time to go out a little and move to another directory.

Suppose you have a `Documents` directory in your home directory, that contains another directory `TopSecret` where you want to go.
Use the `cd` command, passing it as argument **the path to the directory** you want to go to:

```bash
$> pwd
/Users/Batman
$> cd Documents/TopSecret
```

This is a **relative path**: it is relative to the current working directory.

You can also go to a specific directory anywhere on your filesystem like this:

```bash
$> cd /Users/Batman/Documents
```

This is an **absolute path** because it starts with a `/` character.
It is relative to the root of your filesystem.

> You also have **auto-completion** with the `cd` command. Hit the `Tab` key after entering some letters.

#### The `.` path

The `.` path represents the current directory.
The following sequences of commands are strictly equivalent:

<!-- slide-column -->

```bash
$> pwd
/Users/Batman
$> cd Documents/TopSecret
```

<!-- slide-column -->

```bash
$> pwd
/Users/Batman
$> cd ./Documents/TopSecret
```

<!-- slide-container -->

You can also *not go anywhere*:

```bash
$> pwd
/Users/Batman
$> `cd .`
$> pwd
/Users/Batman
```

Or compress the current directory:

```bash
tar -c -v -f /somewhere/compressed.tar.gz `.`
```

This does not seem very useful now, but it will be in further tutorials.

#### The `..` path

To go up into the parent directory, use the `..` path (**don't forget the space between `cd` and `..`**):

```bash
$> pwd
/Users/Batman/Documents
$> `cd ..`
$> pwd
/Users/Batman
```

You can also drag and drop a directory from your Explorer or your Finder to the CLI to see its absolute path automaticaly written:

```bash
$> cd
(Drag and drop a directory from your Explorer/Finder, and...)
$> cd /Users/Batman/Pictures/
```

At anytime and from anywhere, you can return to your **home directory** with the `cd` command, without any argument (or with the `~`):

<!-- slide-column -->

```bash
$> cd
$> pwd
/Users/Batman
```

<!-- slide-column -->

```bash
$> cd ~
$> pwd
/Users/Batman
```

<!-- slide-notes -->

> To type the `~` character, use this combination:
> * `AltGr-^` on **Windows**
> * `Alt-N` on **Mac**

#### Path reference

Path        | Where
:---        | :---
`.`         | The current directory
`..`        | The parent directory
`foo/bar`   | The file/directory `bar` inside the directory `foo` in the current directory
`/foo/bar`  | The file/directory `bar` inside the directory `foo` at the root of your filesystem
`~`         | Your home directory
`~/foo/bar` | The file/directory `bar` inside the directory `foo` in your home directory

#### Your projects directory

Throughout this course, you will often see the following command (_or something resembling it_):

```bash
$> cd /path/to/projects
```

This means that you use **the path to the directory in which you store your projects**.
For example, on John Doe's macOS system, it could be `/Users/jdoe/Projects`.

> You shouldn't **actually write** `/path/to/projects`.
>
> It will obviously fail, unless you happen to have a `path` directory that contains a `to` directory that contains a `projects` directory...

**IMPORTANT:** if your Windows/Linux/macOS username contains **spaces** or **accents**, you should **NOT** store your projects under your home directory.
You should find a path elsewhere on your filesystem.
This will save you **a lot of suffering**.



### The `mkdir` command

You can create directories with the CLI.

Use the `mkdir` command to create a new directory in the current directory:

```bash
$> mkdir BatmobileSchematics
```

You can also create a directory elsewhere:

```bash
$> mkdir /Users/Batman/Documents/TopSecret/BatmobileSchematics
```

This will only work if all directories down to `TopSecret` already exist.
To automatically create all intermediate directories, add the `-p` option:

```bash
$> mkdir -p /Users/Batman/Documents/TopSecret/BatmobileSchematics
```



### Windows users

This is how you reference or use your **drives** (`C:`, `D:`, etc) in Git Bash on Windows:

```bash
$> cd /c/foo/bar
$> cd /d/foo
```

(In the Windows Subsystem for Linux, it's `/mnt/c` instead of `/c`.)

**Copy/Paste**

Since `Ctrl-C` is used to stop the current process, it **can't** be used as a shortcut to copy things from the CLI.

Instead, Git Bash has two custom shortcuts:

* `Ctrl-Insert` to **copy** things from the CLI
* `Shift-Insert` to **paste** things to the CLI

> You can also use **Right-click > Paste** if you don't have an `Insert` key.



## Vim

<!-- slide-front-matter class: center, middle -->

**Vim** is an infamous CLI editor originally developed in 1976 (WHAT?!)



### WHY?!

Why would you need to learn it?

Sometimes it's just the **only editor you have** (e.g. on a server).
Also **some developer tools might open vim** for user input.

If this happens (_and it will_), there's **one** imperative rule to follow:

**DO NOT PANIC!**

Open a file by running the `vim` command with the path to the file you want to create/edit:

```bash
vim test.txt
```



### How vim works

Vim can be unsettling at first, until you know how it works.

Let go of your mouse, it's mostly useless in Vim.
You control Vim by **typing**.

The first thing to understand whith Vim is that it has *3 modes*:

* **Normal** mode (the one you're in when Vim starts)
* **Command** mode (the one to use to save or quit)
* **Insert** mode (the one to use to insert text)

To go into each mode use this keys :

| From           | To      | Key   |
| :------------- | :------ | :---- |
| Normal         | Command | `:`   |
| Normal         | Insert  | `i`   |
| Command/Insert | Normal  | `Esc` |



### Normal mode

The **Normal** mode of Vim is the one you're in when it starts.
In this mode, you can move the cursor around with the arrow keys.

You can also use some commands to interact with the text:

| Command | Effect                                                           |
| :------ | :--------------------------------------------------------------- |
| `:`     | Enter **Command** mode (to save and/or quit)                     |
| `i`     | Enter **Insert** mode (to type text)                             |
| `x`     | Delete the character under the cursor                            |
| `dw`    | Delete a word, with the cursor standing before the first letter  |
| `dd`    | Delete the complete line the cursor is on                        |
| `u`     | Undo the last command                                            |

> At anytime, you can hit the `Esc` key to go back to the **Normal** mode.



### Command mode

The **Command** mode, which you can only access from the **Normal** mode,
is the one you'll mostly use to save and/or quit.

To enter the **Command** mode, hit the `:` key.
From there, you can use some commands:

| Command     | Effect                                                     |
| :---------- | :--------------------------------------------------------- |
| `q`         | Quit Vim (will fail if you have unsaved modifications)     |
| `w`         | Write (save) the file and all its modifications            |
| `q!`        | Force Vim to quit (any unsaved modification will be lost)  |
| `wq` or `x` | Save the file then quit Vim.                               |

<!-- TODO: add link http://www.openvim.com/ -->



## The `PATH` variable

When you type a command in the CLI, it will try to see **if it knows this command** by looking in some directories to see if there is an **executable file that matches the command name**.

```bash
$> rubbish
bash: rubbish: command not found
```
> This means that the CLI failed to found the executable named `rubbish` in any of the directories where it looked.

The list of the directories (and their paths) in which the CLI searches is stored in the `PATH` environment variable, each of them being separated with a `:`.

You can print the content of your `PATH` variable to see this list:

```bash
$> echo $PATH
/usr/local/bin:/bin:/usr/bin:Users/Batman/BatRadar/bin
```



### Using non-system commands

Many development tools you install come with executables that you can run from the CLI (e.g. Git, Node.js, MongoDB).

Some of these tools will install their executable in a **standard directory** like `/usr/local/bin`, which is already in your `PATH`.
Once you've installed them, you can simply run their new commands.
Git and Node.js, for example, do this.

However, sometimes you're downloading only an executable and saving it in a directory somewhere that is **not in the `PATH`**.

#### Executing a command in a directory that's not in the `PATH`

To run such a command, you can **manually go to the directory** containing the executable and **run the command there**:

```bash
$> cd ~/Applications/Batsignal
$> ./batsignal
```

You could also run the command from anywhere by writing **the absolute path to the executable**:

```bash
$> /Users/Batman/Application/Batsignal/batsignal
```

But, ideally, you want to be able to **just type the name of the command**, and have it be executed.
For this, you need to **add the directory containing the executable** to your `PATH` variable.



### Updating the `PATH` variable

To add a new path in your `PATH` variable, you have to edit a special file, used by your CLI. This file depends upon the CLI you are using:

| CLI                 | File to edit                     |
| :------------------ | :-----------                     |
| Terminal / Git Bash | `~/.bashrc` or `~/.bash_profile` |
| [ZSH][zsh-site]     | `~/.zshrc`                       |

Open the adequate file (`.bashrc` for this example) from the CLI with `vim` or your favorite editor if it can display hidden files:

```bash
$> vim ~/.bashrc
```
Add this line at the bottom of your file (use `i` to enter _insert_ mode if you're in Vim):

```vim
export PATH="/Users/Batman/Application/Batsignal:$PATH"
```

If you're in Vim, press `Esc` when you're done typing, then `:wq` and `Enter` to save and quit.

#### What have I done?

You have **added a directory to the `PATH`**:

```vim
export PATH="/Users/Batman/Application/Batsignal:$PATH"
```

This line says:

* Modify the `PATH` variable
* In it, put the new directory `/Users/Batman/Application/Batsignal` and the previous value of the `PATH`, separated by `:`

The next time you run a command, your CLI will **first look** in this directory for executables, then in the **rest of the `PATH`**.

**Common mistakes**

* What you must put in the `PATH` is **NOT** the path to the executable, but the path to the **directory containing the executable**

* You must re-open your CLI for the change to take effect:
  the CLI configuration file (e.g. `~/.bashrc`) is only applied when the CLI starts



[gitbash]: https://git-for-windows.github.io/
[gui]: https://en.wikipedia.org/wiki/Graphical_user_interface
[punched-card]: https://en.wikipedia.org/wiki/Punched_card
[slide-git]: ../git
[unix]: https://en.wikipedia.org/wiki/Unix
[unix-shell]: https://en.wikipedia.org/wiki/Unix_shell
[vt100]: https://en.wikipedia.org/wiki/VT100
[windows-subsystem-for-linux]: https://docs.microsoft.com/en-us/windows/wsl/about
[zsh-site]: http://zsh.sourceforge.net/
