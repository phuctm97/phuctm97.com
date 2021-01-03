const subscribeNewsletter = () => {
  window.open("https://buttondown.email/phuctm97", "popupwindow");
};

const Subscribe = () => (
  <form
    action="https://buttondown.email/api/emails/embed-subscribe/phuctm97"
    method="post"
    target="popupwindow"
    onSubmit={subscribeNewsletter}
  >
    <label className="hidden" htmlFor="bd-email">
      Enter your email:
    </label>
    <input
      id="bd-email"
      type="email"
      name="email"
      className="border border-gray-300 py-1 px-4 rounded mr-2 mb-2"
      placeholder="your@email.com"
    />
    <input className="hidden" type="hidden" value="1" name="embed" />
    <button
      className="bg-gray-200 border border-gray-200 py-1 px-4 rounded mb-2 font-semibold hover:bg-gray-300 transition-colors"
      name="submit"
      type="submit"
    >
      Subscribe
    </button>
  </form>
);

export default Subscribe;
