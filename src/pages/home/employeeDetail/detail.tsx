import styled from "styled-components";
import Detail from "./detail.component";

export default styled(Detail)`
  display: flex;
  flex-direction: column;
  padding: 16px;

  .employee-detail-header {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }

  .container-form-services {
    width: 100%;
    padding: 0;
  }
`;
