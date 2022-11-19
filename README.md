# ToDo list interview project

Thanks for taking the time to interview! We really appreciate it, and we hope to see the best of your work.

## Rules

Please do this interview project on your own, without the help of anyone else.
With that being said, you are more than welcome to use the internet.
Google and Stack Overflow are invaluable tools in our daily lives, and we wouldn't expect you to do your best work without them.

We'd really like to see every part of your development process, so please _record your screen while you work_.

In addition to writing the code required by the instructions, write down your answers to the questions in the instructions directly in this README file.

## Getting started

Make a fork of this repo on your own GitHub account and then clone it down to your personal computer.

You should be able to spin this app up using `yarn install` and `yarn start` (or `npm` if you prefer).
If you have trouble, please don't hesistate to reach out.

## Important Project contents

There are a few files that are important for this app:

### App.tsx

The main logic of the "frontend" of this app is in App.tsx. You should start your work there.

### ApiClient.ts

An API client that interacts with a fake database. Read the file over, but you should not need to edit it until the bonus section

## Instructions

1. The page doesn't change when you click the "Add ToDo" button. Why not?
   Fix this bug and describe the tradeoffs in your implementation. Would your solution work if a user had lots of (1,000,000+) todos?
   It's perfectly fine if the answer is no, but please discuss what would go wrong when the number of ToDos increases significantly
2. "Mark Done" doesn't appear to work at all. Why not?
   Fix this bug and make sure the page updates once the ToDo has been marked as "done".
   How could the API have been better designed to make the bug more noticable?
3. The ApiClient takes an argument `mockDelay`. Set that to `true` on line 5 of `App.tsx`.
   Add some visual indication to the UI during the initial "loading" time and any time the page is waiting for the server to respond.
   The style design doesn't need to look good, but it should indicate what the user can and cannot do.
4. Make the todo items re-orderable using drag-and-drop. You are more than welcome to use a 3rd party library for this, or you can roll vanilla.
   If you chose to use a library, why did you pick that library? If you chose to write the logic yourself, why did you choose to do that?

## Tips

- The project needs some organization. Feel free to create as many files and/or components as you need.
- Git is your friend. Commit often and use descriptive commit messages. Push your work to GitHub so you don't lose it.
- Get it working and then make it look good. Don't get lost in the perfect solution before you have a working solution.
- Include more comments than you would in normal code. This will help us understand your thought process.
- Take breaks when you need them.

## Responses

Please write your responses to the questions in the instructions here. Please indicate any tradeoffs you made.

1. Initially, the addTodo button made a direct call to the apiClient add todo method, which did sucessfully post the todo to the mock "database".  However the front end remained in the same state and didn't reflect the todo being added.  My initial solution was to write a new addTodo method that used the returned todo from the apiClient.addTodo method, and folded it into an updated component state.  

This worked at a basic level, but every addTodo made the whole list/every other todo perform a full rerender, which can cause some significant lag if the user has a large number of todos and they all need to rerender at once.  One way to fix this might be to break the list into components, and use React.memo / Pure components / useContext to memoize some of the todo state and only rerender the changed todos while memoizing/caching the rest of the unchanged todo list.  I might look at this next. 


2. The "Mark Done" button made a call to the apiClient.toggleDone function, which was set up to accept the todo id; however it was actually being erroneously passed the todo label instead of the id.  When it searched the currentTodos for the todoToUpdate by id, it would never find the appropriate todo since the "id" was actually the label text.  This error coudld have been caught more easily if the toggleDone took the whole todo as an argument instead of just the label/id; or it could have been made easier to catch if the Todo type included unique types for label and id (instead of "string"/"string"), which would make it throw an error when passed the wrong argument.


3.
4.

## Submitting

To submit your code, send us a link to your repo.
Once we confirm that we've downloaded your work, please delete the repo you created so future candidates don't accidentally find your solution.

To submit your screen recording, please reach out to schedule a time we can use https://webwormhole.io/ to transfer the large file.
