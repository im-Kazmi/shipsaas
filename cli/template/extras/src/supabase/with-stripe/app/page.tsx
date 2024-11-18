import Link from 'next/link';

export default async function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-neutral-800 text-white">
      <div className="flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500 bg-clip-text text-5xl font-extralight tracking-tight text-transparent text-white sm:text-[5rem]">
          project1
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <Link
            className="flex max-w-xs flex-col gap-4 bg-white/5 p-4 text-white hover:bg-white/20"
            href="https://create.t3.gg/en/usage/first-steps"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">First Steps →</h3>
            <div className="text-lg">
              Just the basics - Everything you need to know to set up your
              database and authentication.
            </div>
          </Link>
          <Link
            className="flex max-w-xs flex-col gap-4 bg-white/5 p-4 text-white hover:bg-white/20"
            href="https://create.t3.gg/en/introduction"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">Documentation →</h3>
            <div className="text-lg">
              Learn more about Create Rocket App, the libraries it uses, and how
              to deploy it.
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
