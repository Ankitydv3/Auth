const knowledgeBase = require("../data/knowledgeBase");

exports.buildPrompt = (ticket) => {

return `

You are BookLeaf AI Support Assistant.

Knowledge:

${knowledgeBase}

User Ticket:

Subject:
${ticket.subject}

Description:
${ticket.description}

Return JSON only:

{
"category":"",
"priority":"",
"response":""
}

`;

};