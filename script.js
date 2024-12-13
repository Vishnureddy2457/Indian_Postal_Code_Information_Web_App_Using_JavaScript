// Fetch by Pincode
function searchByPincode() {
    const pincode = document.getElementById("pincodeInput").value;
    const resultsDiv = document.getElementById("results");

    if (pincode.trim() === "") {
        resultsDiv.innerHTML = `<div class="alert alert-danger">Please enter a valid pincode.</div>`;
        return;
    }

    fetch(`https://api.postalpincode.in/pincode/${pincode}`)
        .then(response => response.json())
            .then(data => {
                if (data[0].Status === "Success") {
                    displayResults(data[0].PostOffice);
                } else {
                    resultsDiv.innerHTML = `<div class="alert alert-danger">No results found for this pincode.</div>`;
                }
            })
            .catch(error => {
                resultsDiv.innerHTML = `<div class="alert alert-danger">Error fetching data. Please try again later.</div>`;
            })
    }

// Fetch by Area
function searchByArea() {
    const area = document.getElementById("areaInput").value;
    const resultsDiv = document.getElementById("results");

    if (area.trim() === "") {
        resultsDiv.innerHTML = `<div class="alert alert-danger">Please enter a valid area name.</div>`;
        return;
    }

    fetch( `https://api.postalpincode.in/postoffice/${area}`)
        .then(response => response.json())
            .then(data => {
                if (data[0].Status === "Success") {
                    displayResults(data[0].PostOffice);
                } else {
                    resultsDiv.innerHTML = `<div class="alert alert-danger">No results found for this area.</div>`;
                } 
})
            .catch(error => {
                resultsDiv.innerHTML = `<div class="alert alert-danger">Error fetching data. Please try again later.</div>`;
            })
}

// Display results in the UI
function displayResults(postOffices) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = ""; // Clear previous results

    postOffices.forEach(postOffice => {
        const resultCard = `
            <div class="result-card">
                <h4>${postOffice.Name} (${postOffice.Pincode})</h4>
                <p><strong>District:</strong> ${postOffice.District}</p>
                <p><strong>State:</strong> ${postOffice.State}</p>
                <p><strong>Country:</strong> ${postOffice.Country}</p>
            </div>
        `
        resultsDiv.innerHTML += resultCard;
    
    });
    }