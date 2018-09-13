# Linux Processes

Learn about processes and how to manage them and make them communicate.

<!-- slide-include ../../BANNER.md -->



## What is a process?

A [process][process] is an **instance of a computer program that is being executed**.

**Every time you run an executable** file or an application, **a process is created**.

Simple programs only need one process.
More complex applications also have one main process,
but may launch other processes for greater performance
(e.g. most modern browsers will run at least one sub-process for each tab).



### Unix processes

Processes work differently depending on the operating system.
We will focus on processes in Unix-like systems,
which have the following features:

| Feature                     | Description                                                                                                         |
| :---                        | :---                                                                                                                |
| [Process ID (PID)][pid]     | A number uniquely identifying a process at a given time.                                                            |
| [Exit status][exit-status]  | A number given when a process exits, indicating whether it was successful.                                          |
| [Standard streams][streams] | Preconnected input and output communication channels between a process and its environment.                         |
| [Pipelines][pipes]          | A way to chain processes in sequence by their standard streams, a form of [inter-process communication (IPC)][ipc]. |
| [Signals][signals]          | Notifications sent to a process, a form of [inter-process communication (IPC)][ipc].                                |



## Process ID

Any process that is created in a Unix-like system is assigned an **identifier (or PID)**.
This ID can be used to reference the process, for example to terminate it with the `kill` command.
Each new process gets the next available PID.

PIDs are sometimes reused as processes die and are created again,
but **at any given time, a PID uniquely identifies a specific process**.

The process with PID 0 is the *system process*,
the most low-level process managed directly by the kernel.

The first thing it does is run the **[init process][init]**, which naturally gets PID 1.
The init process is responsible for initializing the system.
Most other processes are either launched by the init process directly, or by one of its children.

All processes retain a reference to the **parent process** that launched it.
The ID of the parent process is commonly called **PPID (parent process ID)**.

### The `ps` command

The `ps` (**p**rocess **s**tatus) command displays currently-running processes:

```bash
$> ps
  PID TTY          TIME CMD
14926 pts/0    00:00:00 bash
14939 pts/0    00:00:00 ps
```

You can obtain more information with the `-f` (full format) option:

```bash
$> ps -f
UID        PID  PPID  C STIME TTY          TIME CMD
root     15237 15158  1 17:48 pts/0    00:00:00 -bash
root     15251 15237  0 17:48 pts/0    00:00:00 ps -f
```

#### Listing all processes

Of course, there are more than 2 processes running on your computer.
Add the `-e` (every) option to see all running processes.
The list will be much longer.
This is only a partial example:

```bash
$> ps -ef
UID        PID  PPID  C STIME TTY          TIME CMD
root         1     0  0 09:38 ?        00:00:30 /sbin/init
root         2     0  0 09:38 ?        00:00:30 [kthread]
...
root       402     1  0 09:39 ?        00:00:00 /lib/systemd/systemd-journald
syslog     912     1  0 09:39 ?        00:00:00 /usr/sbin/rsyslogd -n
root      1006     1  0 09:39 ?        00:00:00 /usr/sbin/cron -f
...
root      1700     1  0 Sep11 ?        00:00:00 /usr/sbin/sshd -D
jdoe      3350  1700  0 17:52 ?        00:00:00 sshd: jdoe@pts/0
jdoe      3378  3350  0 15:32 pts/0    00:00:00 -bash
jdoe      3567  3378  0 15:51 pts/0    00:00:00 ps -ef
```

> Note that the command we just ran, `ps -ef`, is in the process list (at the bottom in this example).
> This is because it was running while it was listing the other processes.

#### Process tree

On some Linux distributions like Ubuntu,
the `ps` command also accepts a `--forest` option which visually shows the relationship between processes and their parent:

```bash
$> ps -ef --forest
UID        PID  PPID  C STIME TTY          TIME CMD
...
root      1700     1  0 Sep11 ?        00:00:00 /usr/sbin/sshd -D
jdoe      3350  1700  0 17:52 ?        00:00:00  \_ sshd: jdoe@pts/0
jdoe      3378  3350  0 15:32 pts/0    00:00:00      \_ -bash
jdoe      3567  3378  0 15:51 pts/0    00:00:00          \_ ps -ef
```

You can clearly see that:

* Process 1700, the SSH server (`d` is for [daemon][daemon]),
  was launched by the init process (PID 1) and is run by `root`.
* Process 3350 was launched by the SSH server when you connected.
  It represents your terminal device, named `pts/0` here.
* Process 3378 is the bash login shell that was launched when you connected
  and is attached to terminal `pts/0`.
* Process 3567 is the `ps` command you launched from the shell.

### Running more processes

Let's run some other processes and see if we can list them.

Open a new terminal on your local machine and connect to the same server.

If you go back to the first terminal and run the `ps` command again,
you should see both virtual terminal processes corresponding to your 2 terminals,
as well as the 2 bash shells running within them:

```bash
$> ps -ef --forest
...
root      1700     1  0 Sep11 ?        00:00:00 /usr/sbin/sshd -D
jdoe      3350  1700  0 18:21 ?        00:00:00  \_ sshd: jdoe@pts/0
jdoe      3378  3350  0 18:21 pts/0    00:00:00  |   \_ -bash
jdoe      3801  3378  0 18:22 pts/0    00:00:00  |       \_ ps -ef --forest
jdoe      3789  1700  0 18:21 ?        00:00:00  \_ sshd: jdoe@pts/1
jdoe      3791  3789  0 18:21 pts/1    00:00:00      \_ -bash
```

#### Sleeping process

Run a `sleep` command in the second terminal:

```bash
$> sleep 1000
```

It launches a process that does nothing for 1000 seconds, but keeps running.

It will block your terminal during that time,
so go back to the other terminal and run the following `ps` command,
with an additional `-u jdoe` option to filter only processes belonging to your user:

```bash
$> ps -f -u jdoe --forest
UID        PID  PPID  C STIME TTY          TIME CMD
...
jdoe      3350  1700  0 09:39 ?        00:00:00 sshd: jdoe@pts/0
jdoe      3378  3350  0 09:39 pts/0    00:00:00  \_ -bash
jdoe      3823  3378  0 16:41 pts/0    00:00:00      \_ ps -f -u vagrant --forest
jdoe      3789  1700  0 15:32 ?        00:00:00 sshd: jdoe@pts/1
jdoe      3791  3789  0 15:32 pts/1    00:00:00  \_ -bash
jdoe      3812  3791  0 16:31 pts/1    00:00:00      \_ sleep 1000
```

You can indeed see the running process started with the `sleep` command.
You can stop it with `Ctrl-C` (in the terminal when it's running) when you're done.

### Other monitoring commands

Here are other ways to inspect processes and have more information on their resource consumption:

* The [`top` command][top] (meaning **t**able **o**f **p**rocesses) show processes along with CPU and memory consumption.
  It's an interactive command you can exit with `q`.
* The [`htop` command][htop] does the same thing, but is prettier
  (although not all Linux distributions have it installed by default).
* The [`free` command][free] is not directly related to processes,
  but it helps you know how much memory is remaining on your system.

```bash
$> free -m
              total        used        free      shared  buff/cache   available
Mem:            985          90         534           0         359         751
Swap:             0           0           0
```



## Exit status

The **exit status** of a process is a small number (typically from 0 to 255) passed
from a child process to its parent process when it has finished executing.

It is meant to allow the child process to indicate how or why it exited.

It's common practice for the exit status of Unix/Linux programs to be **0 to indicate success**,
and **greater than 0 to indicate an error**
(it is sometimes also called an *error level*).

### Retrieving the exit status in a shell

In a typical shell like [Bash][bash],
you can retrieve the exit status of last executed command from the special variable `$?`:

```bash
$> ls /
...

$> echo $?
0

$> ls file-that-does-not-exist
ls: cannot access 'file-that-does-not-exist': No such file or directory

$> echo $?
2
```

### Retrieving the exit status in code

This is not a feature that is limited to command line use.
When running a program from an application, you can also obtain the exit status.

For example:

* By using the `&$return_var` reference when calling PHP's [`exec` function][php-exec].
* By calling the [`Process#exitValue()` method][java-process-exit-value] after calling `Runtime#exec(String command)` in Java.
* By listening to the `close` event when calling Node.js's [`spawn` function][node-spawn].

### Meaning of exit statuses

The meaning of exit statuses is unique to the program you are running.
For example, the manual of the `ls` command documents the following values:

```bash
Exit status:
  0      if OK,
  1      if minor problems (e.g., cannot access subdirectory),
  2      if serious trouble (e.g., cannot access command-line argument).
```

But this will be different for other programs or applications.

The only thing you can rely on for the majority of programs
is that **0 is good, anything else is probably bad**.



## TODO

* Streams (redirection)
* Pipelines (unix philosophy)
* Signals



[bash]: https://en.wikipedia.org/wiki/Bash_(Unix_shell)
[daemon]: https://en.wikipedia.org/wiki/Daemon_(computing)
[exit-status]: https://en.wikipedia.org/wiki/Exit_status
[free]: https://www.howtoforge.com/linux-free-command/
[htop]: https://hisham.hm/htop/
[init]: https://en.wikipedia.org/wiki/Init
[ipc]: https://en.wikipedia.org/wiki/Inter-process_communication
[java-process-exit-value]: https://docs.oracle.com/javase/7/docs/api/java/lang/Process.html#exitValue()
[node-spawn]: https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options
[php-exec]: http://php.net/manual/en/function.exec.php
[pid]: https://en.wikipedia.org/wiki/Process_identifier
[pipes]: https://en.wikipedia.org/wiki/Pipeline_(Unix)
[process]: https://en.wikipedia.org/wiki/Process_(computing)
[ps-fields]: https://kb.iu.edu/d/afnv
[signals]: https://en.wikipedia.org/wiki/Signal_(IPC)
[streams]: https://en.wikipedia.org/wiki/Standard_streams
[top]: https://linux.die.net/man/1/top
