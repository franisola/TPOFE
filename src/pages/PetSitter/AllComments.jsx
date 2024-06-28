import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getPetSitterComments } from '../../api/commentApi';

import {
	setCommentsStart,
	setCommentsSuccess,
	setCommentsFailure,
} from '../../reducers/comments/commentSlice';

import { Comment } from '../../components/Comment/Comment';

export const AllComments = () => {
	const { currentUser: user } = useSelector((state) => state.user);

	const { comments } = useSelector((state) => state.comments);
	const { refreshKey } = useSelector((state) => state.comments);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setCommentsStart());
		const comments = getPetSitterComments();
		comments
			.then((data) => {
				if (data.success === false || data.error) {
					dispatch(setCommentsFailure(data.error));
					return;
				}
				dispatch(setCommentsSuccess(data.comments));
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

			{comments.length === 0 ? (
				<h2>No hay comentarios</h2>
			) : (
				<div className='w-[100%] self-start'>
					<h2 className='mb-8 text-center text-[10vw] text-[#00A89C] sm:text-[2rem] md:text-start'>
						Comentarios
					</h2>

					<section className='flex flex-col justify-evenly'>
						{comments.map((comment) => (
							<Comment key={comment._id} comment={comment} />
						))}
					</section>
				</div>
			)}
		</main>
	);
};
