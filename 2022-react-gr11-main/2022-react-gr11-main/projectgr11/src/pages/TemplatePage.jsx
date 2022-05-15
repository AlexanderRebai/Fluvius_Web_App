import React, { useCallback, useState } from "react";
import TemplateTest from "../components/dashboard/Template/Template";
import Header from "../components/Header";
import { useTemplates } from "../contexts/TemplateProvider";
import Test2 from "../pages/Test2";

const TemplatePage = () => {
  const { templates, getTemplateByID, template } = useTemplates();
  const [selectedRole, setSelectedRole] = useState("");
  const [active, setActive] = useState("");

  const handleOnClick = useCallback(
    async (temp, ID) => {
      try {
        setActive(temp.ROLE);
        setSelectedRole(temp);
        console.log(temp);
        getTemplateByID(ID);
      } catch (error) {
        console.error(error);
      }
    },
    [setSelectedRole, getTemplateByID]
  );

  return (
    <>
      <Header />
      {/* <TemplateTest /> */}
      <div className="templatePage-main">
        <div className="templatePage-header">
          <div className="template-main">
            <div className="template-header">
              <div className="text-box">
                <div className="title">Template Beheer</div>
              </div>
            </div>
          </div>
        </div>
        <div className="templates">
          {templates.map((temp, index) => {
            return (
              <div
                key={temp.ROLE}
                className={
                  temp.ROLE === active ? "temp-card active-temp" : "temp-card"
                }
                onClick={() => handleOnClick(temp, temp.ID)}
              >
                <span
                  className={
                    temp.ROLE === active ? "temp-span span-active" : "temp-span"
                  }
                >
                  {temp.ROLE}
                </span>
              </div>
            );
          })}
        </div>
        {selectedRole !== "" && <Test2 temp={selectedRole} />}
      </div>
    </>
  );
};

export default TemplatePage;
