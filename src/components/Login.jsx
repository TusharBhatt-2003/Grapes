import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice"; // Ensure it's the correct path
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
<<<<<<< HEAD
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (data) => {
    setError("");
    setLoading(true);
    try {
      const session = await authService.login(data); // Log in with Appwrite
      if (session) {
        const userData = await authService.getCurrentUser(); // Get current user data
        if (userData) {
          dispatch(authLogin({ userdata: userData })); // Dispatch login action
          navigate("/all-posts"); // Navigate to the All Posts page
=======
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const login = async (data) => {
        setError("");
        setLoading(true);
        try {
            const session = await authService.login(data); // Log in with Appwrite
            if (session) {
                const userData = await authService.getCurrentUser(); // Get current user data
                if (userData) {
                    dispatch(authLogin({ userdata: userData })); // Dispatch login action
                    navigate("/all-posts"); // Navigate to the All Posts page
                }
            }
        } catch (error) {
            setError(error.message || "Login failed, please try again.");
        } finally {
            setLoading(false);
>>>>>>> 30b7709d2c6805388f97e1f995c29d9cd4117428
        }
      }
    } catch (error) {
      setError(error.message || "Login failed, please try again.");
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
  return (
    <div className="flex items-center justify-center m-9 text-white">
      <div className="mx-auto w-fit max-w-lg bg-black rounded-xl p-10 border-2 border-[#931313]">
        <div className="mb-2 flex justify-center"></div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: "Email is required",
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            <Button type="submit" className="w-full bg-[#931313]">
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
=======
    return (
        <div className='flex items-center justify-center m-9'>
            <div className='mx-auto w-full max-w-lg bg-[#EFFFF2] rounded-xl p-10 border border-black/10'>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have an account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                validate: {
                                    matchPattern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: "Password is required",
                            })}
                        />
                        <Button type="submit" className="w-full bg-[#B3DEE7]">
                            {loading ? 'Signing in...' : 'Sign in'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
>>>>>>> 30b7709d2c6805388f97e1f995c29d9cd4117428
}

export default Login;
