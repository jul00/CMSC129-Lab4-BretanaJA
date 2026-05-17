# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: taskManager.spec.js >> Task Manager End-to-End Application User Stories >> User Story 2: Can mark a task as completed
- Location: tests\system\taskManager.spec.js:23:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('.task-checkbox').first()
Expected: visible
Timeout: 2000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 2000ms
  - waiting for locator('.task-checkbox').first()

```

```yaml
- text: Cannot GET /
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | 
  3  | test.describe('Task Manager End-to-End Application User Stories', () => {
  4  | 
  5  |   test.beforeEach(async ({ page }) => {
  6  |     await page.goto('http://localhost:3000'); 
  7  |   });
  8  | 
  9  |   test('User Story 1: Can create a task and see it displayed', async ({ page }) => {
  10 |     const taskInput = page.locator('#task-input');
  11 |     const submitButton = page.locator('#submit-task');
  12 |     
  13 |     // FORCE FAILURE: Verify the input exists before typing
  14 |     await expect(taskInput).toBeVisible({ timeout: 2000 });
  15 |     
  16 |     await taskInput.fill('Buy bread');
  17 |     await submitButton.click();
  18 |     
  19 |     const taskList = page.locator('#task-list');
  20 |     await expect(taskList).toContainText('Buy bread');
  21 |   });
  22 | 
  23 |   test('User Story 2: Can mark a task as completed', async ({ page }) => {
  24 |     const taskCheckbox = page.locator('.task-checkbox').first();
  25 |     
  26 |     // FORCE FAILURE: Verify checkbox exists
> 27 |     await expect(taskCheckbox).toBeVisible({ timeout: 2000 });
     |                                ^ Error: expect(locator).toBeVisible() failed
  28 |     
  29 |     await taskCheckbox.check();
  30 |     const taskItem = page.locator('.task-item').first();
  31 |     await expect(taskItem).toHaveClass(/completed/);
  32 |   });
  33 | 
  34 |   test('User Story 3: Can delete a task from the list', async ({ page }) => {
  35 |     const deleteButton = page.locator('.delete-btn').first();
  36 |     
  37 |     // FORCE FAILURE: Verify delete button exists
  38 |     await expect(deleteButton).toBeVisible({ timeout: 2000 });
  39 |     
  40 |     await deleteButton.click();
  41 |     const taskList = page.locator('#task-list');
  42 |     await expect(taskList).not.toContainText('Buy bread');
  43 |   });
  44 | });
```