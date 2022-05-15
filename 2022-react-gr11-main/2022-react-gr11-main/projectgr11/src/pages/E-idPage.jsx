//css voor alle bootstrap componenten
//import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";

import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useCallback } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import swal from "sweetalert";
import { useLoginE_id, useSession } from "../contexts/AuthProvider";

export default function E_idPage() {
  const { loading, error, isAuthed, setError } = useSession();
  const loginE_id = useLoginE_id();
  const [showElement, setShowElement] = React.useState(true);
  //Simuleren van een delay
  useEffect(() => {
    setTimeout(function () {
      setShowElement(false);
    }, 2000);
  }, []);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isAuthed) {
      //navigate("/dashboard");
    }
    if (error) {
      swal({
        title: "Error",
        text: error,
        icon: "error",
      });
      setError("");
    }
  }, [isAuthed, error, setError]);

  const handleLogin = useCallback(
    async ({ idnummer, password }) => {
      try {
        const success = await loginE_id(idnummer, password);
        if (success) {
          navigate("/dashboard");
        } else {
          swal("Error", "Het idnummer en password komen niet overeen", "error");
        }
      } catch (error) {
        swal(
          "Error",
          "Er is een fout opgetreden, probeert u het later opnieuw",
          "error"
        );
        console.error(error);
      }
    },
    [loginE_id, navigate]
  );

  const handleCancel = useCallback(() => {
    reset();
  }, [reset]);

  return (
    <>
      <div>
        {showElement ? (
          <div>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <br />
            Redirecting...
          </div>
        ) : (
          <div>
            <FormProvider
              handleSubmit={handleSubmit}
              errors={errors}
              register={register}
            >
              <div className="container">
                <div className="screen">
                  <div className="screen__content">
                    <form
                      className="login"
                      onSubmit={handleSubmit(handleLogin)}
                    >
                      <div className="login__field">
                      <h1>Log in with e-id</h1>
                        <FaUserAlt />
                        <input
                          type="text"
                          {...register("idnummer")}
                          className="login__input"
                          placeholder="11.11.11-123.45"
                          data-cy="kaartnummer_input"
                          required
                        />
                      </div>
                      <div className="login__field">
                        <FaLock />
                        <input
                          type="password"
                          {...register("password")}
                          className="login__input"
                          placeholder="1234"
                          data-cy="password_input"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="button login__submit"
                        data-cy="login_btn"
                      >
                        <span className="button__text">Log In With E-id</span>
                        <div className="arrow_right">
                          <AiOutlineArrowRight />
                        </div>
                      </button>
                      <button
                        type="reset"
                        className="button login__submit"
                        onClick={handleCancel}
                      >
                        <span className="button__text">Cancel</span>
                      </button>
                    </form>
                  </div>
                  <div className="screen__background">
                    <span className="screen__background__shape screen__background__shape4"></span>
                    <span className="screen__background__shape screen__background__shape3"></span>
                    <span className="screen__background__shape screen__background__shape2"></span>
                    <span className="screen__background__shape screen__background__shape1"></span>
                  </div>
                </div>
              </div>
            </FormProvider>
          </div>
        )}
      </div>
    </>
  );
}
