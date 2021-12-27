import { useState } from "react";
import { useQuery } from "react-query";
//components
import Item from "./components/Card";
import Cart from "./components/Cart";
import { Drawer, Grid, LinearProgress, Badge, IconButton } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
// Styles
import styles from './styles/Home.module.scss'
//Types
import { CartItemType } from "./types/types";

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch('https://fakestoreapi.com/products')).json();

const App = () => {
  const [cartOpen, setCartIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products',
    getProducts);
  console.log(data);

  const getTotalItems = (items: CartItemType[]) => {
    return (
      items.reduce((acumulator: number, item) => acumulator + item.amount, 0)
    )
  }

  const handleAddToCart = (clickedItem: CartItemType) => {
    return (
      setCartItems(previousState => {
        //1. Is the item already added in the cart? // se já tiver um, vai adicionar mais um item
        const isItemInCart = previousState.find(item => item.id === clickedItem.id)

        if (isItemInCart) { //se ja houver retorna esse função
          return (
            previousState.map(item => (
              item.id === clickedItem.id
                ? { ...item, amount: item.amount + 1 } //fiz um spread(...) do item, pego o valor, e adiciono +1 ao clique
                : item
            )
            )
          )
        }
        //First time the item is added // Ou seja, se não tem nada, vai adicionar um item
        return [...previousState, { ...clickedItem, amount: 1 }]
      })
    )
  }

  function handleRemoveFromCart(id: number) {
    setCartItems(previousState => ( //valor antigo
      previousState.reduce((acumulator, item) => { //damos um reduce no valor antigo
        if (item.id === id) { //se o id do item for igual ao (id:number) da função handleRemoveFromCart então retorna
          if (item.amount === 1) return acumulator; //se o valor for 1, retorna o acumulador e para aqui, deletando o item do array
          return [...acumulator, { ...item, amount: item.amount - 1 }]; // do contrario dou um spread(...) no item e tiro um -1 do valor total
        } else {
          return [...acumulator, item] // e então retornamos o valor do array
        }
      }, [] as CartItemType[]) // o acumulador começa com um array[] vazio, to tipo CartItemType
    ))
  };

  if (isLoading) return <LinearProgress />; //barra de loading no topo
  if (error) return <div>Something get wrong ...</div>


  return (
    <div className={styles.wrapper}>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartIsOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <IconButton className={styles.iconButton} onClick={() => setCartIsOpen(true)} >
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <AddShoppingCart />
        </Badge>
      </IconButton>
      <Grid container spacing={3}>
        {data?.map((item => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        )))}
      </Grid>
    </div >

  );
}

export default App;
