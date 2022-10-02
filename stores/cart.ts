/* --- libs --------------------------------------------------------------------------------------------------------- */
import { atom, RecoilState, selector, useRecoilState } from "recoil";

/* --- types --------------------------------------------------------------------------------------------------------- */
import { Product } from "../types/Product";

/* --- components ---------------------------------------------------------------------------------------------------- */
import { Cart } from "../components/molecules/Cart/Cart";

export type Cart = {
  products: Product[];
};

const initialState: Cart = {
  products: []
};

export const cartState: RecoilState<Cart> = atom({
  key: "cartState",
  default: initialState
});

// 合計金額の計算の実装
export const totalPriceSelector = selector({
  key: "totalPriceSelector",
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.products.reduce((sum, product) => {
      return sum + product.price * product.quantity;
    }, 0);
  }
});

/* --- ロジック ------------------------------------------------------------------------------------------------------- */
export const useCart = () => {
  // カートの値を取得
  const [cart, setCart] = useRecoilState(cartState);

  /* --- カートへ商品追加 ----------------------------------------------------------------------------------------------- */
  const addCart = (product: Product): void => {
    // カートに商品が存在するか判断する
    const selectItem = cart.products.find((_product) => _product.id === product.id);

    // カートに商品が入っていない場合
    if (!selectItem) {
      product.quantity = 1;
      setCart({
        products: [...cart.products, product]
      });
    } else {
      // カートに商品が入っている場合
      setCart((prevCart) => {
        return {
          products: prevCart.products.map((_product) =>
            _product.id === selectItem.id ? { ..._product, quantity: _product.quantity + 1 } : _product
          )
        };
      });
    }
  };

  // カートへ商品削除
  const removeCart = (product: Product) => {
    // カートに商品が入ってるか判断する
    const selectItem = cart.products.find((_product) => _product.id === product.id);

    // カートに商品が入っていない場合
    if (!selectItem) {
      console.warn("selectItemがundefinedのはずがない, バグの可能性あり");
      return;
    }

    // カートから商品を-1する
    if (selectItem.quantity > 1) {
      setCart((prevCart) => {
        return {
          products: prevCart.products.map((_product) =>
            _product.id === selectItem.id ? { ..._product, quantity: _product.quantity - 1 } : _product
          )
        };
      });
    } else {
      // カートから商品を削除する
      const products = [...cart.products];
      const index = products.findIndex((product) => product.id === selectItem.id);
      if (index === -1) return;
      products.splice(index, 1);

      setCart({
        products
      });
    }
  };

  // こちらをカスタムフックとしてRETURNする
  return { addCart, removeCart };
};
