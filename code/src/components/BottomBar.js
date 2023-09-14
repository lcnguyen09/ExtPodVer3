import { ReactNode } from 'react';

export default function BottomBar({ children }) {
    return <div className='position-absolute start-0 bottom-0 end-0 bg-white d-flex justify-content-end align-items-right p-2 border-top footer-action'>{children}</div>
}
