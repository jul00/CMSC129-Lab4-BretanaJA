# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: taskManager.spec.js >> Task Manager End-to-End Application User Stories >> User Story 2: Can mark a task as completed
- Location: tests\system\taskManager.spec.js:24:5

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5173/
Call log:
  - navigating to "http://localhost:5173/", waiting until "load"

```

# Test source

```ts
  1  | 
  2  | const { test, expect } = require('@playwright/test');
  3  | 
  4  | test.describe('Task Manager End-to-End Application User Stories', () => {
  5  | 
  6  |     test.beforeEach(async ({ page }) => {
  7  |         // Open the local application frontend
> 8  |         await page.goto('http://localhost:5173'); 
     |                    ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5173/
  9  |     });
  10 | 
  11 |     test('User Story 1: Can create a task and see it displayed', async ({ page }) => {
  12 |         const taskInput = page.locator('#task-input');
  13 |         const submitButton = page.locator('#submit-task');
  14 |         const taskList = page.locator('#task-list');
  15 | 
  16 |         // Act
  17 |         await taskInput.fill('Buy bread');
  18 |         await submitButton.click();
  19 | 
  20 |         // Assert
  21 |         await expect(taskList).toContainText('Buy bread');
  22 |     });
  23 | 
  24 |     test('User Story 2: Can mark a task as completed', async ({ page }) => {
  25 |         const taskCheckbox = page.locator('.task-checkbox').first();
  26 |         const taskItem = page.locator('.task-item').first();
  27 | 
  28 |         // Act
  29 |         await taskCheckbox.check();
  30 | 
  31 |         // Assert completed visual indicator (e.g., line-through class or style)
  32 |         await expect(taskItem).toHaveClass(/completed/);
  33 |     });
  34 | 
  35 |     test('User Story 3: Can delete a task from the list', async ({ page }) => {
  36 |         const deleteButton = page.locator('.delete-btn').first();
  37 |         const taskList = page.locator('#task-list');
  38 | 
  39 |         // Act
  40 |         await deleteButton.click();
  41 | 
  42 |         // Assert the item is missing
  43 |         await expect(taskList).not.toContainText('Buy bread');
  44 |     });
  45 | });
```