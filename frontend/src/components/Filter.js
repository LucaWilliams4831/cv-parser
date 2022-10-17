import React, { useState, useContext, useEffect } from 'react';

import { SkillContext } from './skill-context';
import { useHttpClient } from './hooks/http-hook';

import Skill from './Skill';

const Filter = () => {
    const [prompts, setPrompts] = useState([]);
    const skillContext = useContext(SkillContext);

    // eslint-disable-next-line
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        const fetchPrompts = async () => {
            if (skillContext.search) {
                try {
                    const responseData = await sendRequest(
                        `http://95.216.88.188:8000/prompt/${skillContext.search}`
                    );
                    setPrompts(responseData);
                } catch (err) {
                    setPrompts();
                }
            } else {
                setPrompts();
            }
        };
        fetchPrompts();
    }, [sendRequest, skillContext.search]);

    if (prompts) {
        return (
            <div>
                {prompts.map((prompt, index) => (
                    <Skill key={index} skill={prompt} />
                ))} 
            </div>
        )
    }

    return (
        <div style={{ marginTop: "20px" }}>
            <p style={{ fontSize: "17px" }}>No recommendations</p>
        </div>
    )
    
};

export default Filter;
