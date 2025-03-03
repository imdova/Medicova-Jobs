import clsx from 'clsx';
import React from 'react';

interface StatusCardProps {
    title: string;
    value: string | number;
    icon: React.ElementType;
    className?: string;
    trend: {
        value: string;
        description: string;
        trendDirection: 'up' | 'down';
    };
}

const StatusCard: React.FC<StatusCardProps> = ({ title, value, icon, trend, className }) => {
    const Icon = icon;
    const trendColor = trend.trendDirection === 'up' ? 'text-green-600' : 'text-red-600';
    const trendIcon = trend.trendDirection === 'up' ? (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
        </svg>
    ) : (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
            />
        </svg>
    );

    return (
        <article className={clsx(
            "rounded-base shadow-soft border border-gray-100 bg-white p-6",
            className,
        )}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500">{title}</p>
                    <p className="text-2xl font-medium text-gray-900">{value}</p>
                </div>
                <Icon className="h-10 w-10 rounded-full bg-primary-100 block p-2 text-primary" />
            </div>
            <div className={`mt-1 flex gap-1 ${trendColor}`}>
                {trendIcon}
                <p className="flex gap-2">
                    <span className="font-medium text-xs">{trend.value}</span>
                    <span className="text-gray-500 text-xs ">{trend.description}</span>
                </p>
            </div>
        </article>
    );
};

export default StatusCard;