import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../api/usersApi';
import { signInStart, signInSuccess, signInFailure } from '../../reducers/user/userSlice';
import { useDispatch } from 'react-redux';
import '../formats.css';

export const Login = () => {
	const [formData, setFormData] = useState();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	let [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);

	const handleErrors = (value, name) => {
		let error = '';

		if (value.length === 0) {
			return (error = 'Debes completar este campo');
		}

		if (name === 'email') {
			if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
				return (error = 'El email no es válido');
			}
		}

		if (name === 'contraseña') {
			if (value.length < 6) return (error = 'La contraseña debe tener al menos 6 caracteres');
			if (value.length > 20)
				return (error = 'La contraseña no puede tener más de 20 caracteres');
		}

		return error;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;

		const error = handleErrors(value, name);

		if (error) {
			setFormData({ ...formData, [name]: '' });
			setErrors({ ...errors, [name]: error });
			return;
		}

		delete errors[name];

		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (Object.keys(errors).length > 0) return;

		try {
			setLoading(true);
			dispatch(signInStart());
			const res = await login(formData);

			if (res.errors) {
				const errorObject = res.errors.reduce((obj, error) => {
					obj[error.field] = error.error;
					return obj;
				}, {});

				setLoading(false);
				setErrors(errorObject);
				dispatch(signInFailure(res.error.message));
				return;
			}

			if (res.success === false) {
				setLoading(false);
				dispatch(signInFailure(res.error.message));
				const key = res.error.key;
				setErrors({ [key]: res.error.message, ...errors });
				return;
			}

			setLoading(false);
			dispatch(signInSuccess(res));

			navigate('/');
		} catch (error) {
			dispatch(signInFailure(error));
		}
	};
	return (
		<main className='m-[10%] flex flex-col items-center justify-center px-[10%] lg:m-[4%] lg:px-[5%]'>
			<h1 className='mb-16 text-[10vw] text-[#00A89C] sm:text-[3.5rem]'>Bienvenido!</h1>
			<div className='flex w-[100%] flex-col items-center justify-center'>
				<form
					onSubmit={handleSubmit}
					className='flex w-[100%] flex-row flex-wrap justify-between space-y-[7%] lg:w-[45%] lg:space-y-[0]'
				>
					<div className='form-divs lg:w-[45%]'>
						<label htmlFor='email' className='mb-[10px]'>
							Correo electronico
						</label>
						<input
							type='email'
							id='email'
							name='email'
							className={`${errors.email ? 'border-rose-500' : ''} inputs mb-[10px] rounded-md border px-[10px] py-[5px]`}
							onChange={handleChange}
						/>
						<p className={`text-[#ff0000] ${errors.email ? 'block' : 'hidden'}`}>
							{errors.email}
						</p>
					</div>
					<div className='form-divs lg:w-[45%]'>
						<label htmlFor='password' className='mb-[10px]'>
							Contraseña
						</label>
						<input
							type='password'
							id='password'
							name='contraseña'
							className={`${errors.contraseña ? 'border-rose-500' : ''} inputs mb-[10px] rounded-md border px-[10px] py-[5px]`}
							onChange={handleChange}
						/>
						<p className={`text-[#ff0000] ${errors.contraseña ? 'block' : 'hidden'}`}>
							{errors.contraseña}
						</p>
					</div>

					<div className='flex h-fit w-[100%] flex-col items-center pt-[25px] text-center'>
						<button
							disabled={loading}
							className='button mt-[5px] h-fit w-[100%] rounded-[20px] bg-[#7900CC] py-[3%] text-[3vw] font-bold text-white hover:bg-[#4a047a] sm:text-[20px] lg:w-[75%] lg:py-[1%]'
							type='submit'
						>
							{loading ? 'Loading...' : 'Iniciar sesion'}
						</button>
						<Link to='/change-password' className='mt-[15px] text-[#7900CC]'>
							Olvidaste tu contraseña?
						</Link>
					</div>
				</form>
			</div>

			<hr className='color-[#00A89C] mb-[15px] mt-[30px] w-[50%]' />
			<p className=''>Queres ser miembro de nuestra comunidad?</p>
			<Link to='/register' className='mt-[15px] text-[#7900CC]'>
				Registrate aca!
			</Link>
		</main>
	);
};
