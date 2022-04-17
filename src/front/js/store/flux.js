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
			token: null,
			isLoggedIn: false,
			playlists: [],
			curso_actual: {},
			pago: {},
		
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
					process.env.BACKEND_URL + "/api/usuarios" + id,
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
					fetch (process.env.BACKEND_URL + "/api/usuarios/" + id,opts)
					.then(response => response.text())
					.then(result => {
						console.log(result);
						
					})
					.catch(error => console.log("error", error));
				},
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
					//reset the global store- Función que cambia el estado de isLoggedIn del store a true
					setStore({ isLoggedIn: true });
					//   history.push("/miscursos"); //Código para enviar a otra vista
				}
			},
			//Eliminar token 
			deleteToken: () => {
				sessionStorage.clear()
				setStore({ isLoggedIn: false });
			},

			//acción que verifica si es que existe un usuario logueado
			getIsLoggedIn: () => {
				return (
					getStore().isLoggedIn
				)
			},

			//Get para acceder a categorías
			getCategorias: () => {
				return (
					getStore().categorias
				)
			},
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
						const res = await fetch(process.env.BACKEND_URL + "/api/login", user);
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
					process.env.BACKEND_URL + "/api/usuarios/" + id,
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
							process.env.BACKEND_URL + "/api/usuarios",
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
							process.env.BACKEND_URL + "/api/cursos",
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
					process.env.BACKEND_URL + "/api/cursos",
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
					process.env.BACKEND_URL + "/api/cursos/" + id +"/"+ user_id,
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
								process.env.BACKEND_URL + "/api/miscursos/" + user_id,
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
						rol: "user",
						//is_active: "activo"
					}),
				};
				console.log("hola desde el backend")
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


			//para comprar
			compra: async (pago, fecha, precio_total, idcurso) => {
				console.log('comprando')
				const pedidos = {
					method: 'POST',
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						metodo_de_pago: pago,
						created_at: fecha,
						precio_total: precio_total,
						curso_id: idcurso,
					}),
				};
				console.log("vamos bien hasta aquí comprando", pedidos)
				try {
					const res = await fetch(
						process.env.BACKEND_URL + "/api/compra",
						pedidos
					);
					const data = await res.json();
					console.log("Mensaje desde Backend para compra", data);
					return res.status;
				} catch (error) {
					console.log(`Nuevo error en el usuario: ${error}`);
				}
			},


			//para mandar correo
			send_email: async (email) => {
				console.log('comenzar a enviar correo')
				const correo = {
					method: 'POST',
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: email,
					}),
				};
				console.log("Vamos bien, se está enviando", correo)
				try {
					const res = await fetch(
						process.env.BACKEND_URL + "/api/email",
						correo
					);
					const data = await res.json();
					console.log("Mensaje desde Backend para correo", data);
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
				console.log(token);
			},

			//para cerrar sesión
			logout: () => {
				sessionStorage.removeItem("token");
				console.log("Sesión cerrada");
				setStore({ token: null });
			},

			getYoutubePlaylist: () => {
				const youTubeSearch = "https://www.googleapis.com/youtube/v3/playlists";
				const res = fetch(
					`${youTubeSearch}?part=snippet&channelId=UC8butISFwT-Wl7EV0hUK0BQ&maxResults=9&key=${process.env.YOUTUBE_API_KEY}`
				)
					.then((res) => res.json())
					.then((data) => {
						setStore({ playlists: data.items });
					});
			},


			getCourses: (curso) => {
				fetch(
					process.env.BACKEND_URL + "/api/detalle_curso" + `?name=${curso}`,
					{
						method: "GET",
						headers: { "Content-Type": "application/json" },
					}
				)
					.then((response) => response.json())
					.then((data) => {
						setStore({ cursos: data });
					});
			},
			setCursos: (cursos) => {
				setStore({cursos:cursos});
			  },

			courseToStore: (id) => {
				const store = getStore();
				const cursoActual = store.cursos.find((curso) => curso.id === id);
				setStore({ curso_actual: cursoActual });
			},


			//guardar en localstorage
			subscribe: () => {
				saveToLocalStorage(store.getState());
			},

			// Hasta aquí es el código Sayan
		}
	};// fin de actions

}// fin de return // fin de const getstate
		
	
export default getState;

