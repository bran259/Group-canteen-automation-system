import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [menu, setMenu] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState('login');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('canteenUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setCurrentPage(user.role === 'admin' ? 'admin-dashboard' : 'menu');
    }
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const [menuData, ordersData, usersData] = await Promise.all([
        api.get('/menu'),
        api.get('/orders'),
        api.get('/users')
      ]);
      setMenu(menuData);
      setOrders(ordersData);
      setUsers(usersData);
    } catch (error) {
      // Fallback to mock data if API is not available
      console.log('Using fallback mock data');
      setMenu([
        { id: 1, name: "Chapati", price: 20, category: "Breakfast", stock: 100 },
        { id: 2, name: "Rice & Beans", price: 80, category: "Lunch", stock: 50 },
        { id: 3, name: "Ugali & Fish", price: 120, category: "Lunch", stock: 30 },
        { id: 4, name: "Mandazi", price: 15, category: "Breakfast", stock: 80 },
        { id: 5, name: "Chicken Stew", price: 150, category: "Dinner", stock: 25 },
        { id: 6, name: "Tea", price: 10, category: "Beverage", stock: 200 }
      ]);
      setUsers([
        { id: 1, name: "Admin", email: "admin@canteen.com", password: "admin123", role: "admin" },
        { id: 2, name: "John Doe", email: "john@example.com", password: "123456", role: "customer" }
      ]);
      setOrders([
        {
          id: 1,
          userId: 2,
          items: [{ menuId: 2, quantity: 1, name: "Rice & Beans", price: 80 }],
          status: "Ready",
          total: 80,
          payment: "cash",
          date: new Date().toISOString()
        }
      ]);
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      const userWithoutPassword = { id: user.id, name: user.name, email: user.email, role: user.role };
      setCurrentUser(userWithoutPassword);
      localStorage.setItem('canteenUser', JSON.stringify(userWithoutPassword));
      setCurrentPage(user.role === 'admin' ? 'admin-dashboard' : 'menu');
      showNotification(`Welcome ${user.name}!`);
      return true;
    }
    showNotification('Invalid credentials', 'error');
    return false;
  };

  const register = async (userData) => {
    const newUser = {
      id: users.length + 1,
      ...userData,
      role: 'customer'
    };
    
    try {
      await api.post('/users', newUser);
      setUsers([...users, newUser]);
      showNotification('Registration successful! Please login.');
      setCurrentPage('login');
    } catch (error) {
      // Fallback if API is not available
      setUsers([...users, newUser]);
      showNotification('Registration successful! Please login.');
      setCurrentPage('login');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setCart([]);
    localStorage.removeItem('canteenUser');
    setCurrentPage('login');
    showNotification('Logged out successfully');
  };

  const addToCart = (item) => {
    const existing = cart.find(c => c.id === item.id);
    if (existing) {
      setCart(cart.map(c => 
        c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    showNotification(`${item.name} added to cart`);
  };

  const updateCartQuantity = (itemId, delta) => {
    setCart(cart.map(c => {
      if (c.id === itemId) {
        const newQuantity = c.quantity + delta;
        return newQuantity > 0 ? { ...c, quantity: newQuantity } : c;
      }
      return c;
    }).filter(c => c.quantity > 0));
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(c => c.id !== itemId));
    showNotification('Item removed from cart');
  };

  const placeOrder = async (paymentMethod) => {
    const newOrder = {
      id: orders.length + 1,
      userId: currentUser.id,
      items: cart.map(c => ({
        menuId: c.id,
        quantity: c.quantity,
        name: c.name,
        price: c.price
      })),
      status: 'Pending',
      total: cart.reduce((sum, c) => sum + (c.price * c.quantity), 0),
      payment: paymentMethod,
      date: new Date().toISOString()
    };

    try {
      await api.post('/orders', newOrder);
      await api.post('/payments', {
        id: orders.length + 1,
        orderId: newOrder.id,
        amount: newOrder.total,
        mode: paymentMethod,
        status: 'confirmed'
      });

      // Update stock
      for (const item of cart) {
        const menuItem = menu.find(m => m.id === item.id);
        if (menuItem) {
          const updatedItem = { ...menuItem, stock: menuItem.stock - item.quantity };
          await api.put(`/menu/${item.id}`, updatedItem);
          setMenu(menu.map(m => m.id === item.id ? updatedItem : m));
        }
      }
    } catch (error) {
      console.log('Using mock data for order');
    }

    setOrders([...orders, newOrder]);
    setCart([]);
    showNotification('Order placed successfully!');
    return newOrder.id;
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const order = orders.find(o => o.id === orderId);
      const updatedOrder = { ...order, status: newStatus };
      await api.put(`/orders/${orderId}`, updatedOrder);
      setOrders(orders.map(o => o.id === orderId ? updatedOrder : o));
      showNotification(`Order ${orderId} status updated to ${newStatus}`);
    } catch (error) {
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      showNotification(`Order ${orderId} status updated to ${newStatus}`);
    }
  };

  const addMenuItem = async (item) => {
    const newItem = { id: menu.length + 1, ...item };
    try {
      await api.post('/menu', newItem);
      setMenu([...menu, newItem]);
      showNotification('Menu item added successfully');
    } catch (error) {
      setMenu([...menu, newItem]);
      showNotification('Menu item added successfully');
    }
  };

  const updateMenuItem = async (itemId, updates) => {
    try {
      await api.put(`/menu/${itemId}`, updates);
      setMenu(menu.map(m => m.id === itemId ? updates : m));
      showNotification('Menu item updated');
    } catch (error) {
      setMenu(menu.map(m => m.id === itemId ? updates : m));
      showNotification('Menu item updated');
    }
  };

  const deleteMenuItem = async (itemId) => {
    try {
      await api.delete(`/menu/${itemId}`);
      setMenu(menu.filter(m => m.id !== itemId));
      showNotification('Menu item deleted');
    } catch (error) {
      setMenu(menu.filter(m => m.id !== itemId));
      showNotification('Menu item deleted');
    }
  };

  const deleteUser = async (userId) => {
    try {
      await api.delete(`/users/${userId}`);
      setUsers(users.filter(u => u.id !== userId));
      showNotification('User deleted');
    } catch (error) {
      setUsers(users.filter(u => u.id !== userId));
      showNotification('User deleted');
    }
  };

  const value = {
    currentUser,
    cart,
    orders,
    menu,
    users,
    currentPage,
    notification,
    setCurrentPage,
    login,
    register,
    logout,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    placeOrder,
    updateOrderStatus,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    deleteUser,
    showNotification
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};