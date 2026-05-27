"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
    DrawerTitle,
    DrawerClose,
    DrawerHeader,
    DrawerFooter,
} from "@/components/ui/drawer";
import { Award, ExternalLink, X, Maximize2 } from "lucide-react";
import { TextScramble } from "@/components/shared/TextScramble";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ACHIEVEMENTS_CONFIG, Achievement } from "@/lib/achievements";

export default function Achievements() {
    const sectionRef = useRef<HTMLElement>(null);
    const [selectedAchievement, setSelectedAchievement] =
        useState<Achievement | null>(null);

    const handleOpenCertificate = (id: string) => {
        window.open(`/certificate/${id}`, "_blank");
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Section heading clip reveal
            gsap.fromTo(
                ".achievements-heading",
                { clipPath: "inset(100% 0 0 0)" },
                {
                    clipPath: "inset(0% 0 0 0)",
                    duration: 1.2,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: ".achievements-heading",
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                },
            );

            // Achievement cards stagger fade-up
            gsap.fromTo(
                ".achievement-card",
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".achievements-grid",
                        start: "top 85%",
                        toggleActions: "play none none none",
                    },
                },
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="achievements"
            className="relative min-h-screen py-24 px-6 md:px-12 overflow-hidden border-t border-border"
        >
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none">
                <div
                    className="absolute inset-0 h-full w-full"
                    style={{
                        backgroundImage: `linear-gradient(to right, oklch(0.92 0.004 286.32 / 0.1) 1px, transparent 1px), 
                            linear-gradient(to bottom, oklch(0.92 0.004 286.32 / 0.1) 1px, transparent 1px)`,
                        backgroundSize: "40px 40px",
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto relative">
                <div className="mb-16">
                    <h2 className="achievements-heading text-4xl md:text-6xl font-serif mb-4 flex items-center gap-4">
                        {/* <Award className="w-10 h-10 text-primary" /> */}
                        <TextScramble text="Achievements" />
                    </h2>
                    <p className="text-muted-foreground max-w-2xl text-lg font-mono">
                        Recognitions and certifications earned through hard work
                        and dedication.
                    </p>
                </div>

                <div className="achievements-grid grid grid-cols-1 md:grid-cols-2 gap-8">
                    {ACHIEVEMENTS_CONFIG.map((achievement) => (
                        <Drawer key={achievement.id}>
                            <DrawerTrigger asChild>
                                <div
                                    className="achievement-card cursor-pointer group"
                                    onClick={() =>
                                        setSelectedAchievement(achievement)
                                    }
                                >
                                    <Card className="h-full bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-500 overflow-hidden relative">
                                        <CardContent className="p-0 flex flex-col h-full">
                                            {/* Placeholder Image with aspect ratio */}
                                            <div className="relative w-full aspect-[16/9] bg-muted overflow-hidden">
                                                <Image
                                                    src={achievement.image}
                                                    alt={achievement.title}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                    sizes="(max-width: 768px) 100vw, 50vw"
                                                />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                                    <Maximize2 className="text-white w-8 h-8" />
                                                </div>
                                            </div>

                                            <div className="p-8">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="flex gap-2 flex-wrap">
                                                        {achievement.tags.map(
                                                            (tag) => (
                                                                <Badge
                                                                    key={tag}
                                                                    variant="secondary"
                                                                    className="font-mono text-[10px] uppercase tracking-wider"
                                                                >
                                                                    {tag}
                                                                </Badge>
                                                            ),
                                                        )}
                                                    </div>
                                                    <span className="text-muted-foreground font-mono text-sm">
                                                        {achievement.date}
                                                    </span>
                                                </div>

                                                <h3 className="text-2xl font-serif mb-2 group-hover:text-primary transition-colors">
                                                    {achievement.title}
                                                </h3>
                                                <p className="text-muted-foreground font-mono text-sm mb-6 line-clamp-2">
                                                    {achievement.description}
                                                </p>

                                                <div className="mt-auto flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                                                    View Details{" "}
                                                    <ExternalLink className="w-3 h-3" />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </DrawerTrigger>

                            <DrawerContent className="fixed inset-x-0 bottom-0 z-50 flex h-[96vh] flex-col rounded-t-[20px] border border-border bg-background">
                                <div className="mx-auto mt-4 h-2 w-[100px] shrink-0 rounded-full bg-muted" />
                                <div className="flex-1 overflow-y-auto px-6 py-8 md:px-12">
                                    <div className="mx-auto w-full max-w-4xl">
                                        <DrawerHeader className="px-0 pt-0">
                                            <div className="flex justify-between items-start mb-6">
                                                <div className="flex gap-2 flex-wrap">
                                                    {selectedAchievement?.tags.map(
                                                        (tag) => (
                                                            <Badge
                                                                key={tag}
                                                                variant="secondary"
                                                                className="font-mono text-[10px] uppercase tracking-wider"
                                                            >
                                                                {tag}
                                                            </Badge>
                                                        ),
                                                    )}
                                                </div>
                                                <DrawerClose asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="rounded-full hover:bg-muted/50 transition-colors"
                                                    >
                                                        <X className="w-5 h-5" />
                                                    </Button>
                                                </DrawerClose>
                                            </div>
                                            <DrawerTitle className="text-4xl md:text-6xl font-serif mb-4 leading-tight">
                                                {selectedAchievement?.title}
                                            </DrawerTitle>
                                            <p className="text-primary font-mono text-lg md:text-xl">
                                                {selectedAchievement?.issuer} •{" "}
                                                {selectedAchievement?.date}
                                            </p>
                                        </DrawerHeader>

                                        <div className="space-y-12 pb-24">
                                            <div
                                                className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-border group cursor-zoom-in mt-8"
                                                onClick={() =>
                                                    handleOpenCertificate(
                                                        selectedAchievement!.id,
                                                    )
                                                }
                                            >
                                                <Image
                                                    src={
                                                        selectedAchievement?.image ||
                                                        ""
                                                    }
                                                    alt={
                                                        selectedAchievement?.title ||
                                                        ""
                                                    }
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 1280px) 100vw, 1200px"
                                                />
                                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <span className="bg-background/80 backdrop-blur-md px-6 py-3 rounded-full text-sm font-mono flex items-center gap-2 shadow-2xl">
                                                        <Maximize2 className="w-4 h-4" />{" "}
                                                        View Full Certificate
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="max-w-3xl">
                                                <h4 className="text-xl font-mono text-foreground mb-6 uppercase tracking-[0.2em] border-b border-border pb-4">
                                                    Achievement Details
                                                </h4>
                                                <div className="prose prose-invert max-w-none">
                                                    <p className="text-muted-foreground text-lg md:text-xl leading-relaxed font-light">
                                                        {
                                                            selectedAchievement?.longDescription
                                                        }
                                                    </p>
                                                </div>

                                                {selectedAchievement?.link && (
                                                    <div className="mt-12">
                                                        <Button
                                                            asChild
                                                            className="w-full md:w-auto px-12 h-16 text-lg font-mono uppercase tracking-widest rounded-full transition-all hover:scale-[1.02] active:scale-[0.98]"
                                                        >
                                                            <a
                                                                href={
                                                                    selectedAchievement.link
                                                                }
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                Verify
                                                                Certificate{" "}
                                                                <ExternalLink className="ml-2 w-5 h-5" />
                                                            </a>
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </DrawerContent>
                        </Drawer>
                    ))}
                </div>
            </div>
        </section>
    );
}
