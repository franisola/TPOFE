import { useDispatch, useSelector } from 'react-redux';
import {
	setContractsStart,
	setContractsSuccess,
	setContractsFailure,
} from '../../reducers/contracts/contractSlice';
import { getContracts } from '../../api/contractApi';
import { useEffect } from 'react';

import { ContractBox } from '../../components/Contract/ContractBox';

export const AllContracts = () => {
	const { currentUser: user } = useSelector((state) => state.user);

	const { contracts } = useSelector((state) => state.contracts);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setContractsStart());
		getContracts()
			.then((data) => {
				if (data.success === false || data.error) {
					dispatch(setContractsFailure(data.error));
					return;
				}
				dispatch(setContractsSuccess(data.contracts));
			})
			.catch((error) => {
				dispatch(setContractsFailure(error));
			});
	}, [dispatch]);

	return (
		<main className='m-[10%] flex flex-col items-center justify-center lg:m-[4%] lg:px-[15%]'>
			<h1 className='mb-16 text-center text-[10vw] text-[#00A89C] sm:text-[3.5rem]'>
				Bienvenido {user.nombre + ' ' + user.apellido}
			</h1>
			{contracts.length === 0 ? (
				<h2>No hay contrataciones recientes</h2>
			) : (
				<div className='flex w-[100%] flex-col self-center text-center'>
					<h2 className='mb-8 text-[10vw] text-[#00A89C] sm:text-[2rem]'>
						Mis contrataciones
					</h2>
					<section className='flex flex-col flex-wrap items-center justify-evenly lg:flex-row'>
						{contracts.map((contract) => (
							<ContractBox key={contract._id} contract={contract} />
						))}
					</section>
				</div>
			)}
		</main>
	);
};
