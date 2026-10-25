import test from "node:test";
import assert from "node:assert/strict";
import { contactSchema, escapeHtml } from "../lib/contact";
import { POST } from "../app/api/contact/route";
const date = `${new Date().getFullYear() + 1}-06-21`;
const valid = () => ({
  firstName: "Camille",
  lastName: "Martin",
  email: "camille@example.fr",
  phone: "0612345678",
  date,
  departure: "Eyragues",
  ceremony: "Mairie de Saint-Rémy",
  reception: "Un mas en Provence",
  package: "provencale",
  hours: 4,
  message: "Bonjour, nous souhaitons une pause photo.",
  consent: true,
  website: "",
  startedAt: Date.now() - 10000,
});
const request = (body: unknown, origin = "http://localhost:3000") =>
  new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", origin },
    body: JSON.stringify(body),
  });
test("validation : demande complète, date passée, date impossible, consentement et formule", () => {
  assert.ok(contactSchema.safeParse(valid()).success);
  for (const change of [
    { date: "2020-01-01" },
    { date: "2030-02-30" },
    { consent: false },
    { email: "incorrect" },
    { package: "inconnue" },
    { hours: 0 },
  ])
    assert.equal(
      contactSchema.safeParse({ ...valid(), ...change }).success,
      false,
    );
});
test("échappement des données utilisateur dans l’email HTML", () => {
  assert.equal(
    escapeHtml("<img src=\"x\"> & 'test'"),
    "&lt;img src=&quot;x&quot;&gt; &amp; &#39;test&#39;",
  );
});
test("route : rejette origine tierce, charge volumineuse, piège et soumission trop rapide", async () => {
  assert.equal(
    (await POST(request(valid(), "https://evil.example"))).status,
    403,
  );
  assert.equal(
    (await POST(request({ ...valid(), message: "x".repeat(17000) }))).status,
    413,
  );
  assert.equal(
    (await POST(request({ ...valid(), website: "spam.example" }))).status,
    400,
  );
  assert.equal(
    (await POST(request({ ...valid(), startedAt: Date.now() }))).status,
    400,
  );
  assert.equal(
    (await POST(request({ ...valid(), consent: false }))).status,
    400,
  );
});
test("route : aucun faux succès sans configuration ; gestion du fournisseur et anti-doublon", async () => {
  const originalFetch = globalThis.fetch;
  const previous = {
    key: process.env.RESEND_API_KEY,
    to: process.env.CONTACT_EMAIL,
    from: process.env.RESEND_FROM_EMAIL,
  };
  try {
    delete process.env.RESEND_API_KEY;
    delete process.env.CONTACT_EMAIL;
    delete process.env.RESEND_FROM_EMAIL;
    assert.equal((await POST(request(valid()))).status, 503);
    const proxied = new Request("http://0.0.0.0:3000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        host: "preview.example.fr",
        origin: "https://preview.example.fr",
      },
      body: JSON.stringify({ ...valid(), email: "proxy@example.fr" }),
    });
    assert.equal((await POST(proxied)).status, 503);
    process.env.RESEND_API_KEY = "test-only";
    process.env.CONTACT_EMAIL = "owner@example.fr";
    process.env.RESEND_FROM_EMAIL = "contact@example.fr";
    globalThis.fetch = async () => new Response("{}", { status: 500 });
    assert.equal(
      (await POST(request({ ...valid(), email: "failure@example.fr" }))).status,
      502,
    );
    let captured: Record<string, unknown> = {};
    globalThis.fetch = async (_input, init) => {
      captured = JSON.parse(init?.body as string);
      return new Response('{"id":"test-id"}', { status: 200 });
    };
    assert.equal(
      (
        await POST(
          request({
            ...valid(),
            email: "success@example.fr",
            message: "<script>alert(1)</script>",
          }),
        )
      ).status,
      200,
    );
    assert.equal(captured.reply_to, "success@example.fr");
    assert.ok(String(captured.html).includes("&lt;script&gt;"));
    assert.equal(
      (await POST(request({ ...valid(), email: "success@example.fr" }))).status,
      429,
    );
  } finally {
    globalThis.fetch = originalFetch;
    for (const [key, value] of [
      ["RESEND_API_KEY", previous.key],
      ["CONTACT_EMAIL", previous.to],
      ["RESEND_FROM_EMAIL", previous.from],
    ]) {
      if (value === undefined) delete process.env[key!];
      else process.env[key!] = value;
    }
  }
});
