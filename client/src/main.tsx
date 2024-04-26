import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignUp from './pages/SignUp.tsx';
import Login from './pages/Login.tsx';

const theme = createTheme({
	/** Put your mantine theme override here */
});

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<MantineProvider theme={theme}>
			<Router>
				<Switch>
					<Route path="/signup">
						<SignUp />
					</Route>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/">
						<App />
					</Route>
				</Switch>
			</Router>
		</MantineProvider>
	</React.StrictMode>
);
