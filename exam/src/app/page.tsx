import Link from 'next/link';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-row gap-8 row-start-2 items-center sm:items-start sm-500:flex-col">
        <Link href="/market"><span className="border border-black p-2 rounded-lg text-[#006BA1] hover:bg-[#003f7d] hover:text-white">go to the market</span></Link>
        <Link href="/transform"><span className="border border-black p-2 rounded-lg text-[#006BA1] hover:bg-[#E32322] hover:text-white">go to the office</span></Link>
      </main>
    </div>
  );
}
