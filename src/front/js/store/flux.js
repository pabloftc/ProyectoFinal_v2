const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      playlists: [],
      cursos: [],
      curso_actual: {},
    },
    actions: {
      // Use getActions to call a function within a fuction
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
        const user = {
          method: "POST",
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
          if (res.status != 200) {
            throw new Error("Error", Error);
          }
          const data = await res.json();
          console.log("Mensaje desde Backend", data);
          setStore({ data: data });
          return data;
        } catch (error) {
          console.log(`Nuevo error en el usuario: ${error}`);
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
          return res.status // Revisar "Promesa"
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

      courseToStore: (id) => {
        const store = getStore();
        const cursoActual = store.cursos.find((curso) => curso.id === id);
        setStore({ curso_actual: cursoActual });
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
