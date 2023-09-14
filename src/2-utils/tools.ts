
// creator date in the "YYYY-MM-DD" format:
function creatorDateNew(): string {
    // The method .toISOString() converts the date to a string using the ISO format (e.g., "2023-04-15T16:00:00.000Z")
    // The method extracts the first 10 characters from the string.
    return new Date().toISOString().slice(0, 10)
}

export default {
    creatorDateNew
}