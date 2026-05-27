import { ACHIEVEMENTS_CONFIG } from "@/lib/achievements";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { X, Download, Share2, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function CertificatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const achievement = ACHIEVEMENTS_CONFIG.find((a) => a.id === id);

  if (!achievement) {
    notFound();
  }

  return (
    <main className="relative min-h-screen w-full bg-black flex items-center justify-center overflow-hidden">
      {/* Blurred Background Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src={achievement.image}
          alt=""
          fill
          className="object-cover opacity-40 blur-[100px] scale-110"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Navigation UI */}
      <div className="absolute top-0 left-0 w-full z-20 p-6 md:p-10 flex justify-between items-center bg-gradient-to-b from-black/60 to-transparent">
        <Link href="/#achievements">
          <Button variant="ghost" className="text-white hover:bg-white/10 gap-2 font-mono uppercase tracking-widest">
            <ChevronLeft className="w-5 h-5" /> Back to Site
          </Button>
        </Link>
        <div className="flex gap-4">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full" title="Share">
            <Share2 className="w-5 h-5" />
          </Button>
          <a href={achievement.image} download={`${achievement.id}.svg`}>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full" title="Download">
              <Download className="w-5 h-5" />
            </Button>
          </a>
          <Link href="/#achievements">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full" title="Close">
              <X className="w-6 h-6" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 w-full max-w-6xl px-6 py-20 flex flex-col items-center">
        <div className="w-full aspect-[16/9] relative shadow-[0_0_100px_rgba(0,0,0,0.5)] rounded-lg overflow-hidden border border-white/10 bg-black/20 backdrop-blur-sm">
          <Image
            src={achievement.image}
            alt={achievement.title}
            fill
            className="object-contain p-4 md:p-8"
            priority
          />
        </div>

        <div className="mt-12 text-center max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-serif text-white mb-4">
            {achievement.title}
          </h1>
          <p className="text-primary font-mono text-lg mb-6 uppercase tracking-widest">
            {achievement.issuer} • {achievement.date}
          </p>
          <p className="text-white/60 font-light leading-relaxed text-lg">
            {achievement.description}
          </p>
        </div>
      </div>
    </main>
  );
}
