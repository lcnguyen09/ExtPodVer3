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
import { Eye, EyeOff } from "react-feather"
import _ from 'lodash'

interface FormProps {
	onClose?: () => void
}

export default ({ onClose }: FormProps) => {
	const [loading, setLoading] = useState<boolean>(false)
	const [email, setEmail] = useState<string>("")
	const [password, setPassword] = useState<string>("")
	const [pwdVisible, setPwdVisible] = useState<boolean>(false)


	useEffect(() => {
	}, [])

	const _onClose = () => {
		if (onClose) {
			onClose()
		}
	}



	return <>
		<h6 className="font-weight-bold mb-1"><strong>Welcome to POD Orders! 👋</strong></h6>
		<p className="mb-0 card-text"><i>Please sign-in to your account and start the adventure</i></p>
		<Form className="auth-login-form mt-2" onSubmit={() => false}>
			<FormGroup>
				<Label for="login-email">Email</Label>
				<Input
					type="email"
					placeholder="email@example.com"
					className="bg-white text-black"
					value={email}
					required={true}
					onChange={e => setEmail(e.target.value)}
					valid={false}
				/>
			</FormGroup>
			<FormGroup className="mb-0">
				<Label for="login-password">Password</Label>
				<InputGroup>
					<Input
						type={pwdVisible ? "text" : "password"}
						placeholder="........"
						className="bg-white text-black"
						value={password}
						required={true}
						onChange={e => setPassword(e.target.value)}
						valid={false}
					/>
					<InputGroupAddon className="cursor-pointer" addonType='append' onClick={() => setPwdVisible(!pwdVisible)}>
						<InputGroupText className="h-100">
							{pwdVisible ? <EyeOff size={14} /> : <Eye size={14} />}
						</InputGroupText>
					</InputGroupAddon>
				</InputGroup>
			</FormGroup>
			<Button color="primary" type="submit" className="waves-effect btn btn-primary btn-block w-100 mt-2" disabled={loading}>Sign in</Button>
		</Form>
	</>
}