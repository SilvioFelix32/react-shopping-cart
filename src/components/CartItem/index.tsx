import { Button } from '@material-ui/core'
//types
import { CartItemType } from '../../types/types'
//styles 
import styles from './styles.module.scss'

type Props = {
    item: CartItemType;
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
}

export default function CartItem({ item, addToCart, removeFromCart }: Props) {
    return (
        <div className={styles.wrapper} >
            <div className={styles.cartContent}>
                <h3>{item.title}</h3>
                <div className={styles.information}>
                    <p>Price: R${item.price} </p> {/* preço do item no carrinho */}
                    <p>Total: R${(item.amount * item.price).toFixed(2)} </p> {/* calcula o valor total */} {/* .tofixed(da o valor de decimais após o .) */}
                </div>
                <div className={styles.buttons}>
                    <Button
                        size='small'
                        disableElevation
                        variant='contained'
                        onClick={() => removeFromCart(item.id)}
                    >
                        -
                    </Button>
                    <p>{item.amount}</p>
                    <Button
                        size='small'
                        disableElevation
                        variant='contained'
                        onClick={() => addToCart(item)}
                    >
                        +
                    </Button>
                </div>
            </div>
            <img src={item.image} alt={item.title} />
        </div>
    )
}



/* const CartItem: React.FC<Props> = () => <div className={styles.wrapper} >Cart Item</div>
 
export default CartItem; */