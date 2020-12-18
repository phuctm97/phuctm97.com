import Page from "~components/Page";

const HelloWorldPage = () => (
  <Page
    title="Hello, World! I Started My Blog In Plain HTML · Minh-Phuc Tran"
    description="I finally started my blog, in plain HTML, no CSS, JS, inline style, whatsoever."
  >
    <article>
      <header>
        <h1>Hello, World! I Started My Blog In Plain HTML</h1>
        <p>
          Today is a special day for me: I finally created my blog, what I has
          been thinking of for years 🎉.
        </p>
      </header>
      <h2>Plain HTML is fun 🤓</h2>
      <p>
        Today is <em>Dec 17, 2020</em> (a day after my ex's birthday) (I don't
        know why I'm mentioning it here).
      </p>
      <p>
        Because I don't want to give myself another reason to procrastinate
        again, I decided to start this blog dead simple: plain HTML, no inline
        style, CSS, JS, whatsoever.
      </p>
      <p>
        Surprisingly, after making the decision, I realized that HTML and the
        web were origially created for people to write, share, and communicate
        information. That why we have HTML tags
        <code>title</code>, <code>article</code>, <code>header</code>, headings
        (<code>h1 h2 h3 h4 h5 h6</code>), paragraph (<code>p</code>), etc,
        they're all for writing articles and sharing stories. Over time, thanks
        to more and more powerful computers and browsers, HTML/CSS/JS became
        more and more like a framework to create interactive applications.
      </p>
      <p>
        This is so an interesting <em>Aha!</em> movement for me because I came
        to web development from game and desktop programming, which are all
        about visualization and interactivity. All of my experience with web
        development were also about creating beautiful and interactive web
        applications. I've never happened to think of HTML as a means for
        writing and sharing stories.
      </p>
      <p>
        This also answered one of my biggest unsolved question in programming -
        why on earth there're many different HTML tags that have the same
        visualization and all the weird workaround-like positioning techniques (
        <code>float</code>, <code>clear: fix</code>, etc). Coming from game and
        desktop development, absolute position, flex, and grid were always
        obvious options when it comes to layout and positioning for me. Now, it
        all makes sense 🤯 and it's actually interesting to see how HTML - the
        core of the Internet has evolved over time.
      </p>
      <p>
        Alright, that is it. I thought that I were gonna write more about why I
        started this blog and what value you can get from it, but I ran out of
        time, gotta write it tomorrow then.
      </p>
    </article>
  </Page>
);

export default HelloWorldPage;
