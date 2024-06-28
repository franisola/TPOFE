import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

export const Links = (props) => {
	const { idService, idUser } = props;

	const location = useLocation();
	let isOnServicesPage = location.pathname === '/services';
	let isOnServiceInfoPage = location.pathname === `/services/${idService}`;
	let isOnLeaveACommentPage = location.pathname === `/services/${idService}/comment`;

	if (isOnServicesPage) {
		return (
			<div className='mt-[10px] flex w-[100%] justify-between text-center self-center'>
				<Link
					to={`/services/${idService}`}
					className='w-[45%] rounded-[10px] bg-[#7900cc] px-[10px] py-[5px] text-center self-center text-white'
				>
					Mas informacion
				</Link>
				<Link
					to={`/profile/${idUser}`}
					className='w-[45%] rounded-[10px] bg-[#C0B7C6] px-[10px] py-[5px] text-center self-center text-[#7900cc]'
				>
					Ver perfil
				</Link>
			</div>
		);
	} else if (isOnServiceInfoPage) {
		return (
			<div className='mt-[10px] flex w-[100%] justify-between text-center self-center'>
				<Link
					to={`/services/${idService}/contract`}
					className='w-[45%] rounded-[10px] bg-[#7900cc] px-[10px] py-[5px] text-center self-center text-white'
				>
					Contratar
				</Link>
				<Link
					to={`/profile/${idUser}`}
					className='w-[45%] rounded-[10px] bg-[#C0B7C6] px-[10px] py-[5px] text-center self-center text-[#7900cc]'
				>
					Ver perfil
				</Link>
			</div>
		);
	} else if (isOnLeaveACommentPage) {
        return (
            <div className='mt-[10px] flex w-[100%] justify-between text-center self-center'>
				<Link
					to={`/profile/${idUser}`}
					className='w-[45%] rounded-[10px] bg-[#7900cc] px-[10px] py-[5px] text-center self-center text-white'
				>
					Ver perfil
				</Link>
			</div>
        )
    }
};

Links.propTypes = {
	idService: PropTypes.string,
	idUser: PropTypes.string,
};
