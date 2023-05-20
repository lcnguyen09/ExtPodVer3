import { Dispatch, SetStateAction, useState } from "react";
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
import { useSignInMutation } from "./../graphql/graphql";

function Login() {
	const [email, setEmail]: [string, Dispatch<SetStateAction<string>>] = useState<string>("")
	const [password, setPassword]: [string, Dispatch<SetStateAction<string>>] = useState<string>("")
	const [errorMsg, setErrorMsg]: [string, Dispatch<SetStateAction<string>>] = useState<string>("")
	const [pwdVisible, setPwdVisible]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false)
	const {
		setPageRoute,
		appLoading,
		setAppLoading,
		setCurrentUser,
		setToken
	} = UiContext.UseUIContext()
	const [signInMutation] = useSignInMutation({ fetchPolicy: "network-only" })

	function handleSignIn() {
		setAppLoading(true)
		setErrorMsg("")
		signInMutation({
			variables: {
				signInInput: {
					email: email,
					password: password,
					remember: true
				}
			},
			fetchPolicy: "network-only"

		}).then(res => {
			if (res?.data?.signIn?._id) {
				setCurrentUser(res?.data?.signIn)
				return setToken(res?.data?.signIn?.token)
			} else {
				throw new Error("Invalid account information")
			}
		}).then(() => {
			setPageRoute("MAIN")
			setAppLoading(false)
		}).catch(error => {
			setErrorMsg(error?.message)
			setAppLoading(false)
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
			<Button color="primary" type="submit" className="btn btn-primary btn-block w-100 mt-2" disabled={appLoading} onClick={handleSignIn}>Sign in</Button>
		</Form>
	</>
}
export default Login