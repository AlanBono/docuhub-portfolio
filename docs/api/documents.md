---
sidebar_position: 2
---

# Documents API

The Documents API allows you to create, retrieve, update, and delete documentation programmatically.

## Endpoints

### List Documents

Retrieve a paginated list of all documents.
```http
GET /v1/docs
```

#### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | integer | Page number (default: 1) |
| `per_page` | integer | Items per page (default: 20, max: 100) |
| `status` | string | Filter by status: `draft`, `published` |
| `category` | string | Filter by category |
| `search` | string | Search in title and content |
| `sort` | string | Sort field and direction (e.g., `created_at:desc`) |

#### Example Request
```bash
curl -X GET "https://api.docuhub.dev/v1/docs?status=published&per_page=10" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

#### Example Response
```json
{
  "status": "success",
  "data": [
    {
      "id": "doc_123abc",
      "title": "Getting Started Guide",
      "slug": "getting-started",
      "status": "published",
      "category": "guides",
      "created_at": "2024-11-01T10:00:00Z",
      "updated_at": "2024-11-10T15:30:00Z",
      "author": {
        "id": "user_456",
        "name": "John Doe"
      }
    },
    {
      "id": "doc_789xyz",
      "title": "API Reference",
      "slug": "api-reference",
      "status": "published",
      "category": "api",
      "created_at": "2024-11-05T12:00:00Z",
      "updated_at": "2024-11-11T09:15:00Z",
      "author": {
        "id": "user_456",
        "name": "John Doe"
      }
    }
  ],
  "pagination": {
    "current_page": 1,
    "per_page": 10,
    "total_pages": 5,
    "total_items": 42
  }
}
```

---

### Get Document

Retrieve a specific document by ID or slug.
```http
GET /v1/docs/{id}
```

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Document ID or slug |

#### Example Request
```bash
curl -X GET "https://api.docuhub.dev/v1/docs/doc_123abc" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

#### Example Response
```json
{
  "status": "success",
  "data": {
    "id": "doc_123abc",
    "title": "Getting Started Guide",
    "slug": "getting-started",
    "content": "# Getting Started\n\nWelcome to DocuHub...",
    "excerpt": "Learn how to get started with DocuHub",
    "status": "published",
    "category": "guides",
    "tags": ["tutorial", "beginner", "setup"],
    "metadata": {
      "read_time": 5,
      "views": 1250
    },
    "created_at": "2024-11-01T10:00:00Z",
    "updated_at": "2024-11-10T15:30:00Z",
    "published_at": "2024-11-01T14:00:00Z",
    "author": {
      "id": "user_456",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

---

### Create Document

Create a new document.
```http
POST /v1/docs
```

#### Request Body
```json
{
  "title": "New Documentation Page",
  "slug": "new-doc-page",
  "content": "# New Page\n\nThis is the content...",
  "excerpt": "A brief description",
  "status": "draft",
  "category": "guides",
  "tags": ["new", "guide"]
}
```

#### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Document title |
| `slug` | string | No | URL-friendly identifier (auto-generated if not provided) |
| `content` | string | Yes | Document content in Markdown |
| `excerpt` | string | No | Short description |
| `status` | string | No | `draft` or `published` (default: `draft`) |
| `category` | string | No | Document category |
| `tags` | array | No | Array of tags |

#### Example Request
```javascript
const response = await fetch('https://api.docuhub.dev/v1/docs', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'Advanced Configuration',
    content: '# Advanced Configuration\n\nLearn about...',
    status: 'published',
    category: 'guides',
    tags: ['advanced', 'configuration']
  })
});

const data = await response.json();
```

#### Example Response
```json
{
  "status": "success",
  "data": {
    "id": "doc_new123",
    "title": "Advanced Configuration",
    "slug": "advanced-configuration",
    "content": "# Advanced Configuration\n\nLearn about...",
    "status": "published",
    "category": "guides",
    "tags": ["advanced", "configuration"],
    "created_at": "2024-11-11T16:00:00Z",
    "updated_at": "2024-11-11T16:00:00Z",
    "author": {
      "id": "user_456",
      "name": "John Doe"
    }
  }
}
```

---

### Update Document

Update an existing document.
```http
PUT /v1/docs/{id}
```

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Document ID |

#### Request Body

Include only the fields you want to update:
```json
{
  "title": "Updated Title",
  "content": "# Updated Content\n\nNew content here...",
  "status": "published"
}
```

#### Example Request
```bash
curl -X PUT "https://api.docuhub.dev/v1/docs/doc_123abc" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Getting Started Guide (Updated)",
    "status": "published"
  }'
```

#### Example Response
```json
{
  "status": "success",
  "data": {
    "id": "doc_123abc",
    "title": "Getting Started Guide (Updated)",
    "slug": "getting-started",
    "status": "published",
    "updated_at": "2024-11-11T16:15:00Z"
  }
}
```

---

### Delete Document

Delete a document permanently.
```http
DELETE /v1/docs/{id}
```

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Document ID |

#### Example Request
```bash
curl -X DELETE "https://api.docuhub.dev/v1/docs/doc_123abc" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

#### Example Response
```json
{
  "status": "success",
  "message": "Document deleted successfully",
  "data": {
    "id": "doc_123abc",
    "deleted_at": "2024-11-11T16:20:00Z"
  }
}
```

:::warning Permanent Deletion
Deleted documents cannot be recovered. Consider archiving instead by setting `status` to `archived`.
:::

---

### Bulk Operations

#### Bulk Create

Create multiple documents at once.
```http
POST /v1/docs/bulk
```

#### Request Body
```json
{
  "documents": [
    {
      "title": "Document 1",
      "content": "Content 1..."
    },
    {
      "title": "Document 2",
      "content": "Content 2..."
    }
  ]
}
```

#### Bulk Update

Update multiple documents at once.
```http
PUT /v1/docs/bulk
```

#### Bulk Delete

Delete multiple documents at once.
```http
DELETE /v1/docs/bulk
```
```json
{
  "ids": ["doc_123", "doc_456", "doc_789"]
}
```

---

## Document Versions

### List Versions

Get all versions of a document.
```http
GET /v1/docs/{id}/versions
```

#### Example Response
```json
{
  "status": "success",
  "data": [
    {
      "version": 3,
      "created_at": "2024-11-11T16:00:00Z",
      "author": "John Doe",
      "changes": "Updated API examples"
    },
    {
      "version": 2,
      "created_at": "2024-11-10T14:00:00Z",
      "author": "Jane Smith",
      "changes": "Fixed typos"
    }
  ]
}
```

### Restore Version

Restore a previous version of a document.
```http
POST /v1/docs/{id}/versions/{version}/restore
```

---

## Error Handling

### Common Errors

#### 400 Bad Request
```json
{
  "status": "error",
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request data",
    "details": {
      "title": "Title is required",
      "content": "Content must be at least 10 characters"
    }
  }
}
```

#### 404 Not Found
```json
{
  "status": "error",
  "error": {
    "code": "DOCUMENT_NOT_FOUND",
    "message": "Document with ID 'doc_123' not found"
  }
}
```

#### 409 Conflict
```json
{
  "status": "error",
  "error": {
    "code": "SLUG_ALREADY_EXISTS",
    "message": "A document with slug 'getting-started' already exists"
  }
}
```

---

## Best Practices

### 1. Use Idempotency Keys

For create and update operations, use idempotency keys to prevent duplicate requests:
```bash
curl -X POST "https://api.docuhub.dev/v1/docs" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Idempotency-Key: unique_key_123" \
  -d '{"title": "New Doc"}'
```

### 2. Validate Content

Always validate Markdown content before submitting:
```javascript
function validateMarkdown(content) {
  if (content.length < 10) {
    throw new Error('Content too short');
  }
  // Add more validation...
  return true;
}
```

### 3. Handle Rate Limits

Implement exponential backoff when hitting rate limits:
```javascript
async function fetchWithRetry(url, options, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    const response = await fetch(url, options);
    
    if (response.status === 429) {
      const retryAfter = response.headers.get('X-RateLimit-Reset');
      await sleep(retryAfter * 1000);
      continue;
    }
    
    return response;
  }
}
```

### 4. Use Pagination

Always paginate large result sets:
```javascript
async function getAllDocs() {
  let page = 1;
  let allDocs = [];
  
  while (true) {
    const response = await fetch(
      `https://api.docuhub.dev/v1/docs?page=${page}&per_page=100`
    );
    const data = await response.json();
    
    allDocs = [...allDocs, ...data.data];
    
    if (page >= data.pagination.total_pages) break;
    page++;
  }
  
  return allDocs;
}
```

---

## Next Steps

- [Search API →](./search)
- [Users API →](./users)
- [Code Examples →](./examples)