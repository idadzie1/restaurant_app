

import { useState } from "react";
import {
  DEFAULT_PREFERENCES
} from "../utils/cookieUtils";

const CookiePreferences = ({
  initialPreferences,
  onSave,
  onClose
}) => {

  const [preferences, setPreferences] = useState(
    initialPreferences || DEFAULT_PREFERENCES
  );

  // Update an individual preference.
  const handlePreferenceChange = (category) => {
    setPreferences((previousPreferences) => ({
      ...previousPreferences,
      [category]: !previousPreferences[category]
    }));
  };

  // Save the visitor's selected preferences.
  const handleSave = () => {
    onSave(preferences);
  };

  return (
    <div className="cookie-overlay">
      <div className="cookie-panel" role="dialog" aria-modal="true"
        aria-labelledby="cookie-title">

        <h2 id="cookie-title">Cookie & Tracking Preferences</h2>

        <p>
          Manage how Ghana Restaurants Hub uses cookies and
          similar technologies. You can change these choices
          at any time.
        </p>

        <div className="cookie-category">
          <div>
            <h3>Essential</h3>
            <p>
              Necessary for core website functionality and security.
            </p>
          </div>

          <input type="checkbox" checked={true} disabled
            aria-label="Essential preferences are always enabled" />
        </div>

        <div className="cookie-category">
          <div>
            <h3>Functional</h3>
            <p>
              Remembers optional settings and preferences.
            </p>
          </div>

          <input
            type="checkbox"
            checked={preferences.functional}
            onChange={() => handlePreferenceChange("functional")}
            aria-label="Enable functional technologies"
          />
        </div>

        <div className="cookie-category">
          <div>
            <h3>Analytics</h3>
            <p>
              Helps us understand website visits and usage.
            </p>
          </div>

          <input
            type="checkbox"
            checked={preferences.analytics}
            onChange={() => handlePreferenceChange("analytics")}
            aria-label="Enable analytics technologies"
          />
        </div>

        <div className="cookie-category">
          <div>
            <h3>Advertising</h3>
            <p>
              Supports advertising and advertising measurement.
            </p>
          </div>

          <input
            type="checkbox"
            checked={preferences.advertising}
            onChange={() => handlePreferenceChange("advertising")}
            aria-label="Enable advertising technologies"
          />
        </div>

        <div className="cookie-actions">
          <button onClick={handleSave}>
            Save my preferences
          </button>

          <button onClick={onClose}>
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};

export default CookiePreferences;
