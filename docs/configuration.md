---
sidebar_position: 3
---

# Configuration

Learn how to configure DocuHub to match your needs and brand identity.

## Configuration File

All configuration is done through the `docusaurus.config.js` file in your project root. This file controls everything from site metadata to theme settings.

## Basic Configuration

### Site Metadata
```javascript
module.exports = {
  title: 'My Documentation',
  tagline: 'Documentation made easy',
  url: 'https://mydocs.com',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
};
```

#### Configuration Options

| Option | Type | Description |
|--------|------|-------------|
| `title` | string | Your site's title |
| `tagline` | string | Short description of your site |
| `url` | string | URL where your site will be hosted |
| `baseUrl` | string | Base URL path (usually `/`) |
| `favicon` | string | Path to your favicon |

## Theme Configuration

### Colors

Customize your site's color scheme:
```javascript
themeConfig: {
  colorMode: {
    defaultMode: 'light',
    disableSwitch: false,
    respectPrefersColorScheme: true,
  },
}
```

### Custom CSS Variables

Edit `src/css/custom.css` to customize colors:
```css
:root {
  --ifm-color-primary: #2e8555;
  --ifm-color-primary-dark: #29784c;
  --ifm-color-primary-darker: #277148;
  --ifm-color-primary-darkest: #205d3b;
}
```

## Navbar Configuration

Configure your navigation bar:
```javascript
navbar: {
  title: 'DocuHub',
  logo: {
    alt: 'DocuHub Logo',
    src: 'img/logo.svg',
  },
  items: [
    {
      type: 'doc',
      docId: 'intro',
      position: 'left',
      label: 'Docs',
    },
    {
      href: 'https://github.com/yourusername/yourrepo',
      label: 'GitHub',
      position: 'right',
    },
  ],
}
```

### Navbar Item Types

- **`doc`** - Links to a documentation page
- **`docSidebar`** - Links to a docs sidebar
- **`href`** - External link
- **`dropdown`** - Dropdown menu with subitems

## Footer Configuration

Customize your site footer:
```javascript
footer: {
  style: 'dark',
  links: [
    {
      title: 'Docs',
      items: [
        {
          label: 'Getting Started',
          to: '/docs/intro',
        },
      ],
    },
    {
      title: 'Community',
      items: [
        {
          label: 'GitHub',
          href: 'https://github.com/yourusername',
        },
      ],
    },
  ],
  copyright: `Copyright © ${new Date().getFullYear()} Your Company`,
}
```

## Search Configuration

### Built-in Search

DocuHub includes built-in search out of the box. No configuration needed!

### Advanced Search (Algolia)

For larger sites, integrate Algolia DocSearch:
```javascript
themeConfig: {
  algolia: {
    appId: 'YOUR_APP_ID',
    apiKey: 'YOUR_SEARCH_API_KEY',
    indexName: 'YOUR_INDEX_NAME',
  },
}
```

## Documentation Settings

### Sidebar Configuration

Edit `sidebars.js` to organize your docs:
```javascript
module.exports = {
  docs: [
    'intro',
    'installation',
    {
      type: 'category',
      label: 'Guides',
      items: ['guides/writing-docs', 'guides/markdown-features'],
    },
  ],
};
```

### Edit URLs

Enable "Edit this page" links:
```javascript
docs: {
  editUrl: 'https://github.com/yourusername/yourrepo/edit/main/',
}
```

## Plugins

Extend functionality with plugins:
```javascript
plugins: [
  [
    '@docusaurus/plugin-content-docs',
    {
      id: 'api',
      path: 'api',
      routeBasePath: 'api',
      sidebarPath: require.resolve('./sidebarsApi.js'),
    },
  ],
],
```

## Internationalization (i18n)

Support multiple languages:
```javascript
i18n: {
  defaultLocale: 'en',
  locales: ['en', 'es', 'fr'],
  localeConfigs: {
    en: {
      label: 'English',
    },
    es: {
      label: 'Español',
    },
  },
}
```

## Environment Variables

Use environment variables for sensitive data:
```bash
# .env
ALGOLIA_APP_ID=your_app_id
ALGOLIA_API_KEY=your_api_key
```

Access in config:
```javascript
algolia: {
  appId: process.env.ALGOLIA_APP_ID,
  apiKey: process.env.ALGOLIA_API_KEY,
}
```

## Performance Optimization

### Enable Compression
```javascript
module.exports = {
  webpack: {
    jsLoader: (isServer) => ({
      loader: require.resolve('swc-loader'),
    }),
  },
}
```

### Image Optimization

Place images in `static/img/` and reference them:
```markdown
![My Image](/img/my-image.png)
```

## Best Practices

1. **Keep config simple** - Start minimal, add complexity as needed
2. **Use TypeScript** - Rename to `docusaurus.config.ts` for type safety
3. **Version control** - Commit your config file to Git
4. **Document changes** - Comment your custom configurations
5. **Test locally** - Always test config changes before deploying

## Example Configurations

### Minimal Config
```javascript
module.exports = {
  title: 'My Docs',
  url: 'https://mydocs.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  presets: [
    ['classic', { docs: { path: 'docs' } }],
  ],
};
```

### Advanced Config
```javascript
module.exports = {
  title: 'My Docs',
  url: 'https://mydocs.com',
  baseUrl: '/',
  
  plugins: ['plugin-image-zoom', 'plugin-sitemap'],
  
  themeConfig: {
    navbar: { /* ... */ },
    footer: { /* ... */ },
    algolia: { /* ... */ },
    prism: {
      additionalLanguages: ['php', 'ruby'],
    },
  },
  
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'fr', 'de'],
  },
};
```

## Next Steps

- [Write your first documentation →](./guides/writing-docs)
- [Learn Markdown features →](./guides/markdown-features)
- [Deploy your site →](./deployment)

---

**Need help?** Check our [troubleshooting guide](./troubleshooting) or [contact support](mailto:support@docuhub.dev).