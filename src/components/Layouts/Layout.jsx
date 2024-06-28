import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

export const Layout = () => {
	return (
		<div className='flex min-h-[100vh] flex-col'>
			<Header />
			<Outlet />
			<Footer />
		</div>
	);
};
