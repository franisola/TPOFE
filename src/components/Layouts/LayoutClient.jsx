import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export const LayoutClient = () => {
	const { currentUser } = useSelector((state) => state.user);

	return currentUser.role === 1 ? <Outlet /> : <Navigate to='/' />;
};
