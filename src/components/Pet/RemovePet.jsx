import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import './Pet.styles.css';

import Swal from 'sweetalert2';

import { deletePet } from '../../api/petsApi';
import { useDispatch } from 'react-redux';

import { removePetStart, removePetSuccess, removePetFailure } from '../../reducers/pets/petSlice';

export const RemovePet = (props) => {
	const { pet } = props;

	const dispatch = useDispatch();

	const handleClick = async () => {
		const html = `<p style="color: #ff0000;">Estas seguro que deseas eliminar a ${pet.nombre} de tus mascotas?</p>`;
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

		dispatch(removePetStart());
		if (isDeleted.isConfirmed) {
			const data = await deletePet(pet._id);
			if (data.success) {
				Swal.fire({
					icon: 'success',
					title: 'Mascota eliminada con exito',
					showConfirmButton: false,
					timer: 1500,
				});

				dispatch(removePetSuccess(pet._id));
			} else {
				dispatch(removePetFailure(data));
				return;
			}
		}
	};

	return (
		<div className='flex w-[100%] justify-between lg:w-[25%]'>
			<span className='h-fit text-[4vw] md:text-[20px]'>
				{pet.nombre}, {pet.tipoMascota}
			</span>

			<FontAwesomeIcon
				icon={faXmark}
				size='lg'
				className='cursor-pointer self-center hover:text-[#ff0000]'
				onClick={handleClick}
			/>
		</div>
	);
};

RemovePet.propTypes = {
	pet: PropTypes.object.isRequired,
};
