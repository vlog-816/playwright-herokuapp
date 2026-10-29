# TodoMVC React Functional Test Plan

## Application

- **URL:** https://todomvc.com/examples/react/dist/
- **Scope:** Functional behavior of creating, editing, completing, filtering, and removing todo items.
- **Out of scope:** Visual, performance, accessibility, compatibility, and other non-functional testing.

## Preconditions

- Open the application in a browser.
- Start each independent test with no existing todos, unless the test specifies its own setup.
- Use unique todo text per test to avoid confusion between items.

## Test cases

| ID | Priority | Scenario | Steps | Expected result |
|---|---|---|---|---|
| TODO-001 | High | Add a todo | Enter a non-empty title in the new-todo field and press Enter. | One todo with the entered title appears; the input is cleared; the remaining-item count is 1. |
| TODO-002 | Medium | Do not add an empty todo | Leave the new-todo field empty and press Enter. | No todo is created and the remaining-item count does not change. |
| TODO-003 | Medium | Do not add a whitespace-only todo | Enter only spaces in the new-todo field and press Enter. | No todo is created and the remaining-item count does not change. |
| TODO-004 | High | Add multiple todos | Add two distinct titles, pressing Enter after each. | Both todos appear in entry order; the remaining-item count is 2. |
| TODO-005 | High | Complete and reactivate one todo | Add two todos; mark one complete, then mark it active again. | The selected todo changes completion state each time; the other todo is unchanged; the remaining-item count decreases and increases accordingly. |
| TODO-006 | High | Complete all todos | Add multiple active todos and use the toggle-all control. | Every todo is marked complete and the remaining-item count is 0. |
| TODO-007 | High | Reactivate all todos | With all todos complete, use the toggle-all control again. | Every todo is marked active and the remaining-item count equals the number of todos. |
| TODO-008 | High | Filter active todos | Add active and completed todos, then select **Active**. | Only active todos are displayed; the other todos remain stored; the active filter is selected. |
| TODO-009 | High | Filter completed todos | Add active and completed todos, then select **Completed**. | Only completed todos are displayed; active todos remain stored; the completed filter is selected. |
| TODO-010 | High | Show all todos | With a filter applied, select **All**. | Active and completed todos are displayed together; the all-items filter is selected. |
| TODO-011 | High | Edit a todo and save | Double-click a todo title, replace its text, and press Enter. | The todo displays the updated title and retains its prior completion state; the remaining-item count is unchanged. |
| TODO-012 | Medium | Cancel editing | Double-click a todo title, change its text, and press Escape. | Editing is cancelled; the original title and completion state are restored. |
| TODO-013 | Medium | Remove a todo by clearing its title | Double-click a todo title, clear the edit field, and press Enter. | The todo is removed from the list and the remaining-item count is updated. |
| TODO-014 | High | Delete one todo | Add multiple todos; reveal the delete control for one todo and activate it. | Only the selected todo is removed; all other todos and their states are unchanged; the remaining-item count is updated. |
| TODO-015 | High | Clear completed todos | Add active and completed todos, then select **Clear completed**. | All completed todos are removed; active todos remain; the remaining-item count reflects the remaining active todos. |
| TODO-016 | Medium | Clear completed todos when none are completed | Add only active todos. | The **Clear completed** action is not available; active todos remain unchanged. |
| TODO-017 | Medium | Use a filter when no todos match | Add todos, complete or activate them as needed, and select the filter with no matching items. | No todo rows are displayed; existing todos remain available through the other filters. |
