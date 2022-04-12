//import 'dotenv'  // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

//dotenv.config();
console.log(process.env.ADMIN_EMAIL)
const getState = ({ getStore, getActions, setStore }) => {

	return {
		store: {
			lista_usuarios: [],
			categorias: ["Programación", "Idiomas", "Sobrevivencia", "Cosas varias", "Aprendizaje", "Salud", "Alimentación" ],
			message: null,
			cursos: [],
			token: null,
			rol: "Admin",
			user_id: "3",
			lista_mis_cursos:[],
			usuario: null,
			}
			
		,
		actions: {
				//Usuarios

			crearUser: 	async (username, password, rol, email) => {
				const opts = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					"username": username,
					"email": email,
					"password": password,
					"rol": rol,
					"is_active" : false
				
				}),
				};
				try {
				const resp = await fetch(
					"https://3001-4geeksacademy-reactflask-hxq1jnfs26u.ws-us39.gitpod.io/api/usuarios" + id,
					opts
				);
				if (resp.status < 200 || resp.status > 299) {
					alert("there has been an error");
					return false;
				}

				const data = await resp.json();
				console.log("this came from the backend", data);
				alert("Usuario creado con exito");
				return true;
				} catch (error) {
				console.log("theres an error while Creating the User", error);
				}},

			borrarUsuario:  (e) => {
				const opts = {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						"id": e.id,
					
					})};
				fetch ("https://3001-4geeksacademy-reactflask-hxq1jnfs26u.ws-us39.gitpod.io/api/usuarios/" + id,opts)
				.then(response => response.text())
				.then(result => {
					console.log(result);
					
				})
				.catch(error => console.log("error", error));
			},
			actualizarUser: async (id, username, password, rol, email) => {
				const opts = {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					"id": id,
					"username": username,
					"email": email,
					"password": password,
					"rol": rol,
					"is_active" : false
				
				}),
				};
				try {
				const resp = await fetch(
					"https://3001-4geeksacademy-reactflask-hxq1jnfs26u.ws-us39.gitpod.io/api/usuarios/" + id,
					opts
				);
				if (resp.status < 200 || resp.status > 299) {
					alert("there has been an error");
					return false;
				}

				const data = await resp.json();
				console.log("this came from the backend", data);
				alert("Usuario actualizado con exito");
				return true;
				} catch (error) {
				console.log("theres an error while Updating the User", error);
				}},
			getUsuarios: async () => {
				const store = getStore()
				const opts = {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					}};
					try {
						const resp = await fetch(
							"https://3001-4geeksacademy-reactflask-hxq1jnfs26u.ws-us38.gitpod.io/api/usuarios",
							opts
						);
						if (resp.status !== 200) {
							alert("there has been an error");
							return false;
						}
		
						const data = await resp.json();
						console.log("this came from the backend", data);
						setStore({ lista_usuarios: data });
						return true;
						} catch (error) {
						console.log("there an error while Loading the Courses", error);
						}
			},
			getCursos: async () => {

				const opts = {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					}};
					try {
						const resp = await fetch(
							"https://3001-4geeksacademy-reactflask-hxq1jnfs26u.ws-us38.gitpod.io/api/cursos",
							opts
						);
						if (resp.status !== 200) {
							alert("there has been an error");
							return false;
						}
		
						const data = await resp.json();
						console.log("this came from the backend", data);
						setStore({ cursos: data });
						return true;
						} catch (error) {
						console.log("there an error while Loading the Courses", error);
						}
				
	
					
			},
			crearCurso:	async (nombre, categoria, descripcion, precio, duracion, URL, URLPortada, userId) => {
				const opts = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					"name": nombre,
					"categoria": categoria,
					"description": descripcion,
					"precio": precio,
					"duracion": duracion,
					"URL": URL,
					"URLPortada": URLPortada,
					"user_id" : userId

				}),
				};
				try {
				const resp = await fetch(
					"https://3001-4geeksacademy-reactflask-hxq1jnfs26u.ws-us38.gitpod.io/api/cursos",
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
				console.log("theres an error while Creating the Course", error);
				}
			},
			borrarCurso: async (id, user_id) => {const opts = {
				method: "DELETE",
				headers: {
				  "Content-Type": "application/json",
				},
				body: JSON.stringify({
				  "id": id,
				  "user_id": user_id
	  
				}),
			  };
			  try {
				const resp = await fetch(
				  "https://3001-4geeksacademy-reactflask-hxq1jnfs26u.ws-us38.gitpod.io/api/cursos/" + id +"/"+ user_id,
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

				// MisCursos por usuario
				getCursosUser: async (user_id) => {

					const opts = {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						}};
						try {
							const resp = await fetch(
								"https://3001-4geeksacademy-reactflask-hxq1jnfs26u.ws-us38.gitpod.io/api/miscursos/" + user_id,
								opts
							);
							if (resp.status !== 200) {
								alert("there has been an error");
								return false;
							}
			
							const data = await resp.json();
							console.log("this came from the backend", data);
							setStore({ lista_mis_cursos: data });
							return true;
							} catch (error) {
							console.log("there an error while Loading the Courses", error);
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
