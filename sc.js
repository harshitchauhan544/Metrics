document.addEventListener("DOMContentLoaded",function(){

    const searchButton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-cont");

    const easyProgress = document.querySelector(".easy-progress");
    const mediumProgress = document.querySelector(".medium-progress");
    const hardProgress = document.querySelector(".hard-progress");

    const easyLabel = document.getElementById('.easy-label');
    const mediumLabel = document.getElementById('.medium-label');
    const hardLabel = document.getElementById('.hard-label');

    const statsCardContainer = document.querySelector('.stats-card'); 

    // return true or false based on a regex(regular expression)
    function validateUsername(username){
        if(username.trim() == ""){
            alert("Username should not be empty");
            return false;
        }

        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching = regex.test(username);
        if(!isMatching){
            alert("Invalid Username");
        }
        return isMatching;
    }

    async function fetchUserDetails(username) {
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`
        try{

            searchButton.textContent = "Searching..";
            searchButton.disabled = true;

            const response = await fetch(url);
            if(!response.ok){
                throw new Error("Unable to fetch data !");
            }

            const data = await response.json();
            console.log(data);

            // displayUserData(data);
            
        }
        catch(error){
            statsContainer.innerHTML = `<p>No Data Found</p>`;

        }
        finally{
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }

    }

    // function displayUserData(data){

    // }

    searchButton.addEventListener('click', ()=> {
        const username = usernameInput.value;
        // console.log(username);

        if(validateUsername(username)){
            fetchUserDetails(username);
        }

    })

})