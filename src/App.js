import React, { useMemo, useState } from 'react';
import './App.css';
import { useQuery} from '@apollo/react-hooks';
import { GET_ITEMS } from './graphql/queries';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button';
import { styled, alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import PrimarySearchAppBar from "./components/Navbar"


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});





function App() {
  
  const [cart,setCart] = useState([]);
  const [search, setSearch] = useState("")
  const {data, loading} = useQuery(GET_ITEMS);





  const totalPrice = useMemo(() => {
    const prices = cart.map((item) => item.price)
    return prices.reduce((a,b) => a + b, 0)
  }, [cart])

  const handleAddToCart = (item) => {
    setCart((prevState) => {
      return [...prevState,item]
    })
  }
  
  const filterProducts = (products) => {
    if(!search.trim()) {
      return products
    }
    return products.filter((item) => {
      const itemName =item.name.toLowerCase()
      const searchKey = search.toLowerCase()
      return itemName.includes(searchKey);
    })
  }

  


  if (loading) return <div className={'loading'}> <CircularProgress /> </div>
  return (
    <div className="App">
      
       <PrimarySearchAppBar total={totalPrice} search={search} setSearch={setSearch} />

       
        <div className={"item-text"}>
         
         {
          filterProducts(data.items).map(item => ( 
            <div className={"item-todo"}
             key={item.id}>     
             
             <Paper sx={{ p: 2, margin: 'auto', maxWidth: 500, flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="complex" src={item.img} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
              {item.name}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Full resolution 1920x1080 • JPEG
              </Typography>
              <Typography variant="body2" color="text.secondary">
              {item.sdesc}
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: 'pointer' }} variant="body2">
              <Button onClick={() => handleAddToCart(item)} variant="contained">Add to Cart</Button>
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
            ${item.price}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
            
          
            </div>
           
          ))}

          </div>
        </div>
    
  );
}

export default App;
