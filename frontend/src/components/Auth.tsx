import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupType } from "mysecondpackinsweden";
import axios from "axios";
import { BACKENDURL } from "../config";

export const Auth = ({ type }: { type: "signin" | "signup" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupType>({
    name: "",
    username: "",
    password: "",
  });

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKENDURL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );
      const jwt = response.data.jwt;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (e) {
      alert("Error while Signup");
    }
  }

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="m-6">
            <div className="text-3xl font-semibold">Create an Account</div>
            <div className="text-slate-400">
              {type === "signin"
                ? "Don't have Account"
                : "Already have an Account?"}
              <Link
                to={type === "signin" ? "/signup" : "/signin"}
                className="pl-2 underline"
              >
                {type === "signin" ? "Sign Up" : "Sign In"}
              </Link>
            </div>
          </div>
          <div>
            <div>
              {type === "signup" ? (
                <LabelledInput
                  label="Name"
                  placeholder="Awais Iqbal..."
                  onChange={(e) => {
                    setPostInputs({
                      ...postInputs,
                      name: e.target.value,
                    });
                  }}
                />
              ) : null}
              <LabelledInput
                label="UserName"
                placeholder="username"
                onChange={(e) => {
                  setPostInputs({
                    ...postInputs,
                    username: e.target.value,
                  });
                }}
              />
              <LabelledInput
                type="password"
                label="Password"
                placeholder="123456"
                onChange={(e) => {
                  setPostInputs({
                    ...postInputs,
                    password: e.target.value,
                  });
                }}
              />
              <button
                onClick={sendRequest}
                type="button"
                className="text-white
                mt-8 w-full
               bg-gray-800 hover:bg-gray-900 focus:outline-none
                focus:ring-4 focus:ring-gray-300 font-medium rounded-lg 
                text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800
                 dark:hover:bg-gray-700 dark:focus:ring-gray-700
                  dark:border-gray-700"
              >
                {type === "signin" ? "Sign In" : "Sign Up"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium pt-2 text-gray-900 dark:text-white">
        {label}
      </label>
      <input
        type={type || "text"}
        id="first_name"
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 text-gray-900
         text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
          block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
           dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
            dark:focus:border-blue-500"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
