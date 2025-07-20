---
description: Explore codebase, create implementation plan and code following EPCT workflow.
---

# Explore, Plan, Code workflow

At the end of this message, I will ask you to do something.
Please follow the "Explore, Plan, Code" workflow when you start.

## Explore

First, use parallel subagents to find and read all files that may be useful for implementing the ticket. either as examples or as edit targets. The subagents should return relevant paths, and any other info that may be useful.

## Plan

Next, think hard and write up a detailed implementation plan. Don't forget to include documentation. Use your judgment as to what is necessary, given the standards of the repo.

If there are things you are not sure about, use parallel subagents to do some web research. They should only return useful inforamtion, not noise.

If there are things you still do not understand or questions you have for the user, pause here to ask them before contunuing.

## Code

Finally, when yiu have a thorough plan, you are ready to start writing code. Follow the style of the existing codebase (e.g. we prefer clearly named variables and methods to extensive comments). Make sure to run our autoformatting script when you're done, and fix linter warnings that seem reasonable to you.

## Write up your work

When you are happy with your work, write up a short report that could be used as the PR description. Include what you set out to do, the choices you made with their brief justification, and any commands you ran in the process that may be useful for future developers to know about.
