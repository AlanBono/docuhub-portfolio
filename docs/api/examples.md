---
sidebar_position: 5
---

# Code Examples

Practical examples to help you integrate DocuHub API into your applications.

## JavaScript / Node.js

### Basic Setup
````javascript
// Install the SDK
// npm install @docuhub/sdk

import DocuHub from '@docuhub/sdk';

const client = new DocuHub({
  apiKey: process.env.DOCUHUB_API_KEY,
  environment: 'production'
});
````

### List All Documents
````javascript
async function listDocuments() {
  try {
    const response = await client.docs.list({
      status: 'published',
      per_page: 50,
      sort: 'updated_at:desc'
    });
    
    console.log(`Found ${response.pagination.total_items} documents`);
    
    response.data.forEach(doc => {
      console.log(`- ${doc.title} (${doc.category})`);
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw error;
  }
}

listDocuments();
````

### Create a New Document
````javascript
async function createDocument() {
  const newDoc = await client.docs.create({
    title: 'API Integration Guide',
    content: `
# API Integration Guide

Learn how to integrate DocuHub API into your application.

## Prerequisites

- Node.js 18+
- API Key
- Basic JavaScript knowledge

## Installation

\`\`\`bash
npm install @docuhub/sdk
\`\`\`

## Quick Start

Follow these steps to get started...
    `,
    status: 'published',
    category: 'guides',
    tags: ['api', 'integration', 'tutorial']
  });
  
  console.log('Document created:', newDoc.id);
  return newDoc;
}
````

### Update a Document
````javascript
async function updateDocument(docId) {
  const updated = await client.docs.update(docId, {
    title: 'Updated API Integration Guide',
    content: '# Updated Content\n\nNew information here...',
    tags: ['api', 'integration', 'tutorial', 'updated']
  });
  
  console.log('Document updated:', updated.updated_at);
  return updated;
}
````

### Search Documents
````javascript
async function searchDocuments(query) {
  const results = await client.search.query({
    q: query,
    filters: {
      category: 'guides',
      status: 'published'
    },
    limit: 10
  });
  
  console.log(`Found ${results.total} results for "${query}"`);
  
  results.data.forEach((doc, index) => {
    console.log(`${index + 1}. ${doc.title}`);
    console.log(`   Score: ${doc.score}`);
    console.log(`   Excerpt: ${doc.excerpt}\n`);
  });
  
  return results;
}

searchDocuments('getting started');
````

### Error Handling
````javascript
async function handleErrors() {
  try {
    const doc = await client.docs.get('invalid_id');
  } catch (error) {
    if (error.code === 'DOCUMENT_NOT_FOUND') {
      console.log('Document does not exist');
    } else if (error.code === 'RATE_LIMIT_EXCEEDED') {
      console.log('Rate limit exceeded, retrying in', error.retry_after, 'seconds');
      await sleep(error.retry_after * 1000);
      // Retry request...
    } else {
      console.error('Unexpected error:', error);
    }
  }
}
````

---

## Python

### Basic Setup
````python
# Install the SDK
# pip install docuhub-sdk

from docuhub import DocuHub

client = DocuHub(
    api_key=os.environ['DOCUHUB_API_KEY'],
    environment='production'
)
````

### List Documents
````python
def list_documents():
    try:
        response = client.docs.list(
            status='published',
            per_page=50,
            sort='updated_at:desc'
        )
        
        print(f"Found {response['pagination']['total_items']} documents")
        
        for doc in response['data']:
            print(f"- {doc['title']} ({doc['category']})")
        
        return response['data']
    
    except Exception as e:
        print(f"Error fetching documents: {e}")
        raise
````

### Create Document
````python
def create_document():
    new_doc = client.docs.create(
        title='Python Integration Guide',
        content='''
# Python Integration Guide

Learn how to use DocuHub with Python.

## Installation
```bash
pip install docuhub-sdk
```

## Usage
```python
from docuhub import DocuHub
client = DocuHub(api_key='your_key')
```
        ''',
        status='published',
        category='guides',
        tags=['python', 'integration', 'sdk']
    )
    
    print(f"Document created: {new_doc['id']}")
    return new_doc
````

### Batch Operations
````python
def batch_create_documents(documents):
    results = []
    
    for doc_data in documents:
        try:
            doc = client.docs.create(**doc_data)
            results.append({
                'success': True,
                'id': doc['id'],
                'title': doc['title']
            })
        except Exception as e:
            results.append({
                'success': False,
                'title': doc_data['title'],
                'error': str(e)
            })
    
    return results

# Usage
docs_to_create = [
    {
        'title': 'Guide 1',
        'content': 'Content 1...',
        'category': 'guides'
    },
    {
        'title': 'Guide 2',
        'content': 'Content 2...',
        'category': 'guides'
    }
]

results = batch_create_documents(docs_to_create)
````

### Pagination Helper
````python
def get_all_documents():
    all_docs = []
    page = 1
    
    while True:
        response = client.docs.list(
            page=page,
            per_page=100
        )
        
        all_docs.extend(response['data'])
        
        if page >= response['pagination']['total_pages']:
            break
        
        page += 1
    
    return all_docs

docs = get_all_documents()
print(f"Retrieved {len(docs)} documents total")
````

---

## cURL Examples

### List Documents
````bash
curl -X GET "https://api.docuhub.dev/v1/docs?status=published&per_page=20" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
````

### Get Single Document
````bash
curl -X GET "https://api.docuhub.dev/v1/docs/doc_123abc" \
  -H "Authorization: Bearer YOUR_API_KEY"
````

### Create Document
````bash
curl -X POST "https://api.docuhub.dev/v1/docs" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Documentation",
    "content": "# New Doc\n\nContent here...",
    "status": "published",
    "category": "guides"
  }'
````

### Update Document
````bash
curl -X PUT "https://api.docuhub.dev/v1/docs/doc_123abc" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "content": "# Updated Content\n\nNew content..."
  }'
````

### Delete Document
````bash
curl -X DELETE "https://api.docuhub.dev/v1/docs/doc_123abc" \
  -H "Authorization: Bearer YOUR_API_KEY"
````

### Search Documents
````bash
curl -X GET "https://api.docuhub.dev/v1/search?q=getting+started&category=guides" \
  -H "Authorization: Bearer YOUR_API_KEY"
````

---

## React Integration

### Custom Hook
````javascript
import { useState, useEffect } from 'react';
import DocuHub from '@docuhub/sdk';

const client = new DocuHub({
  apiKey: process.env.REACT_APP_DOCUHUB_API_KEY
});

export function useDocuHubDocs(category = null) {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function fetchDocs() {
      try {
        setLoading(true);
        const response = await client.docs.list({
          category,
          status: 'published',
          per_page: 100
        });
        setDocs(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchDocs();
  }, [category]);
  
  return { docs, loading, error };
}
````

### Component Usage
````javascript
import { useDocuHubDocs } from './hooks/useDocuHubDocs';

function DocumentList() {
  const { docs, loading, error } = useDocuHubDocs('guides');
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      <h2>Documentation Guides</h2>
      <ul>
        {docs.map(doc => (
          <li key={doc.id}>
            <a href={`/docs/${doc.slug}`}>
              {doc.title}
            </a>
            <p>{doc.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
````

### Search Component
````javascript
import { useState } from 'react';
import DocuHub from '@docuhub/sdk';

const client = new DocuHub({
  apiKey: process.env.REACT_APP_DOCUHUB_API_KEY
});

function SearchDocs() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  
  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!query.trim()) return;
    
    setSearching(true);
    try {
      const response = await client.search.query({
        q: query,
        limit: 10
      });
      setResults(response.data);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setSearching(false);
    }
  };
  
  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search documentation..."
        />
        <button type="submit" disabled={searching}>
          {searching ? 'Searching...' : 'Search'}
        </button>
      </form>
      
      <div>
        {results.map(doc => (
          <div key={doc.id}>
            <h3>{doc.title}</h3>
            <p>{doc.excerpt}</p>
            <span>Score: {doc.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
````

---

## Common Patterns

### Retry Logic with Exponential Backoff
````javascript
async function fetchWithRetry(fn, maxRetries = 3) {
  let lastError;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      if (error.code === 'RATE_LIMIT_EXCEEDED') {
        const waitTime = Math.pow(2, i) * 1000; // Exponential backoff
        console.log(`Rate limited. Waiting ${waitTime}ms...`);
        await sleep(waitTime);
        continue;
      }
      
      throw error; // Non-retryable error
    }
  }
  
  throw lastError;
}

// Usage
const doc = await fetchWithRetry(() => 
  client.docs.get('doc_123')
);
````

### Caching Strategy
````javascript
class DocuHubCache {
  constructor(ttl = 300000) { // 5 minutes default
    this.cache = new Map();
    this.ttl = ttl;
  }
  
  async get(key, fetchFn) {
    const cached = this.cache.get(key);
    
    if (cached && Date.now() - cached.timestamp < this.ttl) {
      console.log('Cache hit:', key);
      return cached.data;
    }
    
    console.log('Cache miss:', key);
    const data = await fetchFn();
    
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
    
    return data;
  }
  
  invalidate(key) {
    this.cache.delete(key);
  }
  
  clear() {
    this.cache.clear();
  }
}

// Usage
const cache = new DocuHubCache();

const docs = await cache.get('all-docs', () =>
  client.docs.list({ status: 'published' })
);
````

### Webhook Handler (Express)
````javascript
const express = require('express');
const app = express();

app.use(express.json());

app.post('/webhooks/docuhub', (req, res) => {
  const { event, data } = req.body;
  
  switch (event) {
    case 'doc.created':
      console.log('New document created:', data.id);
      // Handle creation...
      break;
      
    case 'doc.updated':
      console.log('Document updated:', data.id);
      // Invalidate cache, reindex, etc.
      break;
      
    case 'doc.deleted':
      console.log('Document deleted:', data.id);
      // Clean up references...
      break;
      
    default:
      console.log('Unknown event:', event);
  }
  
  res.status(200).json({ received: true });
});

app.listen(3000);
````

---

## Testing

### Unit Test Example (Jest)
````javascript
import { jest } from '@jest/globals';
import DocuHub from '@docuhub/sdk';

jest.mock('@docuhub/sdk');

describe('DocuHub Integration', () => {
  let client;
  
  beforeEach(() => {
    client = new DocuHub({ apiKey: 'test_key' });
  });
  
  test('should fetch documents', async () => {
    const mockDocs = {
      data: [{ id: 'doc_1', title: 'Test Doc' }],
      pagination: { total_items: 1 }
    };
    
    client.docs.list.mockResolvedValue(mockDocs);
    
    const result = await client.docs.list();
    
    expect(result.data).toHaveLength(1);
    expect(result.data[0].title).toBe('Test Doc');
  });
  
  test('should handle errors', async () => {
    client.docs.get.mockRejectedValue(
      new Error('Document not found')
    );
    
    await expect(
      client.docs.get('invalid_id')
    ).rejects.toThrow('Document not found');
  });
});
````

---

## Next Steps

- [API Overview →](./overview)
- [Authentication →](./overview#authentication)
- [Documents API →](./documents)