# Sprint 3: Directives, Pipes & Forms

**Date: 2026-06-18**

## Library Layout Create & Playlist Creation 

### What was done:

- Updated the Library component layout to display the `Playlists` and `Recently Played` sections stacked vertically on one screen.
- Added a `Create Playlist` card as the very first item inside the playlists grid.
- Integrated the form dialog using Taiga UI modules (TuiDialog / player-dialog) to show the creation form inside a modal.
- Extracted `dialog` to shared component.
- Created `PlaylistCreate` form component with a required name field and an optional description field.
- Implemented the form validation to display an error message if the name field is touched and left empty.
- Integrated the form with `PlaylistApiService` to fetch the current user's `uid` and successfully save the new playlist document to the Firebase database.
- Configured success actions: after a playlist is created, the form resets its values, closes the dialog, and programmatically redirects the user to the new playlist view.
- Refactored routing guards by creating a single reusable factory guard `createAuthGuard` to manage both `auth` and `guest` pages
- Configured the application routing by transitioning from nested child routes to a clean, dedicated playlist route `/playlists/:id` to simplify page states.
- Carefully refactored codebase where necessary according to review feeds from my teammate and mentor.
- Left comprehensive explanations on GitHub for my teammate in places where their suggested optimization fixes didn't fit our database.

---

### Problems:
- **Heavy Library Borders:** Taiga UI dialog wrapper brought default borders that clashed with the dark theme layout. It required deep custom SCSS rules to make the form look flat and clean.
- **Guard Code Duplication:** Writing separate files for `authGuard` and `guestGuard` required copying the exact same complex `RxJS` code with `toObservable` in multiple places.
- **Complex Route Tracking:** Using nested child routes required writing heavy logic to track router navigation events and toggle visibility states on the screen.
- **Signal Forms Limitations:** It seems the new forms package doesn't automatically apply standard status classes like `.ng-invalid` to HTML inputs yet.

---

### Solution:
- Overrode the heavy library borders by writing targeted SCSS rules inside playlist-create.scss, achieving a modern dark-mode appearance.
- Eliminated the route tracking logic completely by refactoring the layout into a separate, dedicated playlist route, letting the Angular router handle component swapping automatically.
- Eliminated guard code duplication by designing the createAuthGuard factory using JavaScript closures. This allows guards to retain their target states independently while reusing one single core logic block.
- Manually bound the native [class.ng-invalid] state to the input template using field signals so that SCSS rules could target it correctly.

---

## What I learned:
- How to use the new Signal Forms API in Angular 22.
- How to handle form submission states, resets, and programmatic router navigation after a successful API call.
- How to properly discuss code review feedback on GitHub and defend architectural choices with technical arguments.

---

### Current Plans:
- Investigate and fix form style caching when the modal is closed via the close button.
- Load all playlists for the loged-in user and display them on the page.
- Build Playlist Detail Component.
- Add Inline Track Search inside Playlist.
- Implement Delete Playlist Feature.

---

## Time spent:
Approximately 32 hours
