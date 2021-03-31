window.onload = () => {
    //Initialize auth
    auth = new GoTrue({
        APIUrl: "https://roommatematcher.netlify.app/.netlify/identity",
        audience: "",
        setCookie: false
    });
    let usr = auth.currentUser();

    if (usr == null) { //Exit page if not logged in
        window.location.href = "/"
    }

    console.log("User logged in!");
    document.querySelector("#logoutBtn").onclick = doLogout;

    document.querySelector("textarea[name='bio']").onkeyup = (e) => {
        document.querySelector("#bioCount").innerText = e.srcElement.value.split(" ").length;
        if (e.srcElement.value.split(" ").length >= 150 && e.which >= 0x20) {
            e.preventDefault();
        }
    }

    document.querySelectorAll("input[name='countrymatch']").forEach((ele) => {
        ele.onchange = (e) => {
            document.querySelector(".f-country").classList.toggle("d-none", e.target.value != "y");
            console.log(e.target.value == "y");
            if (e.target.value == "y") {
                
            }
        }
    });
}

//Logout the current user
const doLogout = () => {
    if (!auth.currentUser()) return;
    auth.currentUser().logout()
        .then(() => {
            window.setTimeout(() => {
                window.location.href = "/";
            }, 3000);
        })
        .catch((err) => {
            console.log("Error while attempting to log out: ")
            console.dir(err);
        });
}

//Show or clear a message. htmlMsg store the html to be displayed. blockId is the ID of the element to target. type is the text type (info/success/warn/danger)
let showMsg = (htmlMsg, blockId, type) => {
    let msgBlock = document.querySelector(`#${blockId}`);
    msgBlock.classList = [`text-${type}`];
    msgBlock.innerHTML = htmlMsg;
}