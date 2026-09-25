import React from 'react'

import './CookiePolicy.css'

const CookiePolicy = () => {
  return (
    <main className="legal-page">
      <div className="legal-container">
        <header className="legal-header">
          <h1>Cookie Policy</h1>
          <p>
            <strong>Effective Date:</strong> 23rd September, 2026
          </p>
          <p>
            <strong>Last Updated:</strong> 23rd September, 2026
          </p>
        </header>

        <section>
          <h2>1. What Are Cookies?</h2>
          <p>
            Cookies are small text files stored on your device by websites.
            They can help websites remember information about your visit and
            provide functionality.
          </p>
        </section>

        <section>
          <h2>2. How We Use Cookies</h2>

          <h3>2.1 Essential Cookies</h3>
          <p>
            These cookies may be necessary for:
          </p>

          <ul>
            <li>Authentication</li>
            <li>Maintaining login sessions</li>
            <li>Security</li>
            <li>Remembering essential preferences</li>
            <li>Providing requested functionality</li>
          </ul>

          <h3>2.2 Analytics Cookies</h3>
          <p>
            Where used, analytics cookies may help us understand:
          </p>

          <ul>
            <li>How visitors use the Platform</li>
            <li>Which pages are visited</li>
            <li>Technical problems</li>
            <li>General usage patterns</li>
          </ul>

          <h3>2.3 Preference Cookies</h3>
          <p>
            These cookies may remember settings such as:
          </p>

          <ul>
            <li>Language preferences</li>
            <li>Display preferences</li>
            <li>Other user-selected settings</li>
          </ul>
        </section>

        <section>
          <h2>3. Authentication Cookies</h2>
          <p>
            If you log into the Platform, we may use cookies or similar
            technologies to maintain your authenticated session.
          </p>

          <p>
            Without necessary authentication mechanisms, certain account
            features may not function correctly.
          </p>
        </section>

        <section>
          <h2>4. Third-Party Cookies</h2>
          <p>
            If we use third-party services such as analytics, advertising,
            maps or embedded content, those providers may use their own
            cookies or similar technologies.
          </p>

          <p>
            We will identify relevant third-party technologies where reasonably
            practicable.
          </p>
        </section>

        <section>
          <h2>5. Managing Cookies</h2>
          <p>
            You can control cookies through your browser settings.
          </p>

          <p>
            Blocking certain cookies may cause some Platform functionality to
            stop working.
          </p>

          <p>
            Where applicable law requires consent for non-essential cookies,
            we will provide an appropriate consent mechanism.
          </p>
        </section>

        <section>
          <h2>6. Changes to This Cookie Policy</h2>
          <p>
            We may update this Cookie Policy when our use of cookies or
            similar technologies changes.
          </p>

          <p>
            The "Last Updated" date at the top of this Policy indicates when
            it was most recently revised.
          </p>
        </section>

        <section>
          <h2>7. Contact</h2>

          <div className="legal-details">
            <p>
              <strong>Dine Finder</strong>
            </p>
            <p>
              <strong>Email:</strong> dimustapha@gmail.com
            </p>
            <p>
              <strong>Address:</strong> Fan Milk Junction, Temple Street, Ablekuma, Accra.
            </p>
            <p>
              <strong>Telephone:</strong> +233209453410
            </p>
          </div>
        </section>

        <p className="legal-updated">
          Last updated: 23rd September, 2026
        </p>
      </div>
    </main>
  );
};

export default CookiePolicy;


