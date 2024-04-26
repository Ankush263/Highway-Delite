import {
	Alert,
	Box,
	Button,
	Flex,
	Image,
	Input,
	PasswordInput,
	Text,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import { login } from '../api';

interface LoginFormDetails {
	email: string;
	password: string;
}

function Login() {
	const [formDetails, setFormDetails] = useState<LoginFormDetails>({
		email: '',
		password: '',
	});
	const [showAlert, setShowAlert] = useState(false);
	const [alertMsg, setAlertMsg] = useState('');
	const history = useHistory();

	const handleSignup = async () => {
		const { email, password } = formDetails;

		if (email.length === 0 || password.length === 0) {
			setShowAlert(true);
			setAlertMsg('Plese fill the whole login form');

			setTimeout(() => {
				setShowAlert(false);
			}, 7000);
			return;
		}

		try {
			const data = await login({ email, password });
			const token = data.data.token;

			Cookies.set('Token', token, { expires: 7, secure: true });
			history.push('/');
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			setShowAlert(true);
			setAlertMsg(error?.response.data.message);

			setTimeout(() => {
				setShowAlert(false);
			}, 7000);
			return;
		}
	};

	useEffect(() => {
		const token = Cookies.get('Token');
		if (token) {
			history.push('/');
		}
	}, [history]);

	return (
		<Box className="signup-container">
			<Box className="left-container">
				<Image src="/img1.png" width={'100%'} height={'100%'} />
			</Box>
			<Box className="right-container">
				<Box
					style={{
						width: '70%',
					}}
				>
					<Flex
						direction="column"
						justify={'center'}
						align={'center'}
						style={{
							borderRadius: '10px',
							boxShadow: '1px 1px 2px 2px #baadad',
						}}
						gap={'30px'}
						mt={'25px'}
						p={'50px'}
					>
						<Flex style={{ width: '100%' }}>
							<Text size="30px" fw={'bold'} c={'#3A244A'}>
								Fill what we know{' '}
								<Text c={'#D72638'} span size="30px" fw={'bold'}>
									!
								</Text>
							</Text>
						</Flex>

						<Flex style={{ width: '100%' }} justify={'space-between'}>
							<Input
								placeholder="Email"
								style={{ width: '100%', borderBottom: '1px solid #baadad' }}
								variant="unstyled"
								value={formDetails?.email}
								onChange={(e) =>
									setFormDetails({ ...formDetails, email: e.target.value })
								}
							/>
						</Flex>
						<Flex style={{ width: '100%' }} justify={'space-between'}>
							<PasswordInput
								placeholder="Password"
								style={{ width: '100%', borderBottom: '1px solid #baadad' }}
								variant="unstyled"
								value={formDetails?.password}
								onChange={(e) =>
									setFormDetails({ ...formDetails, password: e.target.value })
								}
							/>
						</Flex>

						<Button
							type="submit"
							w={'70%'}
							radius="12px"
							bg={'#3A244A'}
							onClick={handleSignup}
						>
							Sign In
						</Button>
						<Button
							type="submit"
							variant="outline"
							w={'70%'}
							radius="12px"
							color={'#3A244A'}
						>
							<Link to={'/signup'} style={{ textDecoration: 'none' }}>
								Sign Up
							</Link>
						</Button>
						{showAlert ? (
							<Alert variant="filled" color="red" title="Signup Error">
								{alertMsg}
							</Alert>
						) : (
							''
						)}
					</Flex>
				</Box>
			</Box>
		</Box>
	);
}

export default Login;
