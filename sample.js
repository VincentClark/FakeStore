const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
// check for strong password
//make sure password is at least 8 characters long, has uppercase and lowercase letters, and a number, special character, and a symbol

isGoodPassword = (password) => {
    if (password.length < 8) {
        return false;
    }
    if (!/[a-z]/.test(password)) {
        return false;
    }
    if (!/[A-Z]/.test(password)) {
        return false;
    }
    if (!/[0-9]/.test(password)) {
        return false;
    }
    if (!/[!@#$%^&*()_+]/.test(password)) {
        return false;
    }
    return true;
}
//validate email
//make sure email is at least 8 characters long, has an @, a period, and a ., and a number

isValidEmail = (email) => {
    if (email.length < 8) {
        return false;
    }
    if (!/[a-z]/.test(email)) {
        return false;
    }
    if (!/[A-Z]/.test(email)) {
        return false;
    }
    if (!/[0-9]/.test(email)) {
        return false;
    }
    if (!/[!@#$%^&*()_+]/.test(email)) {
        return false;
    }
    if (!/@/.test(email)) {
        return false;
    }
    if (!/\./.test(email)) {
        return false;
    }
    return true;
}
//regluar expression to check if email is valid in one line
isValidEmail = (email) => {
    return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email);
}



// readline.question('Password Validator ', (answer) => {
//     //console.log('Hello, ' + answer + '!');
//     if (isGoodPassword(answer)) {
//         console.log('Password is valid!');
//     } else {
//         console.log('Password is invalid!');
//     }
//     readline.close();
// });
readline.question('Email Validator ', (email) => {
    //console.log('Hello, ' + answer + '!');

    if (isValidEmail(email)) {
        console.log('Email is valid!');
    } else {
        console.log('Email is invalid!');
    }
    readline.close();
    if (email === "end") {
        cont = false;
    }
});


//check to strings to see if they are an anogram
//check to see if a string is a palindrome
isPalindrome = (word) => {
    return word.toLowerCase() === word.split('').reverse().join('');
}
// check to see if string is an anagram
isAnagram = (word1, word2) => {
    return word1.split('').sort().join('') === word2.split('').sort().join('');
}

