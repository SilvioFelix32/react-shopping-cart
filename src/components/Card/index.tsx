import { Button } from "@material-ui/core";
//types
import { CartItemType } from "../../types/types";
//styles
import styles from './styles.module.scss'

type Props = {
    item: CartItemType;
    handleAddToCart: (clickedItem: CartItemType) => void
}

const Item: React.FC<Props> = ({ item, handleAddToCart }) => (
    <div className={styles.wrapper}>
        <img src={item.image} alt={item.title} />
        <div className={styles.content} >
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <h3>R${item.price}</h3>
        </div>
        <Button className={styles.button} onClick={() => handleAddToCart(item)}>Add to cart</Button>
    </div>
)

export default Item;