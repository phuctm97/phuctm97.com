import { NextApiRequest, NextApiResponse } from "next";
import {
  isStringArray,
  isMapOfStringArray,
  flattenStringArray,
} from "~utils/array";

const unexpectedError =
  "There was an error subscribing, please try again later.";

const parseBDErrors = (res: any) => {
  if (isStringArray(res)) {
    const bdErrors = res;

    for (let err of bdErrors) {
      if (err.includes("already subscribed"))
        return {
          status: 200,
          message:
            "Subscribed 🎉! Please check your inbox to confirm your email. That's it!",
        };
    }

    if (bdErrors.length > 0)
      return {
        status: 400,
        message: bdErrors[0],
      };
  }

  if (isMapOfStringArray(res)) {
    const bdErrors = flattenStringArray(res);
    if (bdErrors.length > 0)
      return {
        status: 400,
        message: bdErrors[0],
      };
  }

  console.error("Unrecognized Buttondown response:", res);
  return { status: 500, message: unexpectedError };
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required." });
  }

  try {
    const bdKey = process.env.BUTTONDOWN_API_KEY;
    const bdRes = await fetch(`https://api.buttondown.email/v1/subscribers`, {
      body: JSON.stringify({ email }),
      headers: {
        Authorization: `Token ${bdKey}`,
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const bdJSON = await bdRes.json();

    if (bdRes.status >= 500) {
      console.error("Buttondown's internal error:", bdJSON);
      return res.status(500).json({ error: unexpectedError });
    }

    if (!bdRes.ok) {
      const { status, message } = parseBDErrors(bdJSON);
      return res.status(status).json({ message });
    }

    return res.status(200).json({
      message:
        "Subscribed 🎉! Please check your inbox to confirm your email and that's it!",
    });
  } catch (err) {
    console.error("Internal error:", err);
    return res.status(500).json({ error: unexpectedError });
  }
};
