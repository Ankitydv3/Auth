const express = require("express");

const router = express.Router();

router.post("/analyze", (req, res) => {

try{

const ticket=req.body;

const text=(

`${ticket.subject || ""} 
${ticket.description || ""}`

).toLowerCase();

console.log("AI INPUT:",text);


// Categories + keywords

const categories={

Payment:[

"payment",
"paid",
"money",
"refund",
"billing",
"charged",
"deducted",
"transaction",
"upi",
"credit card",
"debit card",
"bank",
"failed payment"

],

Royalty:[

"royalty",
"earnings",
"income",
"revenue",
"commission",
"author payment"

],

Technical:[

"login",
"password",
"technical",
"error",
"server",
"bug",
"issue",
"website down",
"crash",
"upload failed",
"api"

],

Account:[

"account",
"profile",
"email",
"username",
"register",
"signup",
"signin"

],

Publishing:[

"publish",
"book",
"isbn",
"manuscript",
"author",
"upload book"

],

Booking:[

"ticket",
"booking",
"reservation",
"seat",
"event booking"

]

};


let detectedCategory="General";

for(

const category in categories

){

const keywords=
categories[category];

if(

keywords.some(
keyword=>
text.includes(
keyword
)
)

){

detectedCategory=
category;

break;

}

}


let priority="Low";

if(

detectedCategory==="Payment" ||

text.includes("failed") ||

text.includes("urgent") ||

text.includes("not working") ||

text.includes("critical")

){

priority="High";

}

else if(

detectedCategory==="Technical" ||

detectedCategory==="Royalty"

){

priority="Medium";

}


let response="";

switch(detectedCategory){

case "Payment":

response=
"I detected a payment issue. Your request has been marked high priority and forwarded for review.";

break;


case "Royalty":

response=
"I found a royalty-related concern. We are checking your earnings details.";

break;


case "Technical":

response=
"A technical issue has been detected. Support has been notified.";

break;


case "Account":

response=
"I found an account-related issue. Please verify your account details.";

break;


case "Publishing":

response=
"I detected a publishing-related request and sent it for processing.";

break;


case "Booking":

response=
"I found a booking issue and we're checking your reservation.";

break;


default:

response=
"Thanks for contacting us. We received your request.";
}


return res.json({

success:true,

data:{

category:detectedCategory,
priority,
response

}

});

}

catch(error){

console.log("AI ERROR:",error);

return res.status(500).json({

success:false,
message:error.message

});

}

});

module.exports=router;