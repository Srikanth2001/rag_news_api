async function generateAnswer(prompt) {
  // Very simple "LLM" stub: return the first 400 chars of the constructed prompt plus a canned suggestion
  const text = prompt.slice(0, 1000);
  return `Assistant (mock): Based on the retrieved news, here's a short summary:\n\n${text}\n\n(End of mock response)`;
}

module.exports = { generateAnswer };
