const axios = require("axios");
const { throttle } = require("./async-utils");

const agent = axios.create({
  baseURL: "https://api.hashnode.com",
  headers: { Authorization: process.env.HASHNODE_API_KEY },
  timeout: 10000,
});

const createPublicationStoryGql = `
mutation createPublicationStory($input: CreateStoryInput!, $publicationId: String!) {
  createPublicationStory(input: $input, publicationId: $publicationId) {
    success,
    message,
    post { _id, cuid, slug }
  }
}
`.trim();

const updateStoryGql = `
mutation updateStory($postId: String!, $input: UpdateStoryInput!) {
  updateStory(postId: $postId, input: $input) {
    success,
    message,
    post { _id, cuid, slug }
  }
}
`.trim();

const createStory = throttle(({ frontmatter, content }) =>
  agent
    .post("", {
      query: createPublicationStoryGql,
      variables: {
        input: {
          ...frontmatter,
          contentMarkdown: content,
        },
        publicationId: process.env.HASHNODE_PUBLICATION_ID,
      },
    })
    .then(({ data }) => data)
    // Destructure GraphQL API response.
    .then(({ data }) => data.createPublicationStory)
    .then(({ success, message, post }) => {
      if (!success)
        throw new Error(`Couldn't create Hashnode story: ${message}.`);
      return post;
    })
);

const updateStory = throttle((id, { frontmatter, content }) =>
  agent
    .post("", {
      query: updateStoryGql,
      variables: {
        postId: id,
        input: {
          ...frontmatter,
          isPartOfPublication: {
            publicationId: process.env.HASHNODE_PUBLICATION_ID,
          },
          contentMarkdown: content,
        },
      },
    })
    .then(({ data }) => data)
    // Destructure GraphQL API response.
    .then(({ data }) => data.updateStory)
    .then(({ success, message, post }) => {
      if (!success)
        throw new Error(`Couldn't update Hashnode story: ${message}.`);
      return post;
    })
);

const hashnodeAPI = { createStory, updateStory };

module.exports = hashnodeAPI;
