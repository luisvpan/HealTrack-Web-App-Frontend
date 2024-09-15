import React, { useState, useEffect } from "react";
import { IonSpinner, IonText } from "@ionic/react";
import styled from "styled-components";
import Detail from "./detail";
import getEmployeeByUserId from "../../../services/employees/get-employee-by-id-user";
import { useAppSelector } from "../../../store";
import { Employee } from "../../../types";

const EmployeeDetail: React.FC<Props> = ({ className }) => {
  const user = useAppSelector((state) => state.auth.user);
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      if (user?.id) {
        try {
          const employeeData = await getEmployeeByUserId(user.id);
          setEmployee(employeeData);
        } catch (error) {
          console.error("Error fetching employee:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [user?.id]);

  if (loading) {
    return <IonSpinner />;
  }

  if (!employee) {
    return <IonText>No se encontró el empleado.</IonText>;
  }

  return (
    <div className={className}>
      <Detail employee={employee} />
    </div>
  );
};

interface Props {
  className?: string;
}

export default styled(EmployeeDetail)`
  display: flex;
  flex-direction: column;

  .flex-column {
    display: flex;
    flex-direction: column;
  }

  .form-data {
    margin-top: 16px;
  }

  .form-header-card {
    width: 100%;
  }

  .form-header {
    width: 100%;
    display: flex;
    flex-direction: row;
  }
`;
