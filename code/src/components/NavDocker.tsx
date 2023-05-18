import { useEffect, useRef, useState } from 'react'

import { NavLink, Collapse, Label } from 'reactstrap'
import Select, { StylesConfig } from 'react-select';

import { Server, User, LogOut, ChevronDown, ChevronUp } from "react-feather"
import { map, get, find } from 'lodash'
import UiContext, { useStorage } from '../contexts/ui.context'

export default function NavDocker() {
    const { currentUser, setCurrentUser, currentDocker, setCurrentDocker, setPageRoute } = UiContext.UseUIContext()
    const [popoverOpen, togglePopoverOpen] = useState<boolean>(false)
    const selectRef = useRef()
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

    const [docker] = useStorage("_pod_ext_docker")
    useEffect(() => {
        if (docker !== null && currentUser?.auth_docker) {
            setCurrentDocker(get(find(currentUser?.auth_docker, auth_docker => String(auth_docker?.docker?._id) === String(docker)), "docker", {}))
        }
    }, [docker, currentUser])

    const colourStyles: StylesConfig = {
        control: (styles) => ({ ...styles, backgroundColor: 'white' }),
        menu: (styles) => ({ ...styles, maxHeight: '150px', overflow: "hidden", padding: '0 6px' }),
        option: (styles) => ({ ...styles, maxHeight: "150px" })
    };

    const handleLogout = () => {
        setCurrentUser()
        setCurrentDocker()
        setPageRoute("LOGIN")
    }
    return (<div ref={wrapperRef} className='d-flex flex-column justify-content-end p-1 position-relative mb-2' style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.175)" }}>
        <NavLink onClick={() => togglePopoverOpen(!popoverOpen)} className='d-flex flex-wrap justify-content-between align-content-center align-items-center w-100' style={{ cursor: "pointer" }}>
            <div className='d-flex flex-wrap justify-content-start align-content-center align-items-center'>
                <Server size={14} />
                <span style={{ marginLeft: "3px" }} className={`text-nowrap ${!currentDocker?._id ?? "text-warning"}`}>
                    {
                        currentDocker?._id ? (currentDocker?.label ? currentDocker?.label : currentDocker?.domain) : "Pick your hub"
                    }
                </span>
            </div>
            <div className='d-flex flex-wrap justify-content-end align-content-center align-items-center'>
                <User style={{ marginLeft: "12px" }} size={14} />
                <span style={{ marginLeft: "3px" }} className='text-nowrap'>{currentUser.name}</span>
                {
                    popoverOpen ? <ChevronUp style={{ marginLeft: "3px" }} size={14} /> : <ChevronDown style={{ marginLeft: "3px" }} size={14} />
                }

            </div>
        </NavLink>
        <Collapse isOpen={popoverOpen} className='mt-3'>
            <div>
                <Label>Hub: </Label>
                <Select
                    className="basic-single w-100"
                    classNamePrefix="select"
                    placeholder="Select your hub"
                    isClearable={false}
                    isLoading={currentUser?.auth_docker === null || currentUser?.auth_docker == undefined}
                    isSearchable={true}
                    name="color"
                    options={map(currentUser?.auth_docker, docker => {
                        return {
                            id: get(docker, ["docker", "_id"], ""),
                            value: get(docker, ["docker", "label"], "") + " - " + get(docker, ["docker", "domain"], "") + "." + get(docker, ["docker", "server"], ""),
                            label: <div className='d-flex flex-column'><strong>{get(docker, ["docker", "label"], "")}</strong><i>{get(docker, ["docker", "domain"], "") + "." + get(docker, ["docker", "server"], "")}</i></div>
                        }
                    })}
                    styles={colourStyles}
                    onChange={(data) => {
                        setCurrentDocker(get(find(currentUser?.auth_docker, docker => docker?.docker?._id === get(data, "id", "")), "docker", {}))
                    }}
                />
            </div>
            <div className='d-inline-flex flex-wrap justify-content-end align-items-center w-100 mt-3 mb-2'>
                <NavLink className='d-inline-flex flex-wrap justify-content-end align-content-center align-items-center' style={{ cursor: "pointer", paddingRight: "0px" }} onClick={handleLogout}>
                    <LogOut size={14} />
                    <span style={{ marginLeft: "3px", fontSize: "11px" }}>Logout</span>
                </NavLink>
            </div>
        </Collapse>
    </div>)
}