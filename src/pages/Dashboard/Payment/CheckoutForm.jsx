import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { Helmet } from "react-helmet";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Swal from "sweetalert2";

const CheckoutForm = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  const { price, contest } = location.state || {};

  const { user } = useContext(AuthContext);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    setTransactionId("");

    axiosSecure.post("/create-payment-intent", { price }).then((res) => {
      setClientSecret(res.data.clientSecret);
    });
  }, [axiosSecure, price]);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const stripe = useStripe();
  const elements = useElements();

  const handleCheckOutSubmit = async (e) => {
    e.preventDefault();
    setIsConfirming(true);

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirm error");
    } else if (paymentIntent?.status === "succeeded") {
      setTransactionId(paymentIntent.id);
      setIsConfirming(false);
      setIsOpen(true);
    }
  };

  const HandleRegistrationSubmitClick = async (e) => {
    e.preventDefault();

    const form = e.target;
    const taskLink = form.task_link.value;

    const submissionData = {
      contest_id: contest._id,
      creator_email: contest.creator.email,
      contest_title: contest.contestName,
      contest_prize: contest.prizeMoney,
      participant_name: user?.displayName,
      participant_email: user?.email,
      task_link: taskLink,
      transaction_id: transactionId,
      isWinner: false,
    };

    try {
      const res = await axiosSecure.post("/participants", submissionData);
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Task submitted!",
          showConfirmButton: false,
          timer: 1500,
        });
        setIsOpen(false);
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Could not submit",
        customClass: {
          confirmButton: "bg-[#F97316]",
        },
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Payment - ContestPro</title>
      </Helmet>

      <p className="text-gray-400 dark:text-gray-200 mb-4">
        Payment Amount:{" "}
        <span className="font-medium text-gray-500 text-lg">${price}</span>
      </p>
      <form onSubmit={handleCheckOutSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "22px",
                color: "#424770",
                backgroundColor: "#fff",
                padding: "12px",
                borderRadius: "4px",
                "::placeholder": {
                  color: "#aab7c4",
                },
                boxShadow: "0 0 0 1px #424770",
              },
              invalid: {
                color: "#9e2146",
                boxShadow: "0 0 0 1px #9e2146",
              },
            },
          }}
        />
        <p className="text-center mt-10 text-gray-600">
          Complete payment and confirm registration for the contest
        </p>
        <button
          className="btn mt-4 text-lg bg-green-600 border-none text-white w-full hover:bg-green-500 my-4"
          type="submit"
          disabled={!stripe || !clientSecret || isConfirming}
        >
          {isConfirming ? (
            <span className="loading text-gray-700 loading-spinner loading-xs"></span>
          ) : (
            "Confirm"
          )}
        </button>
      </form>
      {error && <p className="text-red-600">{error}</p>}
      {transactionId && (
        <p className="text-gray-600">
          Transaction ID: <span className="font-semibold">{transactionId}</span>
        </p>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-5 relative">
            <button
              className="absolute right-2 top-2 text-2xl hover:scale-110 text-gray-500"
              onClick={() => setIsOpen(false)}
            >
              <IoMdCloseCircleOutline />
            </button>
            <h3 className="font-bold text-lg">Submit Your Entry</h3>
            <p className="py-4">
              Follow the instructions to submit your entry.
            </p>
            <form onSubmit={HandleRegistrationSubmitClick}>
              <input
                type="text"
                placeholder="Participant Name"
                className="input input-bordered w-full dark:bg-[#1D232A] bg-white text-gray-600 dark:text-gray-200"
                required
                name="participant_name"
                value={user?.displayName}
                readOnly
              />
              <p className="pt-1 ml-2 text-sm text-gray-500 dark:text-gray-200">
                You cannot change the user name
              </p>
              <input
                type="text"
                placeholder="Participant Email"
                className="input input-bordered w-full mt-4 dark:bg-[#1D232A] bg-white text-gray-600 dark:text-gray-200"
                value={user?.email}
                name="participant_email"
                required
                readOnly
              />
              <p className="pt-1 ml-2 text-sm text-gray-500 dark:text-gray-200">
                You cannot change the user email
              </p>

              <input
                type="url"
                name="task_link"
                placeholder="Enter submission link"
                className="input input-bordered w-full mt-4 dark:bg-[#1D232A] bg-white text-gray-600 dark:text-gray-200"
                required
              />
              <p className="pt-1 ml-2 text-sm text-gray-500 dark:text-gray-200 mb-4">
                Provide the drive link of your task
              </p>
              <input
                type="submit"
                className="btn active:scale-95 btn-primary w-full"
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutForm;
