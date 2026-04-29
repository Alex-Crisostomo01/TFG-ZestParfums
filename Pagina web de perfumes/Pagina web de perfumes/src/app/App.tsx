import { RouterProvider } from 'react-router';
import { router } from './routes';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'sonner';

// Componente raíz de la aplicación
// El orden de los providers importa:
// AuthProvider va por fuera para que CartProvider (y cualquier otro) puedan acceder al usuario si lo necesitan
export default function App() {
  return (
    <AuthProvider>        {/* Provee user, login, logout a toda la app */}
      <CartProvider>      {/* Provee carrito de compra a toda la app */}
        <RouterProvider router={router} />
        <Toaster position="bottom-right" richColors /> {/* Notificaciones tipo toast */}
      </CartProvider>
    </AuthProvider>
  );
}
