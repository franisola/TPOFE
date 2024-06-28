import { Link } from 'react-router-dom';
import image_header from '../../imgs/Header/image_header.png';
import './Header.css';
import { useSelector } from 'react-redux';
import { SlideMenu } from './SlideMenu';


import { useState, useEffect } from 'react';

export const Header = () => {
	const [showSlideMenu, setShowSlideMenu] = useState(false);
	const { currentUser } = useSelector((state) => state.user);

	const handleSlideMenu = () => {
		setShowSlideMenu(!showSlideMenu);
	};

	useEffect(() => {
		setShowSlideMenu(false);
	}, [currentUser]);

	
	return (
		<header className='wrapper'>
			<nav className='header flex items-center justify-between'>
				<div className='header-components flex items-center'>
					<img src={image_header} alt='logo' className='w-[75px]' />
					<h1 className='ml-[10px] hidden text-[5vw] font-bold text-[#00A89C] sm:block sm:text-[2rem]'>
						Pet Care™
					</h1>
				</div>
				<ul className='header-components flex justify-center align-middle'>
					<Link to='/' className='links'>
						<li className='hidden font-semibold sm:block'>Home</li>
					</Link>
					{currentUser && currentUser.role === 1 && (
						<>
							<div className='hidden h-auto w-px bg-black sm:block' />
							<Link to='/dashboard' className='links'>
								<li className='hidden font-semibold sm:block'>Servicios</li>
							</Link>
						</>
					)}
				</ul>
				{currentUser ? (
					<ul className='header-components relative flex justify-end'>
						<li onClick={handleSlideMenu} className='cursor-pointer'>
                            <img src={currentUser.foto} alt='user' className='w-[30px] h-[30px] rounded-full' />
							{/* <FontAwesomeIcon icon={faUser} className='text-[30px]' /> */}
						</li>
						<SlideMenu show={showSlideMenu} />
					</ul>
				) : (
					<ul className='header-components relative flex justify-end'>
						<Link to='/login' className='links register-box bg-white text-black'>
							<li>Iniciar sesion</li>
						</Link>
						<Link
							to='/register'
							className='links register-box drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]'
						>
							<li className=''>Registrarse</li>
						</Link>
					</ul>
				)}
			</nav>
		</header>
	);
};
/* Line 25 */

// border: 1px solid #000000;
// transform: rotate(-90deg);
/* Line 25 */
