import React, { FunctionComponent, useState } from 'react';
import {
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonList,
  IonText
} from '@ionic/react';

const CustomSelect: FunctionComponent<Props> = ({
  options,
  value,
  onChange,
  onBlur,
  helperText,
  error,
  label,
  name,
  fullWidth,
  disabled,
  className,
  size,
  isAutocomplete,
}) => {
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [inputValue, setInputValue] = useState(value || '');

  const handleSelectChange = (e: CustomEvent) => {
    const newValue = e.detail.value;
    onChange({
      target: {
        name,
        id: name,
        value: newValue,
      } as any,
    } as any);
  };

  const handleAutocompleteChange = (event: CustomEvent) => {
    const value = event.detail.value as string;
    setInputValue(value);
    setShowAutocomplete(true);
  };

  const handleOptionClick = (option: SelectOption) => {
    setInputValue(option.label);
    setShowAutocomplete(false);
    onChange({
      target: {
        name,
        id: name,
        value: option.value,
      } as any,
    } as any);
  };

  if (isAutocomplete) {
    const filteredOptions = options.filter(option =>
        option.value.toString().includes(inputValue.toString())
    );

    return (
      <div className={className}>
        <IonItem>
          <IonLabel>{label}</IonLabel>
          <IonInput
            value={inputValue}
            onIonInput={handleAutocompleteChange} // Change to onIonInput
            onBlur={onBlur as any} // Casting to any to match the expected type
            disabled={disabled}
            placeholder={label}
          />
        </IonItem>
        {showAutocomplete && (
          <IonList>
            {filteredOptions.length ? (
              filteredOptions.map(option => (
                <IonItem key={option.value + '-' + name} onClick={() => handleOptionClick(option)}>
                  <IonLabel>{option.label}</IonLabel>
                </IonItem>
              ))
            ) : (
              <IonItem>
                <IonLabel>No options available</IonLabel>
              </IonItem>
            )}
          </IonList>
        )}
        {helperText && (
          <IonText color={error ? 'danger' : 'medium'}>
            {helperText}
          </IonText>
        )}
      </div>
    );
  }

  return (
    <IonItem className={className} lines="full">
      <IonLabel position="floating">{label}</IonLabel>
      <IonSelect
        value={value || ''}
        onIonChange={handleSelectChange}
        onBlur={onBlur as any} // Casting to any to match the expected type
        name={name}
        disabled={disabled}
        placeholder="Select an option"
        interface="popover"
      >
        <IonSelectOption value="">
          <IonLabel>Selecciona una opción...</IonLabel>
        </IonSelectOption>
        {options.map(option => (
          <IonSelectOption key={option.value + '-' + name} value={option.value}>
            {option.label}
          </IonSelectOption>
        ))}
      </IonSelect>
      {helperText && (
        <IonText color={error ? 'danger' : 'medium'}>
          {helperText}
        </IonText>
      )}
    </IonItem>
  );
};

export interface Props {
  options: SelectOption[];
  value: number | string | null;
  onChange: (event: React.ChangeEvent<{ value: number | string }>) => void;
  onBlur?: React.FocusEventHandler<HTMLIonInputElement>; // Adjusted type to match React's expected type
  helperText?: string;
  error?: boolean;
  size?: "small" | "medium";
  label?: string;
  disabled?: boolean;
  name: string;
  className?: string;
  isAutocomplete?: boolean;
  fullWidth?: boolean;
}

export interface SelectOption {
  value: string | number;
  label: string;
}

export default CustomSelect;
