import { Patient } from "../../types";
import { AllRoles } from "../../types";
import store, { useAppDispatch } from "../../store";
import BackendError from "../../exceptions/backend-error";
import { SelectOption } from "../../components/SelectFields";
import { useCallback, useEffect, useState } from "react";
import getAllPatients from "../../services/patients/get-all-patients";
import { setErrorMessage, setIsLoading } from "../../store/customizationSlice";

export default function usePatientsOptions(): SelectOption[] {
  const dispatch = useAppDispatch();
  const role = store.getState().auth.user?.role;
  const [patients, setPatients] = useState<Patient[]>([]);

  const fetchPatients = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      if (role === AllRoles.ADMIN) {
        const response = await getAllPatients();
        setPatients(response);
        return;
      }
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
      dispatch(setIsLoading(false));
    }
  }, []);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  return patients.map((patient) => ({
    label: `${patient.user.name} ${patient.user.lastname}`,
    value: patient.user.id,
  }));
}
