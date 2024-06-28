import image_footer from '../../imgs/Footer/image_footer.png';

export const Footer = () => {
	return (
		<footer className='bg-[#7900cc] mt-auto'>
			<div className='flex  items-center justify-between px-[75px] py-[15px]'>
				<div className='flex items-center justify-center w-[100%] sm:w-auto'>
					<img src={image_footer} alt='' className='w-[75px]' />
					<p className='ml-[15px] text-[25px] font-bold text-white'>© 2024 Pet Care™</p>
				</div>

				<p className='hidden text-white sm:block'>Descarga nuestra app!</p>
			</div>
		</footer>
	);
};
/* © 2024 Pet Care™ */
