
const { test, expect } = require('@playwright/test');

test.describe('Task Manager End-to-End Application User Stories', () => {

    test.beforeEach(async ({ page }) => {
        // Open the local application frontend
        await page.goto('http://localhost:3000'); 
    });

    test('User Story 1: Can create a task and see it displayed', async ({ page }) => {
        const taskInput = page.locator('#task-input');
        const submitButton = page.locator('#submit-task');
        const taskList = page.locator('#task-list');

        // Act
        await taskInput.fill('Buy bread');
        await submitButton.click();

        // Assert
        await expect(taskList).toContainText('Buy bread');
    });

    test('User Story 2: Can mark a task as completed', async ({ page }) => {
        const taskCheckbox = page.locator('.task-checkbox').first();
        const taskItem = page.locator('.task-item').first();

        // Act
        await taskCheckbox.check();

        // Assert completed visual indicator (e.g., line-through class or style)
        await expect(taskItem).toHaveClass(/completed/);
    });

    test('User Story 3: Can delete a task from the list', async ({ page }) => {
        const deleteButton = page.locator('.delete-btn').first();
        const taskList = page.locator('#task-list');

        // Act
        await deleteButton.click();

        // Assert the item is missing
        await expect(taskList).not.toContainText('Buy bread');
    });
});