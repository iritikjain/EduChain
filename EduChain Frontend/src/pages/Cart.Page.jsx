import React, { useEffect } from 'react';
import CartCardComponent from '../components/Cart/CartCard.Component';
import { RxCross2 } from 'react-icons/rx';
import { useCartContext } from '../context/cart.context';
import { paymentGateway } from '../utils/utils';
import { Slide, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

function CartPage() {
  // const [transaction, setTransaction] = useState('');
  // const [errorCode, setErrorCode] = useState('');
  const {
    cart: cartItems,
    total_items,
    total_amount,
    clearCart,
  } = useCartContext();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const transactionHashes = urlParams.get('transactionHashes');
    const errorCode = urlParams.get('errorCode');
    // setTransaction(transactionHashes);
    // setErrorCode(errorCode);
    if (transactionHashes && localStorage.getItem("userType") === "user") {
      clearCart();
      fetch(
        `http://127.0.0.1:5000/course/approval?transactionId=${transactionHashes}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: String(localStorage.getItem('token')),
          },
          body: JSON.stringify({ transactionHashes }),
        }
      )
        .then((response) => response.json())
        .then(() => {
          window.history.pushState(
            null,
            null,
            'http://localhost:3000/inprogresscourses'
          );
          window.dispatchEvent(new Event('popstate'));
          toast.success(
            'Transaction Successful! Course Enrolled Successfully.',
            {
              position: 'top-center',
              autoClose: 2000,
              transition: Slide,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
            }
          );
        })
        .catch((error) => {
        });
    } else  if (transactionHashes && localStorage.getItem("userType") === "ngoAdmin") {
      clearCart();
      fetch(
        `http://127.0.0.1:5000/course/ngo-approval?transactionId=${transactionHashes}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: String(localStorage.getItem('token')),
          },
          body: JSON.stringify({ transactionHashes }),
        }
      )
        .then((response) => response.json())
        .then(() => {
          // window.history.pushState(
          //   null,
          //   null,
          //   'http://localhost:3000/yourcourses'
          // );
          // window.dispatchEvent(new Event('popstate'));
          toast.success(
            'Transaction Successful! Course Enrolled Successfully.',
            {
              position: 'top-center',
              autoClose: 2000,
              transition: Slide,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
            }
          );
        })
        .catch((error) => {
        });
    }
    else if (errorCode){
      window.history.pushState(
        null,
        null,
        'http://localhost:3000/cart'
      );
      window.dispatchEvent(new Event('popstate'));
      toast.error(
        'Transaction Failed! Kindly Try Again.',
        {
          position: 'top-center',
          autoClose: 2000,
          transition: Slide,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        }
      );
    }
  }, []);

  // useEffect(() => {
  //   if (transaction) {
  //     clearCart();
  //     fetch(
  //       `http://127.0.0.1:5000/course/approval?transactionId=${transaction}`,
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: String(localStorage.getItem('token')),
  //         },
  //         body: JSON.stringify({ transaction }),
  //       }
  //     )
  //       .then((response) => response.json())
  //       .then(() => {
  //         window.history.pushState(
  //           null,
  //           null,
  //           'http://localhost:3000/inprogresscourses'
  //         );
  //         window.dispatchEvent(new Event('popstate'));
  //         toast.success(
  //           'Transaction Successful! Course Enrolled Successfully.',
  //           {
  //             position: 'top-center',
  //             autoClose: 4000,
  //             transition: Slide,
  //             hideProgressBar: false,
  //             closeOnClick: true,
  //             pauseOnHover: true,
  //             draggable: true,
  //             progress: undefined,
  //             theme: 'light',
  //           }
  //         );
  //       })
  //       .catch((error) => {
  //         console.error('Error :', error);
  //       });
  //   }
  //   else if (errorCode){
  //     window.history.pushState(
  //       null,
  //       null,
  //       'http://localhost:3000/cart'
  //     );
  //     window.dispatchEvent(new Event('popstate'));
  //     toast.error(
  //       'Transaction Failed! Kindly Try Again.',
  //       {
  //         position: 'top-center',
  //         autoClose: 4000,
  //         transition: Slide,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: 'light',
  //       }
  //     );
  //   }
  // }, [transaction]);

  if (cartItems.length < 1) {
    return (
      <div className='container p-8 text-2xl font-bold border m-6 w-1/2 border border-gray-300 rounded-lg'>
        No Items Found In The Cart.
      </div>
    );
  }

  return (
    <>
      <div className='container mx-auto px-12 my-10'>
        <div className='w-full lg:flex gap-4'>
          <div className='lg:w-3/4 p-6 bg-white rounded'>
            <div className='mb-8'>
              <h2 className='text-xl font-bold mb-1'>Shopping Cart</h2>
              <div className='flex justify-between mb-4'>
                {total_items==1 ? <p>{total_items} Course In Cart</p> : <p>{total_items} Courses In Cart</p>}
                <span
                  className='text-red-600 gap-1 flex items-center cursor-pointer hover:text-black'
                  onClick={() => clearCart()}
                >
                  <RxCross2 /> Clear All
                </span>
              </div>
            </div>
            {cartItems.map((cartItem) => {
              return (
                <CartCardComponent
                  key={cartItem.courseId}
                  cartItem={cartItem}
                />
              );
            })}
          </div>
          <div className='lg:w-1/4 p-6 bg-white rounded'>
            <div>
              <h2 className='text-xl font-bold mb-2'>Total</h2>
              <h2 className='text-2xl font-bold mb-4'>Ⓝ {total_amount}</h2>
              <button
                className='px-4 py-2 rounded border bg-orange-400 text-white hover:border-orange-400 hover:bg-white hover:text-orange-400 font-bold'
                onClick={() =>
                  paymentGateway(
                    cartItems[0].courseId,
                    cartItems[0].courseModules,
                    total_amount
                  )
                }
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartPage;
