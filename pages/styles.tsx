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
  </main>
);

export default StylesPage;
