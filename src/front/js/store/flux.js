const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null,
      isLoggedIn: false,
      categorias: [
        "Programación",
        "Idiomas",
        "Sobrevivencia",
        "Cosas varias",
        "Aprendizaje",
        "Salud",
        "Alimentación",
      ],
      playlists: [],
      cursos: [],
      curso_actual: {},
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
          sessionStorage.setItem("token", data.access_token);
          //reset the global store- Función que cambia el estado de isLoggedIn del store a true
          setStore({ isLoggedIn: true });
          //   history.push("/miscursos"); //Código para enviar a otra vista
        }
      },
      //Eliminar token
      deleteToken: () => {
        sessionStorage.clear();
        setStore({ isLoggedIn: false });
      },

      //acción que verifica si es que existe un usuario logueado
      getIsLoggedIn: () => {
        return getStore().isLoggedIn;
      },

      //Get para acceder a categorías
      getCategorias: () => {
        return getStore().categorias;
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

      //para registrarse
      register: async (username, email, password) => {
        console.log("register");
        const user = {
          method: "POST",
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
        console.log("hola desde el backend");
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
        console.log("comprando");
        const pedidos = {
          method: "POST",
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
        console.log("vamos bien hasta aquí comprando", pedidos);
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
        console.log("comenzar a enviar correo");
        const correo = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        };
        console.log("Vamos bien, se está enviando", correo);
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

      registerCourse: async (
        nombreCurso,
        descripcionCurso,
        duracionCurso,
        categoriaCurso,
        urlCurso,
        imgCurso
      ) => {
        console.log("1");
        const course = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombreCurso: nombreCurso,
            descripcionCurso: descripcionCurso,
            duracionCurso: duracionCurso,
            categoriaCurso: categoriaCurso,
            urlCurso: urlCurso,
            imgCurso: imgCurso,
          }),
        };
        console.log("2");
        try {
          const res = await fetch(
            process.env.BACKEND_URL + "/api/cursos",
            course
          );
          if (res.status != 200) {
            throw new Error("El Curso ya existe", Error);
          }
          console.log("3", res.status);
          const data = await res.json();
          console.log("Curso agregado!", data);
          return res.status; // Revisar "Promesa"
        } catch (error) {
          console.log(`No se pudo agregar el curso: ${error}`);
        }
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
        setStore({ cursos: cursos });
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

      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: () => {
        // fetching data from the backend
        fetch(process.env.BACKEND_URL + "/api/hello")
          .then((resp) => resp.json())
          .then((data) => setStore({ message: data.message }))
          .catch((error) =>
            console.log("Error loading message from backend", error)
          );
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
      },
    },
  };
};

export default getState;
