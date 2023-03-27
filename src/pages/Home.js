import React, { useEffect,useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from '@mui/material/Button';
import { ButtonGroup } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, loadProducts } from "../redux/action";
import { useNavigate } from "react-router-dom";
import "./home.css"
const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#000",
    color: "#fff",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#EEEEEE",
  },
 
}));

const useStyles = makeStyles({
  table: {
    marginTop: 100,
    minWidth: 900,
  },
});

const Home = () => {
    const [prod, setProd] = useState([]);
  const [page, setPage] = useState(1);
  const classes = useStyles();
  let dispatch = useDispatch();
  const navigate = useNavigate();
 
  const { products } = useSelector((state) => state.data);

  

  useEffect(() => {
    // if ( products) {
    //     setProd(products);
    //   }
    dispatch(loadProducts());
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure wanted to delete the user ?"))
      dispatch(deleteProduct(id));
  };

  const selectPageHandler = (selectedPage) => {
    console.log("*********" + selectedPage);
    if (selectedPage >= 1 && selectedPage <= products.length / 10) 
      setPage(selectedPage);
  };
  return (
    <div>
      <div>
        <Button
          onClick={() => navigate("/addProduct")}
          variant="contained"
          color="primary"
        >
          Add Product
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          sx={{ minWidth: 700,textAlign:"center" }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
            <StyledTableCell>
                <input type="checkbox" />
            </StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="center">Karat</StyledTableCell>
              <StyledTableCell align="center">Weight</StyledTableCell>
              <StyledTableCell align="center">Price</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products && products.slice(page * 10 - 10, page * 10).map((product) => (
              <StyledTableRow key={product.id}>
                
                <StyledTableCell component="th" scope="row">
                <input type="checkbox" />
                </StyledTableCell>
               

                <StyledTableCell component="th" scope="row">
                  {product.name}
                </StyledTableCell>
                <StyledTableCell align="right">{product.karat}</StyledTableCell>
                <StyledTableCell align="right">{product.weight}</StyledTableCell>
                <StyledTableCell align="right">{product.price}</StyledTableCell>
                <StyledTableCell align="right">
                  {" "}
                  <div className={classes.buttonStyles}>
                    <ButtonGroup
                      variant="contained"
                      color="primary"
                      area-label="contained primary button group"
                    >
                      <Button
                        style={{ marginRight: "5px" }}
                        color="error"
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </Button>
                      <Button 
                      onClick={()=>{navigate(`/editProduct/${product.id}`)}}
                      color="primary">Edit</Button>
                    </ButtonGroup>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <div>
        {products.length && products.length > 0 && (
          <div className="pagination">
            <span onClick={() => selectPageHandler(page - 1)}
            className={page>1?"":"pagination__disable"}
            >◀</span>
            {
              //so its give a new in a array inside this products =>100
              [...Array(Math.floor(products.length / 10))].map((_, i) => {
                //i start from 0
                return (
                  <span
                    //current index and page is match then
                    className={page === i + 1 ? "pagination__selected" : ""}
                    onClick={() => selectPageHandler(i + 1)}
                    key={i}
                  >
                    {i + 1}
                  </span>
                );
              })
            }

            <span onClick={() => selectPageHandler(page + 1)}
            className={page<Math.floor(products.length / 10)?"":"pagination__disable"}
            >▶</span>
          </div>
        )}
      </div>
      </TableContainer>
     

    </div>
  );
};

export default Home;
