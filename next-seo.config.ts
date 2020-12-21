import { DefaultSeoProps } from "next-seo";
import metadata from "metadata.json";

const { title, description, url } = metadata;

const seoProps: DefaultSeoProps = {
  title,
  description,
  canonical: url,
  openGraph: {
    type: "website",
    url,
    title,
    description:
      "Coding tutorials, programming guides, thoughts and ideas about software dev.",
    locale: "en_US",
    images: [
      { url: `${url}/images/og.png`, alt: title, width: 1200, height: 628 },
    ],
  },
  defaultOpenGraphImageWidth: 1200,
  defaultOpenGraphImageHeight: 628,
  twitter: {
    handle: "@phuctm97",
    site: "@phuctm97",
    cardType: "summary_large_image",
  },
};

export default seoProps;
