import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { PositionContext } from './position-context';

import SearchPosition from './SearchPosition';
import AllPositions from './AllPositions';

const Position = () => {
    const positionContext = useContext(PositionContext);
    const handleInput = (e) => {
        positionContext.positioned(e.target.value);
    }

    return (
        <Container style={{ marginTop: "30px" }}>
            <SearchPosition handleInput={handleInput} />
            <AllPositions />
        </Container>
    )
};

export default Position;
