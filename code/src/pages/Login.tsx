import { useEffect, useState } from "react";
import {
	Button,
	Form,
	FormGroup,
	Label,
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	Input,
	Alert
} from "reactstrap"
import UiContext from '../contexts/ui.context'
import { Eye, EyeOff } from "react-feather"
import _ from 'lodash'
import unfetch from 'isomorphic-unfetch'

const IS_TEST = false

function Login() {
	const [email, setEmail] = useState<string>("")
	const [password, setPassword] = useState<string>("")
	const [errorMsg, setErrorMsg] = useState<string>("")
	const [pwdVisible, setPwdVisible] = useState<boolean>(false)
	const { setPageRoute, loginUri, appLoading, setAppLoading, currentUser, setCurrentUser } = UiContext.UseUIContext()

	const _login = () => {
		setAppLoading(true)
		setErrorMsg("")
		unfetch(loginUri, {
			method: "POST",
			headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
			body: JSON.stringify({ email: email, password: password })
		}).then((response) => {
			const { status } = response
			if (status === 401) {
				return setErrorMsg("Invalid account information")
			}
			return response.json()
		}).then((response) => {
			const user = {
				_id: _.get(response, "_id", ""),
				email: _.get(response, "email", ""),
				name: _.get(response, "name", ""),
				identity: _.get(response, "identity", ""),
				identity_label: _.get(response, "identity_label", ""),
				role: _.get(response, "role", ""),
				created_at: _.get(response, "created_at", ""),
				token: _.get(response, "token", ""),
				auth_docker: _.map(_.get(response, "auth_docker", []), auth_docker => {
					return {
						docker_id: _.get(auth_docker, "docker_id", ""),
						docker: {
							_id: _.get(auth_docker, ["docker", "_id"], ""),
							domain: _.get(auth_docker, ["docker", "domain"], ""),
							label: _.get(auth_docker, ["docker", "label"], ""),
							server: _.get(auth_docker, ["docker", "server"], ""),
							sku: _.get(auth_docker, ["docker", "sku"], "")
						}
					}
				})
			}
			setCurrentUser(user)
			setPageRoute("MAIN")
		}).then(() => {
			
			setAppLoading(false)
		}).catch(error => {
			
			setAppLoading(false)
			setErrorMsg("Invalid account information")
		})
	}

	return <>
		<h6 className="font-weight-bold mb-1"><strong>Welcome to POD Orders! 👋</strong></h6>
		<p className="mb-0 card-text"><i>Please sign-in to your account and start the adventure</i></p>
		<Form className="auth-login-form mt-2">
			<FormGroup>
				<Label for="login-email"><i>Email</i></Label>
				<Input
					type="email"
					placeholder="email@example.com"
					className="bg-white text-black"
					value={email}
					required={true}
					onChange={e => setEmail(e.target.value)}
					valid={false}
					disabled={appLoading}
				/>
			</FormGroup>
			<FormGroup className="mb-0 mt-1">
				<Label for="login-password"><i>Password</i></Label>
				<InputGroup>
					<Input
						type={pwdVisible ? "text" : "password"}
						placeholder="........"
						className="bg-white text-black"
						value={password}
						required={true}
						onChange={e => setPassword(e.target.value)}
						valid={false}
						disabled={appLoading}
					/>
					<InputGroupAddon className="cursor-pointer" addonType='append' onClick={() => setPwdVisible(!pwdVisible)}>
						<InputGroupText className="h-100">
							{pwdVisible ? <EyeOff size={14} /> : <Eye size={14} />}
						</InputGroupText>
					</InputGroupAddon>
				</InputGroup>
			</FormGroup>
			{
				errorMsg && <Alert color="danger" className="text-center mt-1 p-2"><strong>*Error:</strong> <i>{errorMsg}.</i></Alert>
			}
			<Button color="primary" type="submit" className="btn btn-primary btn-block w-100 mt-2" disabled={appLoading} onClick={_login}>Sign in</Button>
		</Form>
	</>
}
export default Login