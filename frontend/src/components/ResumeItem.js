import React, { useState } from 'react';
import ResumeModal from './ResumeModal';
import Skill from './Skill';

import './ResumeItem.css';

const ResumeItem = props => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <React.Fragment>
            <ResumeModal 
                show={show} 
                handleClose={handleClose} 
                key={props.id} 
                id={props.id} 
                name={props.name}
                email={props.email} 
                mobile={props.mobile} 
                experience={props.experience}
                college={props.college}
                company={props.company} 
                degree={props.degree}
                designation={props.designation}
                resumePath={props.resumePath}
            />
            <div className="row">
                <div className="col-md-6 col-sm-8 col-xs-12 col-md-offset-3 col-sm-offset-2">
                    <div className="card">
                        <div className="text">
                        
                        <div className="fab" onClick={handleShow}>&#43;</div>
            
                        <h3>{props.name}</h3>
                        <p style={{ marginBottom: "10px" }}>{props.email}</p>
                        

                        <h5>Skills</h5>
                        {props.skills.map((skill, index) => (
                            <Skill key={index} skill={skill} />
                        ))}
                        </div>
                        
            
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ResumeItem;