export default function jsonToFormDataString(
    jsonObject: any,
    formData = new FormData(),
    parentKey = ""
  ) {
    for (let key in jsonObject) {
      if (jsonObject.hasOwnProperty(key)) {
        const value = jsonObject[key];
        const formKey = parentKey ? `${parentKey}[${key}]` : key;
  
        if (value instanceof Array) {
          value.forEach((item, index) => {
            jsonToFormDataString(item, formData, `${formKey}[${index}]`);
          });
        } else if (value instanceof Object && !(value instanceof File)) {
            jsonToFormDataString(value, formData, formKey);
        } else {
          // Aquí nos aseguramos de que cada valor sea tratado como cadena antes de agregarlo
          formData.append(formKey, String(value));
        }
      }
    }
    return formData;
  }
  