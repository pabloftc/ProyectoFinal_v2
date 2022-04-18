import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import { useForm } from "react-hook-form";
import swal from "sweetalert";

// Cargar documentación (PDF - validar) - url Gitpod - En la database se guarda una URL

export default function CourseInscription() {
  const { store, actions } = useContext(Context);
  let history = useHistory();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombreCurso: "",
      descripcionCurso: "",
      duracionCurso: "",
      categoriaCurso: "",
      urlCurso: "",
      imgCurso: "",
      precioCurso: "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        const serverResponse = await actions.registerCourse(
          data.nombreCurso,
          data.descripcionCurso,
          data.duracionCurso,
          data.categoriaCurso,
          data.urlCurso,
          data.imgCurso,
          data.precioCurso
        );
        console.log("Data: ", serverResponse);
        if (serverResponse === 200) {
          swal("Curso Registrado!");
          history.push("/");
        } else {
          swal("Error en el registro, ya existe un Curso con este nombre");
          history.push("/");
        }
        reset();
      })}
    >
      <h1 className="d-flex justify-content-center display-2">
        Formulario Inscripción de Curso
      </h1>
      <div className="form-floating mb-3">
        <input
          {...register("nombreCurso", { required: "Este campo es requerido" })}
          type="text"
          className="form-control"
          id="nombreCurso"
          placeholder="Nombre del Curso"
        ></input>
        <strong>{errors.nombreCurso?.message}</strong>
        <label htmlFor="nombreCurso">Nombre del Curso</label>
      </div>
      {/* { Descripción } */}
      <div className="form-floating mb-3">
        <textarea
          {...register("descripcionCurso", {
            required: "Este campo es requerido",
          })}
          className="form-control"
          placeholder="Leave a comment here"
          id="descripcionCurso"
          style={{ height: "100px" }}
        ></textarea>
        <strong>{errors.descripcionCurso?.message}</strong>
        <label htmlFor="descripcionCurso">Descripción del Curso</label>
      </div>
      {/* Duración y Categoría */}
      <div className="row g-2">
        <div className="col-md mb-3">
          <div className="form-floating">
            <select
              {...register("duracionCurso", {
                required: "Este campo es requerido",
              })}
              className="form-select"
              id="duracionCurso"
              aria-label="Floating label select example"
            >
              <option defaultValue={""}>Elige la duración del Curso</option>
              <option value="1">1 Hora</option>
              <option value="2">2 Horas</option>
              <option value="3">3 Horas</option>
              <option value="4">4+ Horas</option>
            </select>
            <strong>{errors.duracionCurso?.message}</strong>
            <label htmlFor="duracionCurso">Duración</label>
          </div>
        </div>
        <div className="col-md">
          <div className="form-floating">
            <select
              {...register("categoriaCurso", {
                required: "Este campo es requerido",
              })}
              className="form-select"
              id="categoriaCurso"
              aria-label="Floating label select example"
            >
              <option defaultValue={""}>Elige la categoría del Curso</option>
              <option value="programacion">Programación</option>
              <option value="idiomas">Idiomas</option>
              <option value="sobreviv">Sobrevivencia</option>
              <option value="cosas-varias">Cosas varias</option>
              <option value="aprendizaje">Apredizaje</option>
              <option value="salud">Salud</option>
              <option value="alimentacion">Alimentación</option>
            </select>
            <strong>{errors.categoriaCurso?.message}</strong>
            <label htmlFor="categoriaCurso">Categoría</label>
          </div>
        </div>
      </div>
      {/* URL del Curso */}
      <div className="form-floating mb-3">
        <input
          {...register("urlCurso", { required: "Este campo es requerido" })}
          type="url"
          className="form-control"
          id="urlCurso"
          placeholder="url"
        ></input>
        <strong>{errors.urlCurso?.message}</strong>
        <label htmlFor="urlCurso">URL del Curso</label>
      </div>
      {/* URL Imagen del Curso */}
      <div className="form-floating mb-3">
        <input
          {...register("imgCurso", { required: "Este campo es requerido" })}
          type="url"
          className="form-control"
          id="imgCurso"
          placeholder="imgCurso"
        ></input>
        <strong>{errors.imgCurso?.message}</strong>
        <label htmlFor="imgCurso">URL Imagen del Curso</label>
      </div>
      {/* Precio del Curso */}
      <div className="form-floating mb-3">
        <input
          {...register("precioCurso", { required: "Este campo es requerido" })}
          type="number"
          className="form-control"
          id="precioCurso"
          placeholder="Precio del Curso"
        ></input>
        <strong>{errors.precioCurso?.message}</strong>
        <label htmlFor="precioCurso">Precio del Curso</label>
      </div>
      {/* Documentación del Curso */}
      <div className="input-group mb-3">
        <label className="input-group-text" htmlFor="inputGroupFile">
          Carga tu archivo PDF con la documentación del curso
        </label>
        <input
          name="doc-curso"
          type="file"
          className="form-control"
          id="documentacionCurso"
        ></input>
      </div>
      {/* Submit */}
      <div className="d-flex justify-content-center">
        <button type="submit" className="btn btn-primary btn-lg">
          Enviar
        </button>
      </div>
    </form>
  );
}
