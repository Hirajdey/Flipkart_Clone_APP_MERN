import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, getAllCategory } from '../../actions';
import Layout from '../../components/Layout';
import Input from '../../components/UI/Input';

/**
* @author
* @function Category
**/

const Category = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    
    const dispatch = useDispatch();
    const category = useSelector(state => state.category);

    useEffect(() => {

        dispatch(getAllCategory());

    }, []);
    

    const renderCategories = (categories) => {
        let myCategories = [];
        for(let category of categories){
            myCategories.push(
                <li>
                    {category.name} 
                    {category.children.length > 0 ? (
                        <ul>
                            {renderCategories(category.children)}
                        </ul>
                    ):null}
                </li>
            );
        }

        return myCategories; 
    }

    const createCategoryList = (categories, options = []) => {
        for(let category of categories){
            options.push({ value: category._id, name: category.name });
            if(category.children.length > 0){
                createCategoryList(category.children, options);
            }
        }
        return options;
    }

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0])
    }

    const handleSave = () => {
        const form = new FormData();
        
        form.append('name', categoryName);
        form.append('parentId', parentCategoryId);
        form.append('categoryImage', categoryImage);

        dispatch(addCategory(form));
        setCategoryName('');
        setParentCategoryId('');

        // const cat = {
        //     categoryName,
        //     parentCategoryId,
        //     categoryImage
        // }
         
        setShow(false)
    }

    return (
        <Layout sidebar={true}>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{display:'flex', justifyContent:'space-between'}}>
                            <h3>Category</h3>
                            <Button onClick={handleShow}>Add</Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <ul>
                            { renderCategories(category.categories) }

                            {/* {
                                category.categories.map(category => (
                                    <li>
                                        {category.name}
                                        {category.children.length > 0 ? (
                                            <ul>
                                                {
                                                    category.children.map(chldCat => (
                                                    <li>
                                                        {chldCat.name}
                                                        {chldCat.children.length > 0 ? (
                                                            <ul>
                                                                 {chldCat.children.map(nChldCat =>(
                                                                     <li>{nChldCat.name}</li>
                                                                 ))}
                                                            </ul>
                                                        ):""}
                                                    </li>  
                                                    ))
                                                }
                                            </ul>
                                        ):""}
                                    </li>
                                ))
                            } */}

                        </ul>
                    </Col>
                </Row>
            </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Category</Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    <Input 
                        value={categoryName}
                        placeholder={`Category Name`}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                    
                    <select 
                        className="form-control" 
                        onChange={(e) => setParentCategoryId(e.target.value)}
                    >
                        <option>Select Category</option>
                        {
                            createCategoryList(category.categories).map(option => 
                                <option key={option.value} value={option.value}> {option.name} </option>
                            )                            
                        }
                    </select>

                    <input 
                        type="file" 
                        name="categoryImage" 
                        onChange={handleCategoryImage}
                    />
                    
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Layout>
    )

}

export default Category;