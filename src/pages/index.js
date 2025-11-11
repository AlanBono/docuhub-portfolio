import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>✨</span>
            <span>Modern Documentation Platform</span>
          </div>
          
          <h1 className={clsx('hero__title', styles.heroTitle)}>
            Build Beautiful Docs
            <br />
            <span className={styles.gradient}>In Minutes, Not Hours</span>
          </h1>
          
          <p className={clsx('hero__subtitle', styles.heroSubtitle)}>
            Create professional, searchable documentation that developers love.
            <br />
            Fast, modern, and completely customizable.
          </p>
          
          <div className={styles.buttons}>
            <Link
              className={clsx('button button--primary button--lg', styles.primaryButton)}
              to="/docs/intro">
              Get Started
              <span className={styles.arrow}>→</span>
            </Link>
            <Link
              className={clsx('button button--secondary button--lg', styles.secondaryButton)}
              to="/docs/api/overview">
              <span className={styles.playIcon}>▶</span>
              View Demo
            </Link>
          </div>
          
          <div className={styles.statsContainer}>
            <div className={styles.stat}>
              <div className={styles.statNumber}>5min</div>
              <div className={styles.statLabel}>Setup Time</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>100%</div>
              <div className={styles.statLabel}>Open Source</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>⚡</div>
              <div className={styles.statLabel}>Lightning Fast</div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className={styles.heroDecoration}>
          <div className={styles.floatingCard1}></div>
          <div className={styles.floatingCard2}></div>
          <div className={styles.floatingCard3}></div>
        </div>
      </div>
    </header>
  );
}

const FeatureList = [
  {
    emoji: '🚀',
    title: 'Lightning Fast',
    description: 'Built with modern technologies for instant page loads. Your users get answers in milliseconds, not seconds.',
    color: '#667eea',
  },
  {
    emoji: '📝',
    title: 'Markdown Powered',
    description: 'Write docs in simple Markdown. Focus on content, not formatting. Version control with Git out of the box.',
    color: '#764ba2',
  },
  {
    emoji: '🎨',
    title: 'Fully Customizable',
    description: 'Match your brand perfectly. Custom themes, styles, and components. Make it truly yours.',
    color: '#f093fb',
  },
  {
    emoji: '🔍',
    title: 'Powerful Search',
    description: 'Built-in full-text search helps users find what they need instantly. No configuration required.',
    color: '#4facfe',
  },
  {
    emoji: '🌙',
    title: 'Dark Mode',
    description: 'Beautiful dark mode included. Automatic theme switching based on user preference.',
    color: '#43e97b',
  },
  {
    emoji: '📱',
    title: 'Mobile First',
    description: 'Perfect on every device. Responsive design ensures great experience on desktop, tablet, and mobile.',
    color: '#fa709a',
  },
];

function Feature({emoji, title, description, color}) {
  return (
    <div className={clsx('col col--4', styles.featureCol)}>
      <div className={styles.featureCard}>
        <div className={styles.featureEmoji} style={{'--emoji-color': color}}>
          {emoji}
        </div>
        <h3 className={styles.featureTitle}>{title}</h3>
        <p className={styles.featureDescription}>{description}</p>
      </div>
    </div>
  );
}

function HomepageFeatures() {
  return (
    <section className={styles.featuresSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionBadge}>Features</span>
          <h2 className={styles.sectionTitle}>
            Everything You Need
            <br />
            <span className={styles.gradient}>Out of the Box</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            Powerful features designed to make documentation effortless
          </p>
        </div>
        
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CodeShowcase() {
  return (
    <section className={styles.codeSection}>
      <div className="container">
        <div className="row" style={{alignItems: 'center'}}>
          <div className="col col--6">
            <span className={styles.sectionBadge}>Quick Start</span>
            <h2 className={styles.sectionTitle} style={{textAlign: 'left'}}>
              Get Started in
              <br />
              <span className={styles.gradient}>Under 5 Minutes</span>
            </h2>
            <p className={styles.sectionSubtitle} style={{textAlign: 'left', marginBottom: '2rem'}}>
              Install, configure, and deploy your documentation site with just a few commands.
            </p>
            
            <div className={styles.checkList}>
              <div className={styles.checkItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>Zero configuration required</span>
              </div>
              <div className={styles.checkItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>Works with existing Markdown files</span>
              </div>
              <div className={styles.checkItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>Deploy to any platform</span>
              </div>
            </div>
            
            <Link
              className={clsx('button button--primary button--lg', styles.ctaButton)}
              to="/docs/installation">
              View Installation Guide →
            </Link>
          </div>
          
          <div className="col col--6">
            <div className={styles.codeBlock}>
              <div className={styles.codeHeader}>
                <div className={styles.codeButtons}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className={styles.codeTitle}>terminal</span>
              </div>
              <pre className={styles.codeContent}>
                <code>{`# Install DocuHub
$ npx create-docuhub@latest my-docs

# Start development server
$ cd my-docs
$ npm start

# Your docs are live at localhost:3000 🚀

# Deploy to production
$ npm run build
$ npm run serve`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className={styles.ctaSection}>
      <div className="container">
        <div className={styles.ctaCard}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>
              Ready to Build Amazing Docs?
            </h2>
            <p className={styles.ctaSubtitle}>
              Join thousands of developers creating beautiful documentation with DocuHub
            </p>
            <div className={styles.ctaButtons}>
              <Link
                className={clsx('button button--primary button--lg', styles.ctaButtonPrimary)}
                to="/docs/intro">
                Get Started Free →
              </Link>
              <Link
                className={clsx('button button--secondary button--lg', styles.ctaButtonSecondary)}
                to="/docs/api/overview">
                View Documentation
              </Link>
            </div>
          </div>
          
          {/* Decorative gradient blobs */}
          <div className={styles.ctaBlob1}></div>
          <div className={styles.ctaBlob2}></div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Home"
      description="Modern documentation platform for developers. Build beautiful, searchable docs in minutes.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <CodeShowcase />
        <CTASection />
      </main>
    </Layout>
  );
}