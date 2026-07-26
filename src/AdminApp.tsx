import React, { useState, useEffect } from 'react';
import { LogOut, Store } from 'lucide-react';
import { DEFAULT_PRODUCTS, DEFAULT_DAILY_OFFER } from './data';
import { Product, CartItem, DailyOffer, FormMode } from './types';
import Dashboard from './components/Dashboard';
import ProductForm from './components/ProductForm';

// Painel administrativo do Sacolão Pimp.
// Não possui link visível a partir do site do cliente e não exige login:
// só é acessível por quem tiver o endereço direto (ex: seusite.com/admin).
export default function AdminApp() {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('sacolao_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Erro ao restaurar catálogo de produtos:', e);
      }
    }
    return DEFAULT_PRODUCTS;
  });

  const [cart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('sacolao_cart');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        console.error('Erro ao restaurar carrinho:', e);
      }
    }
    return [];
  });

  const [dailyOffers, setDailyOffers] = useState<DailyOffer[]>(() => {
    const saved = localStorage.getItem('sacolao_daily_offers');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error('Erro ao restaurar ofertas:', e);
      }
    }
    return [{ id: '1', ...DEFAULT_DAILY_OFFER }];
  });

  const [categories, setCategories] = useState<{ name: string; icon: string }[]>(() => {
    const saved = localStorage.getItem('sacolao_categories');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.map((cat: any) => ({ name: cat.name, icon: '' }));
        }
      } catch (e) {
        console.error('Erro ao restaurar categorias:', e);
      }
    }
    return [
      { name: 'Frutas', icon: '' },
      { name: 'Verduras', icon: '' },
      { name: 'Legumes', icon: '' },
      { name: 'Grãos', icon: '' }
    ];
  });

  const [isOffline, setIsOffline] = useState<boolean>(() => {
    return localStorage.getItem('sacolao_is_offline') === 'true';
  });

  const [view, setView] = useState<'dashboard' | 'form'>('dashboard');
  const [formMode, setFormMode] = useState<FormMode>('create');
  const [selectedEditingProduct, setSelectedEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    localStorage.setItem('sacolao_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('sacolao_daily_offers', JSON.stringify(dailyOffers));
  }, [dailyOffers]);

  useEffect(() => {
    localStorage.setItem('sacolao_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('sacolao_is_offline', String(isOffline));
  }, [isOffline]);

  const handleAddCategory = (name: string, icon: string) => {
    if (!name.trim()) return;
    const normalizedName = name.trim();
    setCategories((prev) => {
      if (prev.some((cat) => cat.name.toLowerCase() === normalizedName.toLowerCase())) {
        return prev;
      }
      return [...prev, { name: normalizedName, icon: icon.trim() || '' }];
    });
  };

  const handleDeleteCategory = (name: string) => {
    setCategories((prev) => prev.filter((cat) => cat.name !== name));
  };

  const handleSaveProduct = (productData: Omit<Product, 'id'> & { id?: string }) => {
    setProducts((prevProducts) => {
      if (productData.id) {
        return prevProducts.map((p) => (p.id === productData.id ? (productData as Product) : p));
      }
      const lastIdNumber = prevProducts
        .map((p) => {
          const num = parseInt(p.id.replace('HT-', ''), 10);
          return isNaN(num) ? 0 : num;
        })
        .reduce((max, num) => Math.max(max, num), 0);
      const nextId = `HT-${String(lastIdNumber + 1).padStart(3, '0')}`;
      const newProduct: Product = { ...(productData as Product), id: nextId };
      return [newProduct, ...prevProducts];
    });
    setSelectedEditingProduct(null);
    setView('dashboard');
  };

  const handleDeleteProduct = (id: string) => {
    setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
  };

  const handleAddProductTrigger = () => {
    setSelectedEditingProduct(null);
    setFormMode('create');
    setView('form');
  };

  const handleEditProductTrigger = (product: Product) => {
    setSelectedEditingProduct(product);
    setFormMode('edit');
    setView('form');
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#f7fbf2] flex flex-col font-sans select-none antialiased">
      <header className="sticky top-0 z-40 bg-[#f7fbf2] border-b border-[#bfc9bc]/30 py-4">
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">
          <span
            className="text-2xl font-bold text-[#176c33] tracking-tight"
            style={{ fontFamily: 'Plus Jakarta Sans' }}
          >
            Sacolão Pimp — Painel Admin
          </span>
          <a
            href="/"
            className="flex items-center gap-1.5 text-xs font-bold text-[#40493f] hover:text-[#176c33] transition-colors"
            title="Voltar para o site"
          >
            <Store className="w-4 h-4" />
            Ver site
            <LogOut className="w-3.5 h-3.5 ml-1" />
          </a>
        </div>
      </header>

      <main className="flex-grow max-w-7xl w-full mx-auto px-5 py-6">
        {view === 'dashboard' ? (
          <Dashboard
            products={products}
            searchTerm={searchTerm}
            cartCount={cartCount}
            onAddProductTrigger={handleAddProductTrigger}
            onEditProduct={handleEditProductTrigger}
            onDeleteProduct={handleDeleteProduct}
            onNavigateToCart={() => {}}
            dailyOffers={dailyOffers}
            onUpdateDailyOffers={setDailyOffers}
            categories={categories}
            onAddCategory={handleAddCategory}
            onDeleteCategory={handleDeleteCategory}
            isOffline={isOffline}
            onToggleOffline={setIsOffline}
          />
        ) : (
          <ProductForm
            mode={formMode}
            initialProduct={selectedEditingProduct}
            onSave={handleSaveProduct}
            onCancel={() => setView('dashboard')}
            categories={categories}
          />
        )}
      </main>
    </div>
  );
}
