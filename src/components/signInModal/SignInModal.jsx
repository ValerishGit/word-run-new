import { useState } from "react";
import GlowingButton from "../glowingButton/GlowingButton";

const SignInModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptTOS, setAcceptTOS] = useState(false);
  const [acceptPromotions, setAcceptPromotions] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [tosError, setTosError] = useState('');

  const validateEmail = () => {
    const isValid = /\S+@\S+\.\S+/.test(email);
    setEmailError(isValid ? '' : 'Invalid email format');
    return isValid;
};

const validatePassword = () => {
    const isValid = password.length >= 8;
    setPasswordError(isValid ? '' : 'Password must be at least 8 characters long');
    return isValid;
};

const validateTOS = () => {
    const isValid = acceptTOS;
    setTosError(isValid ? '' : 'Please accept the Terms of Service');
    return isValid;
};


const handleSignIn = () => {
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isTOSValid = validateTOS();

    if (isEmailValid && isPasswordValid && isTOSValid) {
        // Your sign-in logic here
        console.log('Email:', email);
        console.log('Password:', password);
        // Close the modal after sign-in
        onClose(email,password,1);
    }
};

const handleRegister = () => {
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isTOSValid = validateTOS();

    if (isEmailValid && isPasswordValid && isTOSValid) {
        // Your registration logic here
        console.log('Registering with Email:', email);
        console.log('Registering with Password:', password);
        console.log('Accept TOS:', acceptTOS);
        console.log('Accept Promotions:', acceptPromotions);
        // Close the modal after registration
        onClose(email,password,2);
    }
};

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 ${
        isOpen
          ? "transition-all duration-300 transform translate-y-0"
          : "transition-all duration-300 transform translate-y-full"
      }`}
    >
      <div className="bg-gray-800 rounded-t-lg p-6 shadow-lg flex flex-col justify-center items-start">
        <button
          className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 hover:text-gray-800 focus:outline-none"
          onClick={onClose}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="mb-4 w-[100%]">
          <label
            className="block  text-gray-400 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-orange-300 leading-tight focus:outline-none focus:shadow-outline ${emailError ? 'border-red-500' : ''}`}
                        id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
                              {emailError && <p className="text-red-500 text-xs italic">{emailError}</p>}

        </div>
        <div className="mb-6 w-[100%]">
          <label
            className="block  text-gray-400 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-orange-300 mb-3 leading-tight focus:outline-none focus:shadow-outline ${passwordError ? 'border-red-500' : ''}`}
                        id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
                              {passwordError && <p className="text-red-500 text-xs italic">{passwordError}</p>}

        </div>
        <div className="mb-6">
          <label className="block  text-gray-400 text-sm font-bold mb-2">
            <input
              type="checkbox"
              className="mr-2 leading-tight"
              checked={acceptTOS}
              onChange={() => setAcceptTOS(!acceptTOS)}
            />
            <span className="text-sm text-gray-400">
              I accept the <a href="#">Terms of Service</a> and{" "}
              <a href="#">Privacy Policy</a>
            </span>
          </label>
          {tosError && <p className="text-red-500 text-xs italic">{tosError}</p>}

        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            <input
              type="checkbox"
              className="mr-2 leading-tight"
              checked={acceptPromotions}
              onChange={() => setAcceptPromotions(!acceptPromotions)}
            />
            <span className="text-sm  text-gray-400">
              I want to receive promotions via email
            </span>
          </label>
        </div>
        <div className="flex justify-center w-[100%] mb-4">
          <div className="flex flex-row gap-4 items-center">
            <GlowingButton onClick={handleSignIn}>Sign In</GlowingButton>
            <span className="ml-1 mr-1 text-gray-300">OR</span>
            <GlowingButton onClick={handleRegister}>Sign Up</GlowingButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInModal;
