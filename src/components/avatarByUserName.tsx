import React from 'react';

interface AvatarProps {
    username: string;
    size?: number;
    bgColor?: string;
    textColor?: string;
}

const getRandomColor = (seed: string) => {
    const hash = [...seed].reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const r = (hash * 123) % 256;
    const g = (hash * 321) % 256;
    const b = (hash * 231) % 256;
    return `rgb(${r},${g},${b})`;
};

export const AvatarByUserName = ({ username, size = 40, bgColor, textColor = '#fff' }: AvatarProps) => {
    const initial = username.charAt(0).toUpperCase();
    const colorSeed = username.slice(0, 2);
    const backgroundColor = bgColor || getRandomColor(colorSeed);

    return (
        <svg
            width={size}
            height={size}
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 ${size} ${size}`}
            className="object-cover border rounded-full"
            aria-label="user avatar"
        >
            <circle cx="50%" cy="50%" r="50%" fill={backgroundColor} />
            <text
                x="50%"
                y="50%"
                fontFamily="Arial, sans-serif"
                fontSize={size / 2}
                fill={textColor}
                textAnchor="middle"
                dominantBaseline="middle"
            >
                {initial}
            </text>
        </svg>
    );
};
