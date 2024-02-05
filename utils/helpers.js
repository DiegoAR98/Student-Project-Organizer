module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  format_amount: (amount) => {
    // Format large numbers with commas
    return parseInt(amount).toLocaleString();
  },
  get_emoji: () => {
    const randomNum = Math.random();

    // Return a random emoji
    if (randomNum > 0.7) {
      return `<span for="img" aria-label="lightbulb">💡</span>`;
    } else if (randomNum > 0.4) {
      return `<span for="img" aria-label="laptop">💻</span>`;
    } else {
      return `<span for="img" aria-label="gear">⚙️</span>`;
    }
  },
  capitalize: (text) => {
    if (text && typeof text === 'string') {
      return text.charAt(0).toUpperCase() + text.slice(1);
    }
    return text;
  },
  // Define an 'eq' helper for equality checks
  eq: (v1, v2) => {
    return v1 === v2;
  },
};
