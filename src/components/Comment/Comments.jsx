import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getComments } from '../../api/commentApi.js';

import { setCommentsStart, setCommentsSuccess, setCommentsFailure  } from '../../reducers/comments/commentSlice.js';

import { Comment } from './Comment.jsx';

import './Comment.styles.css';
import { useDispatch, useSelector } from 'react-redux';


export const Comments = () => {
	const { idService } = useParams();
	const { currentUser } = useSelector((state) => state.user);
    const { comments, loading } = useSelector((state) => state.comments);
    
    const dispatch = useDispatch();
    

	useEffect(() => {
        dispatch(setCommentsStart());
		const data = getComments(idService);
		data.then((data) => {
               if (data.success === false || data.error) {
				dispatch(setCommentsFailure(data));
				return;
			}
			dispatch(setCommentsSuccess(data.comments));
		}).catch((err) => {
			dispatch(setCommentsFailure(err));
		});
	}, [idService, dispatch]);

   
    if (loading) {
        return <p>Cargando comentarios...</p>;
    } else if (!comments) {
        return <p>No hay comentarios...</p>;
    }

	return (
		<div className='h-fit w-[100%]'>
			<h2 className='mb-[20px] self-start text-[20px] font-bold'>Comentarios</h2>
			<section className='custom-scrollbar max-h-[350px] w-[100%] overflow-auto pr-[15px]'>
				{comments.map((comment) => (
					<Comment key={comment._id} comment={comment} />
				))}
			</section>
			{currentUser.role === 1 && (
				<Link
					to={`/services/${idService}/comment`}
					className='mt-[20px] block w-fit rounded-[10px] bg-[#7900cc] px-[10px] py-[5px] text-center text-white'
				>
					Deja tu comentario
				</Link>
			)}
		</div>
	);
};
