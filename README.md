# Bitbucket-UserScripts
A couple of tweaks for Bitbucket. 
For information on userscripts in general see [Wikipedia](https://en.wikipedia.org/wiki/Userscript).
The following userscripts can be copied from the repo and added to a browser's userscript manager (e.g. Tampermonkey, Greasemonkey, ...).
## Bitbucket_PullRequest_TODOs
This user script adds a button to the pull request overview of repositories. Clicking the button will only show those pull requests that you are a reviewer of AND that you have not yet decided on (neither approved nor marked as needs work).
### Prerequisits
* The script assumes a logged-in user.
* In the userscript replace the placeholder in the @match metadata.
