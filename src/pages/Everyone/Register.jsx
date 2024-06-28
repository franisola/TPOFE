import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../api/usersApi';
import { signInStart, signInSuccess, signInFailure } from '../../reducers/user/userSlice';
import { useDispatch } from 'react-redux';
import image from '../../imgs/Register/image_register.png';
import '../formats.css';

export const Register = () => {
	const [formData, setFormData] = useState({ role: parseInt(1) });

	const navigate = useNavigate();
	const dispatch = useDispatch();

	let [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);

	const handleErrors = (value, name) => {
		let error = '';

		if (value.length === 0) {
			return (error = 'Debes completar este campo');
		}

		if (name === 'nombre') {
			if (value.length < 3) return (error = 'El nombre debe tener al menos 3 caracteres');
			if (value.length > 30) return (error = 'El nombre debe tener como máximo 30 caracteres');
		}

        if (name === 'apellido') {
            if (value.length < 3) return (error = 'El apellido debe tener al menos 3 caracteres');
			if (value.length > 30) return (error = 'El apellido debe tener como máximo 30 caracteres');
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

		if (name === 'domicilio') {
			if (value.length < 3) return (error = 'El domicilio debe tener al menos 3 caracteres');
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

		if (name === 'role') {
			setFormData({ ...formData, [name]: parseInt(value) });
			return;
		} else {
			setFormData({ ...formData, [name]: value });
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();


		if (Object.keys(errors).length > 0) return;

		try {
			setLoading(true);
			dispatch(signInStart());
			const res = await register(formData);


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

			console.log('1', res);

			if (res.success === false) {
				setLoading(false);
				dispatch(signInFailure(res.error.message));
				const key = Object.keys(res.error.keyValue)[0];
				setErrors({ [key]: 'Este email ya está en uso', ...errors });
				return;
			}

			console.log('2', res);
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
			<div className='flex w-[100%] flex-row justify-between'>
				<form
					onSubmit={handleSubmit}
					className='flex w-[100%] flex-row flex-wrap justify-between space-y-[7%] lg:w-[45%] lg:space-y-[0]'
				>
					<div className='form-divs lg:w-[45%]'>
						<label htmlFor='nombre' className='mb-[10px]'>
							Nombre
						</label>
						<input
							type='text'
							id='nombre'
							name='nombre'
							className={`${errors.nombre ? 'border-rose-500' : ''} inputs mb-[10px] rounded-md border px-[10px] py-[5px]`}
							onChange={handleChange}
						/>

						<p className={`text-[#ff0000] ${errors.nombre ? 'block' : 'hidden'}`}>
							{errors.nombre}
						</p>
					</div>
					<div className='form-divs lg:w-[45%]'>
						<label htmlFor='apellido' className='mb-[10px]'>
							Apellido
						</label>
						<input
							type='text'
							id='apellido'
							name='apellido'
							className={`${errors.apellido ? 'border-rose-500' : ''} inputs mb-[10px] rounded-md border px-[10px] py-[5px]`}
							onChange={handleChange}
						/>
						<p className={`text-[#ff0000] ${errors.apellido ? 'block' : 'hidden'}`}>
							{errors.apellido}
						</p>
					</div>
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
					<div className='form-divs lg:w-[45%]'>
						<label htmlFor='telefono' className='mb-[10px]'>
							Telefono
						</label>
						<input
							type='text'
							id='telefono'
							minLength={10}
							maxLength={10}
							name='telefono'
							className={`${errors.telefono ? 'border-rose-500' : ''} inputs mb-[10px] rounded-md border px-[10px] py-[5px]`}
							onChange={handleChange}
						/>
						<p className={`text-[#ff0000] ${errors.telefono ? 'block' : 'hidden'}`}>
							{errors.telefono}
						</p>
					</div>
					<div className='form-divs lg:w-[45%]'>
						<label htmlFor='domicilio' className='mb-[10px]'>
							Domicilio
						</label>
						<input
							type='text'
							id='domicilio'
							name='domicilio'
							className={`${errors.domicilio ? 'border-rose-500' : ''} inputs mb-[10px] rounded-md border px-[10px] py-[5px]`}
							onChange={handleChange}
						/>
						<p className={`text-[#ff0000] ${errors.domicilio ? 'block' : 'hidden'}`}>
							{errors.domicilio}
						</p>
					</div>

					<div className='flex h-fit flex-row items-center justify-start lg:w-[45%]'>
						<input
							className='check-button mt-4'
							type='radio'
							name='role'
							id='flexRadioDefault1'
							defaultChecked
							value={1}
							onChange={handleChange}
						/>
						<label
							className='form-check-label ml-[20px] mt-4'
							htmlFor='flexRadioDefault1'
						>
							Busco PetSitter
						</label>
					</div>
					<div className='flex h-fit flex-row items-center justify-start lg:w-[45%]'>
						<input
							className='check-button mt-4'
							type='radio'
							name='role'
							id='flexRadioDefault2'
							value={2}
							onChange={handleChange}
						/>
						<label
							className='form-check-label ml-[20px] mt-4'
							htmlFor='flexRadioDefault2'
						>
							Soy PetSitter
						</label>
					</div>
					<div className='flex h-fit w-[100%] flex-col items-center text-center'>
						<button
							disabled={loading}
							className='button mt-[20px] h-fit w-[100%] rounded-[20px] bg-[#7900CC] py-[3%] text-[3vw] font-bold text-white hover:bg-[#4a047a] sm:text-[20px] lg:w-[75%] lg:py-[1%]'
							type='submit'
						>
							{loading ? 'Loading...' : 'Registrarse'}
						</button>
						<Link to='/login' className='mt-[15px]'>
							Ya sos miembro? Inicia sesion
						</Link>
					</div>
				</form>
				<aside className='hidden lg:block lg:w-[40%]'>
					<img src={image} alt='dog' />
				</aside>
			</div>
		</main>
	);
};
