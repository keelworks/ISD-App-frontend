import "./CourseStructure.scss";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import ISDFlowPage from "../../../utilities/isdPagesLogic/isdFlowPage/ISDFlowPage";
import React, {useState} from "react";
import {MyInput} from "../../../utilities/utils.jsx";
import {Input} from "antd";

const errorSchema = yup.object({}).required();

const submitCourseStructureForm = async (data) => {
    console.log(data);
};



const CourseStructureForm = ({ currentStep }) => {
    const { register, handleSubmit } = useForm({
        resolver: yupResolver(errorSchema),
    });
    const [modules, setModules] = useState([]);
    const addModules = () => {
        let newModule="module"+"#"+(modules.length+1)
        setModules([...modules, { module: newModule,value: '',lessonList:[]}]);
    }
    const  addLesson=(index)=>{
        const lesson={name:' ',detail:' '};
        const updatedModules = [...modules];
        updatedModules[index].lessonList=[...updatedModules[index].lessonList,lesson]
        setModules(
            updatedModules
        )
    }
    const removeLesson=(index)=>{
        const updatedModules = [...modules];
        updatedModules[index].lessonList=[...updatedModules[index].lessonList.slice(0,updatedModules[index].lessonList.length-1)];
        setModules(
            updatedModules
        )
    }
    const removeModules=()=>{
        if(modules.length>1){
            setModules([...modules.slice(0,modules.length-1)]);
        }
    }
    return (
        <form
            className="isd-flow-form"
            onSubmit={handleSubmit(CourseStructureForm)}
        >
            <h3 className="form-title">{currentStep}</h3>
            <fieldset>
                <div className="field-title">Purpose</div>
                <div className="field-text">
                    This document supports academic needs analysis (reduced) as well as
                    organizational (expanded). You must understand the problem this course
                    addresses. Organizational learning analysis are more involved{" "}
                    <span>show more</span>.
                </div>
            </fieldset>
            <fieldset>
                <div className="field-title">Quality Criteria</div>
                <div className="field-text">
                    1. The problem is clearly stated and fully understood by the design
                    team.
                    <br />
                    2. We have credible data confirming the extent of the problem (applies
                    primarily to organizational) <span>show more</span>.
                </div>
            </fieldset>
            {
                modules.map((item,index)=>
                    <div>
                    <h3 className="form-title">{"Module "+(index+1)}</h3>
                    <fieldset>
                        <MyInput
                            name={item.module}
                            type="input"
                            value={item.value}
                            label={"Module Heading"}
                            {...register(item.module)}
                        />
                    </fieldset>
                    <fieldset>
                        {item.lessonList.map((items,i)=>
                           <div>
                               <MyInput
                                   value={"Lesson"+(i+1)} disabled={true}
                               />
                           </div>
                        )}
                    </fieldset>
                        <label
                            onClick={()=>addLesson(index)}
                            style={{
                                cursor: 'pointer',
                                color: '#0774c3',
                            }}>
                            + Create Lesson
                        </label>
                    </div>
                )
            }
            <label
                onClick={addModules}
                style={{
                    cursor: 'pointer',
                    color: '#0774c3',
                }}>
                + Add Modules
            </label>
            <label
                onClick={removeModules}
                style={{
                    cursor: modules.length>1 ? 'pointer':'not-allowed',
                    color: modules.length>1 ? "red":"gray",
                }}>
                - Remove Modules
            </label>
            <div className="button-container">
                <button className="button next">Next</button>
                <button className="button cancel">Cancel</button>
            </div>
        </form>
    );
};

const CourseStructure = () => {
    const currentStep = "Course Structure";

    return (
        <ISDFlowPage currentStep={currentStep}>
            <CourseStructureForm currentStep={currentStep} />
        </ISDFlowPage>
    );
};

export default CourseStructure;
