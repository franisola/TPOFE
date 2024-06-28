import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../reducers/user/userSlice';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import './Header.css';

import { clear as clearPets } from '../../reducers/pets/petSlice';
import { clear as clearComments } from '../../reducers/comments/commentSlice';
import { clear as clearContracts } from '../../reducers/contracts/contractSlice';
import { clear as clearServices } from '../../reducers/services/serviceSlice';

export const SlideMenu = (props) => {
	const { currentUser } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const { show } = props;

	const handleSignOut = async () => {
		try {
			await fetch('http://localhost:3001/logout', {
				method: 'POST',
				credentials: 'include',
			});
			dispatch(logout());
            dispatch(clearPets());
            dispatch(clearComments());
            dispatch(clearContracts());
            dispatch(clearServices())
		} catch (error) {
			return error;
		}
	};

	const slide = show ? ' opacity-100 pointer-events-auto' : ' opacity-0 pointer-events-none';

	return (
		<li
			className={`absolute top-[40px] flex w-[200px] transform flex-col content-start border bg-[#FCFCFC] px-[15px] py-[5px] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] transition-all duration-200 ease-in-out ${slide}`}
		>
			<p className='slide-menu-words font-bold'>
				{currentUser.nombre + ' ' + currentUser.apellido}
			</p>
			<hr></hr>
			<Link to='home' className='slide-menu-words block sm:hidden'>
				Home
			</Link>
			<hr></hr>
			<Link to={`profile/${currentUser._id}`} className='slide-menu-words'>
				Mi perfil
			</Link>
			<hr></hr>
			{currentUser.role == 1 && (
				<>
					<Link to='services' className='slide-menu-words block sm:hidden'>
						Ver servicios
					</Link>
					<hr className='block sm:hidden'></hr>
				</>
			)}
			{currentUser.role == 2 && (
				<>
					<Link to='my-services' className='slide-menu-words'>
						Mis servicios
					</Link>
					<hr></hr>
					<Link to='create-service' className='slide-menu-words'>
						Crear servicio
					</Link>
					<hr></hr>
					<Link to='all-contracts' className='slide-menu-words'> Mis contrataciones</Link>
					<hr></hr>
				</>
			)}
			<button className='slide-menu-words self-start text-[#7900CC]' onClick={handleSignOut}>
				Cerrar sesion
			</button>
		</li>
	);
};

SlideMenu.propTypes = {
	show: PropTypes.bool.isRequired,
};
