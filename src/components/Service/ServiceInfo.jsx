import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getService } from '../../api/serviceApi.js';

import { Service } from './Service.jsx';
import { FeedBack } from '../User/FeedBack.jsx';

export const ServiceInfo = () => {
	const [service, setService] = useState({});
	const [user, setUser] = useState('');
	const { idService: id } = useParams();
	const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

	useEffect(() => {
		getService(id)
			.then((data) => {
				if (data.success === false || data.error) {
					navigate('/error', { state: data.error });
					return;
				}
				setService(data.service);
				setUser(data.service.user);
				setLoading(false); // Oculta el indicador de carga una vez que los datos están disponibles
			})
			.catch((error) => {
				setLoading(false);
				navigate('/error', { state: error });
				return; // También oculta el indicador de carga si hay un error
			});
	}, [id, navigate]);

	if (loading) {
		return <div>Loading...</div>; // Renderiza un indicador de carga si los datos aún no están disponibles
	}

	return (
		<>
			<h1 className='mb-16 self-center text-center text-[10vw] text-[#00A89C] sm:text-[3.5rem]'>
				Informacion del servicio
			</h1>
			<div className='flex w-[100%] flex-col items-center justify-between lg:flex-row lg:items-start'>
				<div className='flex w-[100%] flex-col items-center justify-between xl:flex-row xl:items-start'>
					<Service service={service} user={user} />

					<FeedBack idService={service._id} />
				</div>
			</div>
		</>
	);
};
