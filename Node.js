const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER,
});

const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;

async function handleMailchimpSignup(req, res) {
  const { email, firstName, phone } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const response = await mailchimp.lists.addListMember(AUDIENCE_ID, {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName || "",
        PHONE: phone || ""
      },
      tags: ["Copper Tier", "Website Signup"]
    });

    return res.status(200).json({
      success: true,
      message: "Welcome to DefTalk Copper Tier!",
      id: response.id
    });

  } catch (error) {
    const errorMessage = error.response ? error.response.body.title : "Connection Error";
    return res.status(500).json({ success: false, error: errorMessage });
  }
}

module.exports = handleMailchimpSignup;
