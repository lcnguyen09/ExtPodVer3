import { useEffect, useRef, useState } from 'react'
import { NavLink, Collapse, Spinner } from 'reactstrap'
import { User, LogOut, ChevronDown, ChevronUp } from "react-feather"
import UiContext from '../contexts/ui.context'


export default function NavUser() {
    const { currentUser, setCurrentUser, token, setToken, setPageRoute } = UiContext.UseUIContext()
    const [popoverOpen, togglePopoverOpen] = useState<boolean>(false)
    const wrapperRef = useRef<any>(null);
    useEffect(() => {
        function handleClickOutside(event: any) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                togglePopoverOpen(false)
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    useEffect(() => {
        togglePopoverOpen(false)
    }, [])

    function handleLogout() {
        setCurrentUser()
        setToken()
        setPageRoute("LOGIN")
    }
    return (<div ref={wrapperRef} className='d-flex flex-column justify-content-end p-1 position-relative bg-light' style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.075)" }}>
        <NavLink onClick={() => togglePopoverOpen(!popoverOpen)} className='d-flex flex-nowrap justify-content-end align-content-center align-items-center' style={{ cursor: "pointer" }}>
            <User style={{ marginLeft: "12px" }} size={18} />
            {
                token?.access_token === null || token?.access_token === undefined || (token?.access_token && !currentUser?._id)
                    ? <span style={{ marginLeft: "3px" }} className='text-nowrap'><Spinner size="sm" /></span>
                    : token?.access_token === ""
                        ? <span style={{ marginLeft: "3px" }} className='text-nowrap'>Login</span>
                        : <span style={{ marginLeft: "3px" }} className='text-nowrap'>{currentUser?.first_name} {currentUser?.last_name}</span>
            }
            {
                popoverOpen && currentUser?._id ? <ChevronUp style={{ marginLeft: "3px" }} size={14} /> : <ChevronDown style={{ marginLeft: "3px" }} size={18} />
            }
        </NavLink>
        <Collapse isOpen={popoverOpen && !!currentUser?._id} className='mt-3'>
            <div className='d-inline-flex flex-wrap justify-content-end align-items-center w-100 mb-2'>
                <NavLink className='d-inline-flex flex-wrap justify-content-end align-content-center align-items-center' style={{ cursor: "pointer", paddingRight: "0px" }} onClick={handleLogout}>
                    <LogOut size={14} />
                    <span style={{ marginLeft: "3px", fontSize: "11px" }}>Logout</span>
                </NavLink>
            </div>
        </Collapse>
    </div>)
}