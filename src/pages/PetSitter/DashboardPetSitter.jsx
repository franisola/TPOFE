import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getContracts } from '../../api/contractApi';
import { getPetSitterComments } from '../../api/commentApi';

import { Link, useLocation } from 'react-router-dom';

import {
	setContractsStart,
	setContractsSuccess,
	setContractsFailure,
} from '../../reducers/contracts/contractSlice';

import {
	setCommentsStart,
	setCommentsSuccess,
	setCommentsFailure,
} from '../../reducers/comments/commentSlice';

import { ContractBox } from '../../components/Contract/ContractBox';
import { Comment } from '../../components/Comment/Comment';


export const DashboardPetSitter = () => {
	const { currentUser: user } = useSelector((state) => state.user);


    const location = useLocation();

	const { contracts } = useSelector((state) => state.contracts);
	const { comments } = useSelector((state) => state.comments);
	const { refreshKey } = useSelector((state) => state.comments);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setContractsStart());
		getContracts()
			.then((data) => {
				if (data.success === false || data.error) {
					dispatch(setContractsFailure(data.error));
					return;
				}
                // setContracts(data.lastContracts);
				dispatch(setContractsSuccess(data.lastContracts));
			})
			.catch((error) => {
				dispatch(setContractsFailure(error));
			});
	}, [dispatch, location]);   

	useEffect(() => {
		dispatch(setCommentsStart());
		const comments = getPetSitterComments();
		comments
			.then((data) => {
				if (data.success === false || data.error) {
					dispatch(setCommentsFailure(data.error));
					return;
				}
                
				dispatch(setCommentsSuccess(data.lastComments));
			})
			.catch((error) => {
				dispatch(setCommentsFailure(error));
			});
	}, [dispatch, refreshKey]);

    



	return (
		<main className='m-[10%] flex flex-col items-center justify-center lg:m-[4%] lg:px-[15%]'>
			<h1 className='mb-16 text-center text-[10vw] text-[#00A89C] sm:text-[3.5rem]'>
				Bienvenido {user.nombre + ' ' + user.apellido}
			</h1>
			{contracts.length === 0 ? (
				<h2>No hay contrataciones recientes</h2>
			) : (
				<div className='flex w-[100%] flex-col self-start'>
					<h2 className='mb-8 text-center text-[10vw] text-[#00A89C] sm:text-[2rem] md:text-start'>
						Contrataciones recientes
					</h2>
                        <section className='flex w-[100%] flex-col items-center justify-center flex-wrap sm:flex-row sm:justify-between xl:justify-evenly'>
						{contracts.map((contract) => (
							<ContractBox key={contract._id} contract={contract} />
						))}
					</section>
					<Link to='/all-contracts' className='w-fit text-[#7900cc] hover:text-[#61069c]'>
						Todas las contrataciones
					</Link>
				</div>
			)}
			<hr className='my-8 w-[100%]'></hr>
			{comments.length === 0 ? (
				<h2>No hay comentarios</h2>
			) : (
				<div className='w-[100%] self-start'>
					<h2 className='mb-8 text-center text-[10vw] text-[#00A89C] sm:text-[2rem] md:text-start'>
						Comentarios recientes
					</h2>
					<section className='flex flex-col justify-evenly'>
						{comments.map((comment) => (
							<Comment key={comment._id} comment={comment} />
						))}
					</section>

					<Link
						to='/all-comments'
						className='mt-8 block w-fit text-[#7900cc] hover:text-[#61069c]'
					>
						Todos los comentarios
					</Link>
				</div>
			)}
		</main>
	);
};
