//Libraries
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { logout } from './reducers/user/userSlice';
import { clear as clearPets } from './reducers/pets/petSlice';
import { clear as clearComments } from './reducers/comments/commentSlice';
import { clear as clearContracts } from './reducers/contracts/contractSlice';

//Pages
// import { Error } from './pages/Everyone/Error';
import { Login } from './pages/Everyone/Login';
import { Register } from './pages/Everyone/Register';
import { ChangePassword } from './pages/Everyone/ChangePassword';

//Shared pages
import { Profile } from './pages/SharedPages/Profile';
import { EditProfile } from './pages/SharedPages/EditProfile';

//PetSitter pages
import { DashboardPetSitter } from './pages/PetSitter/DashboardPetSitter';
import { AllComments } from './pages/PetSitter/AllComments';
import { AllContracts } from './pages/PetSitter/AllContracts';
import { ContractInfo } from './pages/PetSitter/ContractInfo';
import { CreateService } from './pages/PetSitter/CreateService';
import { MyServices } from './pages/PetSitter/MyServices';
import { EditService } from './pages/PetSitter/EditService';

//Client pages
import { DashboardClient } from './pages/Client/DashboardClient';
import { Home } from './pages/Client/Home';
import { Services } from './pages/Client/Services';
import { Contract } from './pages/Client/Contract';
import { Pets } from './pages/Client/Pets';

//Components
import { Comments } from './components/Comment/Comments';
import { CreateComment } from './components/Comment/CreateComment';

//Layouts
import { Layout } from './components/Layouts/Layout';
import { LayoutUserExists } from './components/Layouts/LayoutUserExists';
import { LayoutUserNotExists } from './components/Layouts/LayoutUserNotExists';
import { LayoutPetSitter } from './components/Layouts/LayoutPetSitter';
import { LayoutClient } from './components/Layouts/LayoutClient';
import { LayoutServiceInfo } from './components/Layouts/LayoutServiceInfo';



function App() {
	const dispatch = useDispatch();

	const { currentUser } = useSelector((state) => state.user);

	useEffect(() => {
		const checkCookie = () => {
			const myCookie = Cookies.get('token');

			if (!myCookie) {
				dispatch(logout());
				dispatch(clearPets());
				dispatch(clearComments());
				dispatch(clearContracts());
			}
		};
	
		checkCookie();
		const intervalId = setInterval(checkCookie, 12 * 60 * 60 * 1000);
		return () => {
			clearInterval(intervalId);
		};
	}, [dispatch]);

    
	return (
		<>
			<Routes>
				<Route path='/' element={<Layout />}>
					{/* En estas rutas pueden entrar todos */}
					<Route
						index
						path='/'
						element={
							currentUser && currentUser.role === 2 ? (
								<DashboardPetSitter />
							) : (
								<Home />
							)
						}
					/>
					{/* <Route path='/error' element={<Error />} /> */}

					{/* En estas rutas solo pueden entrar los usuarios que no esten logueados */}
					<Route element={<LayoutUserNotExists />}>
						<Route path='login' element={<Login />} />
						<Route path='register' element={<Register />} />
						<Route path='change-password' element={<ChangePassword />} />
					</Route>

					{/* En estas rutas solo pueden entrar los usuarios que esten logueados */}
					<Route element={<LayoutUserExists />}>
						<Route path='profile/:id' element={<Profile />} />
						<Route path='profile/:id/edit' element={<EditProfile />} />

						{/* En estas rutas solo pueden entrar los usuarios que esten logueados y sean clientes */}
						<Route element={<LayoutClient />}>
							<Route path='dashboard' element={<DashboardClient />} />
							<Route path='services' element={<Services />} />
							<Route path='profile/:id/pets' element={<Pets />} />

							<Route path='services/:idService' element={<LayoutServiceInfo />}>
								<Route path='' element={<Comments />} />
								<Route path='comment' element={<CreateComment />} />
							</Route>
							<Route path='services/:idService/contract' element={<Contract />} />
						</Route>

						{/* En estas rutas solo pueden entrar los usuarios que esten logueados y sean petsitters */}
						<Route element={<LayoutPetSitter />}>
							<Route path='/all-contracts' element={<AllContracts />} />
							<Route path='/all-comments' element={<AllComments />} />
							<Route path='/contract/:id' element={<ContractInfo />} />
							<Route path='/my-services' element={<MyServices />} />
							<Route path='/create-service' element={<CreateService />} />
							<Route path='/edit-service/:id' element={<EditService />} />
						</Route>
						<Route path='*' element={<Navigate to='/' replace />} />
					</Route>
				</Route>
			</Routes>
		</>
	);
}

export default App;
