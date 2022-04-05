const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
		},
		actions: {
			// Use getActions to call a function within a fuction

			//para hacer login
			login: async (email, password) => {
				const user = {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: email,
						password: password,
					}),
				};
				try {
					const res = await fetch(
						process.env.BACKEND_URL + "/api/login",
						user
					);
					if (res.status !== 200) {
						throw new Error("Error", Error);
					}
					const data = await res.json();
					console.log("Mensaje desde Backend", data);
					sessionStorage.setItem("token", data.access_token);
					setStore({ token: data.access_token });
					return data;
				} catch (error) {
					console.log(`Nuevo error en el login: ${error}`);
				}
			},

			//para registrarse
			register: async (username, email, password) => {
				console.log('register')
				const user = {
					method: 'POST',
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						username: username,
						email: email,
						password: password,
					}),
				};
				try {
					const res = await fetch(
						process.env.BACKEND_URL + "/api/register",
						user
					);
					const data = await res.json();
					console.log("Mensaje desde Backend", data);
					//setStore({ data: data });
					return res.status;
				} catch (error) {
					console.log(`Nuevo error en el usuario: ${error}`);
				}
			},

			//para sincronizar sesión
			loginToken: () => {
				const token = sessionStorage.getItem("token");
				console.log("Sincronización acoplada con token");
				if (token && token != undefined && token != "")
					setStore({ token: token });
				console.log(token)
			},

			//para cerrar sesión
			logout: () => {
				sessionStorage.removeItem("token");
				console.log("Sesión cerrada");
				setStore({ token: null });
			},

			// Hasta aquí es el código Sayan

			exampleFunction: () => {
				console.log("Hola desde el backend");
			},

			getMessage: () => {
				// fetching data from the backend
				fetch(process.env.BACKEND_URL + "/api/hello")
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log("Error loading message from backend", error));
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
