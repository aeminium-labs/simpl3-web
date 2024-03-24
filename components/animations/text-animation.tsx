"use client"

import React from "react";
import { cn } from "@/lib/utils"
import { museoModerno } from "@/app/fonts";

const LINES = [
    "Blockchain",
    "Rewards",
    "Subscriptions",
    "Payments",
    "Notifications",
    "Bridging",
    "Membership",
    "Identity",
    "Accounts",
];

// Should be in sync with CSS line-height
const lineHeight = 1;

export function TextAnimation() {
    // repeat text options 3 times
    const linesToRender = LINES.concat(LINES, LINES);

    const uniqueLines = LINES.length;
    const totalLines = linesToRender.length;

    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    }, [])

    const [position, setPosition] = React.useState(0);
    const [currentLineIndex, setCurrentLineIndex] = React.useState(Math.floor(totalLines / 2));

    // Set position according to number of lines, so it never goes beyond the set
    const calculateProportionalPosition = React.useCallback((position: number) => {
        return Math.floor((position - 0.5) / (uniqueLines + 1) * 100);
    }, [uniqueLines]);

    // Calculate highlighted line based on position, starting from the middle
    const getCurrentLineIdx = React.useCallback((position: number) => {
        return Math.floor(totalLines / 2 - position);
    }, [totalLines]);

    const textAnimateStyle = {
        transform: `translateY(${position * lineHeight}em)`,
    }

    const getTextOpacity = (idx: number) => {
        // Preload Tailwind classes
        // opacity-[0] opacity-[0.03]  opacity-[0.2] opacity-[0.37] opacity-[0.53] opacity-[1]

        // if text index === idx, opacity 100%, otherwise should be less opacity the further away from the currentLineIndex
        let opacity = Math.max(0, 1 - Math.abs(currentLineIndex - idx) / 6) - 0.3;
        opacity = Math.max(0, Math.round(opacity * 100) / 100)
        if (idx === currentLineIndex) {
            opacity = 1;
        }
        return `opacity-[${opacity}]`;
    }

    React.useEffect(() => {
        // get mouse vertical position to get position
        const getMousePosition = (e: MouseEvent) => {
            const position = calculateProportionalPosition(e.clientY / window.innerHeight);
            const currentLineIndex = getCurrentLineIdx(position);

            setCurrentLineIndex(currentLineIndex);
            setPosition(position);
        }

        if (!isMobile) {
            document.addEventListener("mousemove", getMousePosition);
            return () => document.removeEventListener("mousemove", getMousePosition);
        }
    }, [isMobile, calculateProportionalPosition, getCurrentLineIdx]);

    React.useEffect(() => {
        // use gyroscope to get position
        const getGyroscopePosition = (e: DeviceOrientationEvent) => {
            const position = calculateProportionalPosition(Math.max(0, (e.beta || 0) / 180));
            const currentLineIndex = getCurrentLineIdx(position);

            setCurrentLineIndex(currentLineIndex);
            setPosition(position);
        }


        if (isMobile) {
            window.addEventListener("deviceorientation", getGyroscopePosition);
            return () => window.removeEventListener("deviceorientation", getGyroscopePosition);
        }
    }, [isMobile, calculateProportionalPosition, getCurrentLineIdx]);

    const headingClasses = cn(museoModerno.className, "flex items-center text-2xl sm:text-4xl md:text-5xl lg:text-7xl")

    return (
        <div className="flex items-center justify-center h-full w-full text-2xl leading-relaxed font-light overflow-hidden">
            <h1 className={headingClasses}>
                <span className="flex flex-col leading-none font-black text-right transition-transform select-none" style={textAnimateStyle}>
                    {linesToRender.map((text, idx) => (
                        <span
                            key={idx}
                            className={cn("transition-opacity text-foreground", getTextOpacity(idx))}
                        >
                            {text}
                        </span>
                    ))}
                </span>
                <span className="flex gap-3 ml-3">
                    <span className="font-extralight">made</span>
                    <span className="font-black">simple.</span>

                </span>
            </h1>
        </div>
    );
}