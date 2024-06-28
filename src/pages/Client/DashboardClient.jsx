import dashboard_uno from '../../imgs/Dashboard/dashboard_uno.png';
import dashboard_dos from '../../imgs/Dashboard/dashboard_dos.png';
import dashboard_tres from '../../imgs/Dashboard/dashboard_tres.png';
import dashboard_cuatro from '../../imgs/Dashboard/dashboard_cuatro.png';
import dashboard_cinco from '../../imgs/Dashboard/dashboard_cinco.png';

import '../formats.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { tipoMascota, categoria, frecuencia, calificacion, barriosCABA } from '../../api/configs.js';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Select from 'react-select';



import { useNavigate } from 'react-router-dom';

export const DashboardClient = () => {
	const [formData, setFormData] = useState();
	const [selectedOption, setSelectedOption] = useState(null);
	const navigate = useNavigate();

	const optionCategoria = categoria.map((cat, index) => ({ value: index, label: cat }));
	const optionTipoMascota = tipoMascota.map((cat, index) => ({ value: index, label: cat }));
	const optionFrecuencia = frecuencia.map((cat, index) => ({ value: index, label: cat }));
	const optionZona = barriosCABA.map((cat, index) => ({ value: index, label: cat }));
	const optionCalificacion = calificacion.map((cat, index) => ({ value: index + 1, label: cat }));

	const handleChange = (selectedOption, actionMeta) => {
		setFormData({
			...formData,
			[actionMeta.name]: selectedOption.value,
		});
		setSelectedOption({ ...selectedOption, name: actionMeta.name });
	};

	const handleLink = (e) => {
		e.preventDefault();
		const index =
			categoria.indexOf(e.target.name) != -1 ? categoria.indexOf(e.target.name) : 'undefined';

		navigate('/services', { state: { categoria: index } });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (formData) navigate('/services', { state: formData });
	};

	return (
		<main>
			<div className='m-[10%] flex flex-col items-center justify-center px-[10%] lg:m-[4%] lg:px-[5%]'>
				<h1 className='mb-16 text-center text-[2.5rem] text-[#00A89C] sm:text-[3.5rem]'>
					Todo lo que ofrecemos!
				</h1>
				{/* <section className='flex flex-wrap justify-center sm:justify-between lg:w-[80%]'> */}
				<section className='grid w-[100%] grid-cols-1 justify-items-center gap-y-8 sm:grid-cols-2 lg:w-[80%] xl:grid-cols-4'>
					<div className='flex flex-col'>
						<img src={dashboard_uno} alt='' className='w-[180px]' />
						<Link
							to='/services'
							onClick={handleLink}
							name='Paseos'
							className='mt-[15px] w-[100%] rounded-[10px] bg-[#7900cc] px-[10px] py-[5px] text-center font-bold text-white'
						>
							Paseos
						</Link>
					</div>
					<div className='flex flex-col'>
						<img src={dashboard_dos} alt='' className='w-[180px]' />
						<Link
							to='/services'
							onClick={handleLink}
							name='Cuidado de mascotas'
							className='mt-[15px] w-[100%] rounded-[10px] bg-[#7900cc] px-[10px] py-[5px] text-center font-bold text-white'
						>
							Cuidado de mascotas
						</Link>
					</div>
					<div className='flex flex-col'>
						<img src={dashboard_tres} alt='' className='w-[180px]' />
						<Link
							to='/services'
							onClick={handleLink}
							name='Adiestramiento'
							className='mt-[15px] w-[100%] rounded-[10px] bg-[#7900cc] px-[10px] py-[5px] text-center font-bold text-white'
						>
							Adiestramiento
						</Link>
					</div>
					<div className='flex flex-col'>
						<img src={dashboard_cuatro} alt='' className='w-[180px]' />
						<Link
							to='/services'
							onClick={handleLink}
							name=''
							className='mt-[15px] w-[100%] rounded-[10px] bg-[#7900cc] px-[10px] py-[5px] text-center font-bold text-white'
						>
							Ver todo
						</Link>
					</div>
				</section>
				<hr className='my-[50px] w-[100%]'></hr>
				<section className='flex w-[100%] justify-around'>
					<div className='flex-col justify-start'>
						<h1 className='mb-8 text-center text-[1.5rem] text-[#00A89C] sm:text-[2rem]'>
							Busqueda personalizada
						</h1>
						<form onSubmit={handleSubmit}>
							<div className='flex flex-col space-y-[20px]'>
								<Select
									isSearchable={false}
									placeholder='Categoria'
									name='categoria'
									options={optionCategoria}
									onChange={handleChange}
								/>
								<Select
									isSearchable={false}
									placeholder='Tipo de mascota'
									name='tipoMascota'
									options={optionTipoMascota}
									onChange={handleChange}
								/>
								<Select
									isSearchable={false}
									placeholder='Frecuencia'
									name='frecuencia'
									options={optionFrecuencia}
									onChange={handleChange}
								/>
								<Select
									isSearchable
									placeholder='Zona'
									name='zona'
									options={optionZona}
									onChange={handleChange}
								/>

								<Select
									isSearchable={false}
									placeholder='Calificacion'
									name='calificacion'
									value={
										selectedOption && selectedOption.name === 'calificacion'
											? selectedOption
											: null
									}
									options={optionCalificacion}
									onChange={handleChange}
								/>
								<button
									// disabled={loading}
									className='w-fit self-center rounded-[10px] bg-[#7900cc] px-[20px] py-[5px] text-start text-white lg:w-[50%] lg:self-start'
									type='submit'
								>
									<FontAwesomeIcon
										icon={faMagnifyingGlass}
										className='mr-[10px]'
									/>
									Buscar
								</button>
							</div>
						</form>
					</div>
					<img
						src={dashboard_cinco}
						alt=''
						className='hidden h-fit lg:block lg:w-[300px] xl:w-[500px]'
					/>
				</section>
			</div>
		</main>
	);
};
