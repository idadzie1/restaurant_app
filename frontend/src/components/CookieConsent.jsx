
import { useEffect, useState } from "react";
import CookiePreferences from "./CookiePreferences";

import './CookieConsent.css'

import {
  getCookiePreferences,
  saveCookiePreferences,
  DEFAULT_PREFERENCES
} from "../utils/cookieUtils";

const CookieConsent = () => {

  const [preferences, setPreferences] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Retrieve saved preferences when the component first loads.
  useEffect(() => {
    const savedPreferences = getCookiePreferences();

    setPreferences(savedPreferences);
    setIsLoading(false);
  }, []);



    useEffect(() => {
    const openCookieSettings = () => {
        setShowSettings(true);
    };

    window.addEventListener(
        "openCookieSettings",
        openCookieSettings
    );

    return () => {
        window.removeEventListener(
        "openCookieSettings",
        openCookieSettings
        );
    };
    }, []);




  // Save the visitor's selected preferences.
  const handleSavePreferences = (selectedPreferences) => {
    const saved = saveCookiePreferences(selectedPreferences);

    if (saved) {
      setPreferences({
        ...selectedPreferences,
        essential: true
      });

      setShowSettings(false);
    }
  };

  // Accept all preference categories.
  const handleAcceptAll = () => {
    handleSavePreferences({
      essential: true,
      functional: true,
      analytics: true,
      advertising: true
    });
  };

  // Reject all optional preference categories.
  const handleRejectOptional = () => {
    handleSavePreferences({
      ...DEFAULT_PREFERENCES
    });
  };

  // Prevent the interface from flashing before storage is checked.
  if (isLoading) {
    return null;
  }

  return (
    <>
      {/* Display the preference settings panel. */}
      {showSettings && (
        <CookiePreferences
          initialPreferences={preferences || DEFAULT_PREFERENCES}
          onSave={handleSavePreferences}
          onClose={() => setShowSettings(false)}
        />
      )}

      {/* Display the initial consent banner. */}
      {!preferences && !showSettings && (
        <div className="cookie-banner">

          <div>
            <h3>We value your privacy</h3>

            <p>
              We use cookies and similar technologies to support
              website functionality, understand usage and improve
              your experience. You can manage your preferences
              or reject optional technologies.
            </p>
          </div>

          <div className="cookie-banner-actions">
            <button onClick={handleAcceptAll}>
              Accept all
            </button>

            <button onClick={handleRejectOptional}>
              Reject optional
            </button>

            <button onClick={() => setShowSettings(true)}>
              Customize preferences
            </button>
          </div>

        </div>
      )}

      {/* Allow visitors to reopen their settings later. */}
      {/* {preferences && !showSettings && (
        
        <button
          className="cookie-settings-trigger"
          onClick={() => setShowSettings(true)}
        >
          Cookie settings
        </button>
        
      )} */}
    </>
  );
};

export default CookieConsent;
