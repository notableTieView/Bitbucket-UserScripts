# Bitbucket-UserScripts
A couple of tweaks for Bitbucket. 
For information on userscripts in general see [Wikipedia](https://en.wikipedia.org/wiki/Userscript).
The following userscripts can be copied from the repo and added to a browser's userscript manager (e.g. Tampermonkey, Greasemonkey, ...).
## Bitbucket_PullRequest_TODOs
This user script adds a button to the pull request overview of repositories. Clicking the button will only show those pull requests that you are a reviewer of AND that you have not yet decided on (neither approved nor marked as needs work).
### Prerequisits
* The script assumes a logged-in user.
* In the userscript replace the placeholder in the @match metadata!
## Bitbucket_AvatarFinder
Older versions of Bitbucket suffer from a [bug](https://jira.atlassian.com/browse/BSERV-10780) which occurs on the branches page of a repository. Here the avatars of commiters are only shown for commiters who use gravatar. All others have only a default icon because Bitbucket by default queries only for gravatar icons. 
The userscript retrieves the proper user icons from the user profile.
### Prerequisits
* In the userscript replace the placeholder in the @match metadata!
* In the userscript fill in the associative array called names (all developers with realnames and usernames). The realnames are found at the commits, but images have to be queried by username. Therefore this association has to be added manually with this array.
## Bitbucket_BranchCounter
Bitbucket does not show the total number of branches. This script adds this detail, both in the heading of a project's branches page as well as next to the respective nav icon.
### Prerequisits
* In the userscript replace the placeholder in the @match metadata!
