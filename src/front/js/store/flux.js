const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			usuarios: null,
			message: null,
			cursos: null,
			
		},
		actions: {
			getCursos: async () => {
				const opts = {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					}};
					try {
						const resp = await fetch(
							"https://3001-4geeksacademy-reactflask-hxq1jnfs26u.ws-us38.gitpod.io/?vscodeBrowserReqId=1649139294682/api/cursos",
							opts
						);
						if (resp.status !== 200) {
							alert("there has been an error");
							return false;
						}
		
						const data = await resp.json();
						console.log("this came from the backend", data);
						return true;
						} catch (error) {
						console.log("there an error while Loading the Courses", error);
						}

	
					
			},
			crearCurso:	async (nombre, categoria, descripcion, precio, duracion, URL, URLPortada) => {
				const opts = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					"nombre": nombre,
					"categoria": categoria,
					"descripcion": descripcion,
					"precio": precio,
					"duracion": duracion,
					"URL": URL,
					"URLPortada": URLPortada

				}),
				};
				try {
				const resp = await fetch(
					"https://3001-4geeksacademy-reactflask-hxq1jnfs26u.ws-us38.gitpod.io/?vscodeBrowserReqId=1649139294682/api/cursos",
					opts
				);
				if (resp.status !== 200) {
					alert("there has been an error");
					return false;
				}

				const data = await resp.json();
				console.log("this came from the backend", data);
				alert("Curso creado con exito");
				return true;
				} catch (error) {
				console.log("there an error while Creating the Course", error);
				}
			},
			borrarCurso: async (id) => {const opts = {
				method: "POST",
				headers: {
				  "Content-Type": "application/json",
				},
				body: JSON.stringify({
				  "id": id
	  
				}),
			  };
			  try {
				const resp = await fetch(
				  "https://3001-4geeksacademy-reactflask-hxq1jnfs26u.ws-us38.gitpod.io/?vscodeBrowserReqId=1649139294682/api/cursos",
				  opts
				);
				if (resp.status !== 200) {
				  alert("there has been an error");
				  return false;
				}
				alert("Curso Eliminado con exito");
						return true;	
					}
					catch (error) {
					console.log("there an error while Creating the Course", error);
				}
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
