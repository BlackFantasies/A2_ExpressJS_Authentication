/* File Name: app.js   Student Name: James Yan   Student ID: 301229536   Date: 09/30/2022 */
//  IIFE -- Immediately Invoked Function Expression
(function(){
    function Start()
    {
        console.log("App Started...");

        //  Search for all Buttons w/ Danger
        let deleteButtons = document.querySelectorAll('.btn-danger');

        for(button of deleteButtons)
        {
            button.addEventListener('click', (event) => {
                if(!confirm("Are you sure?")) {
                    event.preventDefault();
                    window.location.assign('/contacts-list');
                }
            })
        }

    }

    window.addEventListener("load", Start);
})();