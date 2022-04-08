const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token : null,
			usuarioLogueado : {},
			categorias: ["Programación", "Idiomas", "Sobrevivencia", "Cosas varias", "Aprendizaje", "Salud", "Alimentación" ],
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
			]
		},
		actions: {
			//Crear token
			
			createToken: async (email, password) => {
					sessionStorage.setItem("email", email);
					// sessionStorage.setItem("password", password);
					const response = await fetch(process.env.BACKEND_URL + "/api/login", {
					  // MODIFICAR ACA
					  body: JSON.stringify({
						email: email,
						password: password,
					  }),
					  method: "POST",
					  headers: {
						"Content-Type": "application/json",
					  },
					});
					const data = await response.json();
					console.log("_".repeat(80));
					console.log(data);
					if (response.ok == false) {
					  setErrormessage(
						"Su usuario no está registrado en plataforma, o bien se ha equivocado en su contraseña"
					  );
					} else {
					  sessionStorage.setItem("token", data.access_token) 
					//   history.push("/miscursos"); //Código para enviar a otra vista
					}
			}, 
			//Eliminar token 

			//acción que verifica si es que existe un usuario logueado

			//Get para acceder a categorías
			getCategorias: () => {
				return (
					getStore().categorias
				)
			},
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
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
