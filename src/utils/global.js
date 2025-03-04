import Cookies from "js-cookie";

  export const transformarData = (dataString) => {
    const [year, month, day] = dataString.split('-').map(Number);
    const data = new Date(Date.UTC(year, month - 1, day));
    return new Date(data.getTime() + data.getTimezoneOffset() * 60000).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  export function stringDateToDate(stringDate) {
    const [year, month, day] = stringDate.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  export function baseDateToBrDate(date) {
    return date.split("-").reverse().join("/");
  }
  
  export function formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
  }

  export const inputSomenteTexto = (e) => {
    e.target.value = e.target.value.replace(/[^A-Za-zÀ-ú\s]/g, "");
  };
  
  export const inputSomenteNumero = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
  };
  
  export const inputSemCaracteresEspeciais = (e) => {
    e.target.value = e.target.value.replace(/[^A-Za-zÀ-ú0-9\s]/g, "");
  };
  
  export const inputSomenteMinusculas = (e) => {
    e.target.value = e.target.value.replace(/[^a-z\s]/g, "");
  };
  
  export const inputSomenteMaiusculas = (e) => {
    e.target.value = e.target.value.replace(/[^A-Z\s]/g, "");
  };
  
  export const inputLetrasNumeros = (e) => {
    e.target.value = e.target.value.replace(/[^A-Za-z0-9]/g, "");
  };
  
  export const inputSemEspacos = (e) => {
    e.target.value = e.target.value.replace(/\s/g, "");
  };
  
  export const inputNumerosDecimais = (e) => {
    e.target.value = e.target.value.replace(/[^0-9.]/g, "");
  };
  
  export const inputNumerosTelefone = (e) => {
    e.target.value = e.target.value.replace(/[^0-9-]/g, "");
  };
  
  export const inputNumerosCelular = (e) => {
    e.target.value = e.target.value.replace(/[^0-9()\s-]/g, "");
  };

  export const logoff = () => {
    Cookies.remove('token');
    Cookies.remove('id');
    Cookies.remove('role');
    Cookies.remove('nome');
  }