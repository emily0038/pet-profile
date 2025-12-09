import Link from 'next/link'
import Image from 'next/image'
import Callout from '@/components/Callout'
import BlogFAQ from '@/components/BlogFAQ'

export default function StyleGuidePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-gray-200">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Pets Friendz Logo"
            width={50}
            height={50}
          />
          <span className="text-2xl text-black font-bold font-slab">Pets Friendz</span>
        </Link>

        <div className="flex items-center gap-5">
          <Link href="/blog" className="text-lg text-black hover:text-gray-600 transition-colors">
            Blog
          </Link>
          <Link href="/login" className="text-lg text-black hover:text-gray-600 transition-colors">
            Login
          </Link>
          <Link
            href="/waitlist"
            className="bg-black text-white px-6 py-2.5 rounded text-base flex items-center gap-2 hover:bg-gray-800 transition-colors"
          >
            Build your page
            <span className="text-lg">→</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-8 py-16">
        <h1 className="text-5xl font-bold text-black mb-4 font-slab">Style Guide</h1>
        <p className="text-xl text-gray-600 mb-16 font-flex">
          Design system and component library for Pets Friendz
        </p>

        {/* Colors */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-black mb-8 font-slab">Colors</h2>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 font-slab">Brand Colors</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-lg" style={{ backgroundColor: '#9185FF' }}></div>
                  <div>
                    <p className="font-bold font-flex">Primary Purple</p>
                    <p className="text-sm text-gray-600 font-mono">#9185FF</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-lg" style={{ backgroundColor: '#5B4FC6' }}></div>
                  <div>
                    <p className="font-bold font-flex">Purple Hover</p>
                    <p className="text-sm text-gray-600 font-mono">#5B4FC6</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-lg" style={{ backgroundColor: '#E4E1FF' }}></div>
                  <div>
                    <p className="font-bold font-flex">Light Purple</p>
                    <p className="text-sm text-gray-600 font-mono">#E4E1FF</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 font-slab">Neutrals</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-lg bg-black"></div>
                  <div>
                    <p className="font-bold font-flex">Black</p>
                    <p className="text-sm text-gray-600 font-mono">#000000</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-lg border border-gray-300" style={{ backgroundColor: '#374151' }}></div>
                  <div>
                    <p className="font-bold font-flex">Dark Gray</p>
                    <p className="text-sm text-gray-600 font-mono">#374151</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-lg bg-gray-50 border border-gray-200"></div>
                  <div>
                    <p className="font-bold font-flex">Light Gray</p>
                    <p className="text-sm text-gray-600 font-mono">#F9FAFB</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 font-slab">Accents</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-lg bg-purple-50 border border-purple-200"></div>
                  <div>
                    <p className="font-bold font-flex">Purple BG</p>
                    <p className="text-sm text-gray-600 font-mono">bg-purple-50</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-lg border-l-4 border-purple-400"></div>
                  <div>
                    <p className="font-bold font-flex">Purple Border</p>
                    <p className="text-sm text-gray-600 font-mono">border-purple-400</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-black mb-8 font-slab">Typography</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-4 font-slab">Fonts</h3>
              <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Headings (font-slab)</p>
                  <p className="text-3xl font-bold font-slab">Roboto Slab</p>
                  <p className="text-sm text-gray-600 font-mono">font-family: Roboto Slab</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Body Text (font-flex)</p>
                  <p className="text-xl font-flex">Roboto Flex</p>
                  <p className="text-sm text-gray-600 font-mono">font-family: Roboto Flex</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">UI Elements (default)</p>
                  <p className="text-xl">Roboto</p>
                  <p className="text-sm text-gray-600 font-mono">font-family: Roboto</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 font-slab">Heading Sizes</h3>
              <div className="space-y-4">
                <div>
                  <h1 className="text-5xl font-bold font-slab text-black mb-2">Heading 1</h1>
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded font-mono">text-5xl font-bold font-slab</code>
                </div>
                <div>
                  <h2 className="text-4xl font-bold font-slab text-black mb-2">Heading 2</h2>
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded font-mono">text-4xl font-bold font-slab</code>
                </div>
                <div>
                  <h3 className="text-3xl font-bold font-slab text-black mb-2">Heading 3</h3>
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded font-mono">text-3xl font-bold font-slab</code>
                </div>
                <div>
                  <h4 className="text-xl font-bold font-slab text-black mb-2">Heading 4</h4>
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded font-mono">text-xl font-bold font-slab</code>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 font-slab">Body Text</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xl font-flex text-gray-700 mb-2">Large body text - Used for introductions and emphasis</p>
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded font-mono">text-xl font-flex</code>
                </div>
                <div>
                  <p className="text-base font-flex text-gray-700 mb-2">Regular body text - Used for most content</p>
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded font-mono">text-base font-flex</code>
                </div>
                <div>
                  <p className="text-sm font-flex text-gray-600 mb-2">Small text - Used for captions and metadata</p>
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded font-mono">text-sm font-flex text-gray-600</code>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-black mb-8 font-slab">Buttons</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-4 font-slab">Primary Button</h3>
              <button className="bg-black text-white px-6 py-2.5 rounded text-base flex items-center gap-2 hover:bg-gray-800 transition-colors mb-4">
                Button Text
                <span className="text-lg">→</span>
              </button>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <code>{`<button className="bg-black text-white px-6 py-2.5 rounded text-base flex items-center gap-2 hover:bg-gray-800 transition-colors">
  Button Text
  <span className="text-lg">→</span>
</button>`}</code>
              </pre>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 font-slab">Text Link</h3>
              <a href="#" className="text-[#9185FF] underline hover:text-[#5B4FC6] font-medium mb-4 inline-block">
                Link Text
              </a>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <code>{`<a href="#" className="text-[#9185FF] underline hover:text-[#5B4FC6] font-medium">
  Link Text
</a>`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Components */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-black mb-8 font-slab">Components</h2>

          {/* Callout */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-4 font-slab">Callout Box</h3>
            <p className="text-gray-700 mb-4 font-flex">
              A highlighted container for important information or tips.
            </p>

            <Callout>
              <h4 className="text-xl font-bold mb-2 font-slab">Pro Tip</h4>
              <p className="text-gray-700 font-flex">This is an example of a callout box with the light purple background.</p>
            </Callout>

            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mt-4">
              <code>{`import Callout from '@/components/Callout'

<Callout>
  <h4>Pro Tip</h4>
  <p>This is an example of a callout box.</p>
</Callout>

// With custom className
<Callout className="border-l-4 border-purple-500">
  <p>Custom styled callout</p>
</Callout>`}</code>
            </pre>
          </div>

          {/* FAQ */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-4 font-slab">FAQ Component</h3>
            <p className="text-gray-700 mb-4 font-flex">
              Collapsible FAQ items for frequently asked questions.
            </p>

            <BlogFAQ
              items={[
                {
                  question: "How do I use this component?",
                  answer: <p>Import the BlogFAQ component and pass an array of items with question and answer properties.</p>
                },
                {
                  question: "Can I customize the styling?",
                  answer: <p>Yes, you can pass a custom className prop to add additional styles.</p>
                }
              ]}
            />

            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mt-4">
              <code>{`import BlogFAQ from '@/components/BlogFAQ'

<BlogFAQ
  items={[
    {
      question: "What is this?",
      answer: <p>This is the answer.</p>
    },
    {
      question: "How does it work?",
      answer: (
        <>
          <p>You can use multiple paragraphs.</p>
          <p>Or any JSX elements!</p>
        </>
      )
    }
  ]}
/>`}</code>
            </pre>
          </div>

          {/* Card */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-4 font-slab">Card Container</h3>
            <p className="text-gray-700 mb-4 font-flex">
              Standard card layout for content sections.
            </p>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h4 className="text-xl font-bold text-black mb-2 font-slab">Card Title</h4>
              <p className="text-gray-700 font-flex">Card content goes here. This is commonly used for features, services, or information blocks.</p>
            </div>

            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mt-4">
              <code>{`<div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
  <h4 className="text-xl font-bold text-black mb-2 font-slab">Card Title</h4>
  <p className="text-gray-700 font-flex">Card content goes here.</p>
</div>`}</code>
            </pre>
          </div>
        </section>

        {/* Layout Patterns */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-black mb-8 font-slab">Layout Patterns</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 font-slab">Two-Column Grid</h3>
              <div className="grid md:grid-cols-2 gap-8 mb-4">
                <div className="bg-gray-100 p-6 rounded-lg">Column 1</div>
                <div className="bg-gray-100 p-6 rounded-lg">Column 2</div>
              </div>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <code>{`<div className="grid md:grid-cols-2 gap-8">
  <div>Column 1</div>
  <div>Column 2</div>
</div>`}</code>
              </pre>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 font-slab">Three-Column Grid</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-4">
                <div className="bg-gray-100 p-6 rounded-lg">Column 1</div>
                <div className="bg-gray-100 p-6 rounded-lg">Column 2</div>
                <div className="bg-gray-100 p-6 rounded-lg">Column 3</div>
              </div>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <code>{`<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>`}</code>
              </pre>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 font-slab">Container Max Width</h3>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <code>{`// Standard content container
<div className="max-w-4xl mx-auto px-8 py-16">
  Content
</div>

// Wide content container
<div className="max-w-6xl mx-auto px-8 py-16">
  Content
</div>`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Spacing */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-black mb-8 font-slab">Spacing</h2>

          <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
            <div>
              <p className="font-bold mb-2 font-flex">Section Padding</p>
              <code className="text-sm font-mono">py-16 px-8</code>
              <p className="text-sm text-gray-600 mt-1">Used for main sections</p>
            </div>
            <div>
              <p className="font-bold mb-2 font-flex">Card Padding</p>
              <code className="text-sm font-mono">p-6</code>
              <p className="text-sm text-gray-600 mt-1">Used for cards and containers</p>
            </div>
            <div>
              <p className="font-bold mb-2 font-flex">Element Spacing</p>
              <code className="text-sm font-mono">space-y-6 or gap-6</code>
              <p className="text-sm text-gray-600 mt-1">Standard spacing between elements</p>
            </div>
            <div>
              <p className="font-bold mb-2 font-flex">Section Margin</p>
              <code className="text-sm font-mono">mb-12 or mb-16</code>
              <p className="text-sm text-gray-600 mt-1">Spacing between major sections</p>
            </div>
          </div>
        </section>

        {/* Border Radius */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-black mb-8 font-slab">Border Radius</h2>

          <div className="flex gap-8 items-center">
            <div>
              <div className="w-24 h-24 bg-purple-200 rounded mb-2"></div>
              <code className="text-sm font-mono">rounded (0.25rem)</code>
            </div>
            <div>
              <div className="w-24 h-24 bg-purple-200 rounded-lg mb-2"></div>
              <code className="text-sm font-mono">rounded-lg (0.5rem)</code>
            </div>
            <div>
              <div className="w-24 h-24 bg-purple-200 rounded-full mb-2"></div>
              <code className="text-sm font-mono">rounded-full</code>
            </div>
          </div>
        </section>

        <div className="mt-16 p-8 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
          <h3 className="text-2xl font-bold text-black mb-2 font-slab">Questions?</h3>
          <p className="text-gray-700 font-flex">
            Need help implementing these components or have suggestions for the design system?
            Contact us at <a href="mailto:emily@petsfriendz.com" className="text-[#9185FF] underline hover:text-[#5B4FC6] font-medium">emily@petsfriendz.com</a>
          </p>
        </div>
      </main>
    </div>
  )
}
