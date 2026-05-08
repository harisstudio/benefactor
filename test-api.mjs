const API_BASE_URL = process.env.TEST_API_URL || "https://api.benefactorteam.com/api";

console.log(`Testing API endpoints against: ${API_BASE_URL}\n`);

async function runTests() {
  const endpoints = [
    {
      name: "Root API check",
      url: `${API_BASE_URL.replace(/\/api$/, '')}/`,
      method: "GET"
    },
    {
      name: "Auth Sign-Up",
      url: `${API_BASE_URL}/auth/sign-up/email`,
      method: "POST",
      body: { email: "test-script@example.com", password: "password123", name: "Test User" }
    },
    {
      name: "Auth Sign-In",
      url: `${API_BASE_URL}/auth/sign-in/email`,
      method: "POST",
      body: { email: "test-script@example.com", password: "password123" }
    },
    {
      name: "Create Payment Intent",
      url: `${API_BASE_URL}/donations/create-intent`,
      method: "POST",
      body: { amount: 10, campaignId: "test-campaign-id" }
    }
  ];

  let allPassed = true;

  for (const endpoint of endpoints) {
    try {
      console.log(`[TEST] ${endpoint.method} ${endpoint.url}`);
      
      const options = {
        method: endpoint.method,
        headers: {
          'Content-Type': 'application/json',
          'Origin': API_BASE_URL.replace(/\/api$/, '')
        }
      };

      if (endpoint.body) {
        options.body = JSON.stringify(endpoint.body);
      }

      const response = await fetch(endpoint.url, options);
      const text = await response.text();
      
      let parsed;
      try {
        parsed = JSON.parse(text);
      } catch (e) {
        parsed = text;
      }

      if (response.ok) {
        console.log(`✅ SUCCESS (${response.status})`);
        if (typeof parsed === 'object') {
           console.log(`   Response summary:`, Object.keys(parsed));
        }
      } else {
        console.error(`❌ FAILED (${response.status})`);
        console.error(`   Response:`, parsed);
        allPassed = false;
      }
    } catch (err) {
      console.error(`❌ ERROR: Failed to connect to ${endpoint.url}`);
      console.error(`   ${err.message}`);
      allPassed = false;
    }
    console.log("--------------------------------------------------");
  }

  if (allPassed) {
    console.log("🎉 All tested endpoints are working successfully!");
  } else {
    console.log("⚠️ Some endpoints failed. Please check the logs above.");
  }
}

runTests();
