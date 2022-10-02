/* --- libs --------------------------------------------------------------------------------------------------------- */
import { FC, memo } from "react";
import { useRecoilValue } from "recoil";
import Link from "next/link";

/* --- assets ------------------------------------------------------------------------------------------------------- */
import styles from "./Header.module.scss";

/* --- globalState -------------------------------------------------------------------------------------------------- */
import { cartState } from "../../../stores/cart";

export const Header: FC = memo(() => {
  // カートの値を取得するカスタムフック
  const cart = useRecoilValue(cartState);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link className={styles.cart} href={"/payments"}>
            <a>
              <span>カート</span>
              {/* カートの商品が1以上の場合、カートの商品数を表示するようにします */}
              {cart.products.length >= 1 && <span className={styles.count}>{cart.products.length}</span>}
            </a>
          </Link>
        </div>
      </header>
    </>
  );
});

Header.displayName = "Header";
