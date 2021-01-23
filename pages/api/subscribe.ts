import { NextApiRequest, NextApiResponse } from "next";
import {
  isStringArray,
  isRecordOfStringArray,
  flattenStringArray,
} from "~/utils/lang/string-array";

const unexpectedError =
  "There was an error subscribing, please try again later.";

const parseButtondownErrors = (data: unknown) => {
  const errors =
    (isStringArray(data) && data) ||
    (isRecordOfStringArray(data) && flattenStringArray(data)) ||
    [];

  for (let err of errors) {
    if (err.includes("already subscribed"))
      return {
        status: 200,
        message:
          "Subscribed 🎉. Please check your inbox to confirm your email and that's it!",
      };
    if (err.includes("a valid email"))
      return {
        status: 400,
        message: "Please enter a valid email address.",
      };
    if (err.includes("this address does not exist"))
      return {
        status: 400,
        message: "Google says that this email doesn't exist.",
      };
  }

  if (errors.length > 0)
    return {
      status: 400,
      message: errors[0],
    };

  console.error("Unrecognized Buttondown's response:", data);
  return { status: 500, message: unexpectedError };
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    const bdKey = process.env.BUTTONDOWN_API_KEY;
    const bdRes = await fetch(`https://api.buttondown.email/v1/subscribers`, {
      method: "POST",
      headers: {
        Authorization: `Token ${bdKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const bdJSON = await bdRes.json();

    if (bdRes.status >= 500) {
      console.error("Buttondown's internal error:", bdJSON);
      return res.status(500).json({ message: unexpectedError });
    }

    if (!bdRes.ok) {
      const { status, message } = parseButtondownErrors(bdJSON);
      return res.status(status).json({ message });
    }

    return res.status(200).json({
      message:
        "Subscribed 🎉. Please check your inbox to confirm your email and that's it!",
    });
  } catch (err) {
    console.error("Internal error:", err);
    return res.status(500).json({ message: unexpectedError });
  }
};
