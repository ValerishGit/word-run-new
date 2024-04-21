import { useSelector, useDispatch } from "react-redux";
import GlowingButton from "../glowingButton/GlowingButton";
import Modal from "../modalsheet/CustomModal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetGame } from "../../store/slice";
import { auth } from "../../config/firebase";
import SignInModal from "../signInModal/SignInModal";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
const HomeScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);

  const game = useSelector((state) => state.game.game);
  const dispatch = useDispatch();

  const navigateTo = useNavigate();

  useEffect(() => {
    // Simulate fetching authentication state
    setTimeout(() => {
      // Assuming you have an auth object from Firebase or similar
      setCurrentUser(auth.currentUser);
      setIsLoading(false);
    }, 1000); // Simulating delay for fetching authentication state
  }, []);

  const UserAuthSection = () => {
    const signUp = async (email, password) => {
      setIsLoading(true);
      try {
        let res = await createUserWithEmailAndPassword(auth, email, password);
        setCurrentUser(res.user);
      } catch (error) {
        handleError(error);
      } finally{
        setIsLoading(false);

      }
    };

    const signOutUser = async () => {
      await signOut(auth);
      setCurrentUser(null);
      setIsLoading(false);
    };

    const signIn = async (email, password) => {
      setIsLoading(true);
      try {
        let res = await signInWithEmailAndPassword(auth, email, password);
        setCurrentUser(res.user);
      } catch (error) {
        handleError(error);
      } finally{
        setIsLoading(false)
      }
    };

    return (
      <div className="h-[10vh] mt-10">
        <div>
          {auth.currentUser != undefined ? (
            <div>
              <GlowingButton onClick={() => signOutUser()}>
                Sign Out
              </GlowingButton>
            </div>
          ) : (
            <div className="flex flex-col gap-5 justify-center items-center">
              <SignInModal
                isOpen={isAuthModalOpen}
                onClose={(email, password, type) => {
                  switch (type) {
                    case 1:
                      //Sign In
                      signIn(email, password);
                      break;
                    case 2:
                      //Sign Up
                      signUp(email, password);
                      break;

                    default:
                      break;
                  }
                  console.log(email, password);
                  setIsAuthModalOpen(!isAuthModalOpen);
                }}
              ></SignInModal>
              <p>Sign in to keep your score!</p>
              {error && <p className="text-red-500 text-xs italic">{error}</p>}

              <GlowingButton onClick={() => setIsAuthModalOpen(true)}>
                Sign In
              </GlowingButton>
            </div>
          )}
        </div>
      </div>
    );
  };

  const MainSection = () => {
    const [showDifSelect, setShowDifSelect] = useState(false);

    const MainMenuSection = () => {
      return (
        <div className={` flex flex-col gap-4 justify-center items-center  `}>
          <Modal isModalOpen={isModalOpen} onClose={closeModal} />
          <GlowingButton onClick={showDifChange}>Start Game</GlowingButton>
          <GlowingButton onClick={openModal}>How to Play</GlowingButton>
          <GlowingButton onClick={openModal}>Leaderboard</GlowingButton>
        </div>
      );
    };

    const DifSelectSection = () => {
      return (
        <div className={`section`}>
          <Modal isModalOpen={isModalOpen} onClose={closeModal} />
          <div className={`flex flex-col gap-4 justify-center items-center`}>
            <div className="flex flex-col  gap-4">
              <GlowingButton onClick={() => startGame({ dif: false })}>
                Easy Mode
              </GlowingButton>
              <GlowingButton onClick={() => startGame({ dif: true })}>
                Hard Mode
              </GlowingButton>
            </div>
            <GlowingButton onClick={showDifChange}>Back</GlowingButton>
          </div>
        </div>
      );
    };

    const showDifChange = () => {
      setShowDifSelect((prev) => !prev);
    };
    return (
      <div id="mainSection" className="h-[20vh]">
        {showDifSelect ? <DifSelectSection /> : <MainMenuSection />}
      </div>
    );
  };

  const handleError = (error) => {
    switch (error.code) {
      case "auth/invalid-credential":
        setError("Invalid Credentials");
        break;
      case "auth/user-not-found":
        setError("User not found");
        break;
      case "auth/wrong-password":
        setError("Invalid password");
        break;
      case "auth/email-already-in-use":
        setError("Email already in use");
        break;
      default:
        setError("An error occurred");
        break;
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const startGame = ({ dif }) => {
    dispatch(
      resetGame({
        id: 1,
        numOfPlayers: 1,
        isHardMode: dif,
        score: 0,
        isRunning: false,
        finalScore: 0,
        timeOut: Date.now() + 30 * 1000,
        bestScore: localStorage.getItem("bestScore") || 0,
      })
    );
    navigateTo("/game-run");
  };

  return (
    <div className="flex flex-col justify-center items-center gap-10  ">
      <div>
        <h1 className="text-6xl font-extrabold text-center animate-bounce">
          Word<span className="text-orange-400">Run</span>
        </h1>
        <p className="text-lg font-light text-center text-orange-300 ">
          How fast can you type?
        </p>
        <p className="text-md font-light text-center text-white ">
          Best:{localStorage.getItem('bestScore') ?? 0}
        </p>
      </div>
      <div className="h-[30vh] flex flex-col justify-center items-center">
      {isLoading ? (
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-orange-300"></div>
      ) : (
        <div>
          <MainSection />
          <UserAuthSection />
        </div>
      )}
      </div>
     

      <div className="flex flex-col gap-1">
        <span className="text-xs">Early Test V0.0.2</span>
        <span className="text-xs text-orange-300">support@word-run.com</span>
      </div>
    </div>
  );
};

export default HomeScreen;
