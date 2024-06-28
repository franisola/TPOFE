import { Outlet } from 'react-router-dom';

import { ServiceInfo } from '../Service/ServiceInfo';

export const LayoutServiceInfo = () => {
	return (
		<main className='m-[10%] flex flex-col items-center justify-center px-[10%] lg:m-[4%] lg:px-[20%]'>
			<ServiceInfo />
			<Outlet />
		</main>
	);
};
