exports.processTicket = async (ticket) => {
  const text =
    `${ticket.subject || ""} ${ticket.description || ""}`.toLowerCase();

  console.log("TEXT:", text);

  // Payment
  if (
    text.includes("payment") ||
    text.includes("money") ||
    text.includes("deducted") ||
    text.includes("failed")
  ) {
    return {
      category: "Payment",
      priority: "High",
      response: "Payment issue detected.",
    };
  }

  // Royalty
  if (text.includes("royalty")) {
    return {
      category: "Royalty",
      priority: "Medium",
      response: "Royalty issue detected.",
    };
  }

  // Technical
  if (
    text.includes("login") ||
    text.includes("technical") ||
    text.includes("error")
  ) {
    return {
      category: "Technical",
      priority: "High",
      response: "Technical issue detected.",
    };
  }

  // Default
  return {
    category: "General",
    priority: "Low",
    response: "General request received.",
  };
};
