import {
	Box,
	Button,
	Flex,
	Image,
	Input,
	PasswordInput,
	Text,
	Alert,
	Modal,
	Loader,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { signup, generateOTP, matchOTP } from '../api';
import { Link, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDisclosure } from '@mantine/hooks';

interface SignupFormDetails {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

function SignUp() {
	const [formDetails, setFormDetails] = useState<SignupFormDetails>({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
	});
	const [showAlert, setShowAlert] = useState(false);
	const [showAlert2, setShowAlert2] = useState(false);
	const [alertMsg, setAlertMsg] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [token, setToken] = useState('');
	const [signupSuccess, setSignupSuccess] = useState(false);
	const [otp, setOtp] = useState('');
	const [opened, { open, close }] = useDisclosure(false);
	const history = useHistory();

	const handleSignup = async () => {
		setSignupSuccess(true);
		const { firstName, lastName, email, password } = formDetails;
		if (
			firstName.length === 0 ||
			lastName.length === 0 ||
			email.length === 0 ||
			password.length === 0
		) {
			setShowAlert(true);
			setSignupSuccess(false);
			setAlertMsg('Plese fill the whole signup form');

			setTimeout(() => {
				setShowAlert(false);
			}, 7000);
			return;
		}

		if (password !== passwordConfirm) {
			setShowAlert(true);
			setSignupSuccess(false);
			setAlertMsg('Please check your passwords');

			setTimeout(() => {
				setShowAlert(false);
			}, 7000);
			return;
		}

		try {
			const data = await signup({ firstName, lastName, email, password });
			const myToken = data.data.token;
			setToken(myToken);
			await generateOTP(myToken);
			open();
			setSignupSuccess(false);

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			setSignupSuccess(false);
			setShowAlert(true);
			setAlertMsg(error?.response.data.message);

			setTimeout(() => {
				setShowAlert(false);
			}, 7000);
			return;
		}
	};

	const handleOTP = async () => {
		if (otp.length === 0) {
			return;
		}

		try {
			await matchOTP(token, otp);
			Cookies.set('Token', token, { expires: 7, secure: true });
			history.push('/');

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			setShowAlert2(true);
			setAlertMsg(error?.response.data.message);

			setTimeout(() => {
				setShowAlert2(false);
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
				<Image src="/img2.png" width={'100%'} height={'100%'} />
			</Box>

			<Modal opened={opened} onClose={close} title="Varify OTP">
				<Text mb={10} fw={500} fz={15}>
					Your OTP is usable for 2 mins
				</Text>
				<Input
					placeholder="Enter OTP"
					mb={20}
					value={otp}
					onChange={(e) => setOtp(e.target.value)}
				/>
				<Button onClick={handleOTP}>Submit</Button>
				{showAlert2 ? (
					<Alert variant="filled" color="red" title="Signup Error">
						{alertMsg}
					</Alert>
				) : (
					''
				)}
			</Modal>
			<Box className="right-container">
				<Box
					style={{
						width: '70%',
						height: '100%',
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
						gap={'50px'}
						mt={'25px'}
						p={'50px'}
					>
						<Flex style={{ width: '100%' }} justify={'space-between'}>
							<Text size="30px" fw={'bold'} c={'#3A244A'}>
								Let Us Know{' '}
								<Text c={'#D72638'} span size="30px" fw={'bold'}>
									!
								</Text>
							</Text>
							<Text size="20px" fw={'bold'} c={'#3A244A'} td="underline">
								<Link to={'/login'} style={{ textDecoration: 'none' }}>
									Sign In
								</Link>
							</Text>
						</Flex>
						<Flex style={{ width: '100%' }} justify={'space-between'}>
							<Input
								placeholder="First Name"
								style={{ width: '100%', borderBottom: '1px solid #baadad' }}
								variant="unstyled"
								value={formDetails?.firstName}
								onChange={(e) =>
									setFormDetails({ ...formDetails, firstName: e.target.value })
								}
							/>
						</Flex>
						<Flex style={{ width: '100%' }} justify={'space-between'}>
							<Input
								placeholder="Last Name"
								style={{ width: '100%', borderBottom: '1px solid #baadad' }}
								variant="unstyled"
								value={formDetails?.lastName}
								onChange={(e) =>
									setFormDetails({ ...formDetails, lastName: e.target.value })
								}
							/>
						</Flex>
						<Flex style={{ width: '100%' }} justify={'space-between'}>
							<PasswordInput
								placeholder="Set Password"
								style={{ width: '100%', borderBottom: '1px solid #baadad' }}
								variant="unstyled"
								value={formDetails?.password}
								onChange={(e) =>
									setFormDetails({ ...formDetails, password: e.target.value })
								}
							/>
						</Flex>
						<Flex style={{ width: '100%' }} justify={'space-between'}>
							<PasswordInput
								placeholder="Retype Password"
								style={{ width: '100%', borderBottom: '1px solid #baadad' }}
								variant="unstyled"
								value={passwordConfirm}
								onChange={(e) => setPasswordConfirm(e.target.value)}
							/>
						</Flex>
						<Flex style={{ width: '100%' }} justify={'space-between'}>
							<Input
								placeholder="Enter Email"
								style={{ width: '100%', borderBottom: '1px solid #baadad' }}
								variant="unstyled"
								value={formDetails?.email}
								onChange={(e) =>
									setFormDetails({ ...formDetails, email: e.target.value })
								}
							/>
						</Flex>

						<Button
							type="submit"
							w={'70%'}
							radius="lg"
							bg={'#3A244A'}
							onClick={handleSignup}
						>
							{signupSuccess ? <Loader color="blue" type="dots" /> : 'Sign Up'}
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

export default SignUp;
