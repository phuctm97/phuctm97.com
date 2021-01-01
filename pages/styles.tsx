const StylesPage = () => (
  <main className="m-4">
    <h1>Heading 1</h1>
    <h2>Heading 2</h2>
    <h3>Heading 3</h3>
    <h4>Heading 4</h4>
    <h5>Heading 5</h5>
    <h6>Heading 6</h6>

    <p>I really like using Markdown.</p>
    <p>I think I'll use it to format all of my documents from now on.</p>

    <p>
      This is the first line.
      <br />
      And this is the second line.
    </p>

    <p>
      I just love <strong>bold text</strong>.
    </p>
    <p>
      Love<strong>is</strong>bold
    </p>
    <p>
      Italicized text is the <em>cat's meow</em>.
    </p>
    <p>
      A<em>cat</em>meow.
    </p>
    <p>
      This text is{" "}
      <strong>
        <em>really important</em>
      </strong>
      .
    </p>
    <p>
      This is really
      <strong>
        <em>very</em>
      </strong>
      important text.
    </p>

    <blockquote>
      <p>
        Dorothy followed her through many of the beautiful rooms in her castle.
      </p>
    </blockquote>
    <blockquote>
      <p>
        Dorothy followed her through many of the beautiful rooms in her castle.
      </p>
      <p>
        The Witch bade her clean the pots and kettles and sweep the floor and
        keep the fire fed with wood.
      </p>
    </blockquote>
    <blockquote>
      <p>
        Dorothy followed her through many of the beautiful rooms in her castle.
      </p>
      <blockquote>
        <p>
          The Witch bade her clean the pots and kettles and sweep the floor and
          keep the fire fed with wood.
        </p>
      </blockquote>
    </blockquote>
    <blockquote>
      <h4>The quarterly results look great!</h4>
      <ul>
        <li>Revenue was off the chart.</li>
        <li>Profits were higher than ever.</li>
      </ul>
      <p>
        <em>Everything</em> is going according to <strong>plan</strong>.
      </p>
    </blockquote>
    <ol>
      <li>First item</li>
      <li>Second item</li>
      <li>Third item</li>
      <li>Fourth item</li>
    </ol>
    <ol>
      <li>First item</li>
      <li>Second item</li>
      <li>
        Third item
        <ol>
          <li>Indented item</li>
          <li>Indented item</li>
        </ol>
      </li>
      <li>Fourth item</li>
    </ol>

    <ul>
      <li>First item</li>
      <li>Second item</li>
      <li>Third item</li>
      <li>Fourth item</li>
    </ul>
    <ul>
      <li>First item</li>
      <li>Second item</li>
      <li>
        Third item
        <ul>
          <li>Indented item</li>
          <li>Indented item</li>
        </ul>
      </li>
      <li>Fourth item</li>
    </ul>

    <ul>
      <li>This is the first list item.</li>
      <li>
        <p>Here’s the second list item.</p>

        <p>I need to add another paragraph below the second list item.</p>
      </li>
      <li>And here’s the third list item.</li>
    </ul>
    <ul>
      <li>This is the first list item.</li>
      <li>
        <p>Here’s the second list item.</p>
        <blockquote>
          <p>A blockquote would look great below the second list item.</p>
        </blockquote>
      </li>
      <li>And here’s the third list item.</li>
    </ul>
    <ol>
      <li>First item</li>
      <li>Second item</li>
      <li>
        Third item
        <ul>
          <li>Indented item</li>
          <li>Indented item</li>
        </ul>
      </li>
      <li>Fourth item</li>
    </ol>

    <pre>
      <code>Inline `code` has `back-ticks around` it.</code>
    </pre>
    <p>
      At the command prompt, type <code>nano</code>.
    </p>
    <p>
      <code>Use `code` in your Markdown file.</code>
    </p>

    <hr />

    <p>
      My favorite search engine is{" "}
      <a href="https://duckduckgo.com">Duck Duck Go</a>.
    </p>
    <p>
      <a href="https://www.markdownguide.org">https://www.markdownguide.org</a>
      <br />
      <a href="mailto:fake@example.com">fake@example.com</a>
    </p>
    <p>
      I love supporting the{" "}
      <strong>
        <a href="https://eff.org">EFF</a>
      </strong>
      .<br />
      This is the{" "}
      <em>
        <a href="https://www.markdownguide.org">Markdown Guide</a>
      </em>
      .<br />
      See the section on{" "}
      <a href="#code">
        <code>code</code>
      </a>
      .
    </p>
    <blockquote>
      <p>
        In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet
        hole, filled with the ends of worms and an oozy smell, nor yet a dry,
        bare, sandy hole with nothing in it to sit down on or to eat: it was a{" "}
        <a
          href="https://en.wikipedia.org/wiki/Hobbit#Lifestyle"
          title="Hobbit lifestyles"
        >
          hobbit-hole
        </a>
        , and that means comfort.
      </p>
    </blockquote>
  </main>
);

export default StylesPage;
