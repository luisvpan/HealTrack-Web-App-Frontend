import { useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';

export default function useReportId() {
  const history = useHistory();
  const params = useParams<{ id?: string }>();

  const [reportId, setReportId] = useState<number | null>(null);
  
  useEffect(() => {
    const id = params.id;
    if (!id || isNaN(Number(id))) {
      history.push("/reports");
    } else {
      setReportId(Number(id));
    }
  }, [history, params.id]);

  return reportId;
}
