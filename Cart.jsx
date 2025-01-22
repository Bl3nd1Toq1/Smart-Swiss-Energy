import React from 'react';

const Cart = ({ cart, onClose, onCheckout }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Shporta</h2>
        {cart.length === 0 ? (
          <p className="text-gray-600">Shporta është bosh.</p>
        ) : (
          <ul>
            {cart.map((item, index) => (
              <li key={index} className="mb-4">
                {item.name} - {item.price} €
              </li>
            ))}
          </ul>
        )}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="mr-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
          >
            Mbyll
          </button>
          <button
            type="button"
            onClick={onCheckout}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Vazhdo me Blerjen
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;