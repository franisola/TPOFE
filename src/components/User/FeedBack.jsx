import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getUserFeedback } from '../../api/usersApi';
import { getService } from '../../api/serviceApi';
import { useSelector } from 'react-redux';


export const FeedBack = (props) => {
	const [feedback, setFeedBack] = useState({});
	const { id } = props;
	const { idService } = props;

	const { comments } = useSelector((state) => state.comments);

  
	useEffect(() => {

		let userFound;
		idService ? (userFound = getService(idService)) : (userFound = getUserFeedback(id));

		userFound
			.then((data) => {
				if (data.success === false || data.error) {
					return data.error;
				}

				setFeedBack(data.feedback);
			})
			.catch((error) => {
				return error;
			});
	}, [id, idService, comments]);

	if (!feedback) {
		return <p>Cargando...</p>;
	}

	return (
		<div className='mb-[30px] mt-[30px] flex flex-col space-y-[10px] self-start lg:mb-[0px] lg:mt-[0px] lg:w-[40%] lg:items-end'>
			<h2 className='text-[25px] font-bold'>Detalles</h2>
			<div className='flex h-fit w-[100%] items-center justify-start lg:justify-end'>
				{Array.from({ length: feedback.averageServiceRating }).map((_, index) => (
					<FontAwesomeIcon
						key={index}
						icon={faStar}
						className='text-[15px] text-[#00A89C]'
					/>
				))}
				<p className='ml-[10px] self-center text-[15px] text-[#00A89C]'>
					{feedback.averageServiceRating}
				</p>
			</div>
			<p>
				{feedback.totalServicesCompleted
					? 'Servicios realizados:' + ' ' + feedback.totalServicesCompleted
					: ''}
			</p>{' '}
			<p>{'Comentarios:' + ' ' + feedback.totalComments}</p>
		</div>
	);
};

FeedBack.propTypes = {
	id: PropTypes.string,
	idService: PropTypes.string,
};
