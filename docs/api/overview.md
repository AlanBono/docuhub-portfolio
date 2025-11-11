---
sidebar_position: 1
---

# API Overview

Welcome to the DocuHub API documentation. Our RESTful API provides programmatic access to all DocuHub features.

## Base URL

All API requests should be made to:
```
https://api.docuhub.dev/v1
```

## Authentication

DocuHub uses API keys to authenticate requests. Include your API key in the `Authorization` header:
```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://api.docuhub.dev/v1/docs
```

### Getting Your API Key

1. Log in to your DocuHub dashboard
2. Navigate to **Settings** → **API Keys**
3. Click **Generate New Key**
4. Copy and securely store your key

:::warning Security
Never share your API key publicly or commit it to version control. Treat it like a password.
:::

## Request Format

### Headers

All requests should include these headers:

| Header | Value | Required |
|--------|-------|----------|
| `Authorization` | `Bearer YOUR_API_KEY` | Yes |
| `Content-Type` | `application/json` | Yes (for POST/PUT) |
| `Accept` | `application/json` | No |

### Example Request
```javascript
const response = await fetch('https://api.docuhub.dev/v1/docs', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);
```

## Response Format

All API responses are returned in JSON format.

### Success Response
```json
{
  "status": "success",
  "data": {
    "id": "doc_123",
    "title": "Getting Started",
    "content": "# Getting Started\n\nWelcome to..."
  },
  "meta": {
    "timestamp": "2024-11-11T14:30:00Z",
    "version": "1.0"
  }
}
```

### Error Response
```json
{
  "status": "error",
  "error": {
    "code": "INVALID_API_KEY",
    "message": "The provided API key is invalid",
    "details": "Please check your API key and try again"
  }
}
```

## HTTP Status Codes

| Status Code | Description |
|-------------|-------------|
| `200` | Success - Request completed successfully |
| `201` | Created - Resource created successfully |
| `400` | Bad Request - Invalid request parameters |
| `401` | Unauthorized - Invalid or missing API key |
| `403` | Forbidden - Insufficient permissions |
| `404` | Not Found - Resource doesn't exist |
| `429` | Too Many Requests - Rate limit exceeded |
| `500` | Internal Server Error - Something went wrong |

## Rate Limiting

API requests are rate-limited to ensure fair usage:

- **Free tier**: 100 requests per hour
- **Pro tier**: 1,000 requests per hour
- **Enterprise**: 10,000 requests per hour

Rate limit information is included in response headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1699718400
```

### Handling Rate Limits

When you exceed the rate limit, you'll receive a `429` status code:
```json
{
  "status": "error",
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "You have exceeded your rate limit",
    "retry_after": 3600
  }
}
```

Wait for the time specified in `retry_after` (seconds) before making another request.

## Pagination

List endpoints support pagination using these parameters:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `per_page` | integer | 20 | Items per page (max 100) |

### Example
```bash
GET /v1/docs?page=2&per_page=50
```

### Pagination Response
```json
{
  "status": "success",
  "data": [...],
  "pagination": {
    "current_page": 2,
    "per_page": 50,
    "total_pages": 10,
    "total_items": 485
  }
}
```

## Filtering and Sorting

### Filtering

Use query parameters to filter results:
```bash
GET /v1/docs?status=published&category=guides
```

### Sorting

Sort results using the `sort` parameter:
```bash
GET /v1/docs?sort=created_at:desc
```

Sort directions:
- `asc` - Ascending order
- `desc` - Descending order

## Webhooks

DocuHub can send webhooks to notify your application of events:
```json
{
  "event": "doc.created",
  "timestamp": "2024-11-11T14:30:00Z",
  "data": {
    "id": "doc_123",
    "title": "New Document"
  }
}
```

Available events:
- `doc.created`
- `doc.updated`
- `doc.deleted`
- `doc.published`

## SDKs and Libraries

Official SDKs are available for popular languages:

- **JavaScript/Node.js**: `npm install @docuhub/sdk`
- **Python**: `pip install docuhub-sdk`
- **Ruby**: `gem install docuhub`
- **PHP**: `composer require docuhub/sdk`

### JavaScript Example
```javascript
import DocuHub from '@docuhub/sdk';

const client = new DocuHub({
  apiKey: 'YOUR_API_KEY'
});

const docs = await client.docs.list();
console.log(docs);
```

## API Endpoints

Explore our complete API reference:

- [Documents API](./documents) - Create and manage documents
- [Search API](./search) - Search your documentation
- [Users API](./users) - Manage users and permissions
- [Analytics API](./analytics) - Access usage analytics

## Support

Need help with the API?

- 📚 [API Examples](./examples)
- 🐛 [Report API Issues](https://github.com/docuhub/api/issues)
- 💬 [API Community Forum](https://community.docuhub.dev)
- 📧 [Contact API Support](mailto:api@docuhub.dev)

---

**Ready to start building?** Check out our [API Examples](./examples) or dive into the [Documents API](./documents).