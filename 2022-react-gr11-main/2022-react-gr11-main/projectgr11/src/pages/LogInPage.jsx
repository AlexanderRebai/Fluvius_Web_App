import { FormProvider, useForm } from "react-hook-form";
import { useCallback, useEffect } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { FaUserAlt, FaLock, FaIdCard } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import { useLogin, useSession } from "../contexts/AuthProvider";
import swal from "sweetalert";
import { Link } from "react-router-dom";

//Attribuut data-cy is voor testing => niet verwijderen!

export default function LogInPage() {
  const navigate = useNavigate();
  const { loading, error, isAuthed, setError } = useSession();
  const login = useLogin();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleLogin = useCallback(
    async ({ username, password }) => {
      try {
        const success = await login(username, password);
        if (success) {
          navigate("/dashboard");
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
    [login]
  );

  const handleCancel = useCallback(() => {
    reset();
  }, [reset]);

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
  }, [isAuthed, error]);

  return (
    <>
      <div>
        <FormProvider
          handleSubmit={handleSubmit}
          errors={errors}
          register={register}
        >
          <div className="container">
            <div className="screen">
              <div className="screen__content">
                <form className="login" onSubmit={handleSubmit(handleLogin)}>
                  <div className="login__field">
                    <h1>Welcome to</h1>
                    <h1>Fluvius!</h1>
                    <FaUserAlt />
                    <input
                      type="text"
                      {...register("username")}
                      className="login__input"
                      placeholder="Username"
                      data-cy="username_input"
                      required
                    />
                  </div>
                  <div className="login__field">
                    <FaLock />
                    <input
                      type="password"
                      {...register("password")}
                      className="login__input"
                      placeholder="Password"
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
                    <span className="button__text">Log In Now</span>
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
                  <div className="social-login">
                    <h3>log in via</h3>
                    <div className="social-icons">
                      <Link to={"/e-id"} data-cy="e-id_btn">
                        <FaIdCard className="e-id-icon"/>
                      </Link>
                    </div>
                  </div>
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
    </>
  );
}
