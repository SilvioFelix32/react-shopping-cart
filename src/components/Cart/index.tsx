import { CartItemType } from '../../types/types'
import CartItem from '../CartItem'
import styles from './styles.module.scss'

type Props = {
    cartItems: CartItemType[];
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
}

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
    return (
        <div className={styles.wrapper}>
            <h2>Your Shopping Cart</h2>
            {cartItems.length === 0 ? <p>No items in cart.</p> : null} {/* items do seu carrinho / se não houver nada =>  null */}
            {cartItems.map(item => (
                <CartItem
                    key={item.id}
                    item={item}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                />
            ))}
        </div>
    )
}

export default Cart;