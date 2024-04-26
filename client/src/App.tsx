import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Button, Card, Flex, Input, Modal, Text } from '@mantine/core';
import { getUser, resetPassword } from './api';
import { useDisclosure } from '@mantine/hooks';

interface User {
	firstName: string;
	lastName: string;
	email: string;
}

function App() {
	const [userDetails, setUserDetails] = useState<User>({
		firstName: '',
		lastName: '',
		email: '',
	});
	const [passwordDetails, setPasswordDetails] = useState({
		oldPassword: '',
		newPassword: '',
	});
	const [opened, { open, close }] = useDisclosure(false);
	const history = useHistory();

	const fetch = async () => {
		try {
			const token = Cookies.get('Token');
			const res = await getUser(token as string);
			const data = res.data.data;
			setUserDetails({
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleReset = async () => {
		try {
			const token = Cookies.get('Token');
			await resetPassword(
				token as string,
				passwordDetails.oldPassword,
				passwordDetails.newPassword
			);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const token = Cookies.get('Token');

		if (!token) {
			history.push('/signup');
		}
	}, [history]);

	useEffect(() => {
		fetch();
	}, []);

	return (
		<Flex justify={'center'} align={'center'}>
			<Modal opened={opened} onClose={close} title="Reset Password">
				<Input
					placeholder="Old Password"
					mb={10}
					value={passwordDetails.oldPassword}
					onChange={(e) =>
						setPasswordDetails({
							...passwordDetails,
							oldPassword: e.target.value,
						})
					}
				/>
				<Input
					placeholder="New Password"
					mb={20}
					value={passwordDetails.newPassword}
					onChange={(e) =>
						setPasswordDetails({
							...passwordDetails,
							newPassword: e.target.value,
						})
					}
				/>
				<Button onClick={handleReset}>Reset</Button>
			</Modal>
			<Card>
				<Card.Section>
					<Text fz={'xl'} fw={'bold'}>
						{userDetails.firstName} {userDetails.lastName}
					</Text>
				</Card.Section>
				<Text fz={'md'} mb={20}>
					{userDetails.email}
				</Text>
				<Button onClick={open}>Reset Password</Button>
			</Card>
		</Flex>
	);
}

export default App;
