
var url = window.location.pathname
var arr = new Array()
arr = url.split("/")
page_name = arr.slice(arr.length -2).join("")
page_name = "_" + page_name.replace(/-/g, "_")

var xmlhttp = new XMLHttpRequest()

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == XMLHttpRequest.DONE) {
        var ml = ""
        if (xmlhttp.status == 200) {
            ml = ml + "<i class=\"fas fa-check\" style=\"color: lime\"></i> "
            ml = ml + "Thank you for submitting a comment. Your comment was received and processed successfully. " +
                "Once the author approves the pull request <a href=\"https://github.com/jwdevos/lab-time-blog/pulls\">here</a>, your comment will become visible on this page."
        } else if (xmlhttp.status == 400) {
            ml = ml + "<i class=\"fas fa-times\" style=\"color: red\"></i> "
            ml = ml + "Thank you for submitting a comment. Sadly, your input was not received or processed successfully. " +
    		    "This can be the result of the Lab Time backend being unavailable, or because of malformed data or failed input validation. " +
                "It's also possible you've tried to submit your comment twice. If you believe your post to be valid, please inform the author via Twitter, LinkedIn or Facebook."
        }
        document.getElementById("result").innerHTML = ml
    }
}
              
function msg() {
    var fnameCheck = true
    var fsiteCheck = true
    var fcommentCheck = true
    var recaptchaCheck = true
    var validInput = "<i class=\"fas fa-check\" style=\"color: lime\"></i><font color=\"lime\"> This field has valid input</font>"
    var emptyInput = "<i class=\"fas fa-times\" style=\"color: red\"></i><font color=\"red\"> Please provide some input in this field</font>"
    var emptyToken = "<i class=\"fas fa-times\" style=\"color: red\"></i><font color=\"red\"> Please prove that you are not a robot</font>"
    var longInput = "<i class=\"fas fa-times\" style=\"color: red\"></i><font color=\"red\"> Please respect the size limit for this field</font>"
    var response = grecaptcha.getResponse()
    var postvar = {
        "user_name"       : document.getElementById("fname").value,
        "user_site"       : document.getElementById("fsite").value,
        "page_name"       : page_name,
        "comment_data"    : document.getElementById("fcomment").value,
        "recaptcha_token" : response,
    }

    if (postvar.user_name == "") {
        document.getElementById("fname-check-result").innerHTML = emptyInput
        fnameCheck = false
    } else if (postvar.user_name.length > 99) {
        document.getElementById("fname-check-result").innerHTML = longInput
        fnameCheck = false
    } else {
        document.getElementById("fname-check-result").innerHTML = validInput
        fnameCheck = true
    }

    if (postvar.user_site.length > 99) {
        document.getElementById("fsite-check-result").innerHTML = longInput
        fsiteCheck = false
    } else if (postvar.user_site !== ""){
        document.getElementById("fsite-check-result").innerHTML = validInput
        fsiteCheck = true
    } else {
        document.getElementById("fsite-check-result").innerHTML = ""
        fsiteCheck = true
    }

    if (postvar.comment_data == "") {
        document.getElementById("fcomment-check-result").innerHTML = emptyInput
        fcommentCheck = false
    } else if (postvar.comment_data.length > 49999) {
        document.getElementById("fcomment-check-result").innerHTML = longInput
        fcommentCheck = false
    } else {
        document.getElementById("fcomment-check-result").innerHTML = validInput
        fcommentCheck = true
    }

    if (postvar.recaptcha_token == "") {
        document.getElementById("recaptcha-check-result").innerHTML = emptyToken
        recaptchaCheck = false
    } else {
        document.getElementById("recaptcha-check-result").innerHTML = validInput
        recaptchaCheck = true
    }

    //console.log("fnameCheck: " + fnameCheck)
    //console.log("fsiteCheck: " + fsiteCheck)
    //console.log("fcommentCheck: " + fcommentCheck)
    //console.log("recaptchaCheck: " + recaptchaCheck)

    if (fnameCheck && fsiteCheck && fcommentCheck && recaptchaCheck) {
        console.log("all true")
        xmlhttp.open("POST", "https://post.lab-time.it")
        xmlhttp.setRequestHeader("Content-Type", "application/json")
        xmlhttp.send(JSON.stringify(postvar))
    }
}

function show() {
    var x = document.getElementById("commentformblock")
    if (x.style.display === "none") {
        x.style.display = "block"
    } else {
        x.style.display = "none"
    }
}
