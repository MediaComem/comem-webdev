# Git Introduction

This is a condensed version of the first chapters of the [Git Book](https://git-scm.com/book/en/v2), which you should read if you want more detailed information on the subject.

<br>
<center><a href='https://git-scm.com'><img src='images/git-logo.png' width='50%' /></a></center>



## What is version control?

> A system that records changes to a file or set of files over time so that you can recall specific versions later.

<br>

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

**But:**

* It is easy to forget which directory you’re in and accidentally write to the wrong file or copy over files you don’t mean to.
* This is limited to your computer: how do you **collaborate** with other people?

<!-- slide-column 40 -->

<center><img src='images/local-vcs.png' width='100%' /></center>



### **Centralized** version control systems

<!-- slide-column 60 -->

Systems such as [CVS][cvs], [Subversion][svn], and [Perforce][perforce] have a **single server** that contains all the versioned files,
and clients check out files from that central place.

You can **collaborate** with other people through the server,
and administrators have **fine-grained control** over who can do what.

<!-- slide-column 40 -->

<center><img src='images/centralized-vcs.png' width='100%' /></center>

<!-- slide-container -->

**But:**

* The centralized server is a **single point of failure**.
  If it goes down, then nobody can collaborate at all or save versioned change to anything they're working on.
* If the server's hard disk becomes corrupt and proper backups haven't been kept, you **lose the entire history** of the project except whatever single snapshots people happen to have on their local machines.



### **Distributed** version control systems

<!-- slide-column 50 -->

Systems such as [Git][git], [Mercurial][mercurial], [Bazaar][bazaar] or [Darcs][darcs] are **distributed**.
Clients don't just check out the latest snapshot of the files: they **fully mirror** the repository.

* If any server dies, any of the client repositories can be copied back up to the server to restore it.
* You can collaborate with different groups of people in different ways simultaneously within the same project.
  This allows you to set up [several types of workflows][distributed-workflows] that aren't possible in centralized systems, such as hierarchical models.

<!-- slide-column 50 -->

<center><img src='images/distributed-vcs.png' width='100%' /></center>



[rcs]: https://en.wikipedia.org/wiki/Revision_Control_System
[cvs]: https://en.wikipedia.org/wiki/Concurrent_Versions_System
[svn]: https://subversion.apache.org/
[perforce]: https://en.wikipedia.org/wiki/Perforce_Helix
[git]: https://git-scm.com/
[mercurial]: https://www.mercurial-scm.org/
[bazaar]: http://bazaar.canonical.com/
[darcs]: http://darcs.net/
[distributed-workflows]: https://git-scm.com/book/en/v2/Distributed-Git-Distributed-Workflows
