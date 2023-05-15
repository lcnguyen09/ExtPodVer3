import { useState } from "react";
import {
	Button,
	Form,
	FormGroup,
	Label,
	InputGroup,
	InputGroupText,
	Input,
} from "reactstrap"
import UiContext from './contexts/ui.context'
import { Eye, EyeOff } from "react-feather"
// import _ from 'lodash'

function Login() {
	const [loading, setLoading] = useState<boolean>(false)
	const [email, setEmail] = useState<string>("")
	const [password, setPassword] = useState<string>("")
	const [pwdVisible, setPwdVisible] = useState<boolean>(false)
	const { setPageRoute } = UiContext.UseUIContext()

	return <>
		<h6 className="font-weight-bold mb-1"><strong>Welcome to POD Orders! 👋</strong></h6>
		<p className="mb-0 card-text"><i>Please sign-in to your account and start the adventure</i></p>
		<Form className="auth-login-form mt-2">
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
					disabled={loading}
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
						disabled={loading}
					/>
						<InputGroupText className="h-100" onClick={() => setPwdVisible(!pwdVisible)}>
							{pwdVisible ? <EyeOff size={14} /> : <Eye size={14} />}
						</InputGroupText>
				</InputGroup>
			</FormGroup>
			<Button color="primary" type="submit" className="btn btn-primary btn-block w-100 mt-2" disabled={loading} onClick={() => {
				setLoading(true)
				setTimeout(() => {
					setPageRoute("MAIN")
				}, 3000);
			}}>Sign in</Button>
		</Form>
	</>
}
export default Login