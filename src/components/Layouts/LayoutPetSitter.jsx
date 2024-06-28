import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export const LayoutPetSitter = () => {
	const { currentUser } = useSelector((state) => state.user);

	return currentUser.role === 2 ? <Outlet /> : <Navigate to='/' />;
};
