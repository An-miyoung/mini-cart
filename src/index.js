import getProductData from './api/getProductData.js';
import ProductList from './components/ProductList.js';
import CartList from './components/CartList.js';

const $productCardGrid = document.getElementById('product-card-grid');
const $openCartBtn = document.getElementById('open-cart-btn');
const $closeCartBtn = document.getElementById('close-cart-btn');
const $shoppingCart = document.getElementById('shopping-cart');
const $backDrop = document.getElementById('backdrop');
const $cartList = document.getElementById('cart-list');
const $paymentBtn = document.getElementById('payment-btn');

let productData = [];
const initialCartState = localStorage.getItem('cartState')
  ? JSON.parse(localStorage.getItem('cartState'))
  : [];

const productList = new ProductList($productCardGrid, []);

const cartList = new CartList($cartList, initialCartState);

const toggleCart = () => {
  $shoppingCart.classList.toggle('translate-x-full');
  $shoppingCart.classList.toggle('translate-x-0');
  $backDrop.hidden = !$backDrop.hidden;
};

const addCartItem = (e) => {
  const clickedId = e.target.dataset.productid;
  const clickedProduct = productData.find(
    (item) => item.id === parseInt(clickedId)
  );
  if (!clickedProduct) return;
  cartList.addItem(clickedProduct);
  toggleCart();
};

const cartListEvent = (e) => {
  const id = e.target.closest('li').id;
  switch (e.target.className) {
    case 'remove-btn':
      cartList.deleteItem(parseInt(id));
      break;
    case 'increase-btn':
      cartList.increaseCount(parseInt(id));
      break;
    case 'decrease-btn':
      cartList.decreaseCount(parseInt(id));
      break;
    default:
      return;
  }
};

const saveToLocalStorage = () => {
  cartList.saveToLocalStorage();
};

const fetchProductData = async () => {
  const result = await getProductData();
  productList.setState(result);
  productData = result;
};

fetchProductData();

$productCardGrid.addEventListener('click', addCartItem);
$openCartBtn.addEventListener('click', toggleCart);
$closeCartBtn.addEventListener('click', toggleCart);
$backDrop.addEventListener('click', toggleCart);
$cartList.addEventListener('click', cartListEvent);
$paymentBtn.addEventListener('click', saveToLocalStorage);
