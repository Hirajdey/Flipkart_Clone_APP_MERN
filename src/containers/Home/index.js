import React from 'react'
import { Container, Jumbotron, Row, Col } from 'react-bootstrap'
import Layout from '../../components/Layout'
import './Styles.css';
import { NavLink } from 'react-router-dom';

/**
* @author
* @function Home
**/

const Home = (props) => {
  return(
    <>
        <Layout sidebar={true}>
            Home
        </Layout>
    </>
   )

}

export default Home;