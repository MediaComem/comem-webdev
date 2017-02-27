# Git Cheatsheet

In case you forget how to:

<!-- START doctoc -->
<!-- END doctoc -->



## Best practices

* [**Commit early and often, perfect later** (Seth Robertson)](https://sethrobertson.github.io/GitBestPractices/):
  Git only takes full responsibility for your data when you commit.
  If you fail to commit and then do something poorly thought out, you can run into trouble.
  Additionally, having periodic checkpoints means that you can understand how you broke something.



## Frequent operations



### Create a new empty repository

```bash
$> cd /path/to/projects
$> mkdir my-new-project
$> cd my-new-project
$> git init
```



### Put an existing project on GitHub

```bash
$> cd /path/to/projects/my-project
$> git init
```

If you **don't want to commit some files**, create a `.gitignore` file listing them each on one line, e.g.

```txt
*.log
node_modules
```

Commit the project's files:

```bash
$> git add --all
$> git commit -m "Initial commit"
```

Create your new repository [on GitHub](http://github.com), copy the SSH clone URL (e.g. `git@github.com:MyUser/my-project.git`), and add it as a remote:

```bash
$> git remote add origin git@github.com:MyUser/my-project.git
```

Push your master branch and track it (with the `-u` option):

```bash
$> git push -u origin master
```



### Push my latest changes to the GitHub repository

Commit and push your changes:

```bash
$> git add --all
$> git commit -m "My changes"
```

**If GitHub rejects your push**, you should **pull the latest changes** first.



### Pull the latest changes from the GitHub repository

**If you have uncommitted change** (check with `git status`), stage and commit them:

```bash
$> git add --all
$> git commit -m "My changes"
```

Pull the changes:

```bash
$> git pull
```

If you've worked on the same files, there might be a **merge**.
**If there is a merge conflict**, [resolve it](https://mediacomem.github.io/comem-webdev-docs/2017/subjects/git-branching/#30) and complete the merge with `git commit`.
