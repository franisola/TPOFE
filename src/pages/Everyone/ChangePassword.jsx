import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { verifyData, changePassword } from '../../api/usersApi';
import {
	verifyDataStart,
	verifyDataSuccess,
	verifyDataFailure,
	changePasswordStart,
	changePasswordFailure,
	changePasswordSuccess,
	logout,
} from '../../reducers/user/userSlice';

import Swal from 'sweetalert2';

export const ChangePassword = () => {
	const [formData, setFormData] = useState();
	const [sendPass, setSendPass] = useState(false);
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

		if (name === 'telefono') {
			if (!/^\d+$/.test(value)) {
				return (error = 'El telefono debe ser un número');
			} else if (isNaN(parseInt(value))) {
				return (error = 'El telefono debe ser un número');
			} else if (value.length !== 10) {
				return (error = 'El telefono debe tener 10 dígitos');
			} else if (value.substring(0, 2) !== '11' && value.substring(0, 2) !== '15') {
				return (error = 'El telefono debe comenzar con 11 o 15');
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

	useEffect(() => {
		return () => {
			dispatch(logout());
		};
	}, [dispatch]);

	const handleSubmitVerify = async (e) => {
		e.preventDefault();

		if (Object.keys(errors).length > 0) return;

		try {
			setLoading(true);
			dispatch(verifyDataStart());

			const res = await verifyData(formData);

			if (res.errors) {
				const errorObject = res.errors.reduce((obj, error) => {
					obj[error.field] = error.error;
					return obj;
				}, {});

				setLoading(false);
				setErrors(errorObject);
				dispatch(verifyDataFailure(res.error.message));
				return;
			}

			if (res.success === false) {
				setLoading(false);
				dispatch(verifyDataFailure(res.error.message));
				const key = res.error.key;
				setErrors({ [key]: res.error.message, ...errors });
				return;
			}

			setLoading(false);
			setSendPass(true);
			dispatch(verifyDataSuccess(res));
		} catch (error) {
			dispatch(verifyDataFailure(error));
		}
	};

	const handleSubmitPassword = async (e) => {
		e.preventDefault();
		const { contraseña, email } = formData;
		const userData = { contraseña, email };

		if (Object.keys(errors).length > 0) return;

		try {
			setLoading(true);
			dispatch(changePasswordStart());

			const res = await changePassword(userData);

			if (res.errors) {
				const errorObject = res.errors.reduce((obj, error) => {
					obj[error.field] = error.error;
					return obj;
				}, {});

				setLoading(false);
				setErrors(errorObject);
				dispatch(verifyDataFailure(res.error.message));
				return;
			}

			if (res.success === false) {
				setLoading(false);
				dispatch(verifyDataFailure(res.error.message));
				const key = res.error.key;
				setErrors({ [key]: res.error.message, ...errors });
				return;
			}

			setLoading(false);

			Swal.fire({
				icon: 'success',
				title: 'Tu contraseña ha sido cambiada exitosamente',
				showConfirmButton: false,
				timer: 1500,
			});

			dispatch(changePasswordSuccess());
			navigate('/login');
		} catch (error) {
			dispatch(changePasswordFailure(error));
		}
	};

	return (
		<main className='m-[10%] flex flex-col items-center justify-center px-[10%] lg:m-[4%] lg:px-[5%]'>
			<h1 className='mb-4 text-center text-[5vw] text-[#00A89C] md:text-[2.5rem]'>
				Restablece tu contraseña!
			</h1>
			<p className='mb-16'>Ingresa los datos de tu cuenta para verificar tu identidad</p>
			<div className='flex w-[100%] flex-col items-center justify-center'>
				<form
					onSubmit={handleSubmitVerify}
					className='flex w-[100%] flex-row flex-wrap justify-between lg:w-[45%]'
				>
					<div className='form-divs lg:w-[45%]'>
						<label htmlFor='email' className='mb-[10px]'>
							Correo electronico
						</label>
						<input
							type='email'
							id='email'
							name='email'
							className={`${errors.email ? 'border-rose-500' : ''} inputs mb-[10px] rounded-md border px-[10px] py-[5px] ${!sendPass ? 'bg-white' : 'bg-[#ededed]'}`}
							onChange={handleChange}
							disabled={sendPass}
						/>
						<p className={`text-[#ff0000] ${errors.email ? 'block' : 'hidden'}`}>
							{errors.email}
						</p>
					</div>
					<div className='form-divs lg:w-[45%]'>
						<label htmlFor='telefono' className='mb-[10px]'>
							Telefono
						</label>
						<input
							type='text'
							id='telefono'
							name='telefono'
							minLength={10}
							maxLength={10}
							className={`${errors.telefono ? 'border-rose-500' : ''} inputs mb-[10px] rounded-md border px-[10px] py-[5px] ${!sendPass ? 'bg-white' : 'bg-[#ededed]'}`}
							onChange={handleChange}
							disabled={sendPass}
						/>
						<p className={`text-[#ff0000] ${errors.telefono ? 'block' : 'hidden'}`}>
							{errors.telefono}
						</p>
					</div>
					<button
						className={`${
							!sendPass ? 'text-[#7900CC]' : 'text-000'
						} mt-[10px] w-[100%] justify-center lg:mt-[10px]`}
						disabled={sendPass}
					>
						{sendPass ? 'Ya puedes cambiar tu contraseña!' : 'Verificar datos'}
					</button>
					<hr className='my-[20px] w-[100%]'></hr>
				</form>
				<form
					onSubmit={handleSubmitPassword}
					className='flex w-[100%] flex-col flex-wrap justify-between lg:w-[45%]'
				>
					<div className='form-divs lg:w-[100%]'>
						<label htmlFor='password' className='mb-[10px]'>
							Contraseña
						</label>
						<input
							type='password'
							id='password'
							name='contraseña'
							className={`${errors.contraseña ? 'border-rose-500' : ''} inputs mb-[10px] rounded-md border px-[10px] py-[5px] ${sendPass ? 'bg-white' : 'bg-[#ededed]'}`}
							disabled={!sendPass}
							onChange={handleChange}
						/>
						<p className={`text-[#ff0000] ${errors.contraseña ? 'block' : 'hidden'}`}>
							{errors.contraseña}
						</p>
					</div>

					<div className='flex h-fit w-[100%] flex-col items-center pt-[25px] text-center'>
						<button
							disabled={sendPass === false}
							className={`${sendPass ? 'bg-[#7900CC]' : 'bg-[#290145]'} ${
								sendPass ? 'hover:bg-[#4a047a]' : ''
							} button mt-[5px] h-fit w-[100%] rounded-[20px] py-[3%] text-[3vw] font-bold text-white sm:text-[20px] lg:w-[75%] lg:py-[1%]`}
							type='submit'
						>
							{loading ? 'Loading...' : 'Reestablecer contraseña'}
						</button>
					</div>
					<hr className='my-[20px] w-[100%]' />

					<p className='self-start'>Ya recuerdas tu contraseña??</p>
					<Link to='/login' className='self-start text-[#7900CC]'>
						Inicia sesion aca!
					</Link>
				</form>
			</div>
		</main>
	);
};
