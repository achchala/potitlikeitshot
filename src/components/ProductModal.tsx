import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Product } from '@/context/CartContext';
import { useCart } from '@/context/CartContext';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const { addToCart } = useCart();

  if (!product) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <div className="absolute right-4 top-4">
                  <button
                    type="button"
                    className="rounded-full bg-white p-2 text-gray-400 hover:text-gray-500"
                    onClick={onClose}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative h-[400px] w-full">
                    <TransformWrapper>
                      <TransformComponent>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover rounded-lg"
                        />
                      </TransformComponent>
                    </TransformWrapper>
                  </div>

                  <div className="flex flex-col justify-between">
                    <div>
                      <Dialog.Title className="text-2xl font-semibold text-gray-900">
                        {product.name}
                      </Dialog.Title>
                      <p className="mt-4 text-gray-500">{product.description}</p>
                      <p className="mt-4 text-2xl font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        addToCart(product);
                        onClose();
                      }}
                      className="mt-8 w-full rounded-md bg-black px-4 py-3 text-white hover:bg-gray-800 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
} 