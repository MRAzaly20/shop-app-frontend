import { useState } from 'react';
import { signUp } from '../../../api/user';

export const useSignUp = () => {
	const [state, setState] = useState({
		isLoading: false,
		error: null
	});
	const [val, setVal] = useState(false);

	const handleSignUp = async values => {
		setState({
			isLoading: true,
			error: ''
		});

		try {
			const apiUrl = 'http://localhost:3000/create/account';

			const {
				cityConfirmation,
				domicileConfirmation,
				email,
				password,
				passwordConfirmation,
				postConfirmation,
				provinceConfirmation
			} = values;
			const requestData = {
				email,
				password,
				address: domicileConfirmation,
				province: provinceConfirmation,
				city: cityConfirmation,
				postalCode: postConfirmation
			};

			// Menggunakan promise.all untuk mengirimkan signUp dan fetch secara bersamaan
			/*	const [signUpResponse, fetchResponse] = await Promise.all([
		  		fetch(apiUrl, {
		  			method: 'POST',
		  			headers: {
		  				'Content-Type': 'application/json'
		  			},
		  			body: JSON.stringify(requestData)
		  		}),
		  		signUp(values)
		  	]);*/
			const fetchResponse = await fetch(apiUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(requestData)
			});

			const axiosResponse = await fetchResponse.json();
			console.log('data', axiosResponse);

			const signUpResponse = await signUp(values);
			console.log('Sign Up data:', signUpResponse);

			// Mengambil hasil dari promise.all
			setState({
				isLoading: false,
				error: ''
			});
		} catch (error) {
			const JsonRes = JSON.stringify(error);
			const JsonObj = JSON.parse(JsonRes);
			console.log('The Error :', JsonObj);

			if (
				JsonObj['code'] === 'auth/email-already-in-use' ||
				JsonObj['error'] === 'Akun dengan nama tersebut sudah ada.'
			) {
				const text = 'This account or email is already in use';
				console.log(text);
				setState({
					isLoading: false,
					error: text
				});
			}
			/*setState({
				isLoading: false
			});*/
			// Tidak perlu memanggil fetch jika ada kesalahan lain
		}
	};

	return [
		handleSignUp,
		{
			...state
		}
	];
};
