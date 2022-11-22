import React from "react";
import { UserCard } from "./components";
import { userEmployee, userLabTech, logoHTP } from "../../assets/images";
import { Link } from "react-router-dom";
import "./scss/index.scss";

export const Dashboard = () => {
  return (
    <div className="flex justify-center flex-col items-center p-10">
      <img src={logoHTP} alt="HTP" width="200px" className="pt-10" />
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 mt-10">
        <Link to="signin?medical-professional=true">
          <UserCard
            logo={userEmployee}
            title="Medical Professional"
            alt="Medical Professional"
          />
        </Link>
        <Link to="signin?lab-technician=true">
          <UserCard
            logo={userLabTech}
            title="Lab Technician"
            alt="Lab Technician"
          />
        </Link>
      </div>
    </div>
  );
};
