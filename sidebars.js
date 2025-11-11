module.exports = {
  tutorialSidebar: [
    'intro',
    'installation',
    'configuration',
    {
      type: 'category',
      label: 'Guides',
      collapsed: false,
      items: [
        'guides/writing-docs',
        'guides/markdown-features',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      collapsed: false,
      items: [
        'api/overview',
        'api/documents',
        'api/examples',
      ],
    },
  ],
};