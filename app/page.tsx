import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>AI Image Generator</title>
        <meta name="description" content="Generate stunning AI images instantly." />
      </Head>
      <main className="bg-gradient-to-br from-gray-900 to-black min-h-screen text-white font-sans">
        {/* Hero Section */}
        <section className="text-center py-24 px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Create Stunning Images with AI</h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">Unleash creativity with just a few words.</p>
          <a
            href="/generate"
            className="bg-indigo-600 hover:bg-indigo-700 transition-all text-white font-semibold py-3 px-6 rounded-lg text-lg"
          >
            Generate Now
          </a>
        </section>

        {/* Features */}
        <section className="py-20 bg-black px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              {
                title: "Realistic Outputs",
                desc: "AI trained on millions of images gives ultra-realistic results.",
              },
              {
                title: "Fast & Free",
                desc: "Generate high-quality images in seconds at no cost.",
              },
              {
                title: "Customizable",
                desc: "Control styles, prompts, and quality for creative freedom.",
              },
            ].map(({ title, desc }) => (
              <div key={title}>
                <h3 className="text-2xl font-semibold mb-3">{title}</h3>
                <p className="text-gray-400">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Demo / Gallery */}
        <section className="py-20 px-6 bg-gradient-to-t from-black via-gray-900 to-black">
          <h2 className="text-4xl text-center font-bold mb-12">See What AI Can Do</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {["/demo1.jpg", "/demo2.jpg", "/demo3.jpg", "/demo4.jpg"].map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Demo ${i + 1}`}
                className="rounded-xl object-cover shadow-lg transition-transform hover:scale-105 duration-300"
              />
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black py-12 text-center text-gray-500 text-sm">
          <p>© 2025 AI Image Generator. All rights reserved.</p>
        </footer>
      </main>
    </>
  );
}
