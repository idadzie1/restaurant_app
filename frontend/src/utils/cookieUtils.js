
const STORAGE_KEY = "ghanarestaurantshub_cookie_preferences";

const POLICY_VERSION = "1.0";

export const DEFAULT_PREFERENCES = {
  essential: true,
  functional: false,
  analytics: false,
  advertising: false
};

// Retrieve the visitor's saved preferences.
export const getCookiePreferences = () => {
  try {
    const savedPreferences = localStorage.getItem(STORAGE_KEY);

    // No saved preferences means consent has not yet been recorded.
    if (!savedPreferences) {
      return null;
    }

    // Convert the stored JSON string back into a JavaScript object.
    const parsedPreferences = JSON.parse(savedPreferences);

    // Check that the saved record belongs to the current policy version.
    if (parsedPreferences.policyVersion !== POLICY_VERSION) {
      return null;
    }

    // Validate the preference values before using them.
    const categories = ["functional", "analytics", "advertising"];

    const validPreferences = categories.every(
      (category) => typeof parsedPreferences[category] === "boolean"
    );

    if (!validPreferences) {
      return null;
    }

    return {
      essential: true,
      functional: parsedPreferences.functional,
      analytics: parsedPreferences.analytics,
      advertising: parsedPreferences.advertising
    };

  } catch (error) {
    console.error("Unable to retrieve cookie preferences:", error);
    return null;
  }
};

// Save the visitor's preferences.
export const saveCookiePreferences = (preferences) => {
  const preferencesToSave = {
    essential: true,
    functional: Boolean(preferences.functional),
    analytics: Boolean(preferences.analytics),
    advertising: Boolean(preferences.advertising),
    policyVersion: POLICY_VERSION,
    updatedAt: new Date().toISOString()
  };

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(preferencesToSave)
    );

    return true;

  } catch (error) {
    console.error("Unable to save cookie preferences:", error);
    return false;
  }
};
