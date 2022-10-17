import React , { useState, useEffect, useContext } from 'react';

import { SkillContext } from './skill-context';
import { useHttpClient } from './hooks/http-hook';

import ResumeList from './ResumeList';
import LoadingSpinner from './utils/LoadingSpinner';
import ErrorModal from './utils/ErrorModal';


const AllResumes = () => {
    const skillContext = useContext(SkillContext);
    const [loadedResumes, setLoadedResumes] = useState();
    const [countResumes, setCountResumes] = useState(0);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        const fetchResumes = async () => {
            try {
                const responseData = await sendRequest(
                    'http://95.216.88.188:8000/users'
                );
                setLoadedResumes(responseData);
                setCountResumes(responseData.length);
                console.log(responseData);
            } catch (err) {}
        };
        fetchResumes();
    }, [sendRequest]);

    let filteredResumes = [];
    let c = countResumes;
    for (let i=0; i<countResumes; i++) {
        for (let j=0; j<loadedResumes[i].skills.length; j++) {
            if (loadedResumes[i].skills[j].toLowerCase().includes(skillContext.search.toLowerCase())) {
                filteredResumes.push(loadedResumes[i]);
                break;
            }
        }
        c = filteredResumes.length
    }

    let searchVar;
    if (skillContext.search) {
        searchVar = <h4>Showing {c} results for {skillContext.search}</h4>
    } else {
        searchVar = <h4>Showing all results</h4>
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            {!isLoading && (
                <React.Fragment>
                <div>
                    {searchVar}
                </div>
                <hr></hr>
                {loadedResumes && <ResumeList items={filteredResumes} />}               
                </React.Fragment>
            )}
        </React.Fragment>
    )
}

export default AllResumes;