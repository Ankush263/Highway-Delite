import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

function App() {
	const history = useHistory();

	useEffect(() => {
		const token = Cookies.get('Token');

		if (!token) {
			history.push('/signup');
		}
	}, [history]);

	return (
		<>
			<h1>Hello Ankush</h1>
		</>
	);
}

export default App;
