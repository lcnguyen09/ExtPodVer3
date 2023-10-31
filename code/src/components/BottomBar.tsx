import { ReactNode } from 'react';

export default function BottomBar({ children }: { children: ReactNode }) {
    return <div className='position-absolute start-0 bottom-0 end-0 bg-white d-flex justify-content-between align-items-right p-2 border-top footer-action'>{children}</div>
}