import firebase from 'firebase'

export const emailValidator = email => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return "Email cannot be empty.";
  if (!re.test(email)) return "Ooops! We need a valid email address.";

  

  return "";
};

export const passwordValidator = password => {
  if (!password || password.length <= 0) return "Password cannot be empty.";

  return "";
};

export const nameValidator = name => {
  if (!name || name.length <= 0) return "Name cannot be empty.";

  return "";
};

export const usernameValidator = username => {
  if (!username || username.length <= 0) return "Username cannot be empty.";

  return "";
};

export const urlValidator = url => {
  function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }
  
  if (!url || url.length <= 0) return "Url cannot be empty.";

  if (!validURL(url)) return "Please enter a valid url"
  return "";


};
