import { ReactNode } from 'react';

export default function BottomBar({ children, className }: { children: ReactNode, className?: any }) {
    return <div className={`position-absolute start-0 bottom-0 end-0 bg-white d-flex justify-content-between align-items-right p-2 border-top footer-action ${typeof className === 'string' ? className : ''}`}>{children}</div>
}