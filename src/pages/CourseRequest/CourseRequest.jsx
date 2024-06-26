import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import "./CourseRequest.scss";
import { Link } from "react-router-dom";

const CourseRequest = () => {
  const { handleSubmit, control, register, formState, watch } = useForm();
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data);
    //submit handling logic
  };

  return (
    <main className="body-container">
      <div className="course-request-form-container">
        <h2 className="title">New Course Request Form</h2>
        <p className="description">
          This document supports academic needs analysis(reduced) as well as
          organizational (expanded). You must understand the problem this course
          addresses. Organizational learning analysis are more involved.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="forms-container">
            <div className="">
              <div>
                <label htmlFor="stakeholder">Stakeholder</label>
              </div>
              <input
                type="email"
                id="email"
                placeholder="Email address"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email address is required",
                  },
                })}
              />
              {<p className="error">{errors?.email?.message}</p>}
            </div>

            <div className="">
              <div>
                <label htmlFor="email-SME">SME</label>
              </div>
              <input
                type="email"
                id="email-SME"
                placeholder="Email address"
                {...register("email-SME", {
                  required: {
                    value: true,
                    message: "Email address is required",
                  },
                })}
              />
              {<p className="error">{errors?.["email-SME"]?.message}</p>}
            </div>

            <div className="">
              <div>
                <label htmlFor="problem-statement">Problem Statement</label>
              </div>
              <input
                type="text"
                id="text-problem-statement"
                placeholder="Problem Statement"
                {...register("text-problem-statement", {
                  required: {
                    value: true,
                    message: "Problem statement is required",
                  },
                })}
              />
              {
                <p className="error">
                  {errors?.["text-problem-statement"]?.message}
                </p>
              }
            </div>

            <div className="">
              <div>
                <label htmlFor="problem-data">Problem Data</label>
              </div>
              <input
                type="text"
                id="text-problem-data"
                placeholder="Problem data"
                {...register("text-problem-data", {
                  required: {
                    value: true,
                    message: "Problem data is required",
                  },
                })}
              />
              {
                <p className="error">
                  {errors?.["text-problem-data"]?.message}
                </p>
              }
            </div>

            <div className="">
              <div>
                <label htmlFor="value-of-change">Value of Change?</label>
              </div>
              <input
                type="text"
                id="text-value-of-change"
                {...register("text-value-of-change", {
                  required: {
                    value: true,
                    message: "Value of change is required",
                  },
                })}
              />
              {
                <p className="error">
                  {errors?.["text-value-of-change"]?.message}
                </p>
              }
            </div>

            <div className="">
              <div>
                <label htmlFor="expected-growth">Expected Growth</label>
              </div>
              <input
                type="text"
                id="text-expected-growth"
                {...register("text-expected-growth", {
                  required: {
                    value: true,
                    message: "Expected growth is required",
                  },
                })}
              />
              {
                <p className="error">
                  {errors?.["text-expected-growth"]?.message}
                </p>
              }
            </div>

            <div className="">
              <div>
                <label htmlFor="priority-urgency">Priority / Urgency</label>
              </div>
              <input
                type="text"
                id="text-priority-urgency"
                {...register("text-priority-urgency", {
                  required: {
                    value: true,
                    message: "Priority / Urgency is required",
                  },
                })}
              />
              {
                <p className="error">
                  {errors?.["text-priority-urgency"]?.message}
                </p>
              }
            </div>
            <div className="btn-container">
              <Link to="/request">
                <button type="submit">Cancel</button>
              </Link>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CourseRequest;
