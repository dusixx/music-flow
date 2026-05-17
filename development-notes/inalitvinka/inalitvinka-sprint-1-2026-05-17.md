# Sprint 1: Project Setup & Component Basics — 2026-05-17

## What was done:
The first sprint I worked on the about page implementation and project setup tasks.

### Project management tasks
I created project board with Backlog, To Do, In Progress, Done columns and initialized a few tasks for the team.

### Documentation
I filled in the README file, where I added a project description, team members github links, listed a tech stack of the project, setup instructions, and available project scripts.

### Angular tasks
- Created `About` page component.
- Added `TeamMemberCard` component to display information about each team member.
- Created mock data for team members and favorite tracks.
- Split data into separate files: `about.models.ts` and `about.data.ts`.
- Implemented rendering of cards using `@for` and `@if`.
- Used `input.required()` for passing data to `TeamMemberCard` component.
- Added RS School logo block to the bottom of the About page.
- Added and then removed assets configuration in `angular.json` after discussing with the team, since Angular 17+ recommends using the `public/build` directory for assets.

## Components
### `About` Component

**Angular concepts I used here:**
- standalone components architecture
- `@Component` decorator
- `OnPush` change detection
- template structure
- imports array in `@Component` decorator

**Problems:**
  At first I tried to use routing, but routing is planned for Sprint 2. I needed a temporary way to render the About page without router configuration. Later project structure changed because `MainLayout` was added.

**Solution:**
  I temporarily rendered `<player-about />` directly inside layout instead of `router-outlet`.

**What I learned:**
  - Gained an understanding of the difference between direct component rendering and routing.

  - During a code review of a teammate’s PR, I came across the `ngAfterViewChecked` lifecycle hook. I investigated it and found out that it runs after every change detection cycle in Angular. This may lead to unnecessary DOM reads and updates if not handled carefully. I also found out that using `innerText` can trigger layout recalculation, which may affect performance.

### `TeamMemberCard` Component

**Angular concepts I used here:**
- child components
- `input.required()` and data flow between parent and child components
- property binding
- interpolation
- control flow (`@for`, `@if`)

**Problems:**
  I didn't understand the syntax of `input.required<string>()` - what does it mean `required` here.
  I was a bit confused about `{{ }}` and `[href]` - why some attributes use brackets and others don't use them.
  I initially stored favorite tracks as string arrays, then realized this is not scalable.

**Solution:**
Refactored tracks into objects. This made rendering more reliable.
This helped me understand following concepts:
- that `input.required()` means the input is mandatory and must be provided by parent component.
- that `{{ }}` is interpolation for text rendering, while `[property]` is property binding for dynamic values like attributes.
- that `[href]` is needed because `href` is a DOM property binding, not a static string attribute. This is important because Angular bindings are designed to work with dynamic data.

**What I learned:**
- Understood difference between interpolation and property binding.
- How unique tracking keys works in `@for` and why it is important.
- How to structure data for scalable rendering.

**Refactor: replace multiple inputs with a single member object input**
Initially, in my first implementation the `TeamMemberCard` component received multiple separate inputs: name, role, bio, photo, github. Data was split into multiple fields, and the logic was split between parent and child components. I realized this approach made the component harder to maintain and scale. I refactored it to accept a single `member` object as input. This simplified the API of the component, improved readability, and reduced duplication. This change also made the data flow more consistent because there is a single source of truth - one object that is passed as a whole.

**Before:**

  ```ts
    export class TeamMemberCard {
      name = input.required<string>();
      role = input.required<string>();
      bio = input.required<string>();
      photo = input.required<string>();
      github = input.required<string>();
      favtracks = input.required<FavTrack[]>();
    }
  ```

**After:**

  ```ts
    export class TeamMemberCard {
      member = input.required<TeamMember>();
    }
  ```

## Plans for next sprint
- Learn Angular routing.
- Replace temporary About rendering with real routes.
- Start implementing navigation.

## Time spent:
Approximately 15 hours
