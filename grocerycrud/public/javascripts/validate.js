function alphanumeric(txt) {
    var letters = /^[0-9A-Z]+$/;
        if (txt.value.match(letters)) {
            return true;
        }
        else {
            alert('Please input alphanumeric characters only.' + ' ' +
                ' Letters must be uppercase');
            txt.value="";
            txt.focus();

            return false;
        }

    }
function numeric(num)
{
    var numbers = /^[0-9]+$/;
    if(num.value.match(numbers))
    {
        return true;
    }
    else
    {
        alert('Please input numeric characters in the correct format.');
        num.value="";
        num.focus();
        return false;
    }
}

function price(pr)
{
    var cost = /^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/;

    if(pr.value.match(cost))
    {
        return true
    }
    else
    {
        alert('Please input numeric characters in the correct format.');
        pr.value = "";
        pr.focus();
        return false;
    }
}

function letpattern(txt)
{
    var pat = /^[A-Za-z]+$/;
    if(txt.value.match(pat))
    {
        return true;
    }
    else
    {
        alert('Please input letters only.');
        txt.value = "";
        txt.focus();
        return false;
    }
}