const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER, // e.g. "us4"
});

const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Frontend sends { name, email } — map name → firstName
  const { name, email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const response = await mailchimp.lists.addListMember(AUDIENCE_ID, {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: name || "",
      },
      tags: ["Copper Tier", "Website Signup"],
    });

    return res.status(200).json({
      success: true,
      message: "Welcome to DefTalk Copper Tier!",
      id: response.id,
    });

  } catch (error) {
    // Member already exists — treat as success, not an error
    if (error.response?.body?.title === "Member Exists") {
      return res.status(200).json({ success: true, message: "Already subscribed" });
    }

    const errorMessage = error.response?.body?.title || "Connection Error";
    return res.status(500).json({ success: false, error: errorMessage });
  }
};
