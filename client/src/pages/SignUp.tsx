import { Button, Flex, Image, Input, PasswordInput, Text } from '@mantine/core';

function SignUp() {
	return (
		<Flex justify={'center'} align={'center'} style={{ height: '100vh' }}>
			<Flex
				justify={'center'}
				align={'center'}
				style={{ width: '50%', height: '100%' }}
			>
				<Image src="/public/img1.png" width={'100%'} height={'100%'} />
			</Flex>
			<Flex
				style={{ width: '50%', height: '100%' }}
				justify={'center'}
				align={'center'}
			>
				<form style={{ width: '70%', height: '100%' }}>
					<Flex
						direction="column"
						justify={'center'}
						align={'center'}
						style={{
							border: '1px solid #baadad',
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
							<Text
								component="a"
								href="#"
								size="20px"
								fw={'bold'}
								c={'#3A244A'}
								td="underline"
							>
								Sign In
							</Text>
						</Flex>
						<Flex style={{ width: '100%' }} justify={'space-between'}>
							<Input
								placeholder="First Name"
								style={{ width: '100%', borderBottom: '1px solid #baadad' }}
								variant="unstyled"
							/>
						</Flex>
						<Flex style={{ width: '100%' }} justify={'space-between'}>
							<Input
								placeholder="Last Name"
								style={{ width: '100%', borderBottom: '1px solid #baadad' }}
								variant="unstyled"
							/>
						</Flex>
						<Flex style={{ width: '100%' }} justify={'space-between'}>
							<PasswordInput
								placeholder="Set Password"
								style={{ width: '100%', borderBottom: '1px solid #baadad' }}
								variant="unstyled"
							/>
						</Flex>
						<Flex style={{ width: '100%' }} justify={'space-between'}>
							<PasswordInput
								placeholder="Retype Password"
								style={{ width: '100%', borderBottom: '1px solid #baadad' }}
								variant="unstyled"
							/>
						</Flex>
						<Flex style={{ width: '100%' }} justify={'space-between'}>
							<Input
								placeholder="Enter Email"
								style={{ width: '100%', borderBottom: '1px solid #baadad' }}
								variant="unstyled"
							/>
						</Flex>

						<Button w={'300px'} radius="lg" bg={'#3A244A'}>
							Sign Up
						</Button>
					</Flex>
				</form>
			</Flex>
		</Flex>
	);
}

export default SignUp;
