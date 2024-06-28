import { useNavigate, useParams } from 'react-router-dom';
import img from '../../imgs/Header/image_header.png';
import { useEffect, useRef, useState } from 'react';
import { getUser } from '../../api/usersApi.js';
import { useDispatch } from 'react-redux';
import { editUser } from '../../api/usersApi.js';
import { editUserStart, editUserSuccess, editUserFailure } from '../../reducers/user/userSlice.js';
import Select from 'react-select';
import { barriosCABA } from '../../api/configs.js';

import { uploadFile } from '../../firebase/configFirebase.js';

export const EditProfile = () => {
	const [user, setUser] = useState({});
	const [formData, setFormData] = useState({});
	let [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);

	const fileInputRef = useRef(null);
	const [imagePreviewUrl, setImagePreviewUrl] = useState(img);
	const [selectedFile, setSelectedFile] = useState(null);

	const optionZona = barriosCABA.map((cat, index) => ({ value: index, label: cat }));

	const { id } = useParams();

	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		const userFound = getUser(id);
		userFound
			.then((data) => {
				if (data.success === false || data.error) {
					navigate('/error', { state: data.error });
					return;
				}
				setUser(data.user);
				const telefono = data.user.telefono.substring(3);
				setImagePreviewUrl(data.user.foto);
				if (data.user.role == 1) {
					setFormData({
						email: data.user.email,
						telefono,
						domicilio: data.user.domicilio,
						foto: data.user.foto,
					});
				} else if (data.user.role == 2) {
					setFormData({
						email: data.user.email,
						telefono,
						domicilio: data.user.domicilio,
						zona: barriosCABA.indexOf(data.user.zona),
						descripcion: data.user.descripcion,
						foto: data.user.foto,
					});
				}
			})
			.catch((error) => {
				navigate('/error', { state: error });
				return;
			});
	}, [id, navigate]);

	const handleErrors = (value, name) => {
		let error = '';

		if (value.length === 0) {
			return (error = 'Este campo es requerido');
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

		if (name === 'domicilio') {
			if (value.length === 0) return delete errors.domicilio;
			if (value.length < 3) return (error = 'El domicilio debe tener al menos 3 caracteres');
		}

		if (name === 'descripcion') {
			if (value.length < 10)
				return (error = 'La descripción debe tener al menos 10 caracteres');
			if (value.length > 50)
				return (error = 'La descripción no puede tener más de 50 caracteres');
		}

		return error;
	};

	const handleChange = (e) => {
		const value = e.target ? e.target.value : e.value;
		const name = e.target ? e.target.name : 'zona';

		const error = handleErrors(value, name);

		if (error) {
			setFormData({ ...formData, [name]: value });
			setErrors({ ...errors, [name]: error });
			return;
		}

		setErrors((prevErrors) => {
			const newErrors = { ...prevErrors };
			delete newErrors[name];
			return newErrors;
		});

		if (e.target)
			setFormData({
				...formData,
				[e.target.name]: e.target.value,
			});
		else
			setFormData({
				...formData,
				zona: e.value,
			});
	};

	const esFotoDiferente = () => {
		if (selectedFile) {
			return true;
		}

		if (imagePreviewUrl !== user.foto) {
			return true;
		}

		return false;
	};

	function sonValoresIguales(formData, userData) {
		if (esFotoDiferente()) return false;

		for (const key in formData) {
			if (key === 'telefono') {
				const telefonoUserData = userData[key].substring(3);

				if (formData[key] !== telefonoUserData) {
					return false;
				}
			} else if (key === 'email') {
				const emailFormData = formData[key].toLowerCase();

				if (emailFormData !== userData[key]) {
					return false;
				}
			} else if (key === 'zona') {
				const zonaUserData = barriosCABA.indexOf(userData[key]);

				if (formData[key] !== zonaUserData) {
					return false;
				}
			} else if (formData[key] !== userData[key]) {
				return false;
			}
		}
		return true;
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (Object.keys(errors).length > 0) return;

		if (sonValoresIguales(formData, user)) return;

		try {
			if (selectedFile) {
				const img = await uploadFile(selectedFile, user._id);
				formData.foto = img;
			}

			if (user.role === 2) {
				if (formData.zona === undefined) delete formData.zona;
				else formData.zona = barriosCABA[formData.zona];
			}

			setLoading(true);
			dispatch(editUserStart());
			const res = await editUser(formData);

			if (res.errors) {
				const errorObject = res.errors.reduce((obj, error) => {
					obj[error.field] = error.error;
					return obj;
				}, {});

				setLoading(false);
				setErrors(errorObject);
				dispatch(editUserFailure(res.error.message));
				return;
			}

			if (res.success === false) {
				setLoading(false);
				dispatch(editUserFailure(res.error.message));
				const key = res.error.key;
				setErrors({ [key]: res.error.message, ...errors });
				return;
			}

			setLoading(false);
			dispatch(editUserSuccess(res));
			document.cookie = 'nombre=valor; SameSite=None; Secure';

			navigate('/profile/' + user._id);
		} catch (error) {
			dispatch(editUserFailure(error));
		}
	};

	const handleButtonClick = () => {
		fileInputRef.current.click();
	};
	const handlePicture = (e) => {
		e.preventDefault();
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreviewUrl(reader.result);
			};
			reader.readAsDataURL(file);
			setSelectedFile(file);
		}
	};

	return (
		<main className='m-[10%] flex flex-col items-center justify-center px-[10%] lg:m-[4%] lg:px-[15%]'>
			<h1 className='mb-16 text-[10vw] text-[#00A89C] sm:text-[3.5rem]'>Mi perfil</h1>
			<form
				onSubmit={handleSubmit}
				className='flex w-[100%] flex-col items-center justify-center lg:flex-row lg:items-start lg:justify-between'
			>
				<div>
					<img
						src={imagePreviewUrl}
						alt={user.nombre}
						className='mb-[30px] w-[100px] lg:mb-[0px] lg:mr-[100px]'
					/>
					<input
						type='file'
						id='fileInput'
						ref={fileInputRef}
						className='hidden'
						onChange={handlePicture}
					/>
					<button
						type='button'
						onClick={handleButtonClick}
						className='mb-[20px] bg-white text-[#7900cc] lg:mt-[20px]'
					>
						Editar foto
					</button>
				</div>
				<section className='flex w-fit flex-col items-start justify-center lg:w-[100%] lg:items-start'>
					<h2 className='text-[5vw] font-bold md:text-[30px]'>
						{user.nombre + ' ' + user.apellido}
					</h2>
					<hr className='mb-[10px] w-[100%]'></hr>

					<section className='flex w-[100%] flex-col'>
						<div className='flex w-[100%] flex-wrap items-center justify-between'>
							<label
								htmlFor='email'
								className='w-[20%] py-[10px] text-[4vw] font-bold md:text-[20px] lg:w-[20%]'
							>
								Email:
							</label>

							<input
								id='email'
								type='email'
								className={`flex-grow border-b-[1px] px-[10px] py-[5px] focus:outline-none md:text-[20px]`}
								// className='flex-grow text-[4vw] focus:outline-none md:text-[20px]'
								value={formData.email}
								onChange={handleChange}
								name='email'
							/>
							{/* </div> */}
							<p
								className={`mb-[5px] w-[100%] text-[#ff0000] ${errors.email ? 'block' : 'hidden'}`}
							>
								{errors.email}
							</p>
						</div>

						<div className='flex w-[100%] flex-wrap items-center justify-between'>
							<label
								htmlFor='domicilio'
								className='w-[100%] py-[10px] text-[4vw] font-bold md:text-[20px] lg:w-[20%]'
							>
								Domicilio:
							</label>
							{/* <div className='flex w-[60%] flex-col border-b-[1px] py-[10px] lg:w-[100%]'> */}
							<input
								type='text'
								className={`flex-grow border-b-[1px] px-[10px] py-[5px] focus:outline-none md:text-[20px]`}
								value={formData.domicilio}
								onChange={handleChange}
								name='domicilio'
								id='domicilio'
							/>
							{/* </div> */}
							<p
								className={`mb-[5px] w-[100%] text-[#ff0000] ${errors.domicilio ? 'block' : 'hidden'}`}
							>
								{errors.domicilio}
							</p>
						</div>
						<div className='flex w-[100%] flex-wrap items-center'>
							<label
								htmlFor='telefono'
								className={`w-[100%] py-[10px] text-[4vw] font-bold md:text-[20px] lg:w-[20%]`}
							>
								Telefono:
							</label>
							{/* <div
								className={`flex w-[60%] flex-col py-[10px] lg:w-[100%] ${user.role === 1 ? '' : 'border-b-[1px]'}`}
							> */}
							<input
								type='text'
								minLength={10}
								maxLength={10}
								className={`flex-grow ${user.role === 1 ? '' : 'border-b-[1px]'} px-[10px] py-[5px] focus:outline-none md:text-[20px]`}
								value={formData.telefono}
								onChange={handleChange}
								name='telefono'
								id='telefono'
							/>
						</div>
						<p
							className={`mb-[5px] w-[100%] text-[#ff0000] ${errors.telefono ? 'block' : 'hidden'}`}
						>
							{errors.telefono}
						</p>
						{/* </div> */}
						{user.role === 2 && (
							<>
								<div className='flex w-[100%] flex-wrap items-center justify-between'>
									<label
										htmlFor='descripcion'
										className='w-[100%] py-[10px] text-[4vw] font-bold md:text-[20px] lg:w-[20%]'
									>
										Sobre mi:
									</label>
									{/* <div className='flex w-[60%] flex-col py-[10px] lg:w-[100%]'> */}
									<input
										type='text'
										className={`flex-grow border-b-[1px] px-[10px] py-[5px] focus:outline-none md:text-[20px]`}
										value={formData.descripcion}
										onChange={handleChange}
										name='descripcion'
										id='descripcion'
									/>
									{/* </div> */}
									<p
										className={`mb-[5px] w-[100%] text-[#ff0000] ${errors.descripcion ? 'block' : 'hidden'}`}
									>
										{errors.descripcion}
									</p>
								</div>
								<div className='flex w-[100%] flex-wrap items-center justify-between'>
									<label className='w-[67%] py-[10px] text-[4vw] font-bold md:text-[20px] lg:w-[20%]'>
										Zona:
									</label>
									{/* <div className='flex w-[100%] flex-col border-b-[4px] py-[10px] lg:w-[100%]'> */}
									<Select
										isSearchable
										className='h-[30px] flex-grow focus:outline-none md:text-[20px]'
										name='zona'
										id='zona'
										options={optionZona}
										onChange={handleChange}
										value={optionZona[formData.zona]}
										styles={{
											control: (base) => ({
												...base,
												border: 0,
												boxShadow: 'none',
												margin: 0,
												padding: 0,
												minHeight: 'initial',
												justifyContent: 'center',

												fontSize: '20px', // Cambia esto por el tamaño que quieras
											}),
											menu: (base) => ({
												...base,
												border: 0,
												boxShadow: 'none',
												margin: 0,
												padding: 0,

												fontSize: '20px', // Cambia esto por el tamaño que quieras
											}),
											dropdownIndicator: () => ({
												display: 'none',
											}),
											indicatorSeparator: () => ({
												display: 'none',
											}),
											singleValue: (base) => ({
												...base,
												margin: 0,
												padding: 0,

												fontSize: '20px', // Cambia esto por el tamaño que quieras
											}),
										}}
									/>
									{/* </div> */}
									<p
										className={`mb-[5px] w-[100%] text-[#ff0000] ${errors.zona ? 'block' : 'hidden'}`}
									>
										{errors.zona}
									</p>
								</div>
							</>
						)}
					</section>

					<hr className='mt-[10px] w-[100%]'></hr>
					<button
						disabled={loading}
						className={`mt-[20px] block w-fit self-center rounded-[10px] bg-[#7900cc] px-[10px] py-[5px] text-center text-white lg:self-start`}
					>
						Aplicar cambios
					</button>
				</section>
			</form>
			<hr className='my-[20px] w-[100%]'></hr>
		</main>
	);
};
