import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { createComment } from '../../api/commentApi';

import {
	addCommentStart,
	addCommentSuccess,
	addCommentFailure,
} from '../../reducers/comments/commentSlice';
import { useDispatch } from 'react-redux';

import Swal from 'sweetalert2';

export const CreateComment = () => {
	const [calificacion, setCalificacion] = useState(1);
	const [comentario, setComentario] = useState('');
	const { idService } = useParams();

	const navigate = useNavigate();
	const dispatch = useDispatch();
	let [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);

	const handleClick = (index) => {
		setCalificacion(index + 1); // Actualiza la calificación al valor de la estrella clickeada
	};

	const handleErrors = (value, name) => {
		let error = '';

		if (value.length === 0) {
			return (error = 'Debes completar este campo');
		}

		if (name === 'comentario') {
			if (value.length < 10)
				return (error = 'El comentario debe tener al menos 10 caracteres');
			if (value.length > 255)
				return (error = 'El comentario no puede tener más de 255 caracteres');
		}

		return error;
	};

	const handleChange = (e) => {
		const { value, name } = e.target;

		const error = handleErrors(value, name);

		if (error) {
			setComentario(value);
			setErrors({ ...errors, [name]: error });
			return;
		}

		delete errors[name];

		setComentario(value);
	};



	const handleSubmit = async (e) => {
		e.preventDefault();

		if (Object.keys(errors).length > 0) return;

		const body = { comentario, calificacion };

		try {
			setLoading(true);
			dispatch(addCommentStart());
			const res = await createComment(idService, body);

            if (res.errors) {
				const errorObject = res.errors.reduce((obj, error) => {
					obj[error.field] = error.error;
					return obj;
				}, {});

				setLoading(false);
				setErrors(errorObject);
				dispatch(addCommentFailure(res.error.message));
				return;
			}

            if (res.success === false) {
				setLoading(false);
				dispatch(addCommentFailure(res.error.message));
				const key = res.error.key;
				setErrors({ [key]: res.error.message, ...errors });
				return;
			}



            setLoading(false);
			dispatch(addCommentSuccess(res));

			Swal.fire({
				icon: 'success',
				title: 'Comentario publicado',
				showConfirmButton: false,
				timer: 1500,
			});

			navigate(`/services/${idService}`);
		} catch (error) {
			dispatch(addCommentFailure(error));
		}
	};

	return (
		<div className='h-fit w-[100%]'>
			<h2 className='mb-[20px] self-start text-[20px] font-bold'>Dejanos tu comentario:</h2>
			<div className='flex w-fit items-center justify-center'>
				<p>Clasificacion:</p>
				<div className='ml-[20px] flex h-fit w-[100%] content-center items-center'>
					{Array.from({ length: 5 }).map((_, index) => (
						<FontAwesomeIcon
							icon={index < calificacion ? faStar : faStarRegular}
							className='mx-[5px] cursor-pointer text-[20px] text-[#00A89C]'
							key={index}
							value={index}
							onClick={() => handleClick(index)}
						/>
					))}
				</div>
			</div>
			<form className='mt-[20px]' onSubmit={handleSubmit}>
				<textarea
					className={`${errors.comentario ? 'border-rose-500' : ''} h-[300px] w-[100%] rounded-md border border-[#00A89C] p-[10px]`}
					placeholder='Escribe tu comentario'
					style={{
						paddingTop: '10px',
						boxSizing: 'border-box',
						resize: 'none',
						overflow: 'auto',
					}}
					name='comentario'
					value={comentario}
					onChange={handleChange}
				></textarea>
				<p className={`text-[#ff0000] ${errors.comentario ? 'block' : 'hidden'}`}>
					{errors.comentario}
				</p>
				<button
					disabled={loading}
					className='mt-[20px] block w-fit rounded-[10px] bg-[#7900cc] px-[10px] py-[5px] text-center text-white'
				>
					Publicar comentario
				</button>
			</form>
		</div>
	);
};
