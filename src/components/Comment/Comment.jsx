import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import './Comment.styles.css';

import Swal from 'sweetalert2';

import { useDispatch, useSelector } from 'react-redux';

import { deleteComment } from '../../api/commentApi';

import {
	removeCommentStart,
	removeCommentSuccess,
	removeCommentFailure,
    incrementRefreshKey
} from '../../reducers/comments/commentSlice';

export const Comment = (props) => {
	const { comment } = props;

    const commentDate = new Date(comment.fecha);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - commentDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

	const { currentUser } = useSelector((state) => state.user);
	const user = comment.user;

	const dispatch = useDispatch();

	const handleClick = async () => {
		const html = `<p style="color: #ff0000;">Estas seguro que deseas eliminar este comentario?</p>`;
		const isDeleted = await Swal.fire({
			html,
			confirmButtonText: 'Eliminar',
			cancelButtonText: 'Cancelar',
			showCancelButton: true,
			customClass: {
				confirmButton: 'swal2-confirm',
				cancelButton: 'swal2-cancel',
			},
		});
		dispatch(removeCommentStart());
        
		if (isDeleted.isConfirmed) {
            const data = await deleteComment(comment._id);
			if (data.success) {
                Swal.fire({
                    icon: 'success',
					title: 'Comentario eliminado con exito',
					showConfirmButton: false,
					timer: 1500,
				});
				dispatch(removeCommentSuccess(comment._id));
                dispatch(incrementRefreshKey());
			} else {
				dispatch(removeCommentFailure(data));
				return;
			}
		}
	};

	return (
		<article className='comment mb-[20px] flex w-[100%] flex-col rounded-[10px] border-b-2 bg-[#E7E7E7] px-[15px] py-[10px]'>
			<div className='flex justify-between'>
                <p>{user.nombre + ' ' + user.apellido}</p>
                <p>{diffDays + ' dias'}</p>
            </div>
			<div className='flex h-fit w-[100%] content-center items-center'>
				{Array.from({ length: comment.calificacion }).map((_, index) => (
					<FontAwesomeIcon
						key={index}
						icon={faStar}
						className='text-[10px] text-[#00A89C]'
					/>
				))}
			</div>
			<p className='mt-[20px] w-[100%] break-words'>{comment.comentario}</p>
			{currentUser.role === 2 && (
				<FontAwesomeIcon
					icon={faXmark}
					className='cursor-pointer self-end text-[#ff0000]'
                    onClick={handleClick}
				/>
			)}
		</article>
	);
};

Comment.propTypes = {
	comment: PropTypes.object.isRequired,
};
