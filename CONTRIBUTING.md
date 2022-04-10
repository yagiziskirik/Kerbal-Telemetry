# Welcome to Kerbal Telemetry contributing guide <!-- omit in toc -->

Thank you for investing your time in contributing to my project! Any contribution you make will be reflected on [Kerbal Telemetry](https://github.com/yagiziskirik/Kerbal-Telemetry) page :sparkles:. 

In this guide you will get an overview of the contribution workflow from opening an issue, creating a PR, reviewing, and merging the PR.

## New contributor guide

To get an overview of the project, read the [README](README.md). Here are some resources to help you get started with open source contributions:

- [Finding ways to contribute to open source on GitHub](https://docs.github.com/en/get-started/exploring-projects-on-github/finding-ways-to-contribute-to-open-source-on-github)
- [Set up Git](https://docs.github.com/en/get-started/quickstart/set-up-git)
- [GitHub flow](https://docs.github.com/en/get-started/quickstart/github-flow)
- [Collaborating with pull requests](https://docs.github.com/en/github/collaborating-with-pull-requests)


## Getting started

To navigate this codebase with confidence I would like to gently remind you that there are two different parts of this program. First is being the [Python Source](https://github.com/yagiziskirik/Kerbal-Telemetry/tree/master/Python%20Source) folder which is responsible for web server and the User Interface.

The rest of the code is C# code, and only job it does is to extract relevant information from KSP to Python. Feel free to add any extra functionality if you think it is worth working on :confetti_ball:.

### Issues

#### Create a new issue

If you spot a problem with the docs, [search if an issue already exists](https://docs.github.com/en/github/searching-for-information-on-github/searching-on-github/searching-issues-and-pull-requests#search-by-the-title-body-or-comments). If a related issue doesn't exist, you can open a new issue using a relevant [issue form](https://github.com/yagiziskirik/Kerbal-Telemetry/issues/new/choose). 

#### Solve an issue

Scan through our [existing issues](https://github.com/yagiziskirik/Kerbal-Telemetry/issues?q=is%3Aissue) to find one that interests you. You can narrow down the search using `labels` as filters. Also don't forget to check out closed issues.

### Make Changes

#### Make changes in the UI

You can change the User Interface visuals in rather Python Source folder or add an in-game UI.

#### Make changes in a codespace

For more information about using a codespace for working on GitHub documentation, see "[Working in a codespace](https://github.com/github/docs/blob/main/contributing/codespace.md)."

You can change the functionality of the program by editing any of the files in the codespace. If change any functionality though, please add the changes you have done according to the [Git Commit Messages](#git-commit-messages) section.

#### Add new language or edit translation

Please make sure that the translations are accurate.

### Commit your update

Commit the changes once you are happy with them. You can follow this simple two steps:

#### Self-Review

Once your changes are ready, don't forget to self-review to speed up the review process:zap:.

You should always review your own PR first.

For content changes, make sure that you:

- [ ] Confirm that the changes meet the user experience and goals outlined in the content design plan (if there is one).
- [ ] Compare your pull request's source changes to staging to confirm that the output matches the source and that everything is rendering as expected. This helps spot issues like typos, content that doesn't follow the style guide, or content that isn't rendering due to versioning problems. Remember that lists and tables can be tricky.
- [ ] Review the content for technical accuracy.
- [ ] Copy-edit the changes for grammar, spelling.
- [ ] Check new or updated versioning statements to confirm that versioning is correct.
- [ ] If there are any failing checks in your PR, troubleshoot them until they're all passing.

#### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line
* Consider starting the commit message with an applicable emoji:
    * :art: `:art:` when improving the format/structure of the code
    * :racehorse: `:racehorse:` when improving performance
    * :tr: `:(flag of the language):` when adding or changing translations
    * :memo: `:memo:` when writing docs
    * :penguin: `:penguin:` when fixing something on Linux
    * :apple: `:apple:` when fixing something on macOS
    * :checkered_flag: `:checkered_flag:` when fixing something on Windows
    * :bug: `:bug:` when fixing a bug
    * :fire: `:fire:` when removing code or files
    * :lock: `:lock:` when dealing with security
    * :arrow_up: `:arrow_up:` when upgrading dependencies
    * :arrow_down: `:arrow_down:` when downgrading dependencies

### Pull Request

When you're finished with the changes, create a pull request, also known as a PR.
- Fill the "Ready for review" template so that we can review your PR. This template helps reviewers understand your changes as well as the purpose of your pull request. 
- Don't forget to [link PR to issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue) if you are solving one.
- Enable the checkbox to [allow maintainer edits](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/allowing-changes-to-a-pull-request-branch-created-from-a-fork) so the branch can be updated for a merge.
Once you submit your PR, a Docs team member will review your proposal. We may ask questions or request for additional information.
- We may ask for changes to be made before a PR can be merged, either using [suggested changes](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/incorporating-feedback-in-your-pull-request) or pull request comments. You can apply suggested changes directly through the UI. You can make any other changes in your fork, then commit them to your branch.
- As you update your PR and apply changes, mark each conversation as [resolved](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/commenting-on-a-pull-request#resolving-conversations).
- If you run into any merge issues, checkout this [git tutorial](https://lab.github.com/githubtraining/managing-merge-conflicts) to help you resolve merge conflicts and other issues.

### Your PR is merged!

Congratulations :tada::tada: Thanks for your contribution! :sparkles:. 

Once your PR is merged, your contributions will be publicly visible on the [Kerbal Telemetry](https://github.com/yagiziskirik/Kerbal-Telemetry) page. 

Now that you are part of the Kerbal Telemetry community, welcome to the team :cocktail:.
