import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { SkillContext } from './skill-context';

import { Container, Row, Col } from 'react-bootstrap';
import SearchBar from './SearchBar';
import AllResumes from './AllResumes';
import Filter from './Filter';

import './Landing.css';

const Landing = () => {
    const skillContext = useContext(SkillContext);
    const handleInput = (e) => {
        skillContext.searched(e.target.value);
    }
    return (
        <Container className="container-div">
            <Row>
                <Col sm={true} className="sidediv">
                    <Link to="/position" style={{ color: "#483D8B" }}>Need a guy for a position?</Link>
                    <h4>Recommended skills</h4>
                    <Filter />
                </Col>
                <Col sm={true}>
                    <SearchBar handleInput={handleInput} />
                    <AllResumes />
                </Col>
            </Row>
        </Container>
    )
}

export default Landing;