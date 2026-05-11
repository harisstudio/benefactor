const API_BASE_URL = process.env.TEST_API_URL || "https://api.benefactorteam.com/api";
const BASE_URL = API_BASE_URL.replace(/\/api$/, '');

const TEST_EMAIL = `test-${Date.now()}@example.com`;
const TEST_PASSWORD = "TestPassword123!";

console.log(`Testing against: ${API_BASE_URL}\n`);

let sessionCookie = null;
let firstCampaignId = null;

async function request(name, url, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    'Origin': BASE_URL,
    ...(sessionCookie ? { 'Cookie': sessionCookie } : {}),
    ...options.headers,
  };

  try {
    const res = await fetch(url, { ...options, headers });
    const text = await res.text();
    let body;
    try { body = JSON.parse(text); } catch { body = text; }

    const icon = res.ok ? '✅' : '❌';
    console.log(`${icon} [${res.status}] ${name}`);
    if (!res.ok) console.log(`   →`, typeof body === 'object' ? JSON.stringify(body) : body);

    return { res, body };
  } catch (err) {
    console.log(`❌ [ERR] ${name}`);
    console.log(`   → ${err.message}`);
    return { res: null, body: null };
  }
}

async function run() {
  let passed = 0, failed = 0;

  // ── Public endpoints ────────────────────────────────────────────
  console.log('\n── Public ──────────────────────────────');

  let r = await request('Root health check', `${BASE_URL}/`);
  r.res?.ok ? passed++ : failed++;

  r = await request('GET /api/categories', `${API_BASE_URL}/categories`);
  r.res?.ok ? passed++ : failed++;

  r = await request('GET /api/countries', `${API_BASE_URL}/countries`);
  r.res?.ok ? passed++ : failed++;

  r = await request('GET /api/campaigns', `${API_BASE_URL}/campaigns`);
  if (r.res?.ok) {
    passed++;
    if (Array.isArray(r.body) && r.body.length > 0) firstCampaignId = r.body[0].id;
  } else {
    failed++;
  }

  if (firstCampaignId) {
    r = await request(`GET /api/campaigns/${firstCampaignId}`, `${API_BASE_URL}/campaigns/${firstCampaignId}`);
    r.res?.ok ? passed++ : failed++;

    r = await request(`GET /api/campaigns/${firstCampaignId}/donors`, `${API_BASE_URL}/campaigns/${firstCampaignId}/donors`);
    r.res?.ok ? passed++ : failed++;
  } else {
    console.log('⚠️  Skipping campaign/:id tests — no campaigns returned');
  }

  // ── Auth ────────────────────────────────────────────────────────
  console.log('\n── Auth ────────────────────────────────');

  r = await request('POST /api/auth/sign-up/email', `${API_BASE_URL}/auth/sign-up/email`, {
    method: 'POST',
    body: JSON.stringify({ email: TEST_EMAIL, password: TEST_PASSWORD, name: 'API Test User' }),
  });
  r.res?.ok ? passed++ : failed++;

  r = await request('POST /api/auth/sign-in/email', `${API_BASE_URL}/auth/sign-in/email`, {
    method: 'POST',
    body: JSON.stringify({ email: TEST_EMAIL, password: TEST_PASSWORD }),
  });
  if (r.res?.ok) {
    passed++;
    const setCookie = r.res.headers.get('set-cookie');
    if (setCookie) {
      sessionCookie = setCookie.split(';')[0];
      console.log(`   → Session cookie captured`);
    } else {
      console.log(`   ⚠️  No set-cookie header — protected route tests will fail`);
    }
  } else {
    failed++;
  }

  // ── Protected endpoints ─────────────────────────────────────────
  console.log('\n── Protected (requires session) ────────');

  r = await request('GET /api/users/me', `${API_BASE_URL}/users/me`);
  r.res?.ok ? passed++ : (r.res?.status === 401 ? (console.log('   → Got 401 — session cookie not sent correctly'), failed++) : failed++);

  r = await request('GET /api/users/me/campaigns', `${API_BASE_URL}/users/me/campaigns`);
  r.res?.ok ? passed++ : failed++;

  r = await request('POST /api/donations/create-intent (no campaignId)', `${API_BASE_URL}/donations/create-intent`, {
    method: 'POST',
    body: JSON.stringify({ amount: 10 }),
  });
  // Expect 400 (missing campaignId) — that's correct behaviour
  r.res?.status === 400 ? passed++ : failed++;

  if (firstCampaignId) {
    r = await request('POST /api/donations/create-intent', `${API_BASE_URL}/donations/create-intent`, {
      method: 'POST',
      body: JSON.stringify({ amount: 10, campaignId: firstCampaignId }),
    });
    r.res?.ok ? passed++ : failed++;
  }

  // ── Admin (expect 403 for regular user) ─────────────────────────
  console.log('\n── Admin (expect 403 for non-admin) ────');

  r = await request('GET /api/admin/users', `${API_BASE_URL}/admin/users`);
  r.res?.status === 403 ? (console.log('   → Correctly blocked (403)'), passed++) : failed++;

  // ── Summary ─────────────────────────────────────────────────────
  console.log(`\n${'─'.repeat(48)}`);
  console.log(`Results: ${passed} passed, ${failed} failed out of ${passed + failed} tests`);
  if (failed === 0) console.log('All endpoints healthy!');
}

run();
