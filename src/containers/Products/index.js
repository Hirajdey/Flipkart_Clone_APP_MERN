import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory, addProduct } from '../../actions';
import Layout from '../../components/Layout';
import Input from '../../components/UI/Input';

/**
* @author
* @function Products
**/

const Products = (props) => {

    const [show, setShow] = useState(false);
    
    const [showProductDetails, setShowProductDetails] = useState(false);
    const [productDetails, setProductDetails] = useState(null);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [productPictures, setProductPictures] = useState([]);

    const dispatch = useDispatch();
    const category = useSelector(state => state.category);
    const product = useSelector(state => state.product);
    
    // useEffect(() => {

    //     dispatch(getAllCategory());
        
    // },[])

    const createCategoryList = (categories, options=[]) => {
        for(let category of categories){
            options.push({value: category._id, name: category.name})
            if(category.children.length > 0){
                createCategoryList(category.children, options)
            }
        }
        return options;
    }
    
    const handleProductPictures = (e) => {
        setProductPictures([
            ...productPictures,
            e.target.files[0]
        ])
    }   

    
    const handleSave = () => {
        const form = new FormData();
        
        form.append('name', name);
        form.append('quantity', quantity);
        form.append('price', price);
        form.append('description', description);
        form.append('category', categoryId );
        
        for(let pic of productPictures){
            form.append('productPicture', pic);
        }

        dispatch(addProduct(form));
        
        setShow(false)
    }


    const renderAddProductModal = () => {
        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Product</Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    <Input 
                        label="Name"
                        value={name}
                        placeholder={`Product name`}
                        onChange={(e) => {setName(e.target.value)}}
                    />

                    <Input 
                        label="Quantity"
                        value={quantity}
                        placeholder={`Quantity`}
                        onChange={(e) => {setQuantity(e.target.value)}}
                    />
                    <Input 
                        label="Price"
                        value={price}
                        placeholder={`Price`}
                        onChange={(e) => {setPrice(e.target.value)}}
                    />
                    <Input 
                        label="Description"
                        value={description}
                        placeholder={`Description`}
                        onChange={(e) => {setDescription(e.target.value)}}
                    />

                    <select 
                        className="form-control" 
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                    >
                        <option>Select Category</option>
                        {
                            createCategoryList(category.categories).map(option => 
                                <option key={option.value} value={option.value}> {option.name} </option>
                            )                            
                        }
                    </select>

                    {
                        productPictures.length > 0 && productPictures.map((pic, index) => (
                            <div key={index}>
                                {pic.name}
                            </div>
                        ))
                    }

                    <input type="file" name="productPicture" onChange={handleProductPictures}/>
                    
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    const handleProductDetailsModal = (product) => {
        setShowProductDetails(!showProductDetails);
        setProductDetails(product);
    }

    const renderProductDetailsModal = () => {
        if(productDetails){
            return (
                <Modal show={showProductDetails} onHide={handleProductDetailsModal} size="lg">
                      <Modal.Header closeButton>
                        <Modal.Title>Product Details</Modal.Title>
                    </Modal.Header>
    
                    <Modal.Body>
                        <h2>{productDetails.name}</h2>
                        <p>{productDetails.description}</p>
                        {
                            productDetails.productPictures.map(picture => (
                                <div >
                                    <img style={{maxWidth:"100%"}} src={`http://localhost:2000/public/${picture.img}`}/>
                                </div>
                            ))
                        }
                    </Modal.Body>
                    
                    <Modal.Footer>
    
                    </Modal.Footer>
                </Modal>
            )    
        }
        
    }    


    const renderProducts = (products) => {
        return (
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                        {
                            products.length > 0 && products.map((product, index) => (
                                <tr key={product._id} onClick={() => handleProductDetailsModal(product)}>
                                    <td>{index}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.category.name}</td>
                                </tr>
                            ))
                        }                
                </tbody>
            </Table>
        )
    }


    return (
        <Layout sidebar={true}>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{display:'flex', justifyContent:'space-between'}}>
                            <h3>Product</h3>
                            <Button onClick={handleShow}>Add</Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {renderProducts(product.products)}
                    </Col>
                </Row>
            </Container>

            {renderAddProductModal()}          

            {renderProductDetailsModal()}  

        </Layout>
    )

}

export default Products;

