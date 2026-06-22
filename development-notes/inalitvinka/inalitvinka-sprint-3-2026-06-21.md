# Sprint 3: Directives, Pipes & Forms

**Date: 2026-06-21**

## Playlist Layout, Universal Form & Component Clean up

### What was done:

- Added `resetForm()` method inside the playlist creation form using spread operator to avoid object mutation
- Integrated `viewChild` to get a direct reference to the form from `Library` component to ensure that every time modal opens, the form data is completely cleared
- Built a custom, universal `TrackRow` component to show track details in a flexible row layou
- Created a separate `PlaylistTracksHeader` component for the track table header to match the Spotify look and keep the code clean
- Made `DurationPipe` to format the total time of the playlist into a friendly text style like `23 min 34 sec`
- Refactored `PlaylistCreate` component into a universal `PlaylistForm` component and moved it to `shared/`so it can handle both creating and editing
- Used a computed signal to show the current user's name from `AuthService` in the playlist details header
- Added a 3-dots menu component `PlaylistMenu` using Taiga UI v5
- Fixed the styling issues with the Taiga UI dropdown menu to match the project's dark theme colors
- Implemented Delete Playlist feature using already existing `PlaylistApiService.deletePlaylist()` and added `player-dialog` modal to confirm the action before deleting
- Set up page redirection to the main `/library` screen after a playlist is successfully deleted
- Implemented Remove Track action with validation to ensure that a playlist always keeps at least one song

---

### Problems:
- **Data Mutation Bug => Object Reference Sharing:** Passing `playlistInitModel` object directly into the signal created a shared link in memory. Because of this link, whenever user typed any text into the form input fields, it accidentally changed the original default constant itself
- **UI Stale States => Resource Reloading:** After deleting a track or saving an updated playlist name in database, the screen didn't re-render automatically. The UI became stale because inner resources were holding old data cached in the Angular memory
- **Messy HTML Code:** Putting playlist header, track table, and two different modal dialogs into a single HTML file made the template too large and very hard to read
- **Severe Dropdown Border Overrides:** Taiga UI dropdown forced stiff borders through inner `:where()` selectors. Even disabling view encapsulation and targeting data-appearance attributes didn't fully remove border lines
- **Component Access Control:** Restricting service injections to private prevented HTML template from reading the current user details directly


---

### Solution:
- Fixed data sharing bug by using spread operator `{ ...playlistInitModel }` to create a copy of the object every time the form resets
- Fixing Stale UI with Resource API => Resolved the frozen screen states by `.reload()` method on `playlistResource`. Since the `tracksResource` reactively monitors the list of IDs from the first resource, triggering a reload on the parent automatically forces a chain-reaction update of the track views on the screen
- Fixed ONLY the background color of the dropdown box and applied custom hover animations to the buttons inside the list by targeting `tui-data-list.playlist-menu-list` and `button[tuiOption]`. However, borders remained unchanged, that leaves this as a room for future investigation to understand the root of the problem
- Cleared out template mess by moving playlist header layout and table header into their own components
- Resolved issue of old input data sticking inside the modal form by applying `viewChild<PlaylistForm>('playlistFormRef')`. This allows `Library` component to call the public `resetForm()` method exactly at the moment a user clicks the `Create Playlist` card
- Solved the service visibility problem by creating a local `computed` signal that reads data from the private service and safely shares it with the template

---

## What I learned:
- How to use `viewChild` on practice to access public methods of nested components and reset form states from a parent view
- How to write dependent reactive chains using `resource` and `rxResource` APIs in Angular 22
- How to pass data into slots using `<ng-content>` selectors to build reusable row component
- How to handle global component overlays and styling overrides in Taiga UI
- How to safely remove documents from Firestore and manage programmatic routing fallback states
- That the default borders of Taiga UI are deeply nested within style sheets. This requires extra investigation and more room to grow to understand exactly how to strip core library rules

---

### Current Plans:
- Continue working on playlist management:
  - design and integrate inline track search with a debounce delay to add new songs to a playlist
  - add drag-and-drop functionality for track reordering
- Set up the recently played history saving feature
- Learn and use HttpClient instead of `resource` as required by the course plan
- Connect real Jamendo API network requests to replace the temporary mock track arrays
- Investigate the root of Taiga UI dropdown border problem to find a clean way to remove the border


---

## Time spent:
Approximately 29 hours
