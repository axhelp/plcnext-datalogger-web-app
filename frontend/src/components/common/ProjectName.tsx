import React from 'react'

interface ProjectNameProps {
    projectName?: string
}

const ProjectName = (props: ProjectNameProps) => {
    const {projectName} = props;

    return (
        <div id='c_glb_project_name' className='ellipsis'>
            <span className='c_glb_project_name'>Project Name</span>
            <span title=''>: {projectName}</span>
        </div>
    )
};

export default ProjectName
