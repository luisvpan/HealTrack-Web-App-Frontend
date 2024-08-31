import React from 'react';
import styled from 'styled-components';
import { IonButton, IonIcon } from '@ionic/react';
import { arrowBackOutline, arrowForwardOutline } from 'ionicons/icons';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: flex-start; /* Default for xs */
  align-items: center;
  margin-top: 12px;

  @media (min-width: 768px) { /* md breakpoint */
    justify-content: center;
  }
`;

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <PaginationWrapper>
      <IonButton onClick={handlePrevPage} disabled={currentPage === 1}>
        <IonIcon icon={arrowBackOutline} />
      </IonButton>
      <span style={{ margin: '0 12px' }}>
        {currentPage} / {totalPages}
      </span>
      <IonButton onClick={handleNextPage} disabled={currentPage === totalPages}>
        <IonIcon icon={arrowForwardOutline} />
      </IonButton>
    </PaginationWrapper>
  );
};

export default Pagination;
