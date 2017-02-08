# Collaborating with Git and GitHub

TODO: ssh reminder

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Cloning a Git repository](#cloning-a-git-repository)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->





### Cloning a Git repository

You can get a Git repository either by cloning an existing one or creating a new one and importing a project's files into it.
Let's start by getting an existing repository – the repository for this course:

```bash
$> git clone https://github.com/MediaComem/comem-webdev.git
remote: Counting objects: 155, done.
remote: Compressing objects: 100% (99/99), done.
remote: Total 155 (delta 51), reused 142 (delta 38), pack-reused 0
Receiving objects: 100% (155/155), 656.15 KiB | 520.00 KiB/s, done.
Resolving deltas: 100% (51/51), done.
```

It will create a directory named `comem-webdev`, initialize a `.git` repository inside it, pull down all the data for that repository, and check out a working copy of the latest version.

If you wish to clone the repository into another directory name, you can specify that as the next command line option:

```bash
$> git clone https://github.com/MediaComem/comem-webdev.git awesome-stuff
```

Note that Git will perform a **full copy** of all data that the server has: every version of every file for the history of the project is pulled down by default.
