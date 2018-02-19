(function() {
  subject.gitMemoirs.github = function() {
    return new gitMemoir.MemoirBuilder()

      .chapter('staging', {
        before: function(step, drawer) {
          drawer.requireExtension(gitMemoir.horizontalLayoutExtensionPredicate).getRepositoryGridLayoutStrategy().uniformColumnWidth = false;
        }
      })
      .fileSystem('bob', fs => {}, {
        /*icon: {
          svg: getComputerIcon(),
          aspectRatio: 80 / 48
        }*/
      })
      .repo('bob-project')
      .commit({ commit: { hash: '387f12' } })
      .commit({ commit: { hash: '9ab3fd' } })
      .commit({ commit: { hash: '4f94ba' } })

      .chapter('remote')
      .fileSystem('github', function() {}, {
        /*icon: {
          svg: getGithubIcon(),
          aspectRatio: 1
        }*/
      })
      .repo('shared-project', { bare: true })

      .chapter('bob-remote')
      .fileSystem('bob')
      .repo('bob-project')
      .remote.add('origin', 'github', 'shared-project')

      .chapter('bob-push')
      .push('origin', 'master')

      .chapter('alice-remote')
      .fileSystem('alice', fs => {}, {
        /*icon: {
          svg: getComputerIcon(),
          aspectRatio: 80 / 48
        }*/
      })
      .repo('alice-project')
      .remote.add('origin', 'github', 'shared-project')

      .chapter('alice-pull', {
        before: function(step, drawer) {
          drawer.requireExtension(gitMemoir.drawFileSystemExtensionPredicate).getViewStrategy().setHiddenFileSystems([ 'bob' ]);
        }
      })
      .pull('origin', 'master')

      .chapter('alice-commit')
      .commit({ commit: { hash: '92fb8c' } })

      .chapter('alice-push')
      .push('origin', 'master')

      .chapter('bob-look', {
        before: function(step, drawer) {
          drawer.requireExtension(gitMemoir.drawFileSystemExtensionPredicate).getViewStrategy().setHiddenFileSystems([ 'alice' ]);
        }
      })
      .fileSystem('bob')
      .repo('bob-project')

      .chapter('bob-fetch')
      .fetch({ remote: 'origin' })

      .chapter('bob-merge')
      .merge('origin/master')

      .chapter('box-fix')
      .commit({ commit: { hash: '55e12a' } })
      .push('origin', 'master')

      .chapter('alice-fix')
      .fileSystem('alice')
      .repo('alice-project')
      .commit({ commit: { hash: '102c34' } })

      .chapter('alice-fetch')
      .pull('origin', 'master')

      .chapter('alice-push-merge')
      .push('origin', 'master')

      .chapter('bob-pull-merge')
      .fileSystem('bob')
      .repo('bob-project')
      .pull('origin', 'master')
      .memoir;
  };
})();
