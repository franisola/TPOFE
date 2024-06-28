import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { getUser } from '../../api/usersApi';

import { useParams } from 'react-router-dom';

import { FeedBack } from '../../components/User/FeedBack';

export const Profile = () => {
	const [user, setUser] = useState({});
	const [infoUser, setInfoUser] = useState([]);


	const { currentUser } = useSelector((state) => state.user);
	const { id } = useParams();

	const navigate = useNavigate();

	useEffect(() => {
		const userFound = getUser(id);
		userFound
			.then((data) => {
				if (data.success === false || data.error) {
					navigate('/error', { state: data.error });
					return;
				}
				setUser(data.user);
				setInfoUser(data.info);
			})
			.catch((error) => {
				navigate('/error', { state: error });
				return;
			});
	}, [id, navigate]);

    if (Object.keys(user).length === 0) return <h1 className='self-center mt-24'>Cargando...</h1>;

	return (
		<main className='m-[10%] flex flex-col items-center justify-center px-[10%] lg:m-[4%] lg:px-[15%]'>
			<h1 className='mb-16 text-[10vw] text-[#00A89C] sm:text-[3.5rem]'>Mi perfil</h1>
			<div className='flex w-[100%] flex-col items-center justify-center lg:flex-row lg:items-start lg:justify-between'>
				<img
					src={user.foto}
					alt={user.nombre}
					className='mb-[50px] w-[100px] lg:mb-[0px] lg:mr-[100px]'
				/>
				<section className='flex w-fit flex-col items-start justify-center space-y-[10px] lg:w-[100%] lg:items-start'>
					<h2 className='text-[5vw] font-bold md:text-[30px]'>
						{user.nombre + ' ' + user.apellido}
					</h2>
					<p className='text-[4vw] md:text-[20px]'>Email: {user.email}</p>
					<p className='text-[4vw] md:text-[20px]'>Telefono: {user.telefono}</p>
					<p className='text-[4vw] md:text-[20px]'>Domicilio: {user.domicilio}</p>
					{user.role === 2 && (
						<>
							<p
								className={`text-[4vw] md:text-[20px] ${user.zona ? '' : 'text-[#858383]'}`}
							>
								Zona:{'     '}
								{user.zona ? user.zona : 'Aún no ha brindado este dato'}
							</p>
							<p
								className={`text-[4vw] md:text-[20px] ${user.descripcion ? '' : 'text-[#858383]'}`}
							>
								Sobre mi: {'   '}
								{user.descripcion
									? user.descripcion
									: 'Aún no ha brindado este dato'}
							</p>
						</>
					)}
					<p className='text-[4vw] md:text-[20px]'>
						{user.role === 1 ? 'Mascotas:' : 'Servicios asociados:'}
					</p>
					<section className='flex w-[100%] flex-col items-start justify-center space-y-[5px] pl-[50px]'>
						{infoUser.map((info, i) => (
							<p key={info.id ? info.id : i} className='text-[4vw] md:text-[20px]'>
								{user.role === 1
									? '+ ' +
										info.nombre.charAt(0).toUpperCase() +
										info.nombre.slice(1) +
										', ' +
										info.tipoMascota
									: '+ ' + info}
							</p>
						))}
						{user.role === 1 && (
							<Link
								to={{
									pathname: `/profile/${user._id}/pets`,
								}}
								className='text-[4vw] text-[#7900cc] md:text-[20px]'
							>
								Gestionar mascotas
							</Link>
						)}
					</section>
				</section>
				{user.role === 2 && <FeedBack id={user._id} />}
			</div>
			<hr className='mt-[50px] w-[100%]'></hr>
			{id === currentUser._id && (
				<Link
					to={{
						pathname: `/profile/${user._id}/edit`,
					}}
					className='mt-[10px] self-start text-[#7900cc]'
				>
					Modificar datos
				</Link>
			)}
		</main>
	);
};
