# Sprint 2: Routing & Signals — 2025-03-10

- **What was done:** Set up routing with lazy loading. Created AuthService and AuthGuard. Migrated component state to signal().
- **Problems:** Did not understand how to connect signal() with OnPush. Spent 2 hours understanding the difference between computed() and effect().
- **Solutions:** Read the signals documentation. Drew a diagram of the component's reactive state.
- **What I learned:** signal() automatically triggers Change Detection in OnPush. computed() is for derived values, effect() is for side effects.
- **Plans:** In Sprint 3, build a form with validation and a custom directive.
- **Time spent:** 4 hours
