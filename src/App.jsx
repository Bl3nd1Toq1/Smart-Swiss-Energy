import React, { useEffect, useState, useRef } from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import toast, { Toaster } from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import { Zap, Leaf, Wrench, Shield, Settings, Battery, Home, DollarSign } from 'lucide-react';
import BeatLoader from 'react-spinners/BeatLoader';

// Initialize EmailJS
emailjs.init("OEQub9r3E-RtTQ7SC");

const products = [
  { id: 1, name: 'Panel Solar 400W Mono', price: 299.99, image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', description: 'Panel monokristalin me efikasitet të lartë.' },
  { id: 2, name: 'Panel Solar 450W Poly', price: 349.99, image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
  { id: 3, name: 'Panel Solar 500W Bifacial', price: 449.99, image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
  { id: 4, name: 'Inverter 3kW', price: 599.99, image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
  { id: 5, name: 'Inverter 5kW', price: 799.99, image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
  { id: 6, name: 'Bateria Litium 5kWh', price: 2499.99, image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' }
];

const ContactUs = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    from_phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await emailjs.sendForm(
        'service_cnlkqwf',
        'template_goeixfs',
        form.current,
        'OEQub9r3E-RtTQ7SC'
      );

      if (result.status === 200) {
        toast.success('Mesazhi u dërgua me sukses!');
        setFormData({
          from_name: '',
          from_email: '',
          from_phone: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Ndodhi një gabim. Ju lutem provoni përsëri.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-soft p-8 transition-all duration-300 hover:shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Na Kontaktoni</h2>
      <form ref={form} onSubmit={sendEmail} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Emri</label>
          <input 
            type="text" 
            name="from_name" 
            value={formData.from_name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300" 
            required 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input 
            type="email" 
            name="from_email" 
            value={formData.from_email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300" 
            required 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Numri i Telefonit</label>
          <input 
            type="tel" 
            name="from_phone" 
            value={formData.from_phone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300" 
            required 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mesazhi</label>
          <textarea 
            name="message" 
            value={formData.message}
            onChange={handleChange}
            rows="4" 
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300" 
            required
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Duke dërguar...' : 'Dërgo Mesazhin'}
        </button>
      </form>
    </div>
  );
};

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    firstName: '',
    lastName: '', 
    phone: '',
    email: '',
    city: '',
    address: ''
  });
  const [isCheckoutFormVisible, setIsCheckoutFormVisible] = useState(false);
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const addToCart = (product) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === product.id);
      if (existingItem) {
        return currentCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentCart, { ...product, quantity: 1 }];
    });
    toast.success('Produkti u shtua në shportë!');
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
    toast.success('Produkti u hoq nga shporta!');
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setCart(currentCart =>
      currentCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const cartItemsList = cart.map(item => `
        Produkti: ${item.name}
        Sasia: ${item.quantity}
        Çmimi për njësi: ${item.price.toFixed(2)}€
        Totali: ${(item.price * item.quantity).toFixed(2)}€
      `).join('\n');

      const totalAmount = calculateTotal();

      const emailParams = {
        to_name: checkoutForm.firstName + ' ' + checkoutForm.lastName,
        customer_email: checkoutForm.email,
        customer_phone: checkoutForm.phone,
        customer_city: checkoutForm.city,
        customer_address: checkoutForm.address,
        order_items: cartItemsList,
        total_amount: totalAmount.toFixed(2),
        order_date: new Date().toLocaleString('sq-AL'),
      };

      const emailResult = await emailjs.send(
        'service_cnlkqwf', 
        'template_pn6hzqe', 
        emailParams
      );

      if (emailResult.status === 200) {
        toast.success('Porosia juaj u dërgua me sukses!');
        setCart([]);
        setIsCartOpen(false);
        setCheckoutForm({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          city: '',
          address: ''
        });
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Ndodhi një gabim. Ju lutem provoni përsëri.');
    } finally {
      setIsProcessing(false);
    }
  };

  function handleProductClick(product) {
    setSelectedProduct(product);
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-primary-50 to-primary-100 flex justify-center items-center">
        <BeatLoader color="#0ea5e9" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 font-sans">
      <Toaster position="top-right" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg shadow-soft z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <h1
              onClick={() => window.location.reload()}
              className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 text-transparent bg-clip-text cursor-pointer"
            >
              Smart Swiss Energy
            </h1>
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-700 hover:text-primary-600 focus:outline-none"
              >
                {/* Three lines (hamburger) icon */}
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
          <div className="hidden md:flex space-x-6 ml-auto">
            <button onClick={() => scrollToSection('rreth')} className="text-gray-700 hover:text-primary-600 transition-colors duration-300">Rreth Nesh</button>
            <button onClick={() => scrollToSection('produktet')} className="text-gray-700 hover:text-primary-600 transition-colors duration-300">Produktet</button>
            <button onClick={() => scrollToSection('sherbimet-tona')} className="text-gray-700 hover:text-primary-600 transition-colors duration-300">Shërbimet</button>
            <button onClick={() => scrollToSection('kontakti')} className="text-gray-700 hover:text-primary-600 transition-colors duration-300">Kontakti</button>
          </div>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors duration-300"
          >
            <ShoppingCartIcon className="h-6 w-6" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cart.length}
              </span>
            )}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden px-6 pb-4">
            <ul className="flex flex-col space-y-2">
              <li>
                <button onClick={() => scrollToSection('rreth')} className="text-gray-700 hover:text-primary-600 transition-colors duration-300">Rreth Nesh</button>
              </li>
              <li>
                <button onClick={() => scrollToSection('produktet')} className="text-gray-700 hover:text-primary-600 transition-colors duration-300">Produktet</button>
              </li>
              <li>
                <button onClick={() => scrollToSection('sherbimet-tona')} className="text-gray-700 hover:text-primary-600 transition-colors duration-300">Shërbimet</button>
              </li>
              <li>
                <button onClick={() => scrollToSection('kontakti')} className="text-gray-700 hover:text-primary-600 transition-colors duration-300">Kontakti</button>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
              filter: 'brightness(0.7)'
            }}
          ></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            Smart Swiss Energy
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Zgjidhja juaj për energji të pastër dhe të qëndrueshme
          </p>
          <button
            onClick={() => scrollToSection('rreth')}
            className="bg-primary-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Eksploro
          </button>
        </div>
      </section>

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg max-w-md w-full m-4 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Shporta</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            {cart.length === 0 ? (
              <p className="text-gray-600 text-center py-4">Shporta është bosh.</p>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-primary-600 font-medium">{item.price.toFixed(2)}€</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 p-2"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Totali:</span>
                    <span className="text-primary-600">{calculateTotal().toFixed(2)}€</span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Mbyll
              </button>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutFormVisible(true);
                }}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                disabled={cart.length === 0}
              >
                Vazhdo me Blerjen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Form Modal */}
      {isCheckoutFormVisible && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg max-w-md w-full m-4 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Forma e Blerjes</h2>
              <button
                onClick={() => setIsCheckoutFormVisible(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleCheckout} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Emri</label>
                  <input
                    type="text"
                    value={checkoutForm.firstName}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, firstName: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mbiemri</label>
                  <input
                    type="text"
                    value={checkoutForm.lastName}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, lastName: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={checkoutForm.email}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, email: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Numri i Telefonit</label>
                <input
                  type="tel"
                  value={checkoutForm.phone}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Qyteti</label>
                <input
                  type="text"
                  value={checkoutForm.city}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, city: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Adresa</label>
                <textarea
                  value={checkoutForm.address}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsCheckoutFormVisible(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Anulo
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
                >
                  {isProcessing ? 'Duke procesuar...' : 'Dërgo Porosinë'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="pt-16">
        {/* About Section */}
        <section id="rreth" className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-white rounded-2xl shadow-soft p-8 md:p-12">
              <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary-600 to-primary-800 text-transparent bg-clip-text">
                Rreth Nesh
              </h2>
              <div className="max-w-3xl mx-auto text-center">
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  Ne jemi një kompani e specializuar në instalimin dhe mirëmbajtjen e paneleve solare. 
                  Me përvojë mbi 10 vjeçare në treg, ne ofrojmë zgjidhje të qëndrueshme energjetike për 
                  shtëpitë dhe bizneset tuaja.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Misioni ynë është të ndihmojmë në kalimin drejt energjisë së pastër dhe të rinovueshme, 
                  duke kontribuar në një të ardhme më të gjelbër për të gjithë.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Kursimet me Energji Solare</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-effect rounded-2xl p-8 text-center hover-card">
                <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Battery className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-2">90%</h3>
                <p>Ulje në faturat e energjisë elektrike</p>
              </div>

              <div className="glass-effect rounded-2xl p-8 text-center hover-card">
                <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Home className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-2">25+ Vite</h3>
                <p>Energji e pastër dhe e rinovueshme</p>
              </div>

              <div className="glass-effect rounded-2xl p-8 text-center hover-card">
                <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-2">ROI në 5-7 Vite</h3>
                <p>Periudha mesatare e kthimit të investimit</p>
              </div>
            </div>

            <div className="mt-12 glass-effect rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-center mb-6">Prodhimi Vjetor i Energjisë</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold mb-4">Sistemi Rezidencial (10kW)</h4>
                  <ul className="space-y-3">
                    <li className="flex justify-between">
                      <span>Prodhimi Ditor Mesatar:</span>
                      <span className="font-bold">40-50 kWh</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Prodhimi Vjetor:</span>
                      <span className="font-bold">14,600-18,250 kWh</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Reduktimi i CO₂:</span>
                      <span className="font-bold">10.2 ton/vit</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-4">Sistemi Komercial (50kW)</h4>
                  <ul className="space-y-3">
                    <li className="flex justify-between">
                      <span>Prodhimi Ditor Mesatar:</span>
                      <span className="font-bold">200-250 kWh</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Prodhimi Vjetor:</span>
                      <span className="font-bold">73,000-91,250 kWh</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Reduktimi i CO₂:</span>
                      <span className="font-bold">51 ton/vit</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="produktet" className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary-600 to-primary-800 text-transparent bg-clip-text">
              Produktet Tona
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-soft overflow-hidden hover-card"
                  onClick={() => handleProductClick(product)}
                >
                  <div className="relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-primary-600 font-bold text-lg mb-4">{product.price.toFixed(2)}€</p>
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 transition-all duration-300 transform hover:scale-105"
                    >
                      Shto në shportë
                    </button>
                  </div>
                 </div>
              ))}
            </div>
          </div>
        </section>

        {selectedProduct && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl shadow-lg max-w-lg w-full m-4 p-6 relative">
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-64 object-cover rounded-lg"
              />
              <h2 className="mt-4 text-2xl font-bold">
                {selectedProduct.name}
              </h2>
              <p className="text-primary-600 font-bold text-lg mt-2">
                {selectedProduct.price.toFixed(2)}€
              </p>
              <p className="mt-2 text-gray-700">{selectedProduct.description}</p>
              <button
                onClick={() => addToCart(selectedProduct)}
                className="mt-4 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Shto në shportë
              </button>
            </div>
          </div>
        )}

        {/* Services Section */}
        <section id="sherbimet-tona" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary-600 to-primary-800 text-transparent bg-clip-text">
              Shërbimet Tona
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-soft hover-card">
                <div className="bg-primary-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <Zap className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Efikasitet i Lartë</h3>
                <p className="text-gray-600">Panelet tona solare ofrojnë konvertim maksimal të energjisë me norma efikasiteti udhëheqëse në industri.</p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-soft hover-card">
                <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <Leaf className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Zgjidhje e Qëndrueshme</h3>
                <p className="text-gray-600">Zgjidhje energjetike miqësore me mjedisin që ndihmojnë në reduktimin e gjurmës së karbonit.</p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-soft hover-card">
                <div className="bg-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <Wrench className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Instalim Profesional</h3>
                <p className="text-gray-600">Instalim ekspert nga profesionistë të certifikuar që sigurojnë performancë optimale.</p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-soft hover-card">
                <div className="bg-red-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <Shield className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Siguri e Lartë</h3>
                <p className="text-gray-600">Karakteristika të avancuara të sigurisë dhe ndërtim i fortë për besueshmëri afatgjatë.</p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-soft hover-card">
                <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <Settings className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Mirëmbajtje e Lehtë</h3>
                <p className="text-gray-600">Kërkesa të thjeshta mirëmbajtjeje me qëndrueshmëri dhe performancë afatgjatë.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="kontakti" className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-xl mx-auto">
              <ContactUs />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;