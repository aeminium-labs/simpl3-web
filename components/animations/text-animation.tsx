"use client"

import React from "react";
import { cn } from "@/lib/utils"
import { museoModerno } from "@/app/fonts";
import Image from "next/image";

const LINES = [
    "Payments",
    "Bridging",
    "Identity",
    "Blockchain",
    "Rewards",
    "Membership",
    "Transactions",
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

    // use gyroscope to get position

    const textAnimateStyle = {
        transform: `translateY(${position * lineHeight}em)`,
    }

    const calcTextColor = (idx: number) => {
        // if text index === idx, opacity 100%, otherwise should be less opacity the further away from the currentLineIndex
        let opacity = Math.max(0, 1 - Math.abs(currentLineIndex - idx) / 5) - 0.2;
        if (idx === currentLineIndex) {
            opacity = 1;
        }
        return `rgba(0, 0, 0, ${opacity})`;
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
                <span className="flex flex-col leading-none font-black text-right transition duration-100 select-none" style={textAnimateStyle}>
                    {linesToRender.map((text, idx) => (
                        <span
                            key={idx}
                            className="transition duration-100"
                            style={{ color: calcTextColor(idx) }}
                        >
                            {text}
                        </span>
                    ))}
                </span>
                <span className="flex gap-3 ml-3">
                    <span className="font-extralight">made</span>
                    <span className="relative w-[100px] md:w-[200px] h-auto">
                        <Image
                            src="/../simpl3.svg"
                            alt="simpl3 Logo"
                            fill={true}
                            className="mt-px md:mt-1"
                        />
                    </span>
                </span>
            </h1>
        </div>
    );
}