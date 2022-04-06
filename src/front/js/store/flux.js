
const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      playlists: [],
      cursos: [],
      curso_actual: {}
    },
    actions: {
      // Use getActions to call a function within a fuction
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
        fetch(process.env.BACKEND_URL + `/api/detalle_curso/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setStore({ curso_actual: data})
        })
      },

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
