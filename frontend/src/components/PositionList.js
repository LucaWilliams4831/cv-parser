import React from 'react';

import { Row, Card } from 'react-bootstrap';
import PositionItem from './PositionItem';

const PositionList = props => {
    if (props.items.length === 0) {
        return <div className="product-list center">
            <Card>
                <h2>No Positions found.</h2>
            </Card>
        </div>
    }
    return (
            <Row>
                {props.items.map(position => 
                    <PositionItem 
                        key={position.id} 
                        id={position.id} 
                        name={position.name}
                        email={position.email} 
                        mobile={position.mobile} 
                        skills={position.skills}
                        experience={position.experience}
                        college={position.college_name}
                        company={position.company} 
                        degree={position.degree}
                        designation={position.designation}
                        positionPath={position.resume}
                    />
                )}
            </Row>
    )
};

export default PositionList;