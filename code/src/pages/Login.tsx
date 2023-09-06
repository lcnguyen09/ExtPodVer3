import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
	Button,
	Form,
	FormGroup,
	Label,
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	Input,
	Alert,
	Spinner,
} from 'reactstrap';
import UiContext from '../contexts/ui.context';
import { Eye, EyeOff } from 'react-feather';
import $ from 'jquery';
import { URL_ACCOUNT_PODORDER } from './../contexts/contants';
import { drop, head, map } from 'lodash';

function Login() {
	const [loading, setLoading]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);
	const [email, setEmail]: [string, Dispatch<SetStateAction<string>>] = useState<string>('');
	const [password, setPassword]: [string, Dispatch<SetStateAction<string>>] = useState<string>('');
	const [errorMsg, setErrorMsg]: [string, Dispatch<SetStateAction<string>>] = useState<string>('');
	const [pwdVisible, setPwdVisible]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);
	const { setPageRoute, setCurrentUser, setCurrentToken } = UiContext.UseUIContext();

	function signIn() {
		$.ajax({
			url: URL_ACCOUNT_PODORDER,
			method: 'POST',
			data: {
				email: email,
				password: password,
			},
		})
			.done(function (res) {
				if (res?._id) {
					setCurrentUser({
						_id: res?._id,
						email: res?.email,
						first_name: head(res?.name.split(' ')),
						last_name: drop(res?.name.split(' ')).join(' '),
						fullname: res?.name,
						docker: map(res?.auth_docker, (auth_docker) => {
							return {
								_id: auth_docker?.docker?._id,
								domain: auth_docker?.docker?.domain,
								label: auth_docker?.docker?.label,
								server: auth_docker?.docker?.server,
								sku: auth_docker?.docker?.sku,
							};
						}),
					});
					setCurrentToken({
						token: res?.token,
					});
					setPageRoute('MAIN');
					setLoading(false);
				} else {
					throw new Error('Invalid account information');
				}
			})
			.fail((error) => {
				setErrorMsg(error?.responseText || 'Invalid account information');
				setLoading(false);
			});
	}

	function handleSignIn() {
		setLoading(true);
		setErrorMsg('');
		signIn();
	}

	return (
		<>
			{loading && (
				<div className='position-absolute w-100 h-100 top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center overlay-div'>
					<Spinner color='primary' />
				</div>
			)}
			<h6 className='font-weight-bold mb-1'>
				<strong>Welcome to POD Orders! 👋</strong>
			</h6>
			<p className='mb-0 card-text'>
				<i>Please sign-in to your account and start the adventure</i>
			</p>
			<Form className='auth-login-form mt-2'>
				<FormGroup>
					<Label for='login-email'>
						<i>Email</i>
					</Label>
					<Input
						type='email'
						placeholder='email@example.com'
						className='bg-white text-black'
						value={email}
						required={true}
						onChange={(e) => setEmail(e.target.value)}
						valid={false}
						disabled={loading}
					/>
				</FormGroup>
				<FormGroup className='mb-0 mt-1'>
					<Label for='login-password'>
						<i>Password</i>
					</Label>
					<InputGroup>
						<Input
							type={pwdVisible ? 'text' : 'password'}
							placeholder='........'
							className='bg-white text-black'
							value={password}
							required={true}
							onChange={(e) => setPassword(e.target.value)}
							valid={false}
							disabled={loading}
						/>
						<InputGroupAddon className='cursor-pointer' addonType='append' onClick={() => setPwdVisible(!pwdVisible)}>
							<InputGroupText className='h-100'>{pwdVisible ? <EyeOff size={14} /> : <Eye size={14} />}</InputGroupText>
						</InputGroupAddon>
					</InputGroup>
				</FormGroup>
				{errorMsg && (
					<Alert color='danger' className='text-center mt-1 p-2'>
						<strong>*Error:</strong> <i>{errorMsg}.</i>
					</Alert>
				)}
				<Button
					color='primary'
					type='submit'
					className='btn btn-primary btn-block w-100 mt-2'
					disabled={loading}
					onClick={handleSignIn}
				>
					Sign in
				</Button>
			</Form>
		</>
	);
}
export default Login;
