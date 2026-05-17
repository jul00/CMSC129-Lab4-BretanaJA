function validateTask(title) {
  if (!title || title.trim() === "") {
    throw new Error("Title cannot be empty");
  }
  if (title.length > 50) {
    throw new Error("Title cannot exceed 50 characters");
  }
  return true;
}

module.exports = { validateTask };