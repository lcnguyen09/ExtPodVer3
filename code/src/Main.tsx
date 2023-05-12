import { useEffect, useState } from "react";
import {
	Button,
	Card,
	CardBody,
	Form,
	FormGroup,
	Label,
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	Input,
} from "reactstrap"
import _ from 'lodash'
import { useChromeStorageLocal } from 'use-chrome-storage'

interface FormProps {
	onClose?: () => void
}

export default ({ onClose }: FormProps) => {
	const [loading, setLoading] = useState<boolean>(false)
	const [email, setEmail] = useState<string>("")
	const [password, setPassword] = useState<string>("")
	const [pwdVisible, setPwdVisible] = useState<boolean>(false)
	const [value, setValue] = useState<string>("")
	// const [value, setValue, isPersistent, error, isInitialStateResolved] = useChromeStorageLocal('token', "")


	useEffect(() => {
	}, [])

	const _onClose = () => {
		if (onClose) {
			onClose()
		}
	}



	return <>
		<div>Value: {value}</div>
        <button
          onClick={() => {
            setValue(prev => "ABC123")
          }}
        >
          Increment in Local Storage
        </button>
		<button
          onClick={() => {
            setValue(prev => "")
          }}
        >
          Increment in Local Storage
        </button>
	</>
}