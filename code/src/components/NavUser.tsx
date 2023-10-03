import { useEffect, useRef, useState } from 'react'
import { NavLink, Collapse, Spinner, Label, Input } from 'reactstrap'
import { User, LogOut, ChevronDown, ChevronUp, Server } from "react-feather"
import UiContext from '../contexts/ui.context'
import Select, { StylesConfig } from 'react-select';
import { map, get, find } from 'lodash'

const colourStyles: StylesConfig = {
    control: (styles) => ({ ...styles, backgroundColor: 'white' }),
    menu: (styles) => ({ ...styles, maxHeight: '150px', overflow: "hidden", padding: '0 6px' }),
    option: (styles) => ({ ...styles, maxHeight: "150px" })
};

export default function NavUser() {
    const { currentUser, setCurrentUser, currentToken, setCurrentToken, currentDocker, setCurrentDocker, templateId, setTemplateId } = UiContext.UseUIContext()
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
        setCurrentToken()
        setCurrentUser()
        setCurrentDocker({ _id: "" })
    }



    return (<div ref={wrapperRef} className='d-flex flex-column justify-content-end p-1 position-absolute w-100 bg-light ext-nav-user' style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.075)" }}>
        <NavLink onClick={() => togglePopoverOpen(!popoverOpen)} className={`d-flex flex-nowrap justify-content-between align-content-center align-items-center`} style={{ cursor: "pointer" }}>
            <div className='d-flex flex-wrap justify-content-start align-content-center align-items-center'>
                <Server size={14} />
                {
                    currentToken?.token ? <span style={{ marginLeft: "3px" }} className={`text-nowrap ${currentDocker?._id ? '' : "text-danger"}`}>
                        {
                            currentDocker?._id ? (currentDocker?.label ? currentDocker?.label : currentDocker?.domain) : "Pick your hub"
                        }
                    </span> : false
                }
            </div>
            <div className='d-flex flex-wrap justify-content-end align-content-center align-items-center'>

                <User style={{ marginLeft: "12px" }} size={18} />
                {
                    currentToken?.token === null || currentToken?.token === undefined ||
                        currentUser === null
                        ? <span style={{ marginLeft: "3px" }} className='text-nowrap'><Spinner size="sm" /></span>
                        : !currentUser?._id
                            ? <span style={{ marginLeft: "3px" }} className='text-nowrap'>Login</span>
                            : <span style={{ marginLeft: "3px" }} className='text-nowrap'>{currentUser?.first_name} {currentUser?.last_name}</span>
                }
                {
                    popoverOpen && currentUser?._id ? <ChevronUp style={{ marginLeft: "3px" }} size={14} /> : <ChevronDown style={{ marginLeft: "3px" }} size={18} />
                }
            </div>
        </NavLink>
        <Collapse isOpen={popoverOpen && !!currentUser?._id} className='mt-3'>
            <div className='mb-3'>
                <Label>Hub: </Label>
                <Select
                    className="basic-single w-100"
                    classNamePrefix="ext-select"
                    placeholder="Select your hub"
                    isClearable={false}
                    isLoading={currentUser?.docker === null || currentUser?.docker === undefined}
                    isSearchable={true}
                    name="color"
                    options={map(currentUser?.docker, docker => {
                        return {
                            id: get(docker, "_id", ""),
                            value: get(docker, "label", "") + " - " + get(docker, "domain", "") + "." + get(docker, "server", ""),
                            label: <div className='d-flex flex-column'><strong>{get(docker, "label", "")}</strong><i>{get(docker, "domain", "") + "." + get(docker, "server", "")}</i></div>
                        }
                    })}
                    styles={colourStyles}
                    onChange={(data) => {
                        setCurrentDocker(find(currentUser?.docker, docker => docker?._id === get(data, "id", "")))
                    }}
                    value={
                        {
                            id: currentDocker?._id,
                            value: currentDocker?._id ? get(currentDocker, "label", "") + " - " + get(currentDocker, "domain", "") + "." + get(currentDocker, "server", "") : "",
                            label: currentDocker?._id ? <div className='d-flex flex-column'><strong>{get(currentDocker, "label", "")}</strong><i>{get(currentDocker, "domain", "") + "." + get(currentDocker, "server", "")}</i></div> : <></>
                        }
                    }
                />
            </div>
            {/* <div className='mb-3'>
                <Label>Template ID: </Label>
                <Input
                    type="text"
                    placeholder="IT-01234-56789"
                    className="bg-white text-black"
                    value={templateId || ""}
                    required={true}
                    onChange={e => setTemplateId(e.target.value)}
                    valid={false}
                    style={{ fontSize: "initial" }}
                />
            </div> */}

            <div className='d-inline-flex flex-wrap justify-content-end align-items-center w-100 mb-2'>
                <NavLink className='d-inline-flex flex-wrap justify-content-end align-content-center align-items-center' style={{ cursor: "pointer", paddingRight: "0px" }} onClick={handleLogout}>
                    <LogOut size={14} />
                    <span style={{ marginLeft: "3px", fontSize: "11px" }}>Logout</span>
                </NavLink>
            </div>
        </Collapse>
    </div>)
}