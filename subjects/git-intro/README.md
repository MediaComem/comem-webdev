# Git Introduction

This is a condensed version of the first chapters of the [Git Book](https://git-scm.com/book/en/v2), which you should read if you want more detailed information on the subject.

---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [What is Git?](#what-is-git)
- [What is version control?](#what-is-version-control)
- [A short history](#a-short-history)
  - [**Local** version control systems](#local-version-control-systems)
  - [**Centralized** version control systems](#centralized-version-control-systems)
  - [**Distributed** version control systems](#distributed-version-control-systems)
- [Git basics](#git-basics)
  - [Snapshots, not differences](#snapshots-not-differences)
  - [Nearly every operation is local](#nearly-every-operation-is-local)
  - [Git has integrity](#git-has-integrity)
  - [What's in a Git project?](#whats-in-a-git-project)
  - [The three states](#the-three-states)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->





## What is Git?

<a href='https://git-scm.com'><img src='images/git-logo.png' width='30%' /></a>

Git is a **version control system (VCS)** originally developed by Linus Torvalds, the creator of Linux.
Its goals are:

* **Speed**
* **Simple** design
* Strong support for **non-linear development** (thousands of parallel branches)
* Fully **distributed**
* Able to handle **large projects** like the Linux kernel efficiently (speed and data size)





## What is version control?

> A system that records changes to a file or set of files over time so that you can recall specific versions later.

<p class='center'><img src='images/commits.png' width='50%' /></p>

What can I do with it?

* **Revert** files back to a previous state.
* Revert the entire project back to a previous state.
* **Compare** changes over time.
* See who last modified something that might be causing a problem, who introduced an issue and when, and more.
* **Recover** if you screw things up or lose files.





## A short history

<!-- slide-front-matter class: center, middle -->



### **Local** version control systems

<!-- slide-column 60 -->

You can manually copy your files into another directory to keep old versions.

Systems such as [RCS][rcs] were developed to automate this process.

<!-- slide-column 40 -->

<img src='images/local-vcs.png' width='100%' />

<!-- slide-container -->

**But:**

* It is easy to forget which directory you’re in and accidentally write to the wrong file or copy over files you don’t mean to.
* This is limited to your computer: how do you **collaborate** with other people?



### **Centralized** version control systems

<!-- slide-column 60 -->

Systems such as [CVS][cvs], [Subversion][svn], and [Perforce][perforce] have a **single server** that contains all the versioned files,
and clients check out files from that central place.

You can **collaborate** with other people through the server,
and administrators have **fine-grained control** over who can do what.

<!-- slide-column 40 -->

<img src='images/centralized-vcs.png' width='100%' />

<!-- slide-container -->

**But:**

* The centralized server is a **single point of failure**.
  If it goes down, then nobody can collaborate at all or save versioned change to anything they're working on.
* If the server's hard disk becomes corrupt and proper backups haven't been kept, you **lose the entire history** of the project except whatever single snapshots people happen to have on their local machines.



### **Distributed** version control systems

<!-- slide-column 50 -->

Systems such as [Git][git], [Mercurial][mercurial], [Bazaar][bazaar] or [Darcs][darcs] are **distributed**.
Clients don't just check out the latest snapshot of the files: they **fully mirror** the repository.

* If any server dies, any of the client repositories can be copied back up to the server to **restore** it.
* You can **collaborate** with different groups of people in different ways simultaneously within the same project.
  This allows you to set up [several types of workflows][distributed-workflows] that aren't possible in centralized systems, such as hierarchical models.

<!-- slide-column 50 -->

<img src='images/distributed-vcs.png' width='100%' />





## Git basics

<!-- slide-front-matter class: center, middle -->



### Snapshots, not differences

<!-- slide-column 50 -->

Other VCSs, like Subversion, store information as a list of file-based **changes**.

Git thinks of its data more like a set of **snapshots** of a miniature filesystem.

Every time you save the state of your project in Git, it basically takes a picture of what all your files look like at that moment and stores a reference to that snapshot.
To be efficient, **if files have not changed, Git doesn't store the file again**, just a link to the previous identical file it has already stored.
Git thinks about its data more like a stream of snapshots.

<!-- slide-column 50 -->

**Changes**

<img src='images/deltas.png' width='100%' />

**Snapshots**

<img src='images/snapshots.png' width='100%' />



### Nearly every operation is local

Most operations in Git only need local files and resources to operate.
Because you have the entire history of the project right there on your local disk, most operations seem almost instantaneous:

* To browse the history of the project, Git simply reads it directly from your local database.
* To see the changes introduced in a file since a month ago, Git can look up the file a month ago and do a local difference calculation.
* If you're offline, you can commit happily until you get to a network connection to upload.



### Git has integrity

Everything in Git is check-summed before it is stored and is then referred to by that **checksum**.
This means it's impossible to change the contents of any file or directory without Git knowing about it.
This functionality is built into Git at the lowest levels and is integral to its philosophy.
You can’t lose information in transit or get file corruption without Git being able to detect it.

The mechanism that Git uses for this checksumming is called a [SHA-1][sha1] hash.
This is a 40-character string composed of hexadecimal characters (0–9 and a–f) and calculated based on the contents of a file or directory structure in Git.
A SHA-1 hash looks something like this:

```
24b9da6552252987aa493b52f8696cd6d3b00373
```

You will see these hash values all over the place in Git because it uses them so much.
In fact, Git stores everything in its database **not by file name but by the hash value of its contents**.



### What's in a Git project?

The file structure in a Git project looks like this:

```txt
my-project:
  .git:
    HEAD
    config
    hooks
    index
    objects
    ...
  file1.txt
  file2.txt
  dir:
    file3.txt
```

A Git project has three main sections:

* The Git directory
* The working directory
* The staging area

#### The Git directory

The Git directory is where Git stores the metadata and object database for your project: all the **snapshots** of the different **versions** of your files.
This is the most important part of Git, and it is what is copied when you clone a repository from another computer.

It's located in the `.git` directory in the project's directory:

```txt
my-project:
* .git:
*   HEAD
*   config
*   hooks
*   index
*   objects
*   ...
  file1.txt
  file2.txt
  dir:
    file3.txt
```

There's no reason to modify any of the files in this directory yourself.
You could easily corrupt the Git repository.

#### The working directory (also called the working tree)

The working directory is a **single checkout of one version** of the project: these are **the files you are currently working on**.
These files are pulled out of the compressed database in the Git directory and placed in your project's directory for you to use or modify:

```txt
*my-project:
  .git:
    HEAD
    config
    hooks
    index
    objects
    ...
* file1.txt
* file2.txt
* dir:
*   file3.txt
```

#### The staging area (also called the index)

The staging area is a file, generally contained in your Git directory, that stores information about **what will go into your next commit**.

Before file snapshots are committed in the Git directory, they must go through the *staging area*.

```txt
my-project:
  .git:
    HEAD
    config
    hooks
*   index
    objects
    ...
  file1.txt
  file2.txt
  dir:
    file3.txt
```



### The three states

This is one of the **_most important things to remember about Git_**.

Git has three main states that your files can reside in: *committed*, *modified*, and *staged*:

* **Committed** means that the data is safely stored in your local database (the *Git directory*).
* **Modified** means that you have changed the file but have not committed it to your database yet.
* **Staged** means that you have marked a *new* or *modified* file in its current version to go into your next commit snapshot.
  It is in the *staging area*.

#### The basic Git workflow

The basic Git workflow goes something like this:

<p class='center'><img src='images/areas.png' width='60%' /></p>

* You **check out** a specific version of your files into the *working directory*.
* You **modify** files in your *working directory*.
* You **stage** the files, adding snapshots of them to your *staging area*.
* You do a **commit**, which takes the files as they are in the *staging area* and stores that snapshot permanently to your *Git directory*.



[rcs]: https://en.wikipedia.org/wiki/Revision_Control_System
[cvs]: https://en.wikipedia.org/wiki/Concurrent_Versions_System
[svn]: https://subversion.apache.org/
[perforce]: https://en.wikipedia.org/wiki/Perforce_Helix
[git]: https://git-scm.com/
[mercurial]: https://www.mercurial-scm.org/
[bazaar]: http://bazaar.canonical.com/
[darcs]: http://darcs.net/
[distributed-workflows]: https://git-scm.com/book/en/v2/Distributed-Git-Distributed-Workflows
[sha1]: https://en.wikipedia.org/wiki/SHA-1
