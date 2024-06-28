import { useSelector } from 'react-redux';

import { getPetSitterServices } from '../../api/serviceApi';

import {
	setServicesFailure,
	setServicesStart,
	setServicesSuccess,
} from '../../reducers/services/serviceSlice';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { ServicePetSitter } from '../../components/Service/ServicePetSitter';

export const MyServices = () => {
	const { services } = useSelector((state) => state.services);
	const { currentUser } = useSelector((state) => state.user);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setServicesStart());
		const data = getPetSitterServices(currentUser._id);
		data.then((data) => {
			if (data.success === false || data.error) {
				dispatch(setServicesFailure(data));
				return;
			}
			dispatch(setServicesSuccess(data));
		}).catch((err) => {
			dispatch(setServicesFailure(err));
		});
	}, [dispatch, currentUser._id]);

	return (
		<main className='m-[10%] flex flex-col items-center justify-center lg:m-[4%] lg:px-[15%]'>
			<h1 className='mb-16 text-center text-[7vw] text-[#00A89C] sm:text-[3rem]'>
				Mis servicios
			</h1>
			<section className='flex w-[100%] flex-col sm:w-[75%] lg:w-[100%] lg:flex-row lg:flex-wrap lg:justify-between'>
				{services.length > 0 ? (
					services.map((service) => (
						<ServicePetSitter key={service._id} service={service} />
					))
				) : (
					<p>No hay servicios disponibles</p>
				)}
			</section>
			<hr className='w-[100%]'></hr>
			<Link to='/create-service' className='mt-4 self-start text-[#7900cc]'>
				Crear servicio
			</Link>
		</main>
	);
};
