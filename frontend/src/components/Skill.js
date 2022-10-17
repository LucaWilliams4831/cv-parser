import React, { useContext } from 'react';
import { SkillContext } from './skill-context';

import './Skill.css';

const Skill = props => {
    const handlePrompt = () => {
        skillContext.searched(props.skill);
    }

    const skillContext = useContext(SkillContext);
    return (
        <button className="button btn rounded outline-4" onClick={handlePrompt}>{props.skill}</button>
    )
}

export default Skill;