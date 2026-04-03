const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJNYXJ5QGdtYWlsLmNvbSIsImlhdCI6MTc3NDkyNjY0OCwiZXhwIjoxNzc1MDEzMDQ4fQ.RnOllEL0qFRwa3k6GRatMt7nfZWYlTXlmQBamR5pFfkeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJNYXJ5QGdtYWlsLmNvbSIsImlhdCI6MTc3NDkyNjY0OCwiZXhwIjoxNzc1MDEzMDQ4fQ.RnOllEL0qFRwa3k6GRatMt7nfZWYlTXlmQBamR5pFfk';

// get payload (middle part)
const payload = token.split('.')[1];

// decode base64
const decoded = JSON.parse(atob(payload));

console.log(decoded);
console.log("ID:", decoded.id);
console.log("Email:", decoded.email);