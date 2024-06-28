import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../api/usersApi';
import { useNavigate, useParams } from 'react-router-dom';

import { setPetsSuccess } from '../../reducers/pets/petSlice';

import { RemovePet } from '../../components/Pet/RemovePet';
import { AddPet } from '../../components/Pet/AddPet';


export const Pets = () => {
	const [user, setUser] = useState({});

	// const [formData, setFormData] = useState({});

	// const { currentUser } = useSelector((state) => state.user);
	const { pets } = useSelector((state) => state.pets);

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
				dispatch(setPetsSuccess(data.info));
			})
			.catch((error) => {
				navigate('/error', { state: error });
				return;
			});
	}, [id, navigate, dispatch]);

	return (
		<main className='m-[10%] flex flex-col items-center justify-center px-[10%] lg:m-[4%] lg:px-[15%]'>
			<h1 className='mb-16 text-[10vw] text-[#00A89C] sm:text-[3.5rem]'>Mi perfil</h1>
			<div className='flex w-[100%] flex-col items-center justify-center lg:flex-row lg:items-start lg:justify-between'>
				<div>
					<img
						src={user.foto}
						alt={user.nombre}
						className='mb-[50px] w-[100px] lg:mb-[0px] lg:mr-[100px]'
					/>
				</div>
				<section className='flex w-fit flex-col items-start justify-center lg:w-[100%] lg:items-start'>
					<h2 className='text-[5vw] font-bold md:text-[30px]'>
						{user.nombre + ' ' + user.apellido}
					</h2>
					<hr className='mb-[10px] w-[100%]'></hr>
					<p className='self-start text-[4vw] font-bold md:text-[20px]'>Mascotas:</p>
					<div className='flex w-[100%] flex-col items-start justify-center space-y-[5px] pl-[50px]'>
						{pets.map((pet, i) => (
							<RemovePet key={pet._id ? pet._id : i} pet={pet} />
						))}
					</div>
					<hr className='mt-[10px] w-[100%]'></hr>
					<AddPet />
				</section>
			</div>
			<hr className='my-[20px] w-[100%]'></hr>
		</main>
	);
};
