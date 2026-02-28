const axios = require('axios');

async function testJoinAPI() {
    try {
        const payload = {
            name: "Automated Test User",
            email: "auto@test.com",
            registrationNumber: "122A5678",
            department: "Electrical Engineering",
            interestDomain: "robotics"
        };

        console.log("Sending payload to /api/join...");
        const response = await axios.post('http://localhost:5000/api/join', payload);

        console.log("Response Status:", response.status);
        console.log("Response Data:", response.data);

        if (response.data.registrationNumber === "122A5678") {
            console.log("✅ SUCCESS: The registration number was saved correctly.");
        } else {
            console.log("❌ FAILURE: The registration number was NOT returned in the saved document.");
        }

    } catch (e) {
        console.error("Error occurred:", e.message);
        if (e.response) {
            console.error("Response Data:", e.response.data);
        }
    }
}

testJoinAPI();
