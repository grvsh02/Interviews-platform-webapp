import React from 'react';

type StatusTagProps = {
    status?: 'inReview' | 'Accepted' | 'Rejected'
}

const StatusTag = ({ status = 'inReview' }: StatusTagProps) => {
    return (
        <div className={`rounded-full px-2 py-1 text-xs font-semibold ${status === 'inReview' ? 'bg-yellow-400 text-black' : status === 'Accepted' ? 'bg-green-400 text-white' : 'bg-red-400 text-white'}`}>
            {status}
        </div>
    )
}

export default StatusTag