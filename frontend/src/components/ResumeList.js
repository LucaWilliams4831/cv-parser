import React from 'react';

import { Row, Card } from 'react-bootstrap';
import ResumeItem from './ResumeItem';

const ResumeList = props => {
    if (props.items.length === 0) {
        return <div className="product-list center">
            <Card>
                <h2>No Resumes found.</h2>
            </Card>
        </div>
    }
    return (
            <Row>
                {props.items.map(resume => 
                    <ResumeItem 
                        key={resume.id} 
                        id={resume.id} 
                        name={resume.name}
                        email={resume.email} 
                        mobile={resume.mobile} 
                        skills={resume.skills}
                        experience={resume.experience}
                        college={resume.college_name}
                        company={resume.company} 
                        degree={resume.degree}
                        designation={resume.designation}
                        resumePath={resume.resume}
                    />
                )}
            </Row>
    )
};

export default ResumeList;