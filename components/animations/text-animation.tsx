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
    "Workflows",
    "Identity",
    "Accounts",
];

// Should be in sync with CSS line-height
const lineHeight = 1;

type TextAnimationProps = {
    textSize?: string;
    lines?: string[];
    // Number of extra lines to show above and below highlighted line
    extraLinesToShow?: 0 | 1 | 2 | 3 | 4 | 5;
}

export function TextAnimation({
    textSize,
    lines = LINES,
    extraLinesToShow: _extraLinesToShow = 4
}: TextAnimationProps) {
    // repeat text options 3 times, so extra lines are shown above and below
    const linesToRender = lines.concat(lines, lines);

    const uniqueLines = lines.length;
    const totalLines = linesToRender.length;

    // Number of extra lines to show should not exceed the number of unique lines
    const extraLinesToShow = Math.min(_extraLinesToShow, uniqueLines);

    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    }, [])

    const [position, setPosition] = React.useState(0);
    const [currentLineIndex, setCurrentLineIndex] = React.useState(Math.floor(totalLines / 2));

    // Set position according to number of lines, so it never goes beyond the middle set
    const calculateProportionalPosition = React.useCallback((scroll: number) => {
        return Math.floor((scroll - 0.5) * (uniqueLines + 1));
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
        // opacity-[0] opacity-[0.6] opacity-[1]
        // extraLinesToShow = 5
        // opacity-[0.12] opacity-[0.24] opacity-[0.36] opacity-[0.48]
        // extraLinesToShow = 4
        // opacity-[0.15] opacity-[0.3] opacity-[0.45]
        // extraLinesToShow = 3
        // opacity-[0.2] opacity-[0.4]
        // extraLinesToShow = 2
        // opacity-[0.3]

        const distanceFromCurrentIdx = Math.abs(currentLineIndex - idx);

        // if text index === idx, opacity is 100%, otherwise should have less
        // opacity the further away from the currentLineIndex, starting at 0.7
        let opacity = 0;
        if (extraLinesToShow !== 0) {
            const offset = 0.6 * (distanceFromCurrentIdx - 1) / extraLinesToShow;
            opacity = Math.max(0, Math.round((0.6 - offset) * 100) / 100);
        }

        if (idx === currentLineIndex) {
            opacity = 1;
        }
        return `opacity-[${opacity}]`;
    }

    React.useEffect(() => {
        // get mouse vertical position to get position
        const getMousePosition = (e: MouseEvent) => {
            const newPosition = calculateProportionalPosition(e.clientY / window.innerHeight);
            const currentLineIndex = getCurrentLineIdx(newPosition);

            setCurrentLineIndex(currentLineIndex);
            setPosition(newPosition);
        }

        if (!isMobile) {
            document.addEventListener("mousemove", getMousePosition);
            return () => document.removeEventListener("mousemove", getMousePosition);
        }
    }, [isMobile, calculateProportionalPosition, getCurrentLineIdx]);

    React.useEffect(() => {
        // use gyroscope to get position
        const getGyroscopePosition = (e: DeviceOrientationEvent) => {
            const newPosition = calculateProportionalPosition(Math.max(0, (e.beta || 0) / 180));
            const currentLineIndex = getCurrentLineIdx(newPosition);

            setCurrentLineIndex(currentLineIndex);
            setPosition(newPosition);
        }


        if (isMobile) {
            window.addEventListener("deviceorientation", getGyroscopePosition);
            return () => window.removeEventListener("deviceorientation", getGyroscopePosition);
        }
    }, [isMobile, calculateProportionalPosition, getCurrentLineIdx]);

    const textSizeClasses = textSize || "text-2xl sm:text-4xl md:text-5xl lg:text-7xl";
    const headingClasses = cn(museoModerno.className, textSizeClasses, "flex items-center")

    return (
        <div className="fixed top-0 flex items-center justify-center h-full w-full overflow-hidden">
            <h1 className={headingClasses}>
                <span className="flex flex-col leading-none font-black text-right transition-transform select-none" style={textAnimateStyle}>
                    {linesToRender.map((text, idx) => (
                        <span
                            key={idx}
                            className={cn("transition-all text-foreground", getTextOpacity(idx), idx !== currentLineIndex && "scale-75 origin-right")}
                        >
                            {text}
                        </span>
                    ))}
                </span>
                <span className="flex gap-1 sm:gap-2 md:gap-3 ml-1 sm:ml-2 md:ml-3">
                    <span className="font-extralight">made</span>
                    <span className="font-black">simple.</span>
                </span>
            </h1>
        </div>
    );
}