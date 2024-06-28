import image_home_uno from '../../imgs/Home/image_home_uno.png';
import image_home_dos from '../../imgs/Home/image_home_dos.png';
import image_home_tres from '../../imgs/Home/image_home_tres.png';

export const Home = () => {
	return (
		<main>
			<div className='m-[10%] flex flex-col items-center justify-center px-[10%] lg:m-[4%] lg:mb-[0] lg:px-[5%]'>
				<h1 className='mb-4 text-center text-[2.5rem] text-[#00A89C] sm:text-[3.5rem]'>
					Miembros felices, mascotas felices!
				</h1>
				<section className='my-16 flex flex-col flex-wrap space-y-[30px] md:flex-row'>
					<div className='flex w-[100%] flex-col items-center justify-start sm:flex-row'>
						<img src={image_home_uno} alt='' className='w-[150px]' />
						<p className='mt-8 sm:ml-16'>
							Las mascotas se mantienen felices en casa con una niñera que les brinda
							cariño y compañía.
						</p>
					</div>
					<div className='flex w-[100%] flex-col-reverse items-center justify-end self-end sm:flex-row'>
						<p className='mt-8 sm:mr-16'>
							Los dueños de mascotas tienen una verdadera tranquilidad al saber que
							sus mascotas están atendidas mientras están fuera.
						</p>
						<img src={image_home_dos} alt='' className='w-[150px]' />
					</div>
				</section>
			</div>
			<div className='flex h-[50px] w-[100%] justify-center bg-[#EDF9F8] align-middle'>
				<p className='self-center font-bold'>Encontra a tu Pet Sitter ideal!</p>
			</div>
			<section className='m-[10%] flex flex-col items-center justify-center px-[10%] lg:m-[4%] lg:flex-row lg:items-start lg:justify-start lg:px-[5%]'>
				<img src={image_home_tres} alt='' className='w-[300px]' />
				<div className='mt-[20px] h-auto w-[100%] flex-col place-content-start items-start lg:ml-[100px] lg:w-[50%]'>
					<h2 className='mb-4 text-center text-[2.5rem] text-[#00A89C] sm:text-[3.5rem] lg:text-start'>
						Cuidado de tu mascota
					</h2>
					<p className='text-center lg:text-start'>
						Nuestro servicio de cuidado de mascotas ofrece atención personalizada en el
						hogar para que tu compañero peludo se sienta seguro y feliz mientras tú no
						estás. Nuestros expertos cuidadores se encargarán de alimentar, pasear y
						jugar con tu mascota con el máximo cariño.
					</p>
				</div>
			</section>
		</main>
	);
};
