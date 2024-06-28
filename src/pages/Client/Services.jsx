import { Service } from '../../components/Service/Service.jsx';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { services } from '../../api/serviceApi.js';

export const Services = () => {
	const [data, setData] = useState([]);
	const [counter, setCounter] = useState(1);
	const [hasPrev, setHasPrev] = useState(false);
	const [hasMore, setHasMore] = useState(true); // new state to track if more data is available

	const location = useLocation();

	const handleCounter = async (e) => {
		e.preventDefault();
		const increment = parseInt(e.target.value);
		const newCounter = counter + increment;

		if (newCounter < 1 || (increment > 0 && !hasMore) || (increment < 0 && !hasPrev)) return;

		setCounter(newCounter);

		const newData = await services({ ...location.state, page: newCounter });
		setData(newData.data);
		setHasPrev(newCounter > 1);
		setHasMore(newData.hasMore);
	};

	useEffect(() => {
		if (counter === 1) {
			const data = services({ ...location.state, page: counter });
			data.then((data) => {
				if (data.success === false || data.error) {
					return data.error;
				}

				setData(data.data);
				setHasMore(data.hasMore);
			}).catch((error) => {
				return error;
			});
		}
	}, [counter, location.state]);

	return (
		<main>
			<div className='m-[10%] flex flex-col items-center justify-center md:px-[10%] xl:m-[4%] xl:px-[5%]'>
				<h1 className='mb-16 text-center text-[2.5rem] text-[#00A89C] sm:text-[3.5rem]'>
					PetSitters Disponibles!
				</h1>
				{data.length === 0 ? (
					<h1>No hay servicios disponibles...</h1>
				) : (
					<>
						<section className='flex w-[90%] flex-col flex-wrap items-center align-middle xl:w-[75%] xl:flex-row xl:justify-between'>
							{data.map((service) => (
								<Service key={service._id} service={service} />
							))}
						</section>

						<div className='flex w-fit space-x-[20px]'>
							<button onClick={handleCounter} value={-1}>
								{'< Anterior'}
							</button>
							<div className='flex h-auto w-[30px] justify-center bg-[#D9D9D9]'>
								<p className='self-center p-[5px]'>{counter}</p>
							</div>
							<button onClick={handleCounter} value={1}>
								{'Siguiente >'}
							</button>
						</div>
					</>
				)}
			</div>
		</main>
	);
};
